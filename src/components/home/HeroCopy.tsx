"use client";

/** Upper-left hero cluster — line breaks + teal accents matching design */
export function HeroCopy() {
  return (
    <div className="relative flex w-full min-w-0 max-w-[36rem] flex-col items-start text-left md:max-w-[40rem] lg:max-w-[44rem]">
      <p className="reveal mb-4 text-[0.72rem] font-semibold tracking-[0.18em] text-brand uppercase sm:mb-5 sm:text-[0.8rem]">
        Your technology partner
      </p>

      <h1 className="reveal relative z-10 w-full text-[clamp(1.85rem,1.15rem+3vw,3.35rem)] leading-[1.1] font-bold tracking-[-0.03em] text-ink [text-shadow:0_2px_32px_rgba(0,0,0,0.55)]">
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
