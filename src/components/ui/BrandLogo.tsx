import Image from "next/image";
import { SITE } from "@/lib/config";

/** Original Comtanix mark path — kept for any non-image brand uses */
export const BRAND_MARK_PATH =
  "M12 8 L38 8 L46 25 L38 42 L12 42 L4 25 Z M32 16.5 L36.5 25 L32 33.5 L27.5 25 Z";

/** Brand mark teal (from logo asset) */
export const BRAND_MARK_COLOR = "#49A4AE";

const LOGO = {
  dark: { src: "/logo-comtanix.png?v=3", width: 370, height: 74 },
  light: { src: "/logo-comtanix-light.png?v=3", width: 370, height: 74 },
} as const;

/** Official Comtanix logo asset — full resolution PNG, no downscale re-encode */
export function BrandLogo({
  className = "",
  light = false,
}: {
  className?: string;
  /** White wordmark for dark surfaces (footer) */
  light?: boolean;
}) {
  const asset = light ? LOGO.light : LOGO.dark;
  return (
    <Image
      src={asset.src}
      alt={SITE.name}
      width={asset.width}
      height={asset.height}
      priority
      quality={100}
      unoptimized
      className={`block max-h-full w-auto object-contain object-left object-center ${className}`}
    />
  );
}
