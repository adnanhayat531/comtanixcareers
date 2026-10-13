from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import CareerSubmission
from app.schemas.career import CareerCreateFields
from app.services.uploads import StoredResume


async def create_career_submission(
    db: AsyncSession,
    *,
    fields: CareerCreateFields,
    resume: StoredResume,
) -> CareerSubmission:
    row = CareerSubmission(
        full_name=fields.name,
        email=str(fields.email).lower() if fields.email else None,
        phone=fields.phone,
        role_interest=fields.role,
        experience=fields.exp,
        message=fields.msg,
        resume_file_path=resume.relative_path,
        resume_original_filename=resume.original_name,
        confirm_night=fields.confirmNight,
        confirm_onsite=fields.confirmOnsite,
        confirm_location=fields.confirmLocation,
    )
    db.add(row)
    await db.flush()
    await db.refresh(row)
    return row
