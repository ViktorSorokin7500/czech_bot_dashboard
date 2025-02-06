"use client";
import { useEffect, useState } from "react";

function useOrientationListener() {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(orientation: portrait)");

      const handleOrientationChange = (e: MediaQueryListEvent) => {
        setIsPortrait(e.matches);
      };

      setIsPortrait(mediaQuery.matches);

      mediaQuery.addEventListener("change", handleOrientationChange);

      return () => {
        mediaQuery.removeEventListener("change", handleOrientationChange);
      };
    }
  }, []);

  return isPortrait;
}

export default useOrientationListener;
