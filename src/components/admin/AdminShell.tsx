"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";
import {
  adminLogout,
  adminMe,
  getAdminToken,
  type AdminUser,
} from "@/lib/admin-api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/cvs", label: "CV Submissions", icon: Inbox },
  { href: "/admin/contacts", label: "Contact Messages", icon: MessageSquare },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    adminMe()
      .then((user) => {
        setAdmin(user);
        setReady(true);
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function onLogout() {
    await adminLogout();
    router.replace("/admin/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas text-muted">
        Loading admin…
      </div>
    );
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-0.5 p-2.5">
      {NAV.map((item) => {
        const exact = "exact" in item && item.exact;
        const active = exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`type-nav flex items-center gap-2.5 rounded-md px-2.5 py-2 transition ${
              active
                ? "bg-brand text-white"
                : "text-ink/80 hover:bg-tint hover:text-ink"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
      <div className="mt-auto space-y-0.5 border-t border-line pt-2.5">
        <Link
          href="/admin/settings"
          onClick={() => setOpen(false)}
          className={`type-nav flex items-center gap-2.5 rounded-md px-2.5 py-2 transition ${
            pathname.startsWith("/admin/settings")
              ? "bg-brand text-white"
              : "text-ink/80 hover:bg-tint"
          }`}
        >
          <Settings className="h-4 w-4" aria-hidden />
          Settings
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="type-nav flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-ink/80 transition hover:bg-tint"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Logout
        </button>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-dvh min-w-0 overflow-x-clip bg-canvas">
      <aside className="hidden w-[var(--sidebar-w)] shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="border-b border-line px-4 py-4">
          <p className="type-section-title text-ink">Comtanix</p>
          <p className="type-meta text-muted">Admin Panel</p>
        </div>
        {nav}
        {admin ? (
          <div className="border-t border-line px-4 py-3">
            <p className="truncate text-sm font-medium text-ink">{admin.name}</p>
            <p className="truncate text-xs text-muted">{admin.email}</p>
          </div>
        ) : null}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-3 py-2.5 sm:px-4 lg:px-6">
          <button
            type="button"
            className="shrink-0 rounded-md border border-line p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="type-section-title min-w-0 truncate text-ink">
            Hiring operations
          </p>
          <Link
            href="/"
            className="type-meta shrink-0 text-brand hover:underline"
          >
            View site
          </Link>
        </header>
        <div className="min-w-0 flex-1 overflow-x-clip p-3 sm:p-5 lg:p-6">
          {children}
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[var(--sidebar-w)] max-w-[85vw] flex-col bg-white shadow-overlay">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="type-section-title text-ink">Menu</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{nav}</div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone: Record<string, string> = {
    published: "bg-tint text-brand border-brand/25",
    draft: "bg-canvas text-muted border-line",
    closed: "bg-red-50 text-red-700 border-red-200",
    archived: "bg-canvas text-muted border-line",
    new: "bg-tint text-brand border-brand/25",
    unread: "bg-tint text-brand border-brand/25",
    reviewing: "bg-amber-50 text-amber-800 border-amber-200",
    shortlisted: "bg-emerald-50 text-emerald-800 border-emerald-200",
    interview: "bg-sky-50 text-sky-800 border-sky-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    hired: "bg-emerald-50 text-emerald-800 border-emerald-200",
    reviewed: "bg-canvas text-muted border-line",
    read: "bg-canvas text-muted border-line",
    replied: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${
        tone[status] || "bg-canvas text-muted border-line"
      }`}
    >
      {status}
    </span>
  );
}
