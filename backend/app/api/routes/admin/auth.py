from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.core.auth import create_access_token
from app.crud import admins as admins_crud
from app.db.models import Admin
from app.schemas.admin import AdminLoginIn, AdminLoginOut, AdminOut
from app.schemas.common import APIResponse

router = APIRouter(prefix="/auth", tags=["admin-auth"])


@router.post("/login", response_model=APIResponse[AdminLoginOut])
async def login(
    payload: AdminLoginIn,
    db: AsyncSession = Depends(get_db),
) -> APIResponse[AdminLoginOut]:
    admin = await admins_crud.authenticate(db, payload.email, payload.password)
    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )
    token = create_access_token(admin_id=admin.id, email=admin.email)
    return APIResponse(
        success=True,
        message="Signed in successfully",
        data=AdminLoginOut(
            access_token=token,
            admin=AdminOut.model_validate(admin),
        ),
    )


@router.post("/logout", response_model=APIResponse[None])
async def logout(_: Admin = Depends(get_current_admin)) -> APIResponse[None]:
    # JWT is client-held; logout is handled by discarding the token.
    return APIResponse(success=True, message="Signed out successfully", data=None)


@router.get("/me", response_model=APIResponse[AdminOut])
async def me(admin: Admin = Depends(get_current_admin)) -> APIResponse[AdminOut]:
    return APIResponse(
        success=True,
        message="Admin profile loaded",
        data=AdminOut.model_validate(admin),
    )


# Spec alias: GET /api/admin/me
me_alias_router = APIRouter(tags=["admin-auth"])


@me_alias_router.get("/me", response_model=APIResponse[AdminOut])
async def me_root(admin: Admin = Depends(get_current_admin)) -> APIResponse[AdminOut]:
    return await me(admin)
