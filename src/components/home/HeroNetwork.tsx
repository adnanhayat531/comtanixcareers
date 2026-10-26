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
        className="absolute inset-0 h-full w-full object-cover object-[72%_40%] max-sm:object-[78%_38%] sm:object-[65%_48%] md:object-[62%_50%] lg:object-[58%_52%]"
      />
      {/* Left wash for type — stronger on mobile so headline stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(2,14,18,0.88)_0%,rgba(3,20,26,0.62)_22%,rgba(4,28,34,0.28)_48%,rgba(5,36,42,0.06)_70%,transparent_100%)] max-sm:bg-[linear-gradient(165deg,rgba(2,14,18,0.82)_0%,rgba(3,20,26,0.55)_35%,rgba(4,28,34,0.2)_58%,transparent_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,18,0.28)_0%,transparent_14%,transparent_72%,rgba(2,14,18,0.42)_100%)]" />
    </div>
  );
}
