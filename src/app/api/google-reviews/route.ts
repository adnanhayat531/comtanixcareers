import { NextResponse } from "next/server";
import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEWS_FALLBACK,
  type GoogleReview,
} from "@/lib/data/google-reviews";

export const revalidate = 86400; // cache 24h

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  publishTime?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlaceResult = {
  id?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function dateLabel(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function mapReviews(
  reviews: PlacesReview[],
  mapsUrl: string,
): GoogleReview[] {
  return reviews
    .filter((r) => (r.text?.text ?? "").trim().length > 0)
    .map((r, i) => {
      const author = r.authorAttribution?.displayName?.trim() || "Google user";
      const authorUrl =
        r.authorAttribution?.uri?.trim() || mapsUrl || GOOGLE_MAPS_REVIEWS_URL;
      return {
        id: `live-${i}-${author}`,
        author,
        initials: initials(author),
        photoUrl: r.authorAttribution?.photoUri?.trim() || null,
        rating: Math.min(5, Math.max(1, Math.round(r.rating ?? 5))),
        dateLabel: dateLabel(r.publishTime),
        quote: (r.text?.text ?? "").trim(),
        authorUrl,
        mapsUrl,
      } satisfies GoogleReview;
    });
}

async function searchPlaceId(apiKey: string, query: string) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 3,
      locationBias: {
        circle: {
          center: { latitude: 33.49775, longitude: 73.070403 },
          radius: 3000,
        },
      },
    }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Places search failed (${res.status}): ${err.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    places?: { id?: string; displayName?: { text?: string } }[];
  };
  const match =
    data.places?.find((p) =>
      /comtanix/i.test(p.displayName?.text ?? ""),
    ) ?? data.places?.[0];
  return match?.id ?? null;
}

async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const fieldMask = [
    "id",
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "reviews",
    "reviews.rating",
    "reviews.text",
    "reviews.publishTime",
    "reviews.authorAttribution",
  ].join(",");

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      next: { revalidate: 86400 },
    },
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Place details failed (${res.status}): ${err.slice(0, 200)}`);
  }
  return (await res.json()) as PlaceResult;
}

export async function GET() {
  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    "";

  const configuredPlaceId = process.env.GOOGLE_PLACE_ID?.trim() || "";

  if (!apiKey) {
    return NextResponse.json({
      source: "fallback",
      rating: GOOGLE_RATING.score,
      count: GOOGLE_RATING.count,
      mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
      placeUrl: GOOGLE_MAPS_PLACE_URL,
      reviews: GOOGLE_REVIEWS_FALLBACK,
      message:
        "Add GOOGLE_MAPS_API_KEY (Places API) to load real reviewer names and photos.",
    });
  }

  try {
    const placeId =
      configuredPlaceId ||
      (await searchPlaceId(
        apiKey,
        "Comtanix Noor Heights Plaza 610 Bahria Town Phase 8 Rawalpindi",
      ));

    if (!placeId) {
      throw new Error("Place not found for Comtanix");
    }

    const place = await fetchPlaceDetails(apiKey, placeId);
    const mapsUrl =
      place.googleMapsUri?.trim() ||
      GOOGLE_MAPS_REVIEWS_URL ||
      GOOGLE_MAPS_PLACE_URL;
    const reviews = mapReviews(place.reviews ?? [], mapsUrl);

    return NextResponse.json({
      source: "google",
      placeId,
      rating: place.rating ?? GOOGLE_RATING.score,
      count: place.userRatingCount ?? GOOGLE_RATING.count,
      mapsUrl,
      placeUrl: mapsUrl,
      reviews: reviews.length > 0 ? reviews : GOOGLE_REVIEWS_FALLBACK,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        source: "fallback",
        rating: GOOGLE_RATING.score,
        count: GOOGLE_RATING.count,
        mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
        placeUrl: GOOGLE_MAPS_PLACE_URL,
        reviews: GOOGLE_REVIEWS_FALLBACK,
        message,
      },
      { status: 200 },
    );
  }
}
