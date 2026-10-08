import { API_BASE_URL, apiUrl, type ApiResponse } from "@/lib/api";

const TOKEN_KEY = "comtanix_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
};

async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let res: Response;
  try {
    res = await fetch(apiUrl(path), { ...init, headers });
  } catch {
    throw new Error("Could not reach the API. Is the backend running?");
  }

  if (res.status === 401) {
    setAdminToken(null);
    if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
      window.location.href = "/admin/login";
    }
    throw new Error("Session expired. Please sign in again.");
  }

  const payload = (await res.json().catch(() => null)) as ApiResponse<T> | null;
  if (!res.ok) {
    const message =
      (payload && typeof payload.message === "string" && payload.message) ||
      "Request failed.";
    throw new Error(message);
  }
  return (payload?.data ?? null) as T;
}

export async function adminLogin(email: string, password: string) {
  const data = await adminFetch<{
    access_token: string;
    admin: AdminUser;
  }>("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAdminToken(data.access_token);
  return data.admin;
}

export async function adminLogout() {
  try {
    await adminFetch("/api/admin/auth/logout", { method: "POST" });
  } catch {
    /* ignore */
  }
  setAdminToken(null);
}

export function adminMe() {
  return adminFetch<AdminUser>("/api/admin/me");
}

export function adminDashboard() {
  return adminFetch<{
    active_jobs: number;
    total_jobs: number;
    total_applications: number;
    new_applications: number;
    total_cvs: number;
    contact_messages: number;
    unread_contacts: number;
    recent_applications: Array<{
      id: string;
      full_name: string;
      email: string | null;
      job_title: string | null;
      status: string;
      created_at: string;
    }>;
    recent_contacts: Array<{
      id: string;
      name: string;
      email: string;
      subject: string | null;
      status: string;
      created_at: string;
    }>;
  }>("/api/admin/dashboard");
}

export type AdminJob = {
  id: string;
  code: string;
  title: string;
  slug: string;
  department: string | null;
  location: string;
  employment_type: string | null;
  experience_required: string | null;
  salary: string | null;
  summary: string;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  qualifications: string | null;
  benefits: string | null;
  tags: string[];
  status: string;
  posted_date: string | null;
  application_deadline: string | null;
  is_active: boolean;
  applications_count: number;
  created_at: string;
  updated_at: string;
};

export function adminListJobs(params: Record<string, string | number | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  return adminFetch<Paginated<AdminJob>>(`/api/admin/jobs?${qs}`);
}

export function adminGetJob(id: string) {
  return adminFetch<AdminJob>(`/api/admin/jobs/${id}`);
}

export function adminCreateJob(body: Record<string, unknown>) {
  return adminFetch<AdminJob>("/api/admin/jobs", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function adminUpdateJob(id: string, body: Record<string, unknown>) {
  return adminFetch<AdminJob>(`/api/admin/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function adminPatchJobStatus(id: string, status: string) {
  return adminFetch<AdminJob>(`/api/admin/jobs/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteJob(id: string) {
  return adminFetch<null>(`/api/admin/jobs/${id}`, { method: "DELETE" });
}

export type AdminApplication = {
  id: string;
  job_id: string;
  job_title: string | null;
  full_name: string;
  email: string | null;
  phone: string;
  experience: string;
  message: string | null;
  resume_original_filename: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export function adminListApplications(params: Record<string, string | number | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  return adminFetch<Paginated<AdminApplication>>(`/api/admin/applications?${qs}`);
}

export function adminGetApplication(id: string) {
  return adminFetch<AdminApplication>(`/api/admin/applications/${id}`);
}

export function adminPatchApplicationStatus(id: string, status: string) {
  return adminFetch<AdminApplication>(`/api/admin/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteApplication(id: string) {
  return adminFetch<null>(`/api/admin/applications/${id}`, { method: "DELETE" });
}

export function adminApplicationCvUrl(id: string) {
  return `${API_BASE_URL}/api/admin/applications/${id}/cv`;
}

export type AdminCv = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string;
  role_interest: string;
  experience: string;
  message: string | null;
  resume_original_filename: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export function adminListCvs(params: Record<string, string | number | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  return adminFetch<Paginated<AdminCv>>(`/api/admin/cvs?${qs}`);
}

export function adminGetCv(id: string) {
  return adminFetch<AdminCv>(`/api/admin/cvs/${id}`);
}

export function adminPatchCvStatus(id: string, status: string) {
  return adminFetch<AdminCv>(`/api/admin/cvs/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteCv(id: string) {
  return adminFetch<null>(`/api/admin/cvs/${id}`, { method: "DELETE" });
}

export function adminCvFileUrl(id: string) {
  return `${API_BASE_URL}/api/admin/cvs/${id}/cv`;
}

export type AdminContact = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export function adminListContacts(params: Record<string, string | number | undefined>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });
  return adminFetch<Paginated<AdminContact>>(`/api/admin/contacts?${qs}`);
}

export function adminGetContact(id: string) {
  return adminFetch<AdminContact>(`/api/admin/contacts/${id}`);
}

export function adminPatchContactStatus(id: string, status: string) {
  return adminFetch<AdminContact>(`/api/admin/contacts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function adminDeleteContact(id: string) {
  return adminFetch<null>(`/api/admin/contacts/${id}`, { method: "DELETE" });
}

export function adminUpdateProfile(body: { name?: string; email?: string }) {
  return adminFetch<AdminUser>("/api/admin/settings/me", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function adminChangePassword(body: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) {
  return adminFetch<null>("/api/admin/settings/password", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function downloadAdminFile(url: string, filename: string) {
  const token = getAdminToken();
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Could not download file.");
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(objectUrl);
}
