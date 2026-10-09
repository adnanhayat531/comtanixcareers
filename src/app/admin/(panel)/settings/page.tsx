"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  adminChangePassword,
  adminMe,
  adminUpdateProfile,
  type AdminUser,
} from "@/lib/admin-api";

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
        <h1 className="type-page-title text-ink">Settings</h1>
        <p className="type-meta mt-1 text-muted">Manage your admin account.</p>
      </div>

      {msg ? <p className="text-brand">{msg}</p> : null}
      {error ? <p className="text-red-700">{error}</p> : null}

      <form onSubmit={saveProfile} className="space-y-4 rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="type-section-title">Profile</h2>
        <div>
          <label className="type-label mb-1.5 block">Name</label>
          <input name="name" required className="ui-field" defaultValue={admin?.name || ""} />
        </div>
        <div>
          <label className="type-label mb-1.5 block">Email</label>
          <input name="email" type="email" required className="ui-field" defaultValue={admin?.email || ""} />
        </div>
        <button type="submit" className="ui-btn ui-btn-primary">
          Save profile
        </button>
      </form>

      <form onSubmit={savePassword} className="space-y-4 rounded-xl border border-line bg-white p-6 shadow-soft">
        <h2 className="type-section-title">Change password</h2>
        <div>
          <label className="type-label mb-1.5 block">Current password</label>
          <input name="current_password" type="password" required className="ui-field" />
        </div>
        <div>
          <label className="type-label mb-1.5 block">New password</label>
          <input name="new_password" type="password" required minLength={8} className="ui-field" />
        </div>
        <div>
          <label className="type-label mb-1.5 block">Confirm new password</label>
          <input name="confirm_password" type="password" required minLength={8} className="ui-field" />
        </div>
        <button type="submit" className="ui-btn ui-btn-primary">
          Update password
        </button>
      </form>
    </div>
  );
}
