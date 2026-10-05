import Image from "next/image";

/** Full-bleed soft office floor for home hero */
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
      {/* Soft center dim for white copy over open aisle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.2)_48%,transparent_75%)]" />
    </div>
  );
}
