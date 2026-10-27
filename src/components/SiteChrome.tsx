"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Loaded per route so the home page, which renders neither, doesn't download them (the Navbar pulls in framer-motion).
const Navbar = dynamic(() => import("@/components/Navbar").then((m) => m.Navbar));
const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));

/**
 * Renders the global site chrome (Navbar + Footer) around page content,
 * EXCEPT on the home page ("/"), which is the standalone Veld showpiece and
 * provides its own self-contained nav + footer.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/";

  if (bare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
