# Comtanix Careers API

Production-oriented FastAPI backend for the existing Next.js Comtanix corporate careers site.

Supports:

- Listing open job positions
- Job applications with CV upload
- Future-openings / Submit CV form
- Contact Us form

## Stack

- FastAPI + Uvicorn
- PostgreSQL + SQLAlchemy 2.0 (async) + asyncpg
- Pydantic v2
- Alembic
- python-multipart + aiofiles (secure resume uploads)

## Frontend → API mapping

| Frontend | Functionality | Backend endpoint | Key fields |
|---|---|---|---|
| `src/lib/data/roles.ts` | Open roles list | `GET /api/jobs` | title, summary, tags, detail→description |
| Role detail / apply `?role=` | Single role | `GET /api/jobs/{slug}` | slug, code, or UUID |
| `ApplyForm` `mode="apply"` | Apply to open role | `POST /api/jobs/apply` or `POST /api/submit` | name, phone, role, exp, msg, cv, confirms, intent |
| `ApplyForm` `mode="cv"` | Future openings CV | `POST /api/careers` or `POST /api/submit` | same + General/Other roles |
| `ContactForm` | Contact Us | `POST /api/contact` or `POST /api/submit` | name, email, subject?, message |

Both Next.js forms currently POST to a single `CONFIG.formEndpoint`. Point that value at:

```text
http://localhost:8000/api/submit
```

Dedicated REST endpoints are also available for clearer client integrations.

## Installation

Use **Python 3.11–3.13** (3.14 may lack binary wheels for some dependencies).

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # or: cp .env.example .env
```

## Environment variables

See `.env.example`:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Async Postgres URL (`postgresql+asyncpg://...`) |
| `FRONTEND_URL` | CORS origin(s), comma-separated |
| `UPLOAD_DIR` | Resume storage directory |
| `MAX_UPLOAD_SIZE` | Max CV bytes (default 5 MB) |
| `APP_NAME` / `APP_ENV` / `DEBUG` | App metadata |

Never commit real credentials. Keep secrets in `.env` only.

## PostgreSQL setup

1. Create a database, e.g. `comtanix`.
2. Set `DATABASE_URL` in `.env`.
3. Run migrations:

```bash
alembic upgrade head
```

4. Seed open roles from the frontend catalog:

```bash
python scripts/seed_jobs.py
```

## Running the API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Health: [http://localhost:8000/health](http://localhost:8000/health)
- Swagger: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## API endpoints

### `GET /health`

```json
{ "status": "ok" }
```

### `GET /api/jobs`

Returns active openings.

```json
{
  "success": true,
  "message": "Open roles retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "code": "support",
      "title": "Customer Support Agent",
      "slug": "customer-support-agent",
      "summary": "...",
      "description": "...",
      "tags": ["Night shift"],
      "location": "Bahria Town Phase 8, Rawalpindi",
      "employment_type": "Full-time · Night shift",
      "department": "Customer Support",
      "is_active": true
    }
  ]
}
```

### `GET /api/jobs/{slug}`

Lookup by slug, role code (`support`, `tech`, …), or UUID.

### `POST /api/jobs/apply`

Multipart form matching `ApplyForm` (current opening).

| Field | Required | Notes |
|---|---|---|
| `name` | yes | Full name |
| `phone` | yes | Phone |
| `role` | yes | Job title (must match an active job) |
| `exp` | yes | Experience option |
| `msg` | no | Optional message |
| `confirmNight` | yes | checkbox → `on` / `true` |
| `confirmOnsite` | yes | checkbox |
| `confirmLocation` | yes | checkbox |
| `intent` | no | `apply-current` |
| `cv` | yes | PDF / DOC / DOCX, max 5 MB |

Also available: `POST /api/jobs/{job_id}/apply` (UUID).

Success:

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "uuid",
    "job_id": "uuid",
    "full_name": "Ada Lovelace",
    "phone": "03001234567",
    "experience": "1 to 3 years",
    "message": null,
    "resume_original_filename": "ada_cv.pdf",
    "created_at": "2026-03-26T12:00:00Z"
  }
}
```

Internal filesystem paths are never returned.

### `POST /api/careers`

Multipart form matching `ApplyForm` (`mode="cv"`). Same fields as apply; `role` may also be `General / future openings` or `Other`.

### `POST /api/contact`

Multipart / form fields matching `ContactForm`:

| Field | Required |
|---|---|
| `name` | yes |
| `email` | yes |
| `subject` | no |
| `message` | yes |

### `POST /api/submit`

Unified dispatcher for Next.js `CONFIG.formEndpoint`:

- Contact when `email` + `message` are present (no CV)
- Career pool when `intent=cv-future` + CV
- Job application otherwise (`intent=apply-current` + CV + matching role)

## CV storage

- Stored under `UPLOAD_DIR` (default `uploads/resumes/`)
- Allowed extensions: `.pdf`, `.doc`, `.docx`
- Max size: `MAX_UPLOAD_SIZE` (5 MB)
- Filenames are sanitized; stored name is `{uuid}_{safe-stem}{ext}`
- Path traversal is rejected
- API responses expose only `resume_original_filename`, never the disk path

## Frontend integration

In `src/lib/config.ts`, set:

```ts
formEndpoint: "http://localhost:8000/api/submit",
```

Or use an env-driven value in production. CORS is configured from `FRONTEND_URL` (default `http://localhost:3000`).

No frontend code changes are required beyond pointing `formEndpoint` at the API when you are ready to go live.

## Error responses

```json
{
  "success": false,
  "message": "Validation failed.",
  "data": { "errors": [] }
}
```

Common cases: missing confirms, invalid email, wrong CV type, oversized CV, unknown role.

## Smoke test

With the API running on port 8000:

```bash
python scripts/smoke_test.py
```

Covers health, jobs, apply + CV, careers, contact, validation, invalid/oversized CV, CORS, and docs.

## Admin panel API

Protected routes under `/api/admin/*` require:

```http
Authorization: Bearer <access_token>
```

### Seed the first admin

```bash
python scripts/seed_admin.py
```

Defaults (override with env vars):

- Email: `admin@comtanix.com`
- Password: `ComtanixAdmin!2026`

Change these immediately in production. Never commit real credentials.

### Key admin endpoints

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/me`
- `GET /api/admin/dashboard`
- `GET|POST /api/admin/jobs`
- `GET|PUT|DELETE /api/admin/jobs/{id}`
- `PATCH /api/admin/jobs/{id}/status`
- `GET /api/admin/applications` (+ `/{id}`, status, CV download, delete)
- `GET /api/admin/cvs` (+ `/{id}`, status, CV download, delete)
- `GET /api/admin/contacts` (+ `/{id}`, status, delete)
- `PUT /api/admin/settings/me`
- `POST /api/admin/settings/password`

Public `GET /api/jobs` only returns **published** jobs that are not past `application_deadline`.

### Frontend admin UI

Open Next.js at:

```text
http://localhost:3000/admin/login
```
