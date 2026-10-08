from math import ceil
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.crud import admin_data
from app.db.models import Admin
from app.schemas.admin import ContactAdminOut, Paginated, StatusUpdate
from app.schemas.common import APIResponse

router = APIRouter(prefix="/contacts", tags=["admin-contacts"])

ALLOWED = {"unread", "read", "replied", "archived"}


@router.get("", response_model=APIResponse[Paginated])
async def list_contacts(
    q: str | None = None,
    status: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[Paginated]:
    rows, total = await admin_data.list_contacts(
        db, q=q, status=status, page=page, page_size=page_size
    )
    return APIResponse(
        success=True,
        message="Contacts loaded",
        data=Paginated(
            items=[ContactAdminOut.model_validate(r) for r in rows],
            total=total,
            page=page,
            page_size=page_size,
            pages=max(1, ceil(total / page_size)) if total else 1,
        ),
    )


@router.get("/{contact_id}", response_model=APIResponse[ContactAdminOut])
async def get_contact(
    contact_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ContactAdminOut]:
    row = await admin_data.get_contact(db, contact_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Contact message not found.")
    if row.status == "unread":
        row = await admin_data.set_contact_status(db, row, "read")
        await db.commit()
    return APIResponse(
        success=True,
        message="Contact loaded",
        data=ContactAdminOut.model_validate(row),
    )


@router.patch("/{contact_id}/status", response_model=APIResponse[ContactAdminOut])
async def patch_status(
    contact_id: UUID,
    payload: StatusUpdate,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ContactAdminOut]:
    if payload.status not in ALLOWED:
        raise HTTPException(status_code=400, detail="Invalid contact status.")
    row = await admin_data.get_contact(db, contact_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Contact message not found.")
    row = await admin_data.set_contact_status(db, row, payload.status)
    await db.commit()
    return APIResponse(
        success=True,
        message="Status updated",
        data=ContactAdminOut.model_validate(row),
    )


@router.delete("/{contact_id}", response_model=APIResponse[None])
async def delete_contact(
    contact_id: UUID,
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[None]:
    row = await admin_data.get_contact(db, contact_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Contact message not found.")
    await admin_data.delete_contact(db, row)
    await db.commit()
    return APIResponse(success=True, message="Contact deleted", data=None)
