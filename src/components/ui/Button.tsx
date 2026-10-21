import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Shared control — compact SaaS sizing, rem-based height via design tokens.
 */
const variants = {
  primary:
    "bg-[#08222b] text-white shadow-[0_8px_20px_-10px_rgba(8,34,43,0.55)] hover:bg-[#0a2c38] active:bg-[#061820]",
  secondary:
    "bg-transparent text-brand border border-brand/80 hover:bg-tint active:bg-tint",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-tint hover:text-brand active:bg-tint",
  white:
    "bg-white text-[#0b2c35] shadow-soft hover:bg-white/95 active:bg-white/90",
  outlineLight:
    "bg-white/10 text-white border border-white/80 backdrop-blur-sm hover:bg-white/18 active:bg-white/25",
  text: "bg-transparent text-brand px-0 py-0 h-auto min-h-0 border-0 hover:underline underline-offset-4",
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
      ? "inline-flex items-center gap-1.5 font-sans text-sm font-semibold transition-colors duration-150 disabled:opacity-60"
      : "inline-flex h-[var(--control-h)] min-h-[var(--control-h)] w-full max-w-full items-center justify-center gap-2 rounded-[var(--radius-md)] px-3.5 font-sans text-sm font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-55 sm:w-auto sm:px-5";

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
