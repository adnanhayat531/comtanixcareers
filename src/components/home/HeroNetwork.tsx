/** Full-bleed video background for home hero */
export function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Light readability wash — video stays clearly visible */}
      <div className="absolute inset-0 bg-[#0d2a2a]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/45" />
    </div>
  );
}
