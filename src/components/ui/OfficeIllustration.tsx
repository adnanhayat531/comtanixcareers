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
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
      <div
        ref={frameRef}
        className="group relative aspect-[16/10] w-full overflow-hidden"
      >
        <div
          className={`absolute inset-0 will-change-transform ease-out motion-reduce:transition-none ${
            visible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-[30px] scale-[0.94] opacity-0"
          } group-hover:scale-[1.02]`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: visible ? "1800ms" : "0ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          <Image
            src="/office.png"
            alt="Comtanix office exterior with illuminated company signage"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>
      {caption ? (
        <figcaption
          className={`px-4 py-3 text-sm text-muted ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionProperty: "opacity",
            transitionDuration: visible ? "1800ms" : "0ms",
            transitionTimingFunction: "ease-out",
            transitionDelay: visible ? "150ms" : "0ms",
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
