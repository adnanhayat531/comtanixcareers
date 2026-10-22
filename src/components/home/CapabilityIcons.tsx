import type { ReactNode } from "react";

/** Clean duotone service icons — dark stroke + soft teal fills (What We Do reference). */

type IconProps = { className?: string };

const ink = "#0b2c35";
const teal = "#5eb4bc";
const tealSoft = "#a8d8dc";

function Svg({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Gear + document + check badge */
export function IconAiAutomation({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="38" cy="42" r="22" fill={tealSoft} fillOpacity="0.55" />
      <path
        d="M38 22.5c1.2 0 2.1.9 2.3 2.1l.6 3.6 3.4-1.3a2.4 2.4 0 012.9 1.2l1.8 3.2a2.4 2.4 0 01-.9 3.1l-3 2.1 3 2.1a2.4 2.4 0 01.9 3.1l-1.8 3.2a2.4 2.4 0 01-2.9 1.2l-3.4-1.3-.6 3.6a2.4 2.4 0 01-2.3 2.1h-3.6a2.4 2.4 0 01-2.3-2.1l-.6-3.6-3.4 1.3a2.4 2.4 0 01-2.9-1.2l-1.8-3.2a2.4 2.4 0 01.9-3.1l3-2.1-3-2.1a2.4 2.4 0 01-.9-3.1l1.8-3.2a2.4 2.4 0 012.9-1.2l3.4 1.3.6-3.6A2.4 2.4 0 0134.4 22.5H38z"
        stroke={ink}
        strokeWidth="2.4"
        fill="#fff"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="44" r="8" stroke={ink} strokeWidth="2.4" fill={teal} fillOpacity="0.35" />
      <circle cx="38" cy="44" r="3.2" fill={ink} />
      <rect
        x="68"
        y="18"
        width="34"
        height="44"
        rx="4"
        stroke={ink}
        strokeWidth="2.4"
        fill="#fff"
      />
      <path d="M76 30h18M76 38h18M76 46h12" stroke={teal} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="92" cy="62" r="14" fill="#fff" stroke={ink} strokeWidth="2.4" />
      <path
        d="M86 62.5l4 4 8.5-9"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Browser with code + laptop + phone */
export function IconSoftwareDev({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="8" y="10" width="58" height="40" rx="5" stroke={ink} strokeWidth="2.4" fill="#fff" />
      <path d="M8 20h58" stroke={ink} strokeWidth="2.4" />
      <circle cx="16" cy="15" r="1.8" fill={teal} />
      <circle cx="23" cy="15" r="1.8" fill={teal} />
      <circle cx="30" cy="15" r="1.8" fill={teal} />
      <path
        d="M24 32l-7 6 7 6M42 32l7 6-7 6M36 28l-5 20"
        stroke={ink}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="48"
        y="38"
        width="48"
        height="32"
        rx="4"
        stroke={ink}
        strokeWidth="2.4"
        fill={tealSoft}
        fillOpacity="0.7"
      />
      <path d="M48 46h48" stroke={ink} strokeWidth="2.2" />
      <path
        d="M64 56l-5 4 5 4M80 56l5 4-5 4"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="92" y="18" width="20" height="36" rx="3.5" stroke={ink} strokeWidth="2.4" fill="#fff" />
      <path d="M97 26h10M97 33h10M97 40h7" stroke={teal} strokeWidth="2" strokeLinecap="round" />
      <circle cx="102" cy="48" r="1.6" fill={ink} />
    </Svg>
  );
}

/** Shield with padlock */
export function IconCybersecurity({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M60 8l34 12v22c0 20-14 32-34 38C40 74 26 62 26 42V20L60 8z"
        stroke={ink}
        strokeWidth="2.6"
        fill={tealSoft}
        fillOpacity="0.55"
        strokeLinejoin="round"
      />
      <path
        d="M60 8v72c20-6 34-18 34-38V20L60 8z"
        fill={teal}
        fillOpacity="0.4"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <rect
        x="48"
        y="38"
        width="24"
        height="20"
        rx="3"
        stroke={ink}
        strokeWidth="2.4"
        fill="#fff"
      />
      <path
        d="M54 38v-5a6 6 0 0112 0v5"
        stroke={ink}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="48" r="2.4" fill={ink} />
      <path d="M60 50.5v4" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
}

/** Cloud over servers linked to monitors */
export function IconCloudInfra({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M42 34c0-9 7-16 16-16 6.5 0 12 3.5 14.5 9A13 13 0 0190 50H36a10.5 10.5 0 01.8-15.5A14 14 0 0142 34z"
        stroke={ink}
        strokeWidth="2.5"
        fill={tealSoft}
        fillOpacity="0.65"
        strokeLinejoin="round"
      />
      <rect x="46" y="40" width="28" height="18" rx="2.5" stroke={ink} strokeWidth="2.2" fill="#fff" />
      <path d="M51 46h18M51 52h12" stroke={teal} strokeWidth="2" strokeLinecap="round" />
      <path d="M52 58v8M68 58v8M60 58v8" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="22" y="68" width="18" height="12" rx="2" stroke={ink} strokeWidth="2" fill={teal} fillOpacity="0.45" />
      <rect x="51" y="68" width="18" height="12" rx="2" stroke={ink} strokeWidth="2" fill={teal} fillOpacity="0.45" />
      <rect x="80" y="68" width="18" height="12" rx="2" stroke={ink} strokeWidth="2" fill={teal} fillOpacity="0.45" />
      <path d="M31 68V58M60 68V58M89 68V58" stroke={ink} strokeWidth="1.8" />
    </Svg>
  );
}

/** Cart with product boxes */
export function IconEcommerce({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M18 24h12l8 36h48l10-26H42"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46" cy="72" r="5.5" stroke={ink} strokeWidth="2.4" fill={teal} fillOpacity="0.5" />
      <circle cx="74" cy="72" r="5.5" stroke={ink} strokeWidth="2.4" fill={teal} fillOpacity="0.5" />
      <rect x="48" y="12" width="16" height="14" rx="2" stroke={ink} strokeWidth="2.1" fill={tealSoft} />
      <rect x="66" y="8" width="16" height="14" rx="2" stroke={ink} strokeWidth="2.1" fill={teal} fillOpacity="0.45" />
      <rect x="84" y="14" width="16" height="14" rx="2" stroke={ink} strokeWidth="2.1" fill="#fff" />
      <path d="M52 18h8M70 14h8M88 20h8" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

/** Invoice + calculator */
export function IconAccounting({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M16 12h40l14 14v48a4 4 0 01-4 4H16a4 4 0 01-4-4V16a4 4 0 014-4z"
        stroke={ink}
        strokeWidth="2.5"
        fill="#fff"
        strokeLinejoin="round"
      />
      <path d="M56 12v14h14" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="36" cy="42" r="12" stroke={ink} strokeWidth="2.3" fill={tealSoft} fillOpacity="0.7" />
      <path
        d="M36 35v14M31 39.5c1.4-2 3-2.8 5-2.8s3.6 1 3.6 2.8c0 3.8-8.6 2.2-8.6 6.4 0 1.8 1.7 3.2 5 3.2s3.8-.8 4.8-2"
        stroke={ink}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <rect
        x="76"
        y="24"
        width="34"
        height="48"
        rx="4"
        stroke={ink}
        strokeWidth="2.5"
        fill={teal}
        fillOpacity="0.35"
      />
      <rect x="82" y="30" width="22" height="10" rx="2" stroke={ink} strokeWidth="2" fill="#fff" />
      <circle cx="86" cy="50" r="2.6" fill={ink} />
      <circle cx="93" cy="50" r="2.6" fill={ink} />
      <circle cx="100" cy="50" r="2.6" fill={ink} />
      <circle cx="86" cy="58" r="2.6" fill={ink} />
      <circle cx="93" cy="58" r="2.6" fill={ink} />
      <circle cx="100" cy="58" r="2.6" fill="#fff" stroke={ink} strokeWidth="1.4" />
    </Svg>
  );
}

/** Handshake + rising chart */
export function IconBusinessDev({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="32" cy="24" r="9" stroke={ink} strokeWidth="2.4" fill={tealSoft} />
      <circle cx="88" cy="24" r="9" stroke={ink} strokeWidth="2.4" fill={tealSoft} />
      <path
        d="M24 56c0-10 6-18 16-18h5l12 11 12-11h5c10 0 16 8 16 18"
        stroke={ink}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 38c3 5 8 9 20 9s17-4 20-9"
        stroke={ink}
        strokeWidth="2.3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M18 72l22-18 12 10 28-24"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70 40h16v16"
        stroke={teal}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Pie + bars + magnifier */
export function IconDigitalMarketing({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="32" cy="36" r="20" stroke={ink} strokeWidth="2.5" fill="#fff" />
      <path
        d="M32 36V16a20 20 0 0117.3 10z"
        fill={teal}
        stroke={ink}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M32 36l-14 14A20 20 0 0032 16z"
        fill={tealSoft}
        stroke={ink}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="58" y="42" width="8" height="22" rx="1.5" stroke={ink} strokeWidth="2" fill={tealSoft} />
      <rect x="70" y="32" width="8" height="32" rx="1.5" stroke={ink} strokeWidth="2" fill={teal} fillOpacity="0.55" />
      <rect x="82" y="22" width="8" height="42" rx="1.5" stroke={ink} strokeWidth="2" fill={teal} />
      <circle cx="98" cy="24" r="12" stroke={ink} strokeWidth="2.5" fill="#fff" />
      <circle cx="98" cy="24" r="6" stroke={ink} strokeWidth="2" fill={tealSoft} />
      <path d="M107 33l10 10" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

export const CAPABILITY_ILLUSTRATIONS = [
  IconAiAutomation,
  IconSoftwareDev,
  IconCybersecurity,
  IconCloudInfra,
  IconEcommerce,
  IconAccounting,
  IconBusinessDev,
  IconDigitalMarketing,
] as const;

/** Linked workflow nodes */
export function IconRealOperations({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="12" y="14" width="24" height="24" rx="4" stroke={ink} strokeWidth="2.5" fill={tealSoft} />
      <rect x="84" y="14" width="24" height="24" rx="4" stroke={ink} strokeWidth="2.5" fill={tealSoft} />
      <rect x="48" y="48" width="24" height="24" rx="4" stroke={ink} strokeWidth="2.5" fill="#fff" />
      <path
        d="M36 26h48M24 38v10c0 6 4 12 12 12h12M96 38v10c0 6-4 12-12 12H72"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="26" r="3" fill={ink} />
      <circle cx="96" cy="26" r="3" fill={ink} />
      <circle cx="60" cy="60" r="3" fill={teal} />
    </Svg>
  );
}

/** Shield + check */
export function IconIntelligence({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M60 8l34 12v22c0 20-14 32-34 38C40 74 26 62 26 42V20L60 8z"
        stroke={ink}
        strokeWidth="2.6"
        fill={tealSoft}
        fillOpacity="0.6"
        strokeLinejoin="round"
      />
      <path
        d="M60 8v72c20-6 34-18 34-38V20L60 8z"
        fill={teal}
        fillOpacity="0.4"
        stroke={ink}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M44 44l10 10 22-24"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Partnership handshake */
export function IconBeyondDelivery({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="34" cy="22" r="9" stroke={ink} strokeWidth="2.4" fill={tealSoft} />
      <circle cx="86" cy="22" r="9" stroke={ink} strokeWidth="2.4" fill={tealSoft} />
      <path
        d="M26 54c0-10 6-18 16-18h5l13 12 13-12h5c10 0 16 8 16 18"
        stroke={ink}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 36c3 5 9 9 18 9s15-4 18-9"
        stroke={ink}
        strokeWidth="2.3"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M48 62h24M54 68h12" stroke={teal} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M60 48v28" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
    </Svg>
  );
}

export const WHY_ILLUSTRATIONS = [
  IconRealOperations,
  IconIntelligence,
  IconBeyondDelivery,
] as const;
