"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Medal, PartyPopper, Star, Users } from "lucide-react";

const ICONS = [Users, Medal, PartyPopper, Star] as const;

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

type CultureCardProps = {
  title: string;
  body: string;
  image: string;
  index: number;
};

export function CultureCard({ title, body, image, index }: CultureCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const Icon = ICONS[index] ?? Users;

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const el = imgRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const raw = 1 - (rect.top + rect.height) / (viewH + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const zoom = reduced ? 1 : 1 + progress * 0.04;
  const shiftY = reduced ? 0 : (progress - 0.5) * 10;

  return (
    <article
      ref={cardRef}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,45,45,0.07)] transition-[opacity,transform] duration-[900ms] ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-5 scale-[0.96] opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      <div ref={imgRef} className="relative aspect-[5/3] w-full overflow-hidden">
        <div
          className="absolute inset-[-8%] will-change-transform"
          style={
            reduced
              ? undefined
              : {
                  transform: `translate3d(0, ${shiftY}px, 0) scale(${zoom})`,
                  transition: "transform 80ms linear",
                }
          }
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-tint text-sea">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="font-display text-base font-bold tracking-tight text-ink md:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}
