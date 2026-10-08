from __future__ import annotations

from pathlib import Path

import aiofiles
from fastapi import UploadFile

from app.core.config import Settings, get_settings
from app.core.security import (
    sanitize_original_filename,
    unique_stored_filename,
    validate_resume_upload,
)


class StoredResume:
    def __init__(self, stored_name: str, original_name: str, relative_path: str):
        self.stored_name = stored_name
        self.original_name = original_name
        self.relative_path = relative_path


async def save_resume(
    file: UploadFile,
    settings: Settings | None = None,
) -> StoredResume:
    cfg = settings or get_settings()
    await validate_resume_upload(file, cfg)

    original = sanitize_original_filename(file.filename)
    stored = unique_stored_filename(original)
    dest_dir = cfg.upload_path
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / stored

    # Prevent path traversal — dest must stay under upload_path
    resolved = dest.resolve()
    if not str(resolved).startswith(str(dest_dir.resolve())):
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid upload path.",
        )

    content = await file.read()
    async with aiofiles.open(resolved, "wb") as out:
        await out.write(content)

    relative = str(Path(cfg.upload_dir) / stored).replace("\\", "/")
    return StoredResume(
        stored_name=stored,
        original_name=original,
        relative_path=relative,
    )
