from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import ContactSubmission
from app.schemas.contact import ContactCreate


async def create_contact(
    db: AsyncSession,
    payload: ContactCreate,
) -> ContactSubmission:
    row = ContactSubmission(
        name=payload.name,
        email=str(payload.email).lower(),
        subject=payload.subject,
        message=payload.message,
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    return row
