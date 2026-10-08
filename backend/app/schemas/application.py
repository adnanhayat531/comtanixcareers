from datetime import datetime
from uuid import UUID

from pydantic import EmailStr, Field, field_validator

from app.schemas.common import ORMModel


class ApplicationCreateFields(ORMModel):
    """Validated fields from ApplyForm (mode=apply)."""

    name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=40)
    role: str = Field(min_length=2, max_length=200)
    exp: str = Field(min_length=1, max_length=80)
    msg: str | None = Field(default=None, max_length=4000)
    confirmNight: bool = False
    confirmOnsite: bool = False
    confirmLocation: bool = False

    @field_validator("name", "phone", "role", "exp")
    @classmethod
    def strip_required(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field is required.")
        return cleaned

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).strip().lower()

    @field_validator("msg")
    @classmethod
    def strip_optional(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None

    @field_validator("confirmNight", "confirmOnsite", "confirmLocation")
    @classmethod
    def must_confirm(cls, value: bool) -> bool:
        if not value:
            raise ValueError(
                "Please confirm night shift, onsite work, and Bahria Town Phase 8 location before applying."
            )
        return value


class ApplicationOut(ORMModel):
    id: UUID
    job_id: UUID
    full_name: str
    email: str | None = None
    phone: str
    experience: str
    message: str | None
    resume_original_filename: str
    created_at: datetime
