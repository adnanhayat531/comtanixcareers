from fastapi import APIRouter, Depends, Form, HTTPException, status
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.api.errors import validation_errors
from app.crud import contacts as contacts_crud
from app.schemas.common import APIResponse
from app.schemas.contact import ContactCreate, ContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post(
    "",
    response_model=APIResponse[ContactOut],
    status_code=status.HTTP_201_CREATED,
)
async def contact_us(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    subject: str | None = Form(None),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[ContactOut]:
    """Contact Us form — multipart fields matching ContactForm.tsx."""
    try:
        payload = ContactCreate(
            name=name,
            email=email,
            subject=subject,
            message=message,
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
