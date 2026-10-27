"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_RATING,
  POSITIVE_GOOGLE_REVIEWS,
  type GoogleReview,
} from "@/lib/data/google-reviews";

const AUTO_MS = 2800;
const SIDE_SPAN = 2;

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function circularOffset(i: number, active: number, count: number) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

function glowTone(offset: number) {
  if (offset === 0) return "glow-brand";
  if (offset < 0) return "glow-deep";
  return "glow-sea";
}

function ReviewCard({
  review,
  active,
  tone,
}: {
  review: GoogleReview;
  active: boolean;
  tone: string;
}) {
  return (
    <article
      className={`reviews-arc-card reviews-arc-card--${tone} relative flex h-full w-full flex-col rounded-2xl px-5 py-5 text-left sm:px-6 sm:py-6 ${
        active ? "is-active" : ""
      }`}
    >
      <div
        className="flex gap-0.5"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating
                ? "fill-[#F5C542] text-[#F5C542]"
                : "fill-transparent text-line"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <q className="type-meta mt-4 line-clamp-6 flex-1 leading-relaxed text-ink/90 [quotes:none] sm:line-clamp-7 sm:text-[0.95rem]">
        {review.quote}
      </q>

      <div className="mt-5 flex items-center gap-3">
        <a
          href={review.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={active ? 0 : -1}
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-tint ring-2 ring-brand/25"
          aria-label={`${review.author} on Google`}
        >
          {review.photoUrl ? (
            <Image
              src={review.photoUrl}
              alt={review.author}
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs font-semibold text-brand">
              {review.initials}
            </span>
          )}
        </a>
        <div className="min-w-0 flex-1">
          <a
            href={review.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
            className="block truncate text-sm font-semibold text-ink hover:text-brand hover:underline sm:text-[0.95rem]"
          >
            {review.author}
          </a>
          <span className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <GoogleMark className="h-3.5 w-3.5" />
            Google review
            {review.dateLabel ? ` · ${review.dateLabel}` : null}
          </span>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsGrid() {
  const reviews = POSITIVE_GOOGLE_REVIEWS;
  const count = reviews.length;
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  // Always keep rotating — no hover pause
  useEffect(() => {
    if (count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setActive((i) => (i + 1) % count);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [count]);

  return (
    <div className="relative z-[1] min-w-0 w-full">
      <div className="mx-auto mb-6 max-w-[var(--container-max,72rem)] px-[var(--container-pad-x)]">
        <a
          href={GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card group inline-flex items-center gap-4 rounded-xl px-4 py-3 transition hover:border-brand/50"
        >
          <div>
            <p className="type-stat text-ink">
              {GOOGLE_RATING.score.toFixed(1)}
            </p>
            <div className="mt-1.5 flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#F5C542] text-[#F5C542]"
                />
              ))}
            </div>
            <p className="mt-1.5 text-sm font-semibold text-brand group-hover:underline">
              {GOOGLE_RATING.count} reviews
            </p>
          </div>
          <span className="hidden h-12 w-px bg-line sm:block" aria-hidden />
          <span className="hidden items-center gap-2 sm:inline-flex">
            <GoogleMark className="h-6 w-6" />
            <span className="type-meta max-w-[10rem] text-muted">
              Open all reviews on Google Maps
            </span>
            <ExternalLink className="h-4 w-4 text-brand" aria-hidden />
          </span>
        </a>
      </div>

      <div className="reviews-arc relative w-full">
        <div className="reviews-arc-stars" aria-hidden />

        <div className="reviews-arc-orbit" aria-hidden>
          <span className="reviews-arc-orbit-ring reviews-arc-orbit-ring-a" />
          <span className="reviews-arc-orbit-ring reviews-arc-orbit-ring-b" />
          <span className="reviews-arc-orbit-ring reviews-arc-orbit-ring-c" />
        </div>

        <div className="reviews-arc-stage">
          {reviews.map((review, i) => {
            const offset = circularOffset(i, active, count);
            const abs = Math.abs(offset);
            const visible = abs <= SIDE_SPAN;
            const x = offset * 38;
            const z = -abs * 100;
            const rot = offset * -36;
            const scale = 1 - abs * 0.1;
            const opacity = !visible ? 0 : offset === 0 ? 1 : 1 - abs * 0.08;

            return (
              <div
                key={review.id}
                className={`reviews-arc-slot${offset === 0 ? " is-front" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  pointerEvents: offset === 0 ? "auto" : "none",
                  visibility: visible ? "visible" : "hidden",
                }}
                aria-hidden={offset !== 0}
              >
                <ReviewCard
                  review={review}
                  active={offset === 0}
                  tone={glowTone(offset)}
                />
              </div>
            );
          })}
        </div>

        <div className="relative z-[1] mt-2 flex items-center justify-center gap-3 pb-1 sm:mt-3">
          <button
            type="button"
            onClick={prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:text-brand"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Reviews"
          >
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show review by ${r.author}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-5 bg-brand"
                    : "w-1.5 bg-brand/25 hover:bg-brand/45"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-brand hover:text-brand"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <p className="type-meta relative z-[1] mt-3 pb-2 text-center text-muted">
          What our clients are saying · {GOOGLE_RATING.count} reviews ·{" "}
          <span className="inline-flex items-center gap-1 font-semibold text-ink">
            <Star
              className="h-3 w-3 fill-[#F5C542] text-[#F5C542]"
              aria-hidden
            />
            {GOOGLE_RATING.score.toFixed(1)} / 5
          </span>
        </p>
      </div>
    </div>
  );
}
