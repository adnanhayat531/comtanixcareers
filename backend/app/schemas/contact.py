from datetime import datetime
from uuid import UUID

from pydantic import EmailStr, Field, field_validator

from app.schemas.common import ORMModel


class ContactCreate(ORMModel):
    """ContactForm fields — name, email, subject (optional), message."""

    name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=2, max_length=5000)

    @field_validator("name", "message")
    @classmethod
    def strip_required(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field is required.")
        return cleaned

    @field_validator("subject")
    @classmethod
    def strip_subject(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None


class ContactOut(ORMModel):
    id: UUID
    name: str
    email: str
    subject: str | None
    message: str
    created_at: datetime
