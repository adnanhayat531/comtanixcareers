/** Real Google Maps reviews for Comtanix (scraped from official listing). */
export type GoogleReview = {
  id: string;
  author: string;
  initials: string;
  photoUrl: string | null;
  rating: number;
  dateLabel: string;
  quote: string;
  /** Reviewer’s Google contributions — verify this person */
  authorUrl: string;
  /** Comtanix place reviews on Google Maps */
  mapsUrl: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "G";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Official Comtanix Google Maps place (reviews tab). */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Comtanix/@33.4977501,73.0704028,17z/data=!4m8!3m7!1s0x38df95f8d0000001:0x3b57baa0437d08ab!8m2!3d33.4977501!4d73.0704028!9m1!1b1!16s%2Fg%2F11fmqy91pv";

export const GOOGLE_MAPS_REVIEWS_URL = GOOGLE_MAPS_PLACE_URL;

export const GOOGLE_RATING = {
  score: 4.8,
  count: 86,
} as const;

const RAW = [
  {
    author: "Rashid Yaqub",
    photoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUNYXZPD0VFc9vybvQIEwc2XepOs0rmwvxdaNkxxDhlCem2RPdy=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "Excellent service and very professional team! Highly recommend this company for their dedication and customer-first approach.",
    authorUrl:
      "https://www.google.com/maps/contrib/102971384760177436611/reviews?hl=en",
  },
  {
    author: "Taha Asif",
    photoUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocIJvZBI6Ehz-qslylCzwJsD89a8Z9NdZOzeEvudaGVGQqRmdg=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "I had a great experience working here. The organisation truly values its talent, and the management is approachable and supportive. The company’s culture promotes growth, respect, and teamwork, making it an excellent place to work.",
    authorUrl:
      "https://www.google.com/maps/contrib/113201591520745179994/reviews?hl=en",
  },
  {
    author: "Suleman Ch",
    photoUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocLezlPDNwbakPLtnd2S684fzUSp5NiN8o7q9vCRErb3EFLtGg=w120-h120-p-rp-mo-ba12-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "Great place to work with a friendly and healthy environment. Management is very cooperative and supportive. Salaries are always paid on time, and there are good opportunities to learn and grow professionally. Highly recommended workplace.",
    authorUrl:
      "https://www.google.com/maps/contrib/117197829257469321742/reviews?hl=en",
  },
  {
    author: "Khan Mohid",
    photoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjV1iUF0Oc4Y1rl9wNc05zq6RNUyZn2zJZAdX1rJvRVMZ-rnFWA=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "Comtanix has one of the best working environments, specially for those young individuals who are eager to start their professional journey at a place where everybody gets equal opportunity to strive and grow. Highly recommended for any individual with a business and growth driven mindset and good communication skills. Apart from the work culture the environment is really calm, and work here feels like home.",
    authorUrl:
      "https://www.google.com/maps/contrib/116761986124167627667/reviews?hl=en",
  },
  {
    author: "Muhammad Uzair Toor",
    photoUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocIYSnd2SuiuC2Y_MfT2u4mtmy9EjNre_JonxYgu6jWA-NRQ6JA=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "Amazing environment and work culture. Comtanix is one the few companies that offers its employees one of the best platforms to grow. They give good benefits along with competitive packages. My overall experience in Comtanix has been fabulous.",
    authorUrl:
      "https://www.google.com/maps/contrib/107475391592204644466/reviews?hl=en",
  },
  {
    author: "Muhammad Waseeq",
    photoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUOPMBRgVED-GSHQWqg0iHnorxPKvHHA55gMqvEPK3PvvV7sFs=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "It's a great company with a professional and supportive team. Happy to be part of this organization.",
    authorUrl:
      "https://www.google.com/maps/contrib/108706213413508986599/reviews?hl=en",
  },
  {
    author: "Harry Jutt",
    photoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUP3rd-mX98Qqdp3TcNDNbE3m-om3lP2uKaLhF5WlPOGrYeVM0=w120-h120-p-rp-mo-ba12-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote: "Great office environment, staff is amazing — great place to do a job.",
    authorUrl:
      "https://www.google.com/maps/contrib/109589916461774963511/reviews?hl=en",
  },
  {
    author: "Faraz Hasan",
    photoUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocJae2lAqK7efeNfJY6NKPcqYr7Z5KK5CMwzw4eedkv5g5vbVzI=w120-h120-p-rp-mo-br100",
    rating: 4,
    dateLabel: "5 months ago",
    quote:
      "A great skill-developing and learning environment with supportive management.",
    authorUrl:
      "https://www.google.com/maps/contrib/100325626326968707999/reviews?hl=en",
  },
  {
    author: "Noman Hussain",
    photoUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocI3NOCKKveotGdzFBz6LsT17wN3wj4GORjGqxevtPi3vB1j=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote: "Good environment. Great work!",
    authorUrl:
      "https://www.google.com/maps/contrib/116590985745006448404/reviews?hl=en",
  },
  {
    author: "Wajid Awan",
    photoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVfvw1-qZVb6Hla614tQl1TXyGWkAGsZoBLm5WzDtZKjsosKK4P=w120-h120-p-rp-mo-br100",
    rating: 5,
    dateLabel: "5 months ago",
    quote:
      "Comtanix in Phase 8 offers a welcoming workplace, a cooperative team, and a good environment.",
    authorUrl:
      "https://www.google.com/maps/contrib/114073027021680666277/reviews?hl=en",
  },
] as const;

export const GOOGLE_REVIEWS: GoogleReview[] = RAW.map((r, i) => ({
  id: `gr-${i + 1}`,
  author: r.author,
  initials: initials(r.author),
  photoUrl: r.photoUrl,
  rating: r.rating,
  dateLabel: r.dateLabel,
  quote: r.quote,
  authorUrl: r.authorUrl,
  mapsUrl: GOOGLE_MAPS_PLACE_URL,
}));

/** 4★ and 5★ only — used on the public reviews orbit. */
export const POSITIVE_GOOGLE_REVIEWS: GoogleReview[] = GOOGLE_REVIEWS.filter(
  (r) => r.rating >= 4,
);

/** @deprecated use GOOGLE_REVIEWS */
export const GOOGLE_REVIEWS_FALLBACK = GOOGLE_REVIEWS;
