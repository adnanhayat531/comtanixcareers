/** Full-bleed office photo — pre-framed desk + city (matches design crop) */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v9.jpg"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center max-sm:object-[70%_40%]"
      />
      {/* Left wash for type — keep desk + sunset city visible on the right */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(2,14,18,0.8)_0%,rgba(3,20,26,0.55)_18%,rgba(4,28,34,0.22)_42%,rgba(5,36,42,0.05)_65%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,18,0.25)_0%,transparent_12%,transparent_75%,rgba(2,14,18,0.38)_100%)]" />
    </div>
  );
}
