"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SIZE = 48;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Teal circular mark + scroll-progress ring */
function ScrollUpIcon({
  className = "",
  progress,
}: {
  className?: string;
  progress: number;
}) {
  const offset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="24" fill="#57a6ad" />
      <path
        d="M15.8 21.2c0-.55.22-1.07.62-1.45l6.35-6.1a1.8 1.8 0 0 1 2.46 0l6.35 6.1c.8.77.82 2.04.05 2.84a2.05 2.05 0 0 1-2.84.05L24 17.35l-4.79 4.4a2.05 2.05 0 0 1-2.84-.05 1.98 1.98 0 0 1-.57-1.5Z"
        fill="#fff"
      />
      <circle cx="24" cy="24" r="3.4" fill="#fff" />
      <path
        d="M15.8 26.8c0 .55.22 1.07.62 1.45l6.35 6.1a1.8 1.8 0 0 0 2.46 0l6.35-6.1a2.02 2.02 0 0 0 .05-2.84 2.05 2.05 0 0 0-2.84-.05L24 30.65l-4.79-4.4a2.05 2.05 0 0 0-2.84.05c-.4.38-.62.9-.62 1.5Z"
        fill="#fff"
      />

      {/* Track */}
      <circle
        cx="24"
        cy="24"
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={STROKE}
      />
      {/* Progress — fills as user scrolls down */}
      <circle
        cx="24"
        cy="24"
        r={RADIUS}
        fill="none"
        stroke="#00eee8"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 24 24)`}
        className="transition-[stroke-dashoffset] duration-150 ease-out"
      />
    </svg>
  );
}

export function ScrollToTop() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enterKey, setEnterKey] = useState(0);

  useEffect(() => {
    if (!isHome) {
      setVisible(false);
      setProgress(0);
      return;
    }

    let wasVisible = false;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, scrollTop / maxScroll));

      const next = scrollTop > 320;
      if (next && !wasVisible) {
        setEnterKey((k) => k + 1);
      }
      wasVisible = next;
      setVisible(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <button
      key={enterKey}
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed right-[max(0.75rem,env(safe-area-inset-right,0px))] bottom-[calc(max(0.75rem,env(safe-area-inset-bottom,0px))+3.5rem)] z-40 inline-flex h-11 w-11 items-center justify-center overflow-visible rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.22)] transition-[box-shadow,filter] duration-300 sm:right-5 sm:bottom-[calc(1.25rem+3.75rem)] sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto scroll-up-enter"
          : "pointer-events-none opacity-0 translate-y-7 scale-75"
      } hover:brightness-110 hover:shadow-[0_6px_20px_rgba(87,166,173,0.5)] hover:[animation-play-state:paused] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57a6ad]`}
    >
      <span className="inline-flex h-full w-full transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95">
        <ScrollUpIcon className="h-full w-full" progress={progress} />
      </span>
    </button>
  );
}
