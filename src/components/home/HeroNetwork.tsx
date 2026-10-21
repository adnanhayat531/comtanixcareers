/** Full-bleed futuristic hero — photo + cool grade */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v5.jpg?v=1"
        alt=""
        width={1024}
        height={689}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] max-md:object-[center_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,27,32,0.50)_0%,rgba(5,34,43,0.28)_45%,rgba(8,53,61,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,238,234,0.06)_0%,transparent_55%)]" />
    </div>
  );
}
