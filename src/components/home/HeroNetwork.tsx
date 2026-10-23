/** Full-bleed hero — clean office photo (no mockup/UI screenshot) */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v6.jpg"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[68%_45%] max-sm:object-[70%_40%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,22,28,0.72)_0%,rgba(5,34,43,0.4)_48%,rgba(8,53,61,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_40%,rgba(0,238,234,0.05)_0%,transparent_50%)]" />
    </div>
  );
}
