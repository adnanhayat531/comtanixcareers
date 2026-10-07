"use client";

import { type ReactNode } from "react";

/** Section headings with subtle entrance motion */
export function HeadingReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
