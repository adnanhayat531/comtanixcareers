from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_admin, get_db
from app.crud import admin_data
from app.db.models import Admin
from app.schemas.admin import ApplicationAdminOut, ContactAdminOut, DashboardOut
from app.schemas.common import APIResponse

router = APIRouter(tags=["admin-dashboard"])


@router.get("/dashboard", response_model=APIResponse[DashboardOut])
async def dashboard(
    _: Admin = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db),
) -> APIResponse[DashboardOut]:
    stats = await admin_data.dashboard_stats(db)
    recent_apps = []
    for row in stats["recent_applications"]:
        item = ApplicationAdminOut.model_validate(row)
        item.job_title = row.job.title if row.job else None
        recent_apps.append(item)

    data = DashboardOut(
        active_jobs=stats["active_jobs"],
        total_jobs=stats["total_jobs"],
        total_applications=stats["total_applications"],
        new_applications=stats["new_applications"],
        total_cvs=stats["total_cvs"],
        contact_messages=stats["contact_messages"],
        unread_contacts=stats["unread_contacts"],
        recent_applications=recent_apps,
        recent_contacts=[
            ContactAdminOut.model_validate(c) for c in stats["recent_contacts"]
        ],
    )
    return APIResponse(success=True, message="Dashboard loaded", data=data)
