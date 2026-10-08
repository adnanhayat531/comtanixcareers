from datetime import date, datetime
from uuid import UUID

from pydantic import Field

from app.schemas.common import ORMModel


class JobOut(ORMModel):
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
    status: str = "published"
    posted_date: date | None = None
    application_deadline: date | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime


class JobListItem(ORMModel):
    """Shape aligned with frontend Role type + API extras."""

    id: UUID
    code: str
    title: str
    slug: str
    summary: str
    description: str
    tags: list[str]
    location: str
    employment_type: str | None = None
    department: str | None = None
    experience_required: str | None = None
    salary: str | None = None
    status: str = "published"
    posted_date: date | None = None
    application_deadline: date | None = None
    is_active: bool

