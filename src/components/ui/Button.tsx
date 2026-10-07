import Link from "next/link";
import { type ReactNode } from "react";

/**
 * Contour-like controls: sharp corners, compact height, corporate weight.
 */
const variants = {
  primary:
    "bg-brand text-white hover:brightness-105 active:brightness-95",
  secondary:
    "bg-transparent text-brand border border-brand hover:bg-tint active:bg-tint",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-tint hover:text-brand active:bg-tint",
  white:
    "bg-white text-brand hover:bg-on-sea active:bg-tint",
  outlineLight:
    "bg-transparent text-white border border-white hover:bg-white/10 active:bg-white/15",
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
      ? "inline-flex items-center gap-1.5 font-display text-sm font-semibold transition-colors duration-150 disabled:opacity-60"
      : "inline-flex h-10 min-h-10 w-full max-w-full items-center justify-center gap-2 rounded-md px-4 font-display text-sm font-semibold tracking-tight transition-colors duration-150 disabled:pointer-events-none disabled:opacity-55 sm:w-auto sm:px-5 md:h-11 md:min-h-11 md:px-6";

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
