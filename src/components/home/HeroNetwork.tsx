import Image from "next/image";

/** Full-bleed hero visual — office asset + brand tech overlays */
export function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src="/hero-floor.jpg"
        alt=""
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Deep brand wash for enterprise contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/80 via-ink/55 to-deep/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(47,122,132,0.45)_0%,transparent_58%)]" />

      {/* Subtle network mesh — tech presence without external art */}
      <div className="geometric-mesh absolute inset-0 opacity-30" />
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="rgba(228,240,241,0.45)" strokeWidth="1" fill="none">
          <path d="M80 620 C220 480 340 520 480 360 S780 200 920 280 S1080 420 1140 180" />
          <path d="M40 200 C180 260 260 140 420 220 S700 340 860 180 S1040 120 1180 260" />
          <path d="M160 740 C300 600 480 680 640 520 S920 400 1100 560" />
        </g>
        <g fill="rgba(255,255,255,0.75)">
          <circle cx="480" cy="360" r="3.5" />
          <circle cx="640" cy="520" r="3" />
          <circle cx="860" cy="180" r="3.5" />
          <circle cx="920" cy="280" r="2.5" />
          <circle cx="420" cy="220" r="2.5" />
          <circle cx="1100" cy="560" r="3" />
        </g>
      </svg>
    </div>
  );
}
