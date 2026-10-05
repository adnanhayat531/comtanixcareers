"use client";

import { type ReactNode } from "react";

/** Section headings: static, Contour-calm */
export function HeadingReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return <div className={className}>{children}</div>;
}
