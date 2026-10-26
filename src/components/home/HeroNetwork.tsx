/** Full-bleed office photo — 16:9 pre-framed so desk/keyboard stay sharp without zoom-crop */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v14.jpg"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[68%_42%] sm:object-[62%_40%] md:object-center lg:object-[58%_45%]"
      />
      {/* Left wash for type — stronger on small screens so headline stays readable */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(2,14,18,0.88)_0%,rgba(3,20,26,0.62)_22%,rgba(4,28,34,0.28)_48%,transparent_72%)] sm:bg-[linear-gradient(100deg,rgba(2,14,18,0.78)_0%,rgba(3,20,26,0.5)_16%,rgba(4,28,34,0.2)_40%,transparent_64%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,18,0.35)_0%,transparent_18%,transparent_72%,rgba(2,14,18,0.45)_100%)] sm:bg-[linear-gradient(180deg,rgba(2,14,18,0.2)_0%,transparent_14%,transparent_78%,rgba(2,14,18,0.28)_100%)]" />
    </div>
  );
}
