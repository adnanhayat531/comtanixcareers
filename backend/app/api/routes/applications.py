from uuid import UUID

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.api.errors import validation_errors
from app.api.form_utils import parse_bool_form
from app.crud import applications as applications_crud
from app.crud import jobs as jobs_crud
from app.schemas.application import ApplicationCreateFields, ApplicationOut
from app.schemas.common import APIResponse
from app.services.uploads import save_resume

router = APIRouter(prefix="/api/jobs", tags=["applications"])


@router.post(
    "/{job_id}/apply",
    response_model=APIResponse[ApplicationOut],
    status_code=status.HTTP_201_CREATED,
)
async def apply_to_job(
    job_id: UUID,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    role: str = Form(...),
    exp: str = Form(...),
    msg: str | None = Form(None),
    confirmNight: str | None = Form(None),
    confirmOnsite: str | None = Form(None),
    confirmLocation: str | None = Form(None),
    intent: str | None = Form(None),
    cv: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ApplicationOut]:
    job = await jobs_crud.get_job_by_id(db, job_id)
    if job is None or not await jobs_crud.job_accepts_applications(db, job):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found or no longer open for applications.",
        )

    try:
        fields = ApplicationCreateFields(
            name=name,
            email=email,
            phone=phone,
            role=role,
            exp=exp,
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

    # Role title from form should match the job when provided
    if fields.role and fields.role != job.title:
        # Allow if role matches code; otherwise reject mismatch
        if fields.role != job.code:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Selected role does not match this job opening.",
            )

    resume = await save_resume(cv)
    row = await applications_crud.create_application(
        db, job_id=job.id, fields=fields, resume=resume
    )
    await db.commit()

    return APIResponse(
        success=True,
        message="Application submitted successfully",
        data=ApplicationOut.model_validate(row),
    )


@router.post(
    "/apply",
    response_model=APIResponse[ApplicationOut],
    status_code=status.HTTP_201_CREATED,
)
async def apply_by_role_title(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    role: str = Form(...),
    exp: str = Form(...),
    msg: str | None = Form(None),
    confirmNight: str | None = Form(None),
    confirmOnsite: str | None = Form(None),
    confirmLocation: str | None = Form(None),
    intent: str | None = Form(None),
    cv: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ApplicationOut]:
    """
    Apply using frontend field names (role = job title).
    Convenient for wiring ApplyForm FormData without knowing UUID.
    """
    try:
        fields = ApplicationCreateFields(
            name=name,
            email=email,
            phone=phone,
            role=role,
            exp=exp,
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

    resume = await save_resume(cv)
    row = await applications_crud.create_application(
        db, job_id=job.id, fields=fields, resume=resume
    )
    await db.commit()

    return APIResponse(
        success=True,
        message="Application submitted successfully",
        data=ApplicationOut.model_validate(row),
    )
