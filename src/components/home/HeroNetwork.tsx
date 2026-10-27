/** Full-bleed office photo — object-position tuned per breakpoint so desk/people stay in frame */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-home-v14.jpg"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[70%_48%] max-sm:object-[72%_52%] sm:object-[66%_46%] md:object-[60%_44%] lg:object-[58%_45%]"
      />
      {/* Left/top wash — stronger on phones so headline stays readable over the photo */}
      <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(2,14,18,0.9)_0%,rgba(3,20,26,0.62)_42%,rgba(4,28,34,0.28)_68%,transparent_88%)] sm:bg-[linear-gradient(100deg,rgba(2,14,18,0.8)_0%,rgba(3,20,26,0.52)_18%,rgba(4,28,34,0.22)_42%,transparent_66%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,18,0.4)_0%,transparent_16%,transparent_68%,rgba(2,14,18,0.55)_100%)] sm:bg-[linear-gradient(180deg,rgba(2,14,18,0.22)_0%,transparent_14%,transparent_76%,rgba(2,14,18,0.32)_100%)]" />
    </div>
  );
}
