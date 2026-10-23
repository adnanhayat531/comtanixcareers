import { CONFIG } from "@/lib/config";

const ICONS: Record<string, string> = {
  Facebook:
    "M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z",
  LinkedIn:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  Instagram: "",
};

function SocialGlyph({ name, large }: { name: string; large?: boolean }) {
  const iconClass = large ? "h-5 w-5" : "h-4 w-4";
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export function SocialLinks({
  light = false,
  circle = false,
  large = false,
}: {
  light?: boolean;
  circle?: boolean;
  large?: boolean;
}) {
  const entries = Object.entries(CONFIG.socials).filter(([, url]) => Boolean(url));

  return (
    <div
      className={`flex min-w-0 items-center ${large ? "flex-nowrap gap-1.5 min-[380px]:gap-2 sm:gap-2.5" : "flex-wrap gap-2.5"}`}
    >
      {entries.map(([name, url]) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className={`grid shrink-0 place-items-center transition ${
            large ? "h-9 w-9 min-[380px]:h-10 min-[380px]:w-10 sm:h-11 sm:w-11" : "h-10 w-10"
          } ${circle ? "rounded-full" : "rounded-md"} ${
            light
              ? circle
                ? "border border-white/60 text-white hover:border-white hover:bg-white hover:text-brand"
                : "border border-white/40 text-white hover:bg-white/15"
              : "border border-line text-brand hover:border-brand hover:bg-tint hover:text-brand"
          }`}
        >
          <SocialGlyph name={name} large={large} />
        </a>
      ))}
    </div>
  );
}
