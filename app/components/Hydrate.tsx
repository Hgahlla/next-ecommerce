"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/store";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();

  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body
          className="font-roboto px-4 lg:px-48"
          data-theme={themeStore.mode}
        >
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}
