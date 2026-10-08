"""Helpers for safe API error payloads."""

from __future__ import annotations

from typing import Any

from pydantic import ValidationError


def validation_errors(exc: ValidationError) -> list[dict[str, Any]]:
    """Return JSON-serializable Pydantic error dicts."""
    return validation_errors_from_list(exc.errors())


def validation_errors_from_list(errors: list[Any]) -> list[dict[str, Any]]:
    cleaned: list[dict[str, Any]] = []
    for err in errors:
        if not isinstance(err, dict):
            cleaned.append({"msg": str(err)})
            continue
        cleaned.append(
            {
                "type": err.get("type"),
                "loc": list(err.get("loc", ())),
                "msg": err.get("msg"),
                "input": _safe(err.get("input")),
            }
        )
    return cleaned


def _safe(value: Any) -> Any:
    try:
        import json

        json.dumps(value)
        return value
    except (TypeError, ValueError):
        return str(value)
