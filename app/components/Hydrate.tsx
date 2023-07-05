"use client";

import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body className="font-roboto px-4 lg:px-48">{children}</body>
      ) : (
        <body></body>
      )}
    </>
  );
}
