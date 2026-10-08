from fastapi import APIRouter

from app.api.routes.admin import applications, auth, contacts, cvs, dashboard, jobs, settings

admin_router = APIRouter(prefix="/api/admin", tags=["admin"])
admin_router.include_router(auth.router)
admin_router.include_router(auth.me_alias_router)
admin_router.include_router(dashboard.router)
admin_router.include_router(jobs.router)
admin_router.include_router(applications.router)
admin_router.include_router(cvs.router)
admin_router.include_router(contacts.router)
admin_router.include_router(settings.router)
