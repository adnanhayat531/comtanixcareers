from math import ceil
from pathlib import Path
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.core.config import get_settings
from app.crud import admin_data
from app.db.models import Admin
from app.schemas.admin import ApplicationAdminOut, Paginated, StatusUpdate
from app.schemas.common import APIResponse

router = APIRouter(prefix="/applications", tags=["admin-applications"])

ALLOWED_STATUSES = {
    "new",
    "reviewing",
    "shortlisted",
    "interview",
    "rejected",
    "hired",
}


def _out(row) -> ApplicationAdminOut:
    item = ApplicationAdminOut.model_validate(row)
    item.job_title = row.job.title if row.job else None
    return item


@router.get("", response_model=APIResponse[Paginated])
async def list_applications(
    q: str | None = None,
    status: str | None = None,
    job_id: UUID | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[Paginated]:
    rows, total = await admin_data.list_applications(
        db, q=q, status=status, job_id=job_id, page=page, page_size=page_size
    )
    return APIResponse(
        success=True,
        message="Applications loaded",
        data=Paginated(
            items=[_out(r) for r in rows],
            total=total,
            page=page,
            page_size=page_size,
            pages=max(1, ceil(total / page_size)) if total else 1,
        ),
    )


@router.get("/{app_id}", response_model=APIResponse[ApplicationAdminOut])
async def get_application(
    app_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ApplicationAdminOut]:
    row = await admin_data.get_application(db, app_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found.")
    return APIResponse(success=True, message="Application loaded", data=_out(row))


@router.patch("/{app_id}/status", response_model=APIResponse[ApplicationAdminOut])
async def patch_status(
    app_id: UUID,
    payload: StatusUpdate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ApplicationAdminOut]:
    if payload.status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid application status.")
    row = await admin_data.get_application(db, app_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found.")
    row = await admin_data.set_application_status(db, row, payload.status)
    await db.commit()
    # reload with job
    row = await admin_data.get_application(db, app_id)
    return APIResponse(success=True, message="Status updated", data=_out(row))


@router.get("/{app_id}/cv")
async def download_cv(
    app_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    row = await admin_data.get_application(db, app_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found.")
    return _serve_resume(row.resume_file_path, row.resume_original_filename)


@router.delete("/{app_id}", response_model=APIResponse[None])
async def delete_application(
    app_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[None]:
    row = await admin_data.get_application(db, app_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Application not found.")
    await admin_data.delete_application(db, row)
    await db.commit()
    return APIResponse(success=True, message="Application deleted", data=None)


def _serve_resume(relative_path: str, original_name: str) -> FileResponse:
    settings = get_settings()
    # Prefer resolving under upload_path by basename to avoid path traversal
    name = Path(relative_path).name
    path = (settings.upload_path / name).resolve()
    if not str(path).startswith(str(settings.upload_path.resolve())):
        raise HTTPException(status_code=400, detail="Invalid file path.")
    if not path.is_file():
        # fallback: relative to backend root
        alt = (Path(__file__).resolve().parents[4] / relative_path).resolve()
        if alt.is_file() and str(alt).startswith(str(settings.upload_path.resolve().parent.parent)):
            path = alt
        else:
            raise HTTPException(status_code=404, detail="Resume file not found.")
    return FileResponse(
        path=path,
        filename=original_name or path.name,
        media_type="application/octet-stream",
    )
