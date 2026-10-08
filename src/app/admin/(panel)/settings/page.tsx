"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  adminChangePassword,
  adminMe,
  adminUpdateProfile,
  type AdminUser,
} from "@/lib/admin-api";

const field =
  "type-body h-11 w-full rounded-lg border border-line px-3.5 outline-none focus:border-brand focus:ring-1 focus:ring-brand/25";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminMe().then(setAdmin).catch((e) => setError(e.message));
  }, []);

  async function saveProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const updated = await adminUpdateProfile({
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
      });
      setAdmin(updated);
      setMsg("Profile updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function savePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await adminChangePassword({
        current_password: String(fd.get("current_password") || ""),
        new_password: String(fd.get("new_password") || ""),
        confirm_password: String(fd.get("confirm_password") || ""),
      });
      setMsg("Password updated.");
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed");
    }
  }

  if (!admin && !error) return <p className="text-muted">Loading…</p>;

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="type-meta mt-1 text-muted">Manage your admin account.</p>
      </div>

      {msg ? <p className="text-brand">{msg}</p> : null}
      {error ? <p className="text-red-700">{error}</p> : null}

      <form onSubmit={saveProfile} className="space-y-4 rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold">Profile</h2>
        <div>
          <label className="type-label mb-1.5 block">Name</label>
          <input name="name" required className={field} defaultValue={admin?.name || ""} />
        </div>
        <div>
          <label className="type-label mb-1.5 block">Email</label>
          <input name="email" type="email" required className={field} defaultValue={admin?.email || ""} />
        </div>
        <button type="submit" className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white">
          Save profile
        </button>
      </form>

      <form onSubmit={savePassword} className="space-y-4 rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold">Change password</h2>
        <div>
          <label className="type-label mb-1.5 block">Current password</label>
          <input name="current_password" type="password" required className={field} />
        </div>
        <div>
          <label className="type-label mb-1.5 block">New password</label>
          <input name="new_password" type="password" required minLength={8} className={field} />
        </div>
        <div>
          <label className="type-label mb-1.5 block">Confirm new password</label>
          <input name="confirm_password" type="password" required minLength={8} className={field} />
        </div>
        <button type="submit" className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white">
          Update password
        </button>
      </form>
    </div>
  );
}
