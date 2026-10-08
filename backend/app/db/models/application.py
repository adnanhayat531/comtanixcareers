from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class JobApplication(Base):
    """Current-opening application — mirrors ApplyForm mode=apply fields."""

    __tablename__ = "job_applications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("jobs.id", ondelete="RESTRICT"), index=True
    )
    full_name: Mapped[str] = mapped_column(String(200))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    phone: Mapped[str] = mapped_column(String(40))
    experience: Mapped[str] = mapped_column(String(80))
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    resume_file_path: Mapped[str] = mapped_column(String(500))
    resume_original_filename: Mapped[str] = mapped_column(String(255))
    confirm_night: Mapped[bool] = mapped_column(Boolean, default=False)
    confirm_onsite: Mapped[bool] = mapped_column(Boolean, default=False)
    confirm_location: Mapped[bool] = mapped_column(Boolean, default=False)
    # new | reviewing | shortlisted | interview | rejected | hired
    status: Mapped[str] = mapped_column(String(32), default="new", index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    job = relationship("Job", back_populates="applications")
