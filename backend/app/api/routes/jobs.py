from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.crud import jobs as jobs_crud
from app.schemas.common import APIResponse
from app.schemas.job import JobListItem, JobOut

router = APIRouter(prefix="/api/jobs", tags=["jobs"])


@router.get("", response_model=APIResponse[list[JobListItem]])
async def list_jobs(db: AsyncSession = Depends(get_db)) -> APIResponse[list[JobListItem]]:
    rows = await jobs_crud.list_active_jobs(db)
    return APIResponse(
        success=True,
        message="Open roles retrieved successfully",
        data=[JobListItem.model_validate(r) for r in rows],
    )


@router.get("/{slug}", response_model=APIResponse[JobOut])
async def get_job(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> APIResponse[JobOut]:
    # Allow lookup by slug, code, or UUID string
    job = await jobs_crud.get_job_by_slug(db, slug)
    if job is None:
        job = await jobs_crud.get_job_by_code(db, slug)
    if job is None:
        try:
            job = await jobs_crud.get_job_by_id(db, UUID(slug))
        except ValueError:
            job = None
    from app.services.jobs import is_publicly_listed

    if job is None or not is_publicly_listed(job):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )
    return APIResponse(
        success=True,
        message="Job retrieved successfully",
        data=JobOut.model_validate(job),
    )
