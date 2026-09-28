"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

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

/** Hero heading: word-by-word fade up, 0.1–0.15s stagger */
export function WordFadeUp({
  text,
  as: Tag = "h1",
  className = "",
  stagger = 0.12,
  duration = 0.55,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.trim().split(/\s+/);

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          style={
            reduced
              ? undefined
              : ({
                  animation: `cx-fade-up ${duration}s ease-out both`,
                  animationDelay: `${delay + i * stagger}s`,
                } as CSSProperties)
          }
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Simple fade-up (hero paragraph / buttons) */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={className}
      style={
        reduced
          ? undefined
          : ({
              animation: `cx-fade-up ${duration}s ease-out both`,
              animationDelay: `${delay}s`,
            } as CSSProperties)
      }
    >
      {children}
    </div>
  );
}

/** Section headings: fade up + blur → sharp on scroll */
export function HeadingReveal({
  children,
  className = "",
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : ({
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              filter: visible ? "blur(0)" : "blur(6px)",
              transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out, filter ${duration}s ease-out`,
            } as CSSProperties)
      }
    >
      {children}
    </div>
  );
}
