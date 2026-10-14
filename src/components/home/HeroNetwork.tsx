/** Full-bleed futuristic hero — photo + cool grade + glass badge */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-futuristic.jpg?v=1"
        alt=""
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center max-md:object-[center_40%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,12,18,0.78)_0%,rgba(5,18,28,0.55)_42%,rgba(8,40,48,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,212,220,0.18)_0%,transparent_55%)]" />

      <div className="absolute top-[calc(var(--header-h)+1.25rem)] right-[max(1rem,var(--container-pad-x))] hidden max-w-[13.5rem] sm:block lg:right-[max(1.5rem,var(--container-pad-x))]">
        <div className="rounded-2xl border border-white/25 bg-white/10 px-3.5 py-3 shadow-[0_0_32px_-8px_rgba(0,220,230,0.45)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center rounded-full border border-cyan-300/50 bg-cyan-400/15">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/20" />
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
            </span>
            <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-white uppercase">
              Innovation
              <span className="mt-0.5 block tracking-[0.08em] text-cyan-200">
                builds tomorrow
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
