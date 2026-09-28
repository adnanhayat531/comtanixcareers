import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Contour-inspired controls: pill shape, ~59px tall, 18px/700 Montserrat.
 * Colors stay on Comtanix teal theme.
 */
const variants = {
  primary:
    "bg-gradient-to-r from-sea to-brand text-white hover:brightness-105 hover:shadow-[0_10px_28px_rgba(45,106,106,0.35)] active:brightness-95",
  secondary:
    "bg-transparent text-sea border-2 border-sea hover:bg-tint active:bg-tint",
  ghost:
    "bg-transparent text-ink border-2 border-transparent hover:bg-tint hover:text-sea active:bg-tint",
  white:
    "bg-white text-[#474747] hover:bg-[#f7f8f9] active:bg-tint shadow-soft",
  outlineLight:
    "bg-transparent text-white border-2 border-white hover:bg-white/10 active:bg-white/15",
  text: "bg-transparent text-sea px-0 py-0 h-auto min-h-0 border-0 hover:underline underline-offset-4",
} as const;

type Variant = keyof typeof variants;

type Common = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const base =
    variant === "text"
      ? "inline-flex items-center gap-1.5 font-display text-base font-bold transition-colors duration-200 disabled:opacity-60"
      : "inline-flex h-[52px] min-h-[52px] items-center justify-center gap-2 rounded-full px-8 font-display text-base font-bold tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-55 md:h-[56px] md:min-h-[56px] md:px-9 md:text-lg";

  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
