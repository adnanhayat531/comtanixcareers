from __future__ import annotations

from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import JobApplication
from app.schemas.application import ApplicationCreateFields
from app.services.uploads import StoredResume


async def create_application(
    db: AsyncSession,
    *,
    job_id: UUID,
    fields: ApplicationCreateFields,
    resume: StoredResume,
) -> JobApplication:
    row = JobApplication(
        job_id=job_id,
        full_name=fields.name,
        email=str(fields.email).lower(),
        phone=fields.phone,
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
