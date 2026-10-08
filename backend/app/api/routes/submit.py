"""
Single entry point matching Next.js CONFIG.formEndpoint.

ApplyForm and ContactForm both POST FormData to one URL. This router
inspects `intent` / fields and delegates to the correct handler logic.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.api.errors import validation_errors
from app.api.form_utils import parse_bool_form
from app.crud import applications as applications_crud
from app.crud import careers as careers_crud
from app.crud import contacts as contacts_crud
from app.crud import jobs as jobs_crud
from app.schemas.application import ApplicationCreateFields, ApplicationOut
from app.schemas.career import CareerCreateFields, CareerOut
from app.schemas.common import APIResponse
from app.schemas.contact import ContactCreate, ContactOut
from app.services.uploads import save_resume

router = APIRouter(prefix="/api", tags=["submit"])


@router.post(
    "/submit",
    response_model=APIResponse[ApplicationOut | CareerOut | ContactOut],
    status_code=status.HTTP_201_CREATED,
    summary="Unified form endpoint for Next.js CONFIG.formEndpoint",
)
async def submit_form(
    name: str = Form(...),
    # Apply / CV fields
    phone: str | None = Form(None),
    role: str | None = Form(None),
    exp: str | None = Form(None),
    msg: str | None = Form(None),
    confirmNight: str | None = Form(None),
    confirmOnsite: str | None = Form(None),
    confirmLocation: str | None = Form(None),
    intent: str | None = Form(None),
    cv: UploadFile | None = File(None),
    # Contact fields
    email: str | None = Form(None),
    subject: str | None = Form(None),
    message: str | None = Form(None),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ApplicationOut | CareerOut | ContactOut]:
    intent_norm = (intent or "").strip().lower()

    # Contact Us — has email + message, no CV
    if email and (message is not None) and not _has_file(cv):
        try:
            payload = ContactCreate(
                name=name,
                email=email,
                subject=subject,
                message=message or "",
            )
        except ValidationError as exc:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=validation_errors(exc),
            ) from exc
        row = await contacts_crud.create_contact(db, payload)
        await db.commit()
        return APIResponse(
            success=True,
            message="Message sent. We’ll get back to you soon.",
            data=ContactOut.model_validate(row),
        )

    if not _has_file(cv):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your CV to continue.",
        )

    if intent_norm in {"cv-future", "cv", "career"}:
        try:
            fields = CareerCreateFields(
                name=name,
                email=email or "",
                phone=phone or "",
                role=role or "",
                exp=exp or "",
                msg=msg,
                confirmNight=parse_bool_form(confirmNight),
                confirmOnsite=parse_bool_form(confirmOnsite),
                confirmLocation=parse_bool_form(confirmLocation),
            )
        except ValidationError as exc:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=validation_errors(exc),
            ) from exc
        resume = await save_resume(cv)  # type: ignore[arg-type]
        row = await careers_crud.create_career_submission(
            db, fields=fields, resume=resume
        )
        await db.commit()
        return APIResponse(
            success=True,
            message="CV received. We will review it for future openings.",
            data=CareerOut.model_validate(row),
        )

    # Default: current opening application (intent apply-current)
    try:
        fields = ApplicationCreateFields(
            name=name,
            email=email or "",
            phone=phone or "",
            role=role or "",
            exp=exp or "",
            msg=msg,
            confirmNight=parse_bool_form(confirmNight),
            confirmOnsite=parse_bool_form(confirmOnsite),
            confirmLocation=parse_bool_form(confirmLocation),
        )
    except ValidationError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=validation_errors(exc),
        ) from exc

    job = await jobs_crud.get_job_by_title(db, fields.role)
    if job is None:
        job = await jobs_crud.get_job_by_code(db, fields.role)
    if job is None or not await jobs_crud.job_accepts_applications(db, job):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Selected open role was not found or is closed.",
        )

    resume = await save_resume(cv)  # type: ignore[arg-type]
    row = await applications_crud.create_application(
        db, job_id=job.id, fields=fields, resume=resume
    )
    await db.commit()
    return APIResponse(
        success=True,
        message="Application submitted successfully",
        data=ApplicationOut.model_validate(row),
    )


def _has_file(file: UploadFile | None) -> bool:
    if file is None:
        return False
    if not file.filename:
        return False
    return True
