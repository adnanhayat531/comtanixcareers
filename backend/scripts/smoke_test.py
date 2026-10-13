"""Smoke tests against a running Comtanix API (http://127.0.0.1:8000)."""

from __future__ import annotations

import io
import json
import sys
from pathlib import Path

import httpx

BASE = "http://127.0.0.1:8000"
PASS = 0
FAIL = 0


def check(name: str, cond: bool, detail: str = "") -> None:
    global PASS, FAIL
    if cond:
        PASS += 1
        print(f"  PASS  {name}")
    else:
        FAIL += 1
        print(f"  FAIL  {name} — {detail}")


def pdf_bytes(size: int = 1200) -> bytes:
    # Minimal PDF header + padding
    body = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n"
    if size > len(body):
        body += b"0" * (size - len(body))
    return body[:size]


def main() -> int:
    client = httpx.Client(base_url=BASE, timeout=30.0, follow_redirects=True)

    print("1) Health")
    r = client.get("/health")
    check("GET /health", r.status_code == 200 and r.json().get("status") == "ok", r.text)

    print("2) List jobs")
    r = client.get("/api/jobs")
    data = r.json()
    check("GET /api/jobs status", r.status_code == 200 and data.get("success") is True, r.text)
    jobs = data.get("data") or []
    check("GET /api/jobs has roles", len(jobs) >= 5, str(len(jobs)))
    job = jobs[0] if jobs else {}

    print("3) Get single job")
    slug = job.get("slug", "customer-support-agent")
    r = client.get(f"/api/jobs/{slug}")
    check("GET /api/jobs/{slug}", r.status_code == 200 and r.json().get("success"), r.text)
    r = client.get("/api/jobs/support")
    check("GET /api/jobs/support (code)", r.status_code == 200, r.text)

    print("4) Apply with CV")
    files = {"cv": ("resume.pdf", pdf_bytes(), "application/pdf")}
    form = {
        "name": "Test Applicant",
        "phone": "03001234567",
        "role": "Customer Support Agent",
        "exp": "1 to 3 years",
        "msg": "Hello",
        "confirmNight": "on",
        "confirmOnsite": "on",
        "confirmLocation": "on",
        "intent": "apply-current",
    }
    r = client.post("/api/jobs/apply", data=form, files=files)
    check("POST /api/jobs/apply", r.status_code == 201 and r.json().get("success"), r.text)
    app_data = r.json().get("data") or {}
    check("apply hides resume path", "resume_file_path" not in app_data, json.dumps(app_data))

    print("5) Career CV submission")
    files = {"cv": ("pool.docx", pdf_bytes(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
    form = {
        "confirmNight": "true",
        "confirmOnsite": "true",
        "confirmLocation": "true",
        "intent": "cv-future",
    }
    r = client.post("/api/careers", data=form, files=files)
    check("POST /api/careers", r.status_code == 201 and r.json().get("success"), r.text)

    print("6) Contact form")
    r = client.post(
        "/api/contact",
        data={
            "name": "Visitor",
            "email": "visitor@example.com",
            "subject": "Hello",
            "message": "I have a question about careers.",
        },
    )
    check("POST /api/contact", r.status_code == 201 and r.json().get("success"), r.text)

    print("7) Unified submit (contact)")
    r = client.post(
        "/api/submit",
        data={
            "name": "Unified Contact",
            "email": "unified@example.com",
            "message": "Via submit dispatcher",
        },
    )
    check("POST /api/submit contact", r.status_code == 201, r.text)

    print("8) Validation errors")
    r = client.post(
        "/api/contact",
        data={"name": "X", "email": "not-an-email", "message": "hi"},
    )
    check("invalid email rejected", r.status_code == 422, r.text)

    r = client.post(
        "/api/jobs/apply",
        data={
            "name": "No Confirms",
            "phone": "03001112233",
            "role": "Customer Support Agent",
            "exp": "Fresher",
        },
        files={"cv": ("resume.pdf", pdf_bytes(), "application/pdf")},
    )
    check("missing confirms rejected", r.status_code in {400, 422}, r.text)

    print("9) Invalid CV type")
    r = client.post(
        "/api/jobs/apply",
        data={
            "name": "Bad File",
            "phone": "03001112233",
            "role": "Customer Support Agent",
            "exp": "Fresher",
            "confirmNight": "on",
            "confirmOnsite": "on",
            "confirmLocation": "on",
        },
        files={"cv": ("virus.exe", b"MZ", "application/octet-stream")},
    )
    check("invalid CV type rejected", r.status_code == 400, r.text)

    print("10) Oversized CV")
    big = pdf_bytes(5 * 1024 * 1024 + 10)
    r = client.post(
        "/api/jobs/apply",
        data={
            "name": "Big File",
            "phone": "03001112233",
            "role": "Customer Support Agent",
            "exp": "Fresher",
            "confirmNight": "on",
            "confirmOnsite": "on",
            "confirmLocation": "on",
        },
        files={"cv": ("huge.pdf", big, "application/pdf")},
    )
    check("oversized CV rejected", r.status_code == 400, r.text)

    print("11) CORS")
    r = client.options(
        "/api/jobs",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
        },
    )
    allow = r.headers.get("access-control-allow-origin", "")
    check("CORS allows frontend", "localhost:3000" in allow or allow == "*", str(dict(r.headers)))

    print("12) Docs")
    check("Swagger /docs", client.get("/docs").status_code == 200)
    check("ReDoc /redoc", client.get("/redoc").status_code == 200)

    uploaded = list(Path("uploads/resumes").glob("*"))
    check("resume files stored", any(p.is_file() and p.name != ".gitkeep" for p in uploaded), str(uploaded))

    print(f"\nResult: {PASS} passed, {FAIL} failed")
    return 1 if FAIL else 0


if __name__ == "__main__":
    sys.exit(main())
