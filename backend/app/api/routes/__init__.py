from fastapi import APIRouter

from app.api.routes import applications, careers, contact, health, jobs, submit
from app.api.routes.admin import admin_router

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(submit.router)
api_router.include_router(applications.router)
api_router.include_router(jobs.router)
api_router.include_router(careers.router)
api_router.include_router(contact.router)
api_router.include_router(admin_router)
