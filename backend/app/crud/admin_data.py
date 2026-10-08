from __future__ import annotations

from datetime import date, datetime
from uuid import UUID

from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models import CareerSubmission, ContactSubmission, Job, JobApplication


async def dashboard_stats(db: AsyncSession) -> dict:
    today = date.today()
    total_jobs = int((await db.execute(select(func.count()).select_from(Job))).scalar_one())
    active_jobs = int(
        (
            await db.execute(
                select(func.count())
                .select_from(Job)
                .where(
                    Job.status == "published",
                    Job.is_active.is_(True),
                    or_(
                        Job.application_deadline.is_(None),
                        Job.application_deadline >= today,
                    ),
                )
            )
        ).scalar_one()
    )
    total_applications = int(
        (await db.execute(select(func.count()).select_from(JobApplication))).scalar_one()
    )
    new_applications = int(
        (
            await db.execute(
                select(func.count())
                .select_from(JobApplication)
                .where(JobApplication.status == "new")
            )
        ).scalar_one()
    )
    total_cvs = int(
        (await db.execute(select(func.count()).select_from(CareerSubmission))).scalar_one()
    )
    contact_messages = int(
        (await db.execute(select(func.count()).select_from(ContactSubmission))).scalar_one()
    )
    unread_contacts = int(
        (
            await db.execute(
                select(func.count())
                .select_from(ContactSubmission)
                .where(ContactSubmission.status == "unread")
            )
        ).scalar_one()
    )

    recent_apps = list(
        (
            await db.execute(
                select(JobApplication)
                .options(selectinload(JobApplication.job))
                .order_by(JobApplication.created_at.desc())
                .limit(8)
            )
        )
        .scalars()
        .all()
    )
    recent_contacts = list(
        (
            await db.execute(
                select(ContactSubmission)
                .order_by(ContactSubmission.created_at.desc())
                .limit(8)
            )
        )
        .scalars()
        .all()
    )

    return {
        "active_jobs": active_jobs,
        "total_jobs": total_jobs,
        "total_applications": total_applications,
        "new_applications": new_applications,
        "total_cvs": total_cvs,
        "contact_messages": contact_messages,
        "unread_contacts": unread_contacts,
        "recent_applications": recent_apps,
        "recent_contacts": recent_contacts,
    }


async def list_applications(
    db: AsyncSession,
    *,
    q: str | None = None,
    status: str | None = None,
    job_id: UUID | None = None,
    date_from: date | None = None,
    date_to: date | None = None,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[JobApplication], int]:
    filters = []
    if q:
        like = f"%{q.strip()}%"
        filters.append(
            or_(
                JobApplication.full_name.ilike(like),
                JobApplication.email.ilike(like),
                JobApplication.phone.ilike(like),
            )
        )
    if status:
        filters.append(JobApplication.status == status)
    if job_id:
        filters.append(JobApplication.job_id == job_id)
    if date_from:
        filters.append(JobApplication.created_at >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        filters.append(
            JobApplication.created_at
            <= datetime.combine(date_to, datetime.max.time()).replace(microsecond=0)
        )

    count_q = select(func.count()).select_from(JobApplication)
    if filters:
        count_q = count_q.where(and_(*filters))
    total = int((await db.execute(count_q)).scalar_one())

    stmt = (
        select(JobApplication)
        .options(selectinload(JobApplication.job))
        .order_by(JobApplication.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    if filters:
        stmt = stmt.where(and_(*filters))
    rows = list((await db.execute(stmt)).scalars().all())
    return rows, total


async def get_application(db: AsyncSession, app_id: UUID) -> JobApplication | None:
    result = await db.execute(
        select(JobApplication)
        .options(selectinload(JobApplication.job))
        .where(JobApplication.id == app_id)
    )
    return result.scalar_one_or_none()


async def set_application_status(
    db: AsyncSession, row: JobApplication, status: str
) -> JobApplication:
    row.status = status
    await db.flush()
    await db.refresh(row)
    return row


async def delete_application(db: AsyncSession, row: JobApplication) -> None:
    await db.delete(row)
    await db.flush()


async def list_cvs(
    db: AsyncSession,
    *,
    q: str | None = None,
    status: str | None = None,
    date_from: date | None = None,
    date_to: date | None = None,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[CareerSubmission], int]:
    filters = []
    if q:
        like = f"%{q.strip()}%"
        filters.append(
            or_(
                CareerSubmission.full_name.ilike(like),
                CareerSubmission.email.ilike(like),
                CareerSubmission.phone.ilike(like),
                CareerSubmission.role_interest.ilike(like),
            )
        )
    if status:
        filters.append(CareerSubmission.status == status)
    if date_from:
        filters.append(CareerSubmission.created_at >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        filters.append(
            CareerSubmission.created_at
            <= datetime.combine(date_to, datetime.max.time()).replace(microsecond=0)
        )

    count_q = select(func.count()).select_from(CareerSubmission)
    if filters:
        count_q = count_q.where(and_(*filters))
    total = int((await db.execute(count_q)).scalar_one())

    stmt = (
        select(CareerSubmission)
        .order_by(CareerSubmission.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    if filters:
        stmt = stmt.where(and_(*filters))
    rows = list((await db.execute(stmt)).scalars().all())
    return rows, total


async def get_cv(db: AsyncSession, cv_id: UUID) -> CareerSubmission | None:
    result = await db.execute(select(CareerSubmission).where(CareerSubmission.id == cv_id))
    return result.scalar_one_or_none()


async def set_cv_status(db: AsyncSession, row: CareerSubmission, status: str) -> CareerSubmission:
    row.status = status
    await db.flush()
    await db.refresh(row)
    return row


async def delete_cv(db: AsyncSession, row: CareerSubmission) -> None:
    await db.delete(row)
    await db.flush()


async def list_contacts(
    db: AsyncSession,
    *,
    q: str | None = None,
    status: str | None = None,
    date_from: date | None = None,
    date_to: date | None = None,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[ContactSubmission], int]:
    filters = []
    if q:
        like = f"%{q.strip()}%"
        filters.append(
            or_(
                ContactSubmission.name.ilike(like),
                ContactSubmission.email.ilike(like),
                ContactSubmission.subject.ilike(like),
            )
        )
    if status:
        filters.append(ContactSubmission.status == status)
    if date_from:
        filters.append(ContactSubmission.created_at >= datetime.combine(date_from, datetime.min.time()))
    if date_to:
        filters.append(
            ContactSubmission.created_at
            <= datetime.combine(date_to, datetime.max.time()).replace(microsecond=0)
        )

    count_q = select(func.count()).select_from(ContactSubmission)
    if filters:
        count_q = count_q.where(and_(*filters))
    total = int((await db.execute(count_q)).scalar_one())

    stmt = (
        select(ContactSubmission)
        .order_by(ContactSubmission.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    if filters:
        stmt = stmt.where(and_(*filters))
    rows = list((await db.execute(stmt)).scalars().all())
    return rows, total


async def get_contact(db: AsyncSession, contact_id: UUID) -> ContactSubmission | None:
    result = await db.execute(
        select(ContactSubmission).where(ContactSubmission.id == contact_id)
    )
    return result.scalar_one_or_none()


async def set_contact_status(
    db: AsyncSession, row: ContactSubmission, status: str
) -> ContactSubmission:
    row.status = status
    await db.flush()
    await db.refresh(row)
    return row


async def delete_contact(db: AsyncSession, row: ContactSubmission) -> None:
    await db.delete(row)
    await db.flush()
