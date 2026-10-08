from typing import Any, Generic, TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str
    data: T | dict[str, Any] | list[Any] | None = None


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    data: dict[str, Any] | None = None


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
