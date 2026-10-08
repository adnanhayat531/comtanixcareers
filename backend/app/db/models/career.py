from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class CareerSubmission(Base):
    """Future-openings CV pool — mirrors ApplyForm mode=cv fields."""

    __tablename__ = "career_submissions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    full_name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    phone: Mapped[str] = mapped_column(String(40))
    role_interest: Mapped[str] = mapped_column(String(200))
    experience: Mapped[str] = mapped_column(String(80))
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    resume_file_path: Mapped[str] = mapped_column(String(500))
    resume_original_filename: Mapped[str] = mapped_column(String(255))
    confirm_night: Mapped[bool] = mapped_column(Boolean, default=False)
    confirm_onsite: Mapped[bool] = mapped_column(Boolean, default=False)
    confirm_location: Mapped[bool] = mapped_column(Boolean, default=False)
    # new | reviewed | archived
    status: Mapped[str] = mapped_column(String(32), default="new", index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
