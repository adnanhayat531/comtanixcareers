import Image from "next/image";

/** Full-bleed hero visual — original office photo, no overlays */
export function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src="/hero-floor.jpg"
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
