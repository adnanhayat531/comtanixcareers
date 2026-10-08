"""Verify the endpoints the Next.js frontend calls after wiring."""

from __future__ import annotations

import sys

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


def pdf_bytes() -> bytes:
    return b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n" + b"0" * 800


def main() -> int:
    client = httpx.Client(base_url=BASE, timeout=30.0)

    print("Frontend integration paths")

    r = client.get("/api/jobs")
    jobs = (r.json().get("data") or []) if r.status_code == 200 else []
    check("GET /api/jobs (OpeningsList)", r.status_code == 200 and len(jobs) >= 1, r.text)
    job = jobs[0] if jobs else {}

    slug = job.get("slug", "customer-support-agent")
    r = client.get(f"/api/jobs/{slug}")
    check("GET /api/jobs/{slug} (ApplyForm details)", r.status_code == 200, r.text)
    job_id = (r.json().get("data") or {}).get("id") or job.get("id")

    files = {"cv": ("resume.pdf", pdf_bytes(), "application/pdf")}
    form = {
        "name": "Frontend Wire Test",
        "phone": "03001234567",
        "role": job.get("title", "Customer Support Agent"),
        "exp": "1 to 3 years",
        "msg": "integration",
        "confirmNight": "on",
        "confirmOnsite": "on",
        "confirmLocation": "on",
        "intent": "apply-current",
    }
    r = client.post(f"/api/jobs/{job_id}/apply", data=form, files=files)
    check("POST /api/jobs/{id}/apply (ApplyForm)", r.status_code == 201, r.text)

    files = {"cv": ("pool.pdf", pdf_bytes(), "application/pdf")}
    form = {
        "name": "CV Pool Test",
        "phone": "03007654321",
        "role": "General / future openings",
        "exp": "Fresher",
        "confirmNight": "on",
        "confirmOnsite": "on",
        "confirmLocation": "on",
        "intent": "cv-future",
    }
    r = client.post("/api/careers", data=form, files=files)
    check("POST /api/careers (Submit CV)", r.status_code == 201, r.text)

    r = client.post(
        "/api/contact",
        data={
            "name": "Contact Wire",
            "email": "wire@example.com",
            "subject": "Test",
            "message": "Hello from frontend integration test",
        },
    )
    check("POST /api/contact (ContactForm)", r.status_code == 201, r.text)

    r = client.post(
        "/api/contact",
        data={"name": "X", "email": "bad", "message": "hi"},
    )
    check("Contact validation error surface", r.status_code == 422, r.text)

    r = client.options(
        "/api/jobs",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
        },
    )
    allow = r.headers.get("access-control-allow-origin", "")
    check("CORS for Next.js origin", "localhost:3000" in allow or allow == "*", allow)

    print(f"\nResult: {PASS} passed, {FAIL} failed")
    return 1 if FAIL else 0


if __name__ == "__main__":
    sys.exit(main())
