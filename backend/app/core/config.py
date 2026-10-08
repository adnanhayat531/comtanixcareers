from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="Comtanix API", alias="APP_NAME")
    app_env: str = Field(default="development", alias="APP_ENV")
    debug: bool = Field(default=False, alias="DEBUG")

    database_url: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/comtanix",
        alias="DATABASE_URL",
    )
    frontend_url: str = Field(default="http://localhost:3000", alias="FRONTEND_URL")

    upload_dir: str = Field(default="uploads/resumes", alias="UPLOAD_DIR")
    max_upload_size: int = Field(default=5 * 1024 * 1024, alias="MAX_UPLOAD_SIZE")

    admin_jwt_secret: str = Field(
        default="change-me-comtanix-admin-secret",
        alias="ADMIN_JWT_SECRET",
    )
    admin_jwt_expire_minutes: int = Field(
        default=60 * 24,
        alias="ADMIN_JWT_EXPIRE_MINUTES",
    )

    allowed_resume_extensions: set[str] = {
        ".pdf",
        ".doc",
        ".docx",
    }
    allowed_resume_content_types: set[str] = {
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/octet-stream",
    }

    @field_validator("database_url")
    @classmethod
    def ensure_async_driver(cls, value: str) -> str:
        if value.startswith("postgresql://"):
            return value.replace("postgresql://", "postgresql+asyncpg://", 1)
        return value

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_url.split(",") if origin.strip()]

    @property
    def upload_path(self) -> Path:
        path = Path(self.upload_dir)
        if not path.is_absolute():
            path = BACKEND_ROOT / path
        return path


@lru_cache
def get_settings() -> Settings:
    return Settings()
