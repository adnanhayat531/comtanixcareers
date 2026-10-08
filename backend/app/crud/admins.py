from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import hash_password, verify_password
from app.db.models import Admin


async def get_by_email(db: AsyncSession, email: str) -> Admin | None:
    result = await db.execute(select(Admin).where(Admin.email == email.lower()))
    return result.scalar_one_or_none()


async def get_by_id(db: AsyncSession, admin_id: UUID) -> Admin | None:
    result = await db.execute(select(Admin).where(Admin.id == admin_id))
    return result.scalar_one_or_none()


async def create_admin(
    db: AsyncSession,
    *,
    name: str,
    email: str,
    password: str,
) -> Admin:
    row = Admin(
        name=name.strip(),
        email=email.lower().strip(),
        password_hash=hash_password(password),
        is_active=True,
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    return row


async def authenticate(db: AsyncSession, email: str, password: str) -> Admin | None:
    admin = await get_by_email(db, email)
    if admin is None or not admin.is_active:
        return None
    if not verify_password(password, admin.password_hash):
        return None
    return admin


async def update_profile(
    db: AsyncSession,
    admin: Admin,
    *,
    name: str | None = None,
    email: str | None = None,
) -> Admin:
    if name is not None:
        admin.name = name.strip()
    if email is not None:
        admin.email = email.lower().strip()
    await db.flush()
    await db.refresh(admin)
    return admin


async def change_password(
    db: AsyncSession,
    admin: Admin,
    *,
    current_password: str,
    new_password: str,
) -> bool:
    if not verify_password(current_password, admin.password_hash):
        return False
    admin.password_hash = hash_password(new_password)
    await db.flush()
    return True
