import { CONFIG } from "@/lib/config";

const ICONS: Record<string, string> = {
  Facebook:
    "M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z",
  LinkedIn:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  Instagram: "",
  YouTube:
    "M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4zm4 4.5v5l4.5-2.5z",
  X: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z",
};

function SocialGlyph({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={d} fillRule={name === "YouTube" ? "evenodd" : undefined} />
    </svg>
  );
}

export function SocialLinks({
  light = false,
  circle = false,
}: {
  light?: boolean;
  circle?: boolean;
}) {
  const entries = Object.entries(CONFIG.socials).filter(([, url]) => Boolean(url));

  return (
    <div className="flex flex-wrap gap-2.5">
      {entries.map(([name, url]) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className={`grid h-10 w-10 place-items-center transition ${
            circle ? "rounded-full" : "rounded-md"
          } ${
            light
              ? circle
                ? "border border-white/50 text-white hover:border-white hover:bg-white/10"
                : "border border-white/25 text-white hover:bg-white/10"
              : "border border-line text-sea hover:bg-tint"
          }`}
        >
          <SocialGlyph name={name} />
        </a>
      ))}
    </div>
  );
}
