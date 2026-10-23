/** Comtanix FastAPI client — base URL from NEXT_PUBLIC_API_URL. */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export type ApiJob = {
  id: string;
  code: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tags: string[];
  location: string;
  employment_type: string | null;
  department: string | null;
  experience_required?: string | null;
  salary?: string | null;
  status?: string;
  posted_date?: string | null;
  application_deadline?: string | null;
  is_active: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

/** Map API job → existing Role-shaped fields used by the UI. */
export function jobToRole(job: ApiJob) {
  return {
    id: job.code || job.id,
    title: job.title,
    summary: job.summary,
    detail: job.description || job.summary,
    tags: job.tags ?? [],
    slug: job.slug,
    jobId: job.id,
    applicationDeadline: job.application_deadline ?? null,
    location: job.location?.trim() || "Bahria Town Phase 8, Rawalpindi",
    salary: job.salary?.trim() || null,
    employmentType: job.employment_type?.trim() || null,
    department: job.department?.trim() || null,
  };
}

export type UiRole = ReturnType<typeof jobToRole>;

function readMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const body = payload as ApiResponse<unknown> & {
    detail?: unknown;
    data?: { errors?: unknown };
  };
  if (typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }
  if (typeof body.detail === "string" && body.detail.trim()) {
    return body.detail;
  }
  const errors = body.data?.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    const first = errors[0] as { msg?: string };
    if (typeof first?.msg === "string" && first.msg.trim()) {
      return first.msg;
    }
  }
  return fallback;
}

export async function parseApiError(
  res: Response,
  fallback = "Something went wrong. Please try again.",
): Promise<string> {
  try {
    const payload = await res.json();
    if (res.status === 422) {
      return readMessage(payload, "Please check the form and try again.");
    }
    if (res.status >= 500) {
      return readMessage(
        payload,
        "Our server is temporarily unavailable. Please try again shortly.",
      );
    }
    return readMessage(payload, fallback);
  } catch {
    if (res.status >= 500) {
      return "Our server is temporarily unavailable. Please try again shortly.";
    }
    return fallback;
  }
}

const NETWORK_ERROR =
  "Could not reach the server. Make sure the API is running, then try again.";

/** Keep Careers / job reads snappy when the API is down or unreachable. */
const READ_TIMEOUT_MS = 1000;

async function safeFetch(input: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch {
    throw new Error(NETWORK_ERROR);
  }
}

function withReadTimeout(init?: RequestInit): RequestInit {
  return {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(READ_TIMEOUT_MS),
  };
}

export async function fetchJobs(init?: RequestInit): Promise<ApiJob[]> {
  const res = await safeFetch(apiUrl("/api/jobs"), {
    ...withReadTimeout(init),
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (!res.ok) {
    throw new Error(await parseApiError(res, "Could not load open roles."));
  }
  const payload = (await res.json()) as ApiResponse<ApiJob[]>;
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function fetchJobBySlug(
  slug: string,
  init?: RequestInit,
): Promise<ApiJob | null> {
  const res = await safeFetch(apiUrl(`/api/jobs/${encodeURIComponent(slug)}`), {
    ...withReadTimeout(init),
    headers: { Accept: "application/json", ...init?.headers },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(await parseApiError(res, "Could not load this role."));
  }
  const payload = (await res.json()) as ApiResponse<ApiJob>;
  return payload.data ?? null;
}

async function postForm<T = unknown>(
  path: string,
  formData: FormData,
  fallbackError: string,
): Promise<ApiResponse<T>> {
  const res = await safeFetch(apiUrl(path), {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  const payload = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok) {
    throw new Error(
      payload
        ? readMessage(payload, fallbackError)
        : res.status >= 500
          ? "Our server is temporarily unavailable. Please try again shortly."
          : fallbackError,
    );
  }
  return (
    payload ?? {
      success: true,
      message: "Submitted successfully",
      data: null,
    }
  );
}

export function submitJobApplication(jobId: string, formData: FormData) {
  return postForm(
    `/api/jobs/${jobId}/apply`,
    formData,
    "Could not submit your application.",
  );
}

export function submitCareerCv(formData: FormData) {
  return postForm("/api/careers", formData, "Could not submit your CV.");
}

export type ParsedCvFields = {
  name: string;
  email: string;
  phone: string;
  role: string;
  exp: string;
};

export async function parseCareerCv(file: File): Promise<ParsedCvFields> {
  const formData = new FormData();
  formData.append("cv", file);
  const result = await postForm<ParsedCvFields>(
    "/api/careers/parse",
    formData,
    "Could not read your CV. Please fill the fields manually.",
  );
  const data = result.data;
  return {
    name: data?.name ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    role: data?.role ?? "",
    exp: data?.exp ?? "",
  };
}

export function submitContact(formData: FormData) {
  return postForm("/api/contact", formData, "Could not send your message.");
}
