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
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Light readability wash — video stays clearly visible */}
      <div className="absolute inset-0 bg-deep/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/40 via-transparent to-deep/45" />
    </div>
  );
}
