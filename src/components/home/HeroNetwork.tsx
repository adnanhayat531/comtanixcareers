/** 90svh hero — full-bleed photo, no dark letterbox, no scale zoom */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-comtanix.png?v=wide-orig"
        alt=""
        width={1024}
        height={409}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[center_right] max-md:object-[70%_center]"
      />
    </div>
  );
}
