"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_RATING,
  POSITIVE_GOOGLE_REVIEWS,
  type GoogleReview,
} from "@/lib/data/google-reviews";

const AUTO_MS = 3800;
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
      className={`reviews-arc-card reviews-arc-card--${tone} relative flex w-full flex-col rounded-2xl px-4 py-3.5 text-left sm:px-5 sm:py-4 ${
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
            className={`h-3.5 w-3.5 ${
              i < review.rating
                ? "fill-[#F5C542] text-[#F5C542]"
                : "fill-transparent text-line"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <q className="type-meta mt-2 line-clamp-4 leading-snug text-ink/90 [quotes:none] sm:line-clamp-5 sm:text-[0.92rem]">
        {review.quote}
      </q>

      <div className="mt-3 flex items-center gap-2.5">
        <a
          href={review.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={active ? 0 : -1}
          className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-tint ring-2 ring-brand/25"
          aria-label={`${review.author} on Google`}
        >
          {review.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.photoUrl}
              alt={review.author}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-[0.65rem] font-semibold text-brand">
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
            className="block truncate text-sm font-semibold text-ink hover:text-brand hover:underline"
          >
            {review.author}
          </a>
          <span className="mt-0.5 flex items-center gap-1 text-[0.7rem] text-muted">
            <GoogleMark className="h-3 w-3" />
            Google review
            {review.dateLabel ? ` · ${review.dateLabel}` : null}
          </span>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsGrid() {
  // Full positive set (4★+) — no slice; bad reviews already filtered in data layer
  const reviews = POSITIVE_GOOGLE_REVIEWS;
  const count = reviews.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const wasPaused = useRef(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + count) % count);
  }, [count]);

  // Auto-move; pause on hover — resume immediately when cursor leaves
  useEffect(() => {
    if (count < 2 || paused) {
      if (paused) wasPaused.current = true;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tick = () => {
      if (document.visibilityState === "hidden") return;
      setActive((i) => (i + 1) % count);
    };

    // Cursor just left → move now, then same gap as before
    if (wasPaused.current) {
      wasPaused.current = false;
      tick();
    }

    const id = window.setInterval(tick, AUTO_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  return (
    <div className="relative z-[1] min-w-0 w-full">
      <div className="mb-3 flex justify-start px-[var(--container-pad-x)] sm:mb-3.5">
        <a
          href={GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card group inline-flex w-fit max-w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition hover:border-brand/50 sm:gap-2.5 sm:px-3 sm:py-2"
        >
          <div className="shrink-0">
            <p className="text-lg font-bold leading-none text-ink sm:text-xl">
              {GOOGLE_RATING.score.toFixed(1)}
            </p>
            <div className="mt-0.5 flex gap-px" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-2.5 w-2.5 fill-[#F5C542] text-[#F5C542] sm:h-3 sm:w-3"
                />
              ))}
            </div>
            <p className="mt-0.5 text-[10px] font-semibold text-brand group-hover:underline sm:text-xs">
              {GOOGLE_RATING.count} reviews
            </p>
          </div>
          <span className="hidden h-8 w-px shrink-0 bg-line sm:block" aria-hidden />
          <span className="flex items-center gap-1.5">
            <GoogleMark className="h-4 w-4 shrink-0" />
            <span className="text-[11px] whitespace-nowrap text-muted sm:text-xs">
              Open all reviews on Google Maps
            </span>
            <ExternalLink className="h-3 w-3 shrink-0 text-brand" aria-hidden />
          </span>
        </a>
      </div>

      <div className="reviews-arc relative w-full">
        {/* Earth globe: full closed SVG circles in 3D (meridians + latitudes) */}
        <div className="reviews-globe" aria-hidden>
          <span className="reviews-globe-glow" />
          <div className="reviews-globe-ball">
            <svg className="reviews-globe-shell" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="96"
                fill="rgba(73,164,174,0.04)"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.55"
              />
            </svg>

            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <svg
                key={`m-${deg}`}
                className="reviews-globe-ring"
                viewBox="0 0 200 200"
                style={{ transform: `rotateY(${deg}deg)` }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="96"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeOpacity="0.5"
                />
              </svg>
            ))}

            {(
              [
                [0, 1],
                [0.5, 0.866],
                [-0.5, 0.866],
                [0.82, 0.574],
                [-0.82, 0.574],
              ] as const
            ).map(([z, s]) => (
              <svg
                key={`lat-${z}`}
                className={`reviews-globe-ring reviews-globe-lat${
                  z === 0 ? " is-equator" : ""
                }`}
                viewBox="0 0 200 200"
                style={
                  {
                    "--z": z,
                    "--s": s,
                  } as CSSProperties
                }
              >
                <circle
                  cx="100"
                  cy="100"
                  r={96 * s}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={z === 0 ? 1.4 : 1.15}
                  strokeOpacity={z === 0 ? 0.6 : 0.42}
                />
              </svg>
            ))}
          </div>
        </div>

        <div className="reviews-arc-stage">
          {reviews.map((review, i) => {
            const offset = circularOffset(i, active, count);
            const abs = Math.abs(offset);
            const visible = abs <= SIDE_SPAN;
            const isFront = offset === 0;
            const x = offset * 32;
            const z = -abs * 80;
            const rot = offset * -28;
            const scale = 1 - abs * 0.07;
            const opacity = !visible ? 0 : isFront ? 1 : 1 - abs * 0.08;

            return (
              <div
                key={review.id}
                className={`reviews-arc-slot${isFront ? " is-front" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  pointerEvents: isFront ? "auto" : "none",
                  visibility: visible ? "visible" : "hidden",
                }}
                aria-hidden={!isFront}
                onMouseEnter={
                  isFront ? () => setPaused(true) : undefined
                }
                onMouseLeave={
                  isFront ? () => setPaused(false) : undefined
                }
              >
                <ReviewCard
                  review={review}
                  active={isFront}
                  tone={glowTone(offset)}
                />
              </div>
            );
          })}
        </div>

        <div className="relative z-[1] mt-1 flex items-center justify-center gap-2.5 pb-0.5 sm:mt-1.5">
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
      </div>
    </div>
  );
}
