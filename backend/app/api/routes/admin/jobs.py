from math import ceil
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.crud import jobs as jobs_crud
from app.db.models import Admin
from app.schemas.admin import (
    JobAdminCreate,
    JobAdminOut,
    JobAdminUpdate,
    JobStatusUpdate,
    Paginated,
)
from app.schemas.common import APIResponse

router = APIRouter(prefix="/jobs", tags=["admin-jobs"])


def _job_out(job, applications_count: int = 0) -> JobAdminOut:
    data = JobAdminOut.model_validate(job)
    data.applications_count = applications_count
    return data


@router.get("", response_model=APIResponse[Paginated])
async def list_jobs(
    q: str | None = None,
    status_filter: str | None = Query(default=None, alias="status"),
    department: str | None = None,
    location: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[Paginated]:
    rows, total = await jobs_crud.list_admin_jobs(
        db,
        q=q,
        status=status_filter,
        department=department,
        location=location,
        page=page,
        page_size=page_size,
    )
    items = [_job_out(job, count) for job, count in rows]
    return APIResponse(
        success=True,
        message="Jobs loaded",
        data=Paginated(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            pages=max(1, ceil(total / page_size)) if total else 1,
        ),
    )


@router.post("", response_model=APIResponse[JobAdminOut], status_code=status.HTTP_201_CREATED)
async def create_job(
    payload: JobAdminCreate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[JobAdminOut]:
    try:
        job = await jobs_crud.create_job(db, payload)
        await db.commit()
    except ValueError as exc:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return APIResponse(
        success=True,
        message="Job created",
        data=_job_out(job, 0),
    )


@router.get("/{job_id}", response_model=APIResponse[JobAdminOut])
async def get_job(
    job_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[JobAdminOut]:
    job = await jobs_crud.get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found.")
    from sqlalchemy import func, select

    from app.db.models import JobApplication

    count = int(
        (
            await db.execute(
                select(func.count())
                .select_from(JobApplication)
                .where(JobApplication.job_id == job.id)
            )
        ).scalar_one()
    )
    return APIResponse(success=True, message="Job loaded", data=_job_out(job, count))


@router.put("/{job_id}", response_model=APIResponse[JobAdminOut])
async def update_job(
    job_id: UUID,
    payload: JobAdminUpdate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[JobAdminOut]:
    job = await jobs_crud.get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found.")
    try:
        job = await jobs_crud.update_job(db, job, payload)
        await db.commit()
    except ValueError as exc:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return APIResponse(success=True, message="Job updated", data=_job_out(job))


@router.patch("/{job_id}/status", response_model=APIResponse[JobAdminOut])
async def patch_status(
    job_id: UUID,
    payload: JobStatusUpdate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[JobAdminOut]:
    job = await jobs_crud.get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found.")
    job = await jobs_crud.set_job_status(db, job, payload.status)
    await db.commit()
    return APIResponse(success=True, message="Job status updated", data=_job_out(job))


@router.delete("/{job_id}", response_model=APIResponse[None])
async def delete_job(
    job_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[None]:
    job = await jobs_crud.get_job_by_id(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found.")
    try:
        await jobs_crud.delete_job(db, job)
        await db.commit()
    except ValueError as exc:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return APIResponse(success=True, message="Job deleted", data=None)
