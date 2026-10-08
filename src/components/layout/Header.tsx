"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Section";
import { SITE } from "@/lib/config";

const aboutLinks = [
  { href: "/about#story", label: "Our Story" },
  { href: "/about#values", label: "Core Values" },
  { href: "/about#learning", label: "Learning & Development" },
];

function NavLink({
  href,
  label,
  shortLabel,
  active,
  menu,
  onClick,
  overlay,
}: {
  href: string;
  label: string;
  shortLabel?: string;
  active?: boolean;
  menu?: boolean;
  onClick?: () => void;
  overlay?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={
        menu
          ? `type-nav flex min-h-12 items-center rounded-lg px-3 transition-colors ${
              active ? "bg-tint text-brand" : "text-ink hover:bg-tint hover:text-brand"
            }`
          : `type-nav relative px-2.5 py-2 transition-colors xl:px-3.5 ${
              overlay
                ? active
                  ? "text-white after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:rounded-full after:bg-white xl:after:right-3.5 xl:after:left-3.5"
                  : "text-white/90 hover:text-white"
                : active
                  ? "text-brand after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-0.5 after:rounded-full after:bg-brand xl:after:right-3.5 xl:after:left-3.5"
                  : "text-ink/80 hover:text-brand"
            }`
      }
    >
      {shortLabel ? (
        <>
          <span className="xl:hidden">{shortLabel}</span>
          <span className="hidden xl:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overlay = false; // raw hero photo — solid nav for contrast

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const dropLink =
    "type-meta flex min-h-11 items-center rounded-lg px-3 font-medium text-ink transition-colors hover:bg-tint hover:text-brand";

  const desktopLink = (active: boolean) =>
    `type-nav relative inline-flex min-h-11 items-center gap-1 px-2.5 transition-colors xl:px-3.5 ${
      overlay
        ? active
          ? "text-white after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-0.5 after:rounded-full after:bg-white xl:after:right-3.5 xl:after:left-3.5"
          : "text-white/90 hover:text-white"
        : active
          ? "text-brand after:absolute after:right-2.5 after:bottom-1 after:left-2.5 after:h-0.5 after:rounded-full after:bg-brand xl:after:right-3.5 xl:after:left-3.5"
          : "text-ink/80 hover:text-brand"
    }`;

  return (
    <header
      className={`z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-surface/95 shadow-soft backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-none items-center justify-between gap-2 py-0 pr-5 pl-2 sm:h-16 sm:gap-3 sm:pr-6 sm:pl-2.5 md:h-[4.25rem] md:pr-8 md:pl-3 lg:h-[4.5rem] lg:pr-10 lg:pl-3 xl:pr-12 xl:pl-4 2xl:pr-14 2xl:pl-4">
        <Link
          href="/"
          className="min-w-0 shrink focus-visible:rounded-sm"
          aria-label={`${SITE.name} home`}
        >
          <BrandLogo
            light={overlay}
            className="h-8 w-auto max-w-[9.5rem] sm:h-10 sm:max-w-none md:h-11"
          />
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Main">
          <NavLink
            href="/"
            label="Home"
            active={pathname === "/"}
            overlay={overlay}
          />

          <div className="group relative">
            <Link
              href="/about"
              className={desktopLink(pathname.startsWith("/about"))}
              aria-current={pathname.startsWith("/about") ? "page" : undefined}
              aria-haspopup="menu"
            >
              About
              <ChevronDown
                className="h-3.5 w-3.5 opacity-70 transition group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
              />
            </Link>
            <div
              id="about-menu"
              role="menu"
              className="invisible absolute left-0 top-full z-[60] min-w-[240px] pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
            >
              <div className="rounded-xl border border-line bg-surface p-2 shadow-overlay">
                <Link href="/about" className={dropLink} role="menuitem">
                  About Us
                </Link>
                {aboutLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={dropLink} role="menuitem">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink
            href="/careers"
            label="Careers"
            active={pathname.startsWith("/careers")}
            overlay={overlay}
          />
          <NavLink
            href="/life"
            label={`Life at ${SITE.name}`}
            shortLabel="Life"
            active={pathname.startsWith("/life")}
            overlay={overlay}
          />
          <NavLink
            href="/contact"
            label="Contact"
            active={pathname.startsWith("/contact")}
            overlay={overlay}
          />

          <Button
            href="/submit-cv"
            variant={overlay ? "white" : "primary"}
            className="ml-3 !h-10 !min-h-10 !px-4 !text-sm xl:ml-4 xl:!px-5"
          >
            Submit CV
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <Button
            href="/submit-cv"
            variant={overlay ? "white" : "primary"}
            className="!hidden !h-9 !min-h-9 !px-3 !text-sm min-[380px]:!inline-flex sm:!h-10 sm:!min-h-10 sm:!px-3.5"
          >
            Submit CV
          </Button>
          <button
            type="button"
            className={`inline-flex h-9 min-h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition sm:h-10 sm:min-h-10 sm:w-auto sm:gap-2 sm:px-3 ${
              overlay
                ? "border-white/40 text-white hover:bg-white/10"
                : "border-line text-ink hover:bg-tint"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <Container className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4 pb-8">
            <NavLink menu href="/" label="Home" active={pathname === "/"} onClick={() => setOpen(false)} />

            <button
              type="button"
              className="type-nav flex min-h-12 items-center justify-between rounded-lg px-3 text-left text-ink"
              onClick={() => setAboutOpen((v) => !v)}
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown className={`h-5 w-5 transition ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen ? (
              <div className="grid">
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="type-meta flex min-h-11 items-center rounded-lg px-5 text-muted hover:bg-tint hover:text-brand"
                >
                  About Us
                </Link>
                {aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="type-meta flex min-h-11 items-center rounded-lg px-5 text-muted hover:bg-tint hover:text-brand"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <NavLink menu href="/careers" label="Careers" onClick={() => setOpen(false)} />
            <NavLink menu href="/life" label={`Life at ${SITE.name}`} onClick={() => setOpen(false)} />
            <NavLink menu href="/contact" label="Contact" onClick={() => setOpen(false)} />
            <Button href="/submit-cv" className="mt-4 w-full">
              Submit CV <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
