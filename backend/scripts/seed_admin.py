"""Create or reset the default Comtanix admin account."""

from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.crud import admins as admins_crud
from app.db.database import AsyncSessionLocal

DEFAULT_EMAIL = os.getenv("ADMIN_EMAIL", "admin@comtanix.com")
DEFAULT_PASSWORD = os.getenv("ADMIN_PASSWORD", "ComtanixAdmin!2026")
DEFAULT_NAME = os.getenv("ADMIN_NAME", "Comtanix Admin")


async def main() -> None:
    async with AsyncSessionLocal() as db:
        existing = await admins_crud.get_by_email(db, DEFAULT_EMAIL)
        if existing:
            from app.core.auth import hash_password

            existing.name = DEFAULT_NAME
            existing.password_hash = hash_password(DEFAULT_PASSWORD)
            existing.is_active = True
            await db.commit()
            print(f"Updated admin: {DEFAULT_EMAIL}")
        else:
            await admins_crud.create_admin(
                db,
                name=DEFAULT_NAME,
                email=DEFAULT_EMAIL,
                password=DEFAULT_PASSWORD,
            )
            await db.commit()
            print(f"Created admin: {DEFAULT_EMAIL}")
    print("Password is set from ADMIN_PASSWORD (default documented in README).")


if __name__ == "__main__":
    asyncio.run(main())
