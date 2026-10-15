/** Full-bleed futuristic hero — photo + cool grade */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-futuristic.jpg?v=2"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center max-md:object-[center_40%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,27,32,0.82)_0%,rgba(5,34,43,0.58)_42%,rgba(8,53,61,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,238,234,0.12)_0%,transparent_55%)]" />
    </div>
  );
}
