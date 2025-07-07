"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
