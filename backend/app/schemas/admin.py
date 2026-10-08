from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.schemas.common import ORMModel


class AdminLoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class AdminOut(ORMModel):
    id: UUID
    name: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime


class AdminLoginOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: AdminOut


class AdminUpdateIn(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=200)
    email: EmailStr | None = None


class AdminPasswordChangeIn(BaseModel):
    current_password: str = Field(min_length=6, max_length=128)
    new_password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, value: str, info) -> str:
        new = info.data.get("new_password")
        if new and value != new:
            raise ValueError("New password and confirmation do not match.")
        return value


class JobAdminCreate(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    slug: str | None = Field(default=None, max_length=220)
    code: str | None = Field(default=None, max_length=64)
    department: str | None = Field(default=None, max_length=120)
    location: str = Field(default="Bahria Town Phase 8, Rawalpindi", max_length=200)
    employment_type: str | None = Field(default=None, max_length=120)
    experience_required: str | None = Field(default=None, max_length=120)
    salary: str | None = Field(default=None, max_length=120)
    summary: str = Field(min_length=2, max_length=500)
    description: str = Field(min_length=2)
    responsibilities: str | None = None
    requirements: str | None = None
    qualifications: str | None = None
    benefits: str | None = None
    tags: list[str] = Field(default_factory=list)
    status: str = Field(default="draft")
    posted_date: date | None = None
    application_deadline: date | None = None

    @field_validator("status")
    @classmethod
    def valid_status(cls, value: str) -> str:
        allowed = {"draft", "published", "closed", "archived"}
        if value not in allowed:
            raise ValueError(f"Status must be one of: {', '.join(sorted(allowed))}")
        return value


class JobAdminUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=200)
    slug: str | None = Field(default=None, max_length=220)
    code: str | None = Field(default=None, max_length=64)
    department: str | None = Field(default=None, max_length=120)
    location: str | None = Field(default=None, max_length=200)
    employment_type: str | None = Field(default=None, max_length=120)
    experience_required: str | None = Field(default=None, max_length=120)
    salary: str | None = Field(default=None, max_length=120)
    summary: str | None = Field(default=None, min_length=2, max_length=500)
    description: str | None = Field(default=None, min_length=2)
    responsibilities: str | None = None
    requirements: str | None = None
    qualifications: str | None = None
    benefits: str | None = None
    tags: list[str] | None = None
    status: str | None = None
    posted_date: date | None = None
    application_deadline: date | None = None

    @field_validator("status")
    @classmethod
    def valid_status(cls, value: str | None) -> str | None:
        if value is None:
            return value
        allowed = {"draft", "published", "closed", "archived"}
        if value not in allowed:
            raise ValueError(f"Status must be one of: {', '.join(sorted(allowed))}")
        return value


class JobStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def valid_status(cls, value: str) -> str:
        allowed = {"draft", "published", "closed", "archived"}
        if value not in allowed:
            raise ValueError(f"Status must be one of: {', '.join(sorted(allowed))}")
        return value


class JobAdminOut(ORMModel):
    id: UUID
    code: str
    title: str
    slug: str
    department: str | None = None
    location: str
    employment_type: str | None = None
    experience_required: str | None = None
    salary: str | None = None
    summary: str
    description: str
    requirements: str | None = None
    responsibilities: str | None = None
    qualifications: str | None = None
    benefits: str | None = None
    tags: list[str] = Field(default_factory=list)
    status: str
    posted_date: date | None = None
    application_deadline: date | None = None
    is_active: bool
    applications_count: int = 0
    created_at: datetime
    updated_at: datetime


class StatusUpdate(BaseModel):
    status: str


class ApplicationAdminOut(ORMModel):
    id: UUID
    job_id: UUID
    job_title: str | None = None
    full_name: str
    email: str | None = None
    phone: str
    experience: str
    message: str | None = None
    resume_original_filename: str
    status: str
    created_at: datetime
    updated_at: datetime


class CareerAdminOut(ORMModel):
    id: UUID
    full_name: str
    email: str | None = None
    phone: str
    role_interest: str
    experience: str
    message: str | None = None
    resume_original_filename: str
    status: str
    created_at: datetime
    updated_at: datetime


class ContactAdminOut(ORMModel):
    id: UUID
    name: str
    email: str
    subject: str | None = None
    message: str
    status: str
    created_at: datetime
    updated_at: datetime


class DashboardOut(BaseModel):
    active_jobs: int
    total_jobs: int
    total_applications: int
    new_applications: int
    total_cvs: int
    contact_messages: int
    unread_contacts: int
    recent_applications: list[ApplicationAdminOut]
    recent_contacts: list[ContactAdminOut]


class Paginated(BaseModel):
    items: list
    total: int
    page: int
    page_size: int
    pages: int
