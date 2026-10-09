/** Full-bleed 90svh hero — tall photo fills edge-to-edge, no dark letterbox */
export function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-comtanix.jpg?v=board"
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] [image-rendering:auto] [transform:none]"
      />
    </div>
  );
}
