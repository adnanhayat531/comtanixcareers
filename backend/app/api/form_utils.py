"""Helpers for parsing multipart FormData from the Next.js forms."""

from __future__ import annotations


def parse_bool_form(value: str | bool | None) -> bool:
    if isinstance(value, bool):
        return value
    if value is None:
        return False
    return str(value).strip().lower() in {"1", "true", "on", "yes"}
