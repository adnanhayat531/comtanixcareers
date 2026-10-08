from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.crud import admins as admins_crud
from app.db.models import Admin
from app.schemas.admin import AdminOut, AdminPasswordChangeIn, AdminUpdateIn
from app.schemas.common import APIResponse

router = APIRouter(prefix="/settings", tags=["admin-settings"])


@router.get("/me", response_model=APIResponse[AdminOut])
async def get_settings_profile(
    admin: Admin = Depends(get_current_admin),
) -> APIResponse[AdminOut]:
    return APIResponse(
        success=True,
        message="Profile loaded",
        data=AdminOut.model_validate(admin),
    )


@router.put("/me", response_model=APIResponse[AdminOut])
async def update_profile(
    payload: AdminUpdateIn,
    admin: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[AdminOut]:
    if payload.email and payload.email.lower() != admin.email.lower():
        existing = await admins_crud.get_by_email(db, str(payload.email))
        if existing and existing.id != admin.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another admin already uses this email.",
            )
    admin = await admins_crud.update_profile(
        db,
        admin,
        name=payload.name,
        email=str(payload.email) if payload.email else None,
    )
    await db.commit()
    return APIResponse(
        success=True,
        message="Profile updated",
        data=AdminOut.model_validate(admin),
    )


@router.post("/password", response_model=APIResponse[None])
async def change_password(
    payload: AdminPasswordChangeIn,
    admin: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[None]:
    ok = await admins_crud.change_password(
        db,
        admin,
        current_password=payload.current_password,
        new_password=payload.new_password,
    )
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect.",
        )
    await db.commit()
    return APIResponse(success=True, message="Password updated", data=None)
