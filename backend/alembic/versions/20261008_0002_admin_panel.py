"""admin panel schema extensions

Revision ID: 20261008_0002
Revises: 20260326_0001
Create Date: 2026-10-08

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "20261008_0002"
down_revision: Union[str, None] = "20260326_0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "admins",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
    )
    op.create_index("ix_admins_email", "admins", ["email"])

    op.add_column("jobs", sa.Column("experience_required", sa.String(length=120), nullable=True))
    op.add_column("jobs", sa.Column("salary", sa.String(length=120), nullable=True))
    op.add_column("jobs", sa.Column("benefits", sa.Text(), nullable=True))
    op.add_column(
        "jobs",
        sa.Column("status", sa.String(length=32), nullable=False, server_default="published"),
    )
    op.add_column("jobs", sa.Column("posted_date", sa.Date(), nullable=True))
    op.add_column("jobs", sa.Column("application_deadline", sa.Date(), nullable=True))
    op.create_index("ix_jobs_status", "jobs", ["status"])
    op.create_index("ix_jobs_application_deadline", "jobs", ["application_deadline"])
    op.execute("UPDATE jobs SET posted_date = created_at::date WHERE posted_date IS NULL")

    op.add_column("job_applications", sa.Column("email", sa.String(length=255), nullable=True))
    op.add_column(
        "job_applications",
        sa.Column("status", sa.String(length=32), nullable=False, server_default="new"),
    )
    op.add_column(
        "job_applications",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_job_applications_email", "job_applications", ["email"])
    op.create_index("ix_job_applications_status", "job_applications", ["status"])

    op.add_column("career_submissions", sa.Column("email", sa.String(length=255), nullable=True))
    op.add_column(
        "career_submissions",
        sa.Column("status", sa.String(length=32), nullable=False, server_default="new"),
    )
    op.add_column(
        "career_submissions",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_career_submissions_email", "career_submissions", ["email"])
    op.create_index("ix_career_submissions_status", "career_submissions", ["status"])

    op.add_column(
        "contact_submissions",
        sa.Column("status", sa.String(length=32), nullable=False, server_default="unread"),
    )
    op.add_column(
        "contact_submissions",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_index("ix_contact_submissions_status", "contact_submissions", ["status"])


def downgrade() -> None:
    op.drop_index("ix_contact_submissions_status", table_name="contact_submissions")
    op.drop_column("contact_submissions", "updated_at")
    op.drop_column("contact_submissions", "status")

    op.drop_index("ix_career_submissions_status", table_name="career_submissions")
    op.drop_index("ix_career_submissions_email", table_name="career_submissions")
    op.drop_column("career_submissions", "updated_at")
    op.drop_column("career_submissions", "status")
    op.drop_column("career_submissions", "email")

    op.drop_index("ix_job_applications_status", table_name="job_applications")
    op.drop_index("ix_job_applications_email", table_name="job_applications")
    op.drop_column("job_applications", "updated_at")
    op.drop_column("job_applications", "status")
    op.drop_column("job_applications", "email")

    op.drop_index("ix_jobs_application_deadline", table_name="jobs")
    op.drop_index("ix_jobs_status", table_name="jobs")
    op.drop_column("jobs", "application_deadline")
    op.drop_column("jobs", "posted_date")
    op.drop_column("jobs", "status")
    op.drop_column("jobs", "benefits")
    op.drop_column("jobs", "salary")
    op.drop_column("jobs", "experience_required")

    op.drop_index("ix_admins_email", table_name="admins")
    op.drop_table("admins")
