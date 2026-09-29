"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Fade + Scale Reveal on scroll into view (~1.8s ease-out).
 * Start: opacity 0, scale 0.94, translateY 30px → settle to 1 / 0.
 * Hover: soft scale 1.02. Rounded corners preserved.
 */
export function OfficeIllustration({
  caption = "Comtanix office",
}: {
  caption?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = frameRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure
      ref={frameRef}
      className={`group relative max-w-full min-w-0 overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-overlay)] ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-[30px] scale-[0.94] opacity-0"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: visible ? "1800ms" : "0ms",
        transitionTimingFunction: "ease-out",
      }}
    >
      <div className="relative aspect-[3/2] w-full max-w-full overflow-hidden bg-brand">
        <Image
          src="/office-hq.png"
          alt="Comtanix office exterior with illuminated company signage"
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 640px"
          priority={false}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand/70 via-brand/10 to-transparent"
          aria-hidden
        />
        {caption ? (
          <figcaption className="absolute inset-x-0 bottom-0 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-sm font-medium leading-snug text-white/95 sm:text-[15px]">
              {caption}
            </p>
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
