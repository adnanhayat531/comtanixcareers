import { SITE } from "@/lib/config";

/** Brand mark — SVG so there is never a white image background */
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
      {/* Teal hexagon with transparent diamond cutout — logo brand */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 4 L42.5 14.5 L42.5 35.5 L25 46 L7.5 35.5 L7.5 14.5 Z M25 17 L31 25 L25 33 L19 25 Z"
        fill="var(--brand)"
      />
      {/* Wordmark */}
      <text
        x="54"
        y="33"
        fill={text}
        fontFamily="var(--font-montserrat), Montserrat, system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        {SITE.name}
      </text>
    </svg>
  );
}
