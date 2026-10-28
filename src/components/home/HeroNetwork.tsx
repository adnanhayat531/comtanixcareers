/** Full-bleed office photo — exact home hero scene (no photo edits) */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v20.jpg"
        alt=""
        width={2560}
        height={1230}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center max-sm:object-[58%_45%] sm:object-center"
      />
      {/* Light readability wash only — keep BG photo look intact */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(2,14,18,0.72)_0%,rgba(3,20,26,0.42)_22%,rgba(4,28,34,0.14)_48%,transparent_70%)] max-sm:bg-[linear-gradient(165deg,rgba(2,14,18,0.78)_0%,rgba(3,20,26,0.48)_40%,transparent_78%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,18,0.28)_0%,transparent_14%,transparent_78%,rgba(2,14,18,0.4)_100%)]" />
    </div>
  );
}
