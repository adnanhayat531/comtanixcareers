from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.api.errors import validation_errors
from app.api.form_utils import parse_bool_form
from app.crud import careers as careers_crud
from app.schemas.career import CareerCreateFields, CareerOut
from app.schemas.common import APIResponse
from app.services.uploads import save_resume

router = APIRouter(prefix="/api/careers", tags=["careers"])


@router.post(
    "",
    response_model=APIResponse[CareerOut],
    status_code=status.HTTP_201_CREATED,
)
async def submit_cv(
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
) -> APIResponse[CareerOut]:
    """Future openings / talent-pool CV submission (Submit CV form)."""
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
