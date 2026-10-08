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
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md rounded-xl border border-line bg-white p-8 shadow-soft">
        <p className="type-eyebrow text-brand">Comtanix Admin</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Sign in</h1>
        <p className="type-meta mt-2 text-muted">
          Authorized staff only. Your session is protected by the API.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
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
              className="type-body h-11 w-full rounded-lg border border-line px-3.5 outline-none focus:border-brand focus:ring-1 focus:ring-brand/25"
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
              className="type-body h-11 w-full rounded-lg border border-line px-3.5 outline-none focus:border-brand focus:ring-1 focus:ring-brand/25"
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
            className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 font-display text-sm font-semibold text-white transition hover:brightness-105 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
