"""Seed open roles from the Next.js frontend ROLES data."""

from __future__ import annotations

import asyncio
import re
import sys
from pathlib import Path

# Allow `python scripts/seed_jobs.py` from backend/
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlalchemy import select

from app.db.database import AsyncSessionLocal
from app.db.models import Job

ROLES = [
    {
        "code": "support",
        "title": "Customer Support Agent",
        "summary": "Handle calls and chats for global customers.",
        "description": (
            "Handle inbound customer calls, inquiries, and email tickets for "
            "leading retail and logistics brands. Requires excellent English "
            "fluency and active problem-solving skills."
        ),
        "tags": ["Night shift", "Fresh graduates welcome", "Global process"],
        "department": "Customer Support",
        "employment_type": "Full-time - Night shift",
    },
    {
        "code": "tech",
        "title": "Technical Support Representative",
        "summary": "Solve software and device issues step by step.",
        "description": (
            "Deliver first-touch IT resolution for remote staff worldwide. "
            "Diagnose network issues, reset enterprise credentials, and "
            "escalate complex incidents."
        ),
        "tags": ["Night shift", "Technical skills", "Rotational"],
        "department": "Technical Support",
        "employment_type": "Full-time - Night shift",
    },
    {
        "code": "data",
        "title": "Data Entry and Back Office Executive",
        "summary": "Accurate, fast processing of documents and records.",
        "description": (
            "Process billing claims, reconcile inventory logs, and perform "
            "secure catalog categorization for international clients."
        ),
        "tags": ["Day or night", "Back Office"],
        "department": "Back Office",
        "employment_type": "Full-time",
    },
    {
        "code": "web",
        "title": "Web Developer",
        "summary": "Build and maintain websites and web apps.",
        "description": (
            "Build and maintain responsive client-facing web applications. "
            "Collaborate with product managers on clean, documented "
            "JavaScript/TypeScript services."
        ),
        "tags": ["IT team", "React / Node", "Flexible overlap"],
        "department": "Engineering",
        "employment_type": "Full-time",
    },
    {
        "code": "lead",
        "title": "Team Leader",
        "summary": "Lead an agent team and coach them to hit targets.",
        "description": (
            "Oversee floor operations of 15-20 support agents. Drive daily "
            "CSAT and attendance metrics while mentoring junior staff."
        ),
        "tags": ["Leadership", "Experience needed", "Night shift"],
        "department": "Operations",
        "employment_type": "Full-time - Night shift",
    },
]

LOCATION = "Bahria Town Phase 8, Rawalpindi"


def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return slug


async def seed() -> None:
    async with AsyncSessionLocal() as session:
        created = 0
        updated = 0
        for role in ROLES:
            result = await session.execute(
                select(Job).where(Job.code == role["code"])
            )
            existing = result.scalar_one_or_none()
            if existing:
                existing.title = role["title"]
                existing.slug = slugify(role["title"])
                existing.summary = role["summary"]
                existing.description = role["description"]
                existing.tags = role["tags"]
                existing.department = role["department"]
                existing.employment_type = role["employment_type"]
                existing.location = LOCATION
                existing.is_active = True
                updated += 1
            else:
                session.add(
                    Job(
                        code=role["code"],
                        title=role["title"],
                        slug=slugify(role["title"]),
                        summary=role["summary"],
                        description=role["description"],
                        tags=role["tags"],
                        department=role["department"],
                        employment_type=role["employment_type"],
                        location=LOCATION,
                        is_active=True,
                    )
                )
                created += 1
        await session.commit()
        print(f"Seed complete: {created} created, {updated} updated.")


if __name__ == "__main__":
    asyncio.run(seed())
