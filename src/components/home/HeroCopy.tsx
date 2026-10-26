"use client";

/** Upper-left hero cluster — line breaks + teal accents matching design */
export function HeroCopy() {
  return (
    <div className="relative flex w-full min-w-0 max-w-[min(100%,36rem)] flex-col items-start text-left sm:max-w-[38rem] md:max-w-[40rem] lg:max-w-[44rem]">
      <p className="reveal mb-3 text-[0.68rem] font-semibold tracking-[0.16em] text-brand uppercase xs:text-[0.72rem] sm:mb-5 sm:text-[0.8rem] sm:tracking-[0.18em]">
        Your technology partner
      </p>

      <h1 className="reveal relative z-10 w-full text-[clamp(1.55rem,0.95rem+4.2vw,3.35rem)] leading-[1.12] font-bold tracking-[-0.03em] text-ink [text-shadow:0_2px_32px_rgba(0,0,0,0.55)] sm:leading-[1.1]">
        <span className="block">Build what&apos;s next with</span>
        <span className="block">
          <span className="text-brand">AI, technology,</span>
        </span>
        <span className="block">
          and the right <span className="text-brand">expertise.</span>
        </span>
      </h1>
    </div>
  );
}
