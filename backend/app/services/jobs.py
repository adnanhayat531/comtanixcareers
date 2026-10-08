"""Job visibility / apply eligibility helpers."""

from __future__ import annotations

from datetime import date

from app.db.models import Job


def is_deadline_passed(job: Job, today: date | None = None) -> bool:
    if job.application_deadline is None:
        return False
    return job.application_deadline < (today or date.today())


def is_publicly_listed(job: Job, today: date | None = None) -> bool:
    """Published jobs that are not past deadline (auto-closed)."""
    if job.status != "published":
        return False
    if not job.is_active:
        return False
    return not is_deadline_passed(job, today)


def accepts_applications(job: Job, today: date | None = None) -> bool:
    if job.status != "published":
        return False
    if not job.is_active:
        return False
    return not is_deadline_passed(job, today)


def sync_is_active_from_status(job: Job) -> None:
    job.is_active = job.status == "published"
