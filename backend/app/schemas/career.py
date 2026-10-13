from datetime import datetime
from uuid import UUID

from pydantic import EmailStr, Field, field_validator

from app.schemas.common import ORMModel


class CareerCreateFields(ORMModel):
    """Validated fields from Submit CV form (checks + CV only)."""

    name: str = Field(default="See CV", max_length=200)
    email: EmailStr | None = None
    phone: str = Field(default="See CV", max_length=40)
    role: str = Field(default="General / future openings", max_length=200)
    exp: str = Field(default="See CV", max_length=80)
    msg: str | None = Field(default=None, max_length=4000)
    confirmNight: bool = False
    confirmOnsite: bool = False
    confirmLocation: bool = False

    @field_validator("name", "phone", "role", "exp", mode="before")
    @classmethod
    def default_blank(cls, value: object) -> str:
        if value is None:
            return ""
        return str(value).strip()

    @field_validator("name")
    @classmethod
    def name_or_placeholder(cls, value: str) -> str:
        return value or "See CV"

    @field_validator("phone")
    @classmethod
    def phone_or_placeholder(cls, value: str) -> str:
        return value or "See CV"

    @field_validator("role")
    @classmethod
    def role_or_placeholder(cls, value: str) -> str:
        return value or "General / future openings"

    @field_validator("exp")
    @classmethod
    def exp_or_placeholder(cls, value: str) -> str:
        return value or "See CV"

    @field_validator("email", mode="before")
    @classmethod
    def empty_email_none(cls, value: object) -> object:
        if value is None:
            return None
        text = str(value).strip()
        return text or None

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
                "Please confirm night shift, onsite work, and Bahria Town Phase 8 location before submitting your CV."
            )
        return value


class CareerOut(ORMModel):
    id: UUID
    full_name: str
    email: str | None = None
    phone: str
    role_interest: str
    experience: str
    message: str | None
    resume_original_filename: str
    created_at: datetime


class CvParseOut(ORMModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    role: str = ""
    exp: str = ""
