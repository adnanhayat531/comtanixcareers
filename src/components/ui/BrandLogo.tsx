import { SITE } from "@/lib/config";

/** Original Comtanix mark path — flat-top hexagon + tall thin diamond on the right */
export const BRAND_MARK_PATH =
  "M12 8 L38 8 L46 25 L38 42 L12 42 L4 25 Z M32 16.5 L36.5 25 L32 33.5 L27.5 25 Z";

/** Original logo mark teal (from brand asset) — logo only, not UI theme */
export const BRAND_MARK_COLOR = "#55ACB5";

/** Brand mark + wordmark — SVG so there is never a white image background */
export function BrandLogo({
  className = "",
  light = false,
}: {
  className?: string;
  /** White wordmark for dark hero / dark surfaces */
  light?: boolean;
}) {
  const text = light ? "#ffffff" : "var(--ink)";
  return (
    <svg
      className={className}
      viewBox="0 0 220 50"
      width={220}
      height={50}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={SITE.name}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={BRAND_MARK_PATH}
        fill={BRAND_MARK_COLOR}
      />
      <text
        x="54"
        y="33"
        fill={text}
        fontFamily="var(--font-sora), Sora, system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        {SITE.name}
      </text>
    </svg>
  );
}
