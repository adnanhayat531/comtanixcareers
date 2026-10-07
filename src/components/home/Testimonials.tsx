"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEWS_FALLBACK,
  type GoogleReview,
} from "@/lib/data/google-reviews";

type ApiPayload = {
  rating: number;
  count: number;
  mapsUrl: string;
  placeUrl?: string;
  reviews: GoogleReview[];
  source?: string;
};

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

function ReviewCard({ review }: { review: GoogleReview }) {
  const href = review.authorUrl || review.mapsUrl || GOOGLE_MAPS_REVIEWS_URL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full min-w-0 flex-col rounded-md border border-line bg-white px-5 py-5 transition hover:border-brand/40 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      aria-label={`Verify ${review.author}'s Google review`}
    >
      <div className="flex items-start gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-tint ring-1 ring-line">
          {review.photoUrl ? (
            <Image
              src={review.photoUrl}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="grid h-full w-full place-items-center font-display text-sm font-semibold text-brand">
              {review.initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="type-meta truncate font-bold text-ink">{review.author}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="inline-flex items-center gap-1 font-body text-[11px] font-semibold text-muted">
              <GoogleMark className="h-3.5 w-3.5" />
              Google review
            </span>
            {review.dateLabel ? (
              <span className="type-meta text-muted">{review.dateLabel}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className="mt-3 flex gap-0.5"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating
                ? "fill-[#FBBC05] text-[#FBBC05]"
                : "fill-transparent text-line"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <q className="type-body mt-3 block flex-1 text-ink/90 [quotes:none]">
        {review.quote}
      </q>

      <span className="mt-5 inline-flex items-center gap-1 border-t border-line pt-4 font-body text-xs font-semibold text-brand">
        Verify on Google
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </span>
    </a>
  );
}

export function TestimonialsGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [rating, setRating] = useState<number>(GOOGLE_RATING.score);
  const [count, setCount] = useState<number>(GOOGLE_RATING.count);
  const [mapsUrl, setMapsUrl] = useState(GOOGLE_MAPS_REVIEWS_URL);
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as ApiPayload;
        if (cancelled) return;
        if (typeof data.rating === "number") setRating(data.rating);
        if (typeof data.count === "number") setCount(data.count);
        if (data.mapsUrl) setMapsUrl(data.mapsUrl);
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateArrows() {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [reviews]);

  function scrollByPage(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="min-w-0">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <a
          href={mapsUrl || GOOGLE_MAPS_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 rounded-md border border-line bg-white px-4 py-3 transition hover:border-brand/40 hover:shadow-soft"
        >
          <div>
            <p className="font-display text-3xl font-bold leading-none tracking-tight text-ink">
              {rating.toFixed(1)}
            </p>
            <div className="mt-1.5 flex gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]"
                />
              ))}
            </div>
            <p className="mt-1.5 font-body text-sm font-semibold text-brand group-hover:underline">
              {count} reviews
            </p>
          </div>
          <span className="hidden h-12 w-px bg-line sm:block" aria-hidden />
          <span className="hidden items-center gap-2 sm:inline-flex">
            <GoogleMark className="h-6 w-6" />
            <span className="type-meta max-w-[9rem] text-muted">
              Open on Google Maps to verify
            </span>
            <ExternalLink className="h-4 w-4 text-brand" aria-hidden />
          </span>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-ink transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"
            aria-label="Next reviews"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            data-review-card
            className="w-[min(100%,20rem)] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <p className="type-meta mt-4 text-center text-muted">
        Names and photos come from Google.{" "}
        <a
          href={mapsUrl || GOOGLE_MAPS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand underline-offset-2 hover:underline"
        >
          See all {count} reviews on Google Maps
        </a>
        .
      </p>
    </div>
  );
}
