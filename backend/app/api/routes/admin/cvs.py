from math import ceil
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.api.routes.admin.applications import _serve_resume
from app.crud import admin_data
from app.db.models import Admin
from app.schemas.admin import CareerAdminOut, Paginated, StatusUpdate
from app.schemas.common import APIResponse

router = APIRouter(prefix="/cvs", tags=["admin-cvs"])

ALLOWED = {"new", "reviewed", "archived"}


@router.get("", response_model=APIResponse[Paginated])
async def list_cvs(
    q: str | None = None,
    status: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[Paginated]:
    rows, total = await admin_data.list_cvs(
        db, q=q, status=status, page=page, page_size=page_size
    )
    return APIResponse(
        success=True,
        message="CV submissions loaded",
        data=Paginated(
            items=[CareerAdminOut.model_validate(r) for r in rows],
            total=total,
            page=page,
            page_size=page_size,
            pages=max(1, ceil(total / page_size)) if total else 1,
        ),
    )


@router.get("/{cv_id}", response_model=APIResponse[CareerAdminOut])
async def get_cv(
    cv_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[CareerAdminOut]:
    row = await admin_data.get_cv(db, cv_id)
    if row is None:
        raise HTTPException(status_code=404, detail="CV submission not found.")
    return APIResponse(
        success=True,
        message="CV loaded",
        data=CareerAdminOut.model_validate(row),
    )


@router.patch("/{cv_id}/status", response_model=APIResponse[CareerAdminOut])
async def patch_status(
    cv_id: UUID,
    payload: StatusUpdate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[CareerAdminOut]:
    if payload.status not in ALLOWED:
        raise HTTPException(status_code=400, detail="Invalid CV status.")
    row = await admin_data.get_cv(db, cv_id)
    if row is None:
        raise HTTPException(status_code=404, detail="CV submission not found.")
    row = await admin_data.set_cv_status(db, row, payload.status)
    await db.commit()
    return APIResponse(
        success=True,
        message="Status updated",
        data=CareerAdminOut.model_validate(row),
    )


@router.get("/{cv_id}/cv")
async def download_cv(
    cv_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
):
    row = await admin_data.get_cv(db, cv_id)
    if row is None:
        raise HTTPException(status_code=404, detail="CV submission not found.")
    return _serve_resume(row.resume_file_path, row.resume_original_filename)


@router.delete("/{cv_id}", response_model=APIResponse[None])
async def delete_cv(
    cv_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[None]:
    row = await admin_data.get_cv(db, cv_id)
    if row is None:
        raise HTTPException(status_code=404, detail="CV submission not found.")
    await admin_data.delete_cv(db, row)
    await db.commit()
    return APIResponse(success=True, message="CV submission deleted", data=None)
