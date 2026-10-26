"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ScrollDir = "down" | "up";

function ChevronIcon({ direction }: { direction: ScrollDir }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
      fill="none"
      aria-hidden
    >
      {direction === "up" ? (
        <path
          d="M6.5 14.5 12 9l5.5 5.5"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6.5 9.5 12 15l5.5-5.5"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function ScrollToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<ScrollDir>("down");
  const lastY = useRef(0);
  const dirLock = useRef<ScrollDir>("down");

  useEffect(() => {
    setVisible(false);
    setDirection("down");
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;
    dirLock.current = "down";

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );

      const delta = scrollTop - lastY.current;
      if (Math.abs(delta) > 6) {
        const nextDir: ScrollDir = delta > 0 ? "down" : "up";
        if (nextDir !== dirLock.current) {
          dirLock.current = nextDir;
          setDirection(nextDir);
        }
        lastY.current = scrollTop;
      }

      if (scrollTop < 80) {
        dirLock.current = "down";
        setDirection("down");
      } else if (scrollTop > maxScroll - 80) {
        dirLock.current = "up";
        setDirection("up");
      }

      // Hidden until user actually scrolls
      setVisible(scrollTop > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const goDown = direction === "down";
  const label = goDown ? "Scroll to bottom" : "Scroll to top";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        if (goDown) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={`fixed right-[max(0.75rem,env(safe-area-inset-right,0px))] bottom-[calc(max(0.75rem,env(safe-area-inset-bottom,0px))+3.5rem)] z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#57a6ad] shadow-[0_2px_10px_rgba(0,0,0,0.22)] transition-[opacity,transform,box-shadow,filter] duration-300 sm:right-5 sm:bottom-[calc(1.25rem+3.75rem)] sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
          : "pointer-events-none opacity-0 translate-y-4 scale-90"
      } hover:brightness-110 hover:shadow-[0_6px_20px_rgba(87,166,173,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57a6ad]`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}
