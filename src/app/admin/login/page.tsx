"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, getAdminToken } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (getAdminToken()) router.replace("/admin");
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      await adminLogin(email.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-[var(--container-pad-x)]">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-line bg-white p-5 shadow-soft sm:p-6">
        <p className="type-eyebrow text-brand">Comtanix Admin</p>
        <h1 className="type-page-title mt-1.5 text-ink">Sign in</h1>
        <p className="type-meta mt-1.5 text-muted">
          Authorized staff only. Your session is protected by the API.
        </p>
        <form onSubmit={onSubmit} className="mt-5 grid gap-3.5">
          <div>
            <label className="type-label mb-1.5 block" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ui-field"
            />
          </div>
          <div>
            <label className="type-label mb-1.5 block" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ui-field"
            />
          </div>
          {error ? (
            <p className="type-meta font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="ui-btn ui-btn-primary w-full"
          >
            {pending ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
