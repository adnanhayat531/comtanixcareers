from __future__ import annotations

import re
from datetime import date
from uuid import UUID

from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Job, JobApplication
from app.schemas.admin import JobAdminCreate, JobAdminUpdate
from app.services.jobs import accepts_applications, is_publicly_listed, sync_is_active_from_status


def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug[:220] or "job"


def code_from_title(title: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return (base[:60] or "job").replace("-", "_")[:64]


async def list_active_jobs(db: AsyncSession) -> list[Job]:
    """Public openings: published, active, not past deadline."""
    today = date.today()
    result = await db.execute(
        select(Job)
        .where(
            Job.status == "published",
            Job.is_active.is_(True),
            or_(Job.application_deadline.is_(None), Job.application_deadline >= today),
        )
        .order_by(Job.title.asc())
    )
    return [j for j in result.scalars().all() if is_publicly_listed(j, today)]


async def get_job_by_slug(db: AsyncSession, slug: str) -> Job | None:
    result = await db.execute(select(Job).where(Job.slug == slug))
    return result.scalar_one_or_none()


async def get_job_by_id(db: AsyncSession, job_id: UUID) -> Job | None:
    result = await db.execute(select(Job).where(Job.id == job_id))
    return result.scalar_one_or_none()


async def get_job_by_title(db: AsyncSession, title: str) -> Job | None:
    result = await db.execute(select(Job).where(Job.title == title))
    return result.scalar_one_or_none()


async def get_job_by_code(db: AsyncSession, code: str) -> Job | None:
    result = await db.execute(select(Job).where(Job.code == code))
    return result.scalar_one_or_none()


async def job_accepts_applications(db: AsyncSession, job: Job) -> bool:
    return accepts_applications(job)


async def list_admin_jobs(
    db: AsyncSession,
    *,
    q: str | None = None,
    status: str | None = None,
    department: str | None = None,
    location: str | None = None,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[tuple[Job, int]], int]:
    filters = []
    if q:
        like = f"%{q.strip()}%"
        filters.append(or_(Job.title.ilike(like), Job.slug.ilike(like), Job.code.ilike(like)))
    if status:
        filters.append(Job.status == status)
    if department:
        filters.append(Job.department.ilike(f"%{department.strip()}%"))
    if location:
        filters.append(Job.location.ilike(f"%{location.strip()}%"))

    count_q = select(func.count()).select_from(Job)
    if filters:
        count_q = count_q.where(and_(*filters))
    total = int((await db.execute(count_q)).scalar_one())

    app_count = (
        select(JobApplication.job_id, func.count().label("cnt"))
        .group_by(JobApplication.job_id)
        .subquery()
    )
    stmt = (
        select(Job, func.coalesce(app_count.c.cnt, 0))
        .outerjoin(app_count, app_count.c.job_id == Job.id)
        .order_by(Job.updated_at.desc())
    )
    if filters:
        stmt = stmt.where(and_(*filters))
    stmt = stmt.offset((page - 1) * page_size).limit(page_size)
    rows = list((await db.execute(stmt)).all())
    return [(row[0], int(row[1])) for row in rows], total


async def create_job(db: AsyncSession, data: JobAdminCreate) -> Job:
    slug = (data.slug or slugify(data.title)).strip()
    code = (data.code or code_from_title(data.title)).strip()
    existing_slug = await get_job_by_slug(db, slug)
    if existing_slug:
        raise ValueError("A job with this slug already exists.")
    existing_code = await get_job_by_code(db, code)
    if existing_code:
        import uuid as _uuid

        code = f"{code_from_title(data.title)[:50]}_{_uuid.uuid4().hex[:8]}"

    job = Job(
        code=code,
        title=data.title.strip(),
        slug=slug,
        department=data.department,
        location=data.location,
        employment_type=data.employment_type,
        experience_required=data.experience_required,
        salary=data.salary,
        summary=data.summary.strip(),
        description=data.description.strip(),
        responsibilities=data.responsibilities,
        requirements=data.requirements,
        qualifications=data.qualifications,
        benefits=data.benefits,
        tags=data.tags or [],
        status=data.status,
        posted_date=data.posted_date or date.today(),
        application_deadline=data.application_deadline,
    )
    sync_is_active_from_status(job)
    db.add(job)
    await db.flush()
    await db.refresh(job)
    return job


async def update_job(db: AsyncSession, job: Job, data: JobAdminUpdate) -> Job:
    payload = data.model_dump(exclude_unset=True)
    if "slug" in payload and payload["slug"]:
        other = await get_job_by_slug(db, payload["slug"])
        if other and other.id != job.id:
            raise ValueError("A job with this slug already exists.")
    if "title" in payload and payload["title"]:
        other = await get_job_by_title(db, payload["title"])
        if other and other.id != job.id:
            raise ValueError("A job with this title already exists.")

    for key, value in payload.items():
        setattr(job, key, value)
    if "status" in payload:
        sync_is_active_from_status(job)
    await db.flush()
    await db.refresh(job)
    return job


async def delete_job(db: AsyncSession, job: Job) -> None:
    apps = await db.execute(
        select(func.count()).select_from(JobApplication).where(JobApplication.job_id == job.id)
    )
    if int(apps.scalar_one()) > 0:
        raise ValueError("Cannot delete a job that has applications. Close it instead.")
    await db.delete(job)
    await db.flush()


async def set_job_status(db: AsyncSession, job: Job, status: str) -> Job:
    job.status = status
    sync_is_active_from_status(job)
    await db.flush()
    await db.refresh(job)
    return job
