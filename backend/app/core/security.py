"""Upload and request safety helpers."""

from __future__ import annotations

import re
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import Settings

UNSAFE_FILENAME = re.compile(r"[^A-Za-z0-9._-]+")


def sanitize_original_filename(filename: str | None) -> str:
    name = Path(filename or "resume").name
    name = UNSAFE_FILENAME.sub("_", name).strip("._")
    return name[:180] or "resume"


def unique_stored_filename(original_filename: str) -> str:
    safe = sanitize_original_filename(original_filename)
    ext = Path(safe).suffix.lower()
    stem = Path(safe).stem[:80] or "resume"
    return f"{uuid.uuid4().hex}_{stem}{ext}"


async def validate_resume_upload(file: UploadFile, settings: Settings) -> bytes:
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your CV to continue.",
        )

    original = sanitize_original_filename(file.filename)
    ext = Path(original).suffix.lower()
    if ext not in settings.allowed_resume_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload a PDF or Word file (.pdf, .doc, .docx).",
        )

    content_type = (file.content_type or "").lower()
    if content_type and content_type not in settings.allowed_resume_content_types:
        # Some browsers send empty/odd types; extension check is primary.
        if content_type not in {"", "application/octet-stream"}:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid resume file type.",
            )

    data = await file.read()
    if not data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your CV to continue.",
        )
    if len(data) > settings.max_upload_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Your CV must be 5 MB or smaller.",
        )

    await file.seek(0)
    return data
