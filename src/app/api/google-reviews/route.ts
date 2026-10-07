import { NextResponse } from "next/server";
import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEWS,
} from "@/lib/data/google-reviews";

/** Serves curated real Google reviews (no API key required). */
export async function GET() {
  return NextResponse.json({
    source: "google-maps",
    rating: GOOGLE_RATING.score,
    count: GOOGLE_RATING.count,
    mapsUrl: GOOGLE_MAPS_PLACE_URL,
    placeUrl: GOOGLE_MAPS_PLACE_URL,
    reviews: GOOGLE_REVIEWS,
  });
}
