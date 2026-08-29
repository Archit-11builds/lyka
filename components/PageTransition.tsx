"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const transitionNames: Record<string, string> = {
  "/": "warp-home",
  "/roast": "warp-roast",
  "/memes": "warp-memes",
  "/maths-sir": "warp-maths",
  "/mission": "warp-space",
  "/archive": "warp-archive",
  "/six": "warp-six",
  "/lyka": "warp-hq",
  "/photos": "warp-photo",
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"in" | "out">("in");
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    setPhase("out");
    const id = window.setTimeout(() => setPhase("in"), 20);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const name = transitionNames[pathname] ?? "warp-default";
  return (
    <div className={`route-shell ${name} phase-${phase}`}>
      <div className="transition-curtain" aria-hidden="true">
        <span className="curtain-logo">LYKA</span>
      </div>
      {children}
    </div>
  );
}
