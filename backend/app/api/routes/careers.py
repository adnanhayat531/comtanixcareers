from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.api.errors import validation_errors
from app.api.form_utils import parse_bool_form
from app.crud import careers as careers_crud
from app.schemas.career import CareerCreateFields, CareerOut, CvParseOut
from app.schemas.common import APIResponse
from app.services.cv_parse import parse_uploaded_cv
from app.services.uploads import save_resume

router = APIRouter(prefix="/api/careers", tags=["careers"])


@router.post(
    "/parse",
    response_model=APIResponse[CvParseOut],
)
async def parse_cv(
    cv: UploadFile = File(...),
) -> APIResponse[CvParseOut]:
    """Extract name / email / phone / role hints from an uploaded CV."""
    parsed = await parse_uploaded_cv(cv)
    return APIResponse(
        success=True,
        message="We filled what we could from your CV. Please review and edit if needed.",
        data=CvParseOut(
            name=parsed.name,
            email=parsed.email,
            phone=parsed.phone,
            role=parsed.role,
            exp=parsed.exp,
        ),
    )


@router.post(
    "",
    response_model=APIResponse[CareerOut],
    status_code=status.HTTP_201_CREATED,
)
async def submit_cv(
    confirmNight: str | None = Form(None),
    confirmOnsite: str | None = Form(None),
    confirmLocation: str | None = Form(None),
    intent: str | None = Form(None),
    name: str | None = Form(None),
    email: str | None = Form(None),
    phone: str | None = Form(None),
    role: str | None = Form(None),
    exp: str | None = Form(None),
    msg: str | None = Form(None),
    cv: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[CareerOut]:
    """Future openings / talent-pool CV submission (checks + CV upload)."""
    _ = intent
    try:
        fields = CareerCreateFields(
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

    resume = await save_resume(cv)
    row = await careers_crud.create_career_submission(
        db, fields=fields, resume=resume
    )
    await db.commit()

    return APIResponse(
        success=True,
        message="CV received. We will review it for future openings.",
        data=CareerOut.model_validate(row),
    )
