/** Live Google review shape (Places API authorAttribution). */
export type GoogleReview = {
  id: string;
  author: string;
  initials: string;
  photoUrl: string | null;
  rating: number;
  dateLabel: string;
  quote: string;
  /** Opens this reviewer’s Google Maps profile / contribution */
  authorUrl: string;
  /** Opens Comtanix place reviews on Google Maps */
  mapsUrl: string;
};

/** Opens Comtanix listing — visitors tap “reviews” to verify. */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Comtanix/@33.49775,73.070403,17z";

/** Deep-ish link that prefers the reviews UI when Google resolves the place */
export const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Comtanix Plaza No. 610 Noor Heights Bahria Town Phase 8 Rawalpindi",
  );

export const GOOGLE_RATING = {
  score: 4.8,
  count: 86,
} as const;

/**
 * Fallback only when GOOGLE_MAPS_API_KEY is missing.
 * Prefer live `/api/google-reviews` (real names + profile photos from Google).
 */
export const GOOGLE_REVIEWS_FALLBACK: GoogleReview[] = [
  {
    id: "gr-1",
    author: "Google user",
    initials: "G",
    photoUrl: null,
    rating: 5,
    dateLabel: "Dec 2025",
    quote: "Had fun working here, good people :)",
    authorUrl: GOOGLE_MAPS_REVIEWS_URL,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
  },
  {
    id: "gr-2",
    author: "Google user",
    initials: "G",
    photoUrl: null,
    rating: 5,
    dateLabel: "Aug 2025",
    quote: "Great company with good employee.",
    authorUrl: GOOGLE_MAPS_REVIEWS_URL,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
  },
  {
    id: "gr-3",
    author: "Google user",
    initials: "G",
    photoUrl: null,
    rating: 5,
    dateLabel: "Aug 2025",
    quote: "Efficient, friendly and highly professional throughout.",
    authorUrl: GOOGLE_MAPS_REVIEWS_URL,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
  },
  {
    id: "gr-4",
    author: "Google user",
    initials: "G",
    photoUrl: null,
    rating: 5,
    dateLabel: "Aug 2025",
    quote:
      "I have had a consistently positive experience with this comany. From their excellent customer service to the quality of their product / services.",
    authorUrl: GOOGLE_MAPS_REVIEWS_URL,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
  },
  {
    id: "gr-5",
    author: "Google user",
    initials: "G",
    photoUrl: null,
    rating: 5,
    dateLabel: "Aug 2025",
    quote: "Great company to work with :)",
    authorUrl: GOOGLE_MAPS_REVIEWS_URL,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
  },
];
