/** 90svh hero — full-bleed photo, no dark letterbox, no scale zoom */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-office.png?v=1"
        alt=""
        width={1600}
        height={900}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center max-md:object-[center_45%]"
      />
    </div>
  );
}
