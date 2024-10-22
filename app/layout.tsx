"use client"
// import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Navbar";
import { RecoilRoot } from "recoil";
import { usePathname } from "next/navigation";
import { Toaster } from "@/src/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const excludedRoutes = ["/signin", "/signup", "/"];

  const isExcluded = excludedRoutes.includes(pathname);
  return (
    <html lang="en">
      <body >
        <Toaster/>
        {isExcluded ? <>
        {children} </>: 
        <RecoilRoot>
          <Navbar />

          {children}
          </RecoilRoot>
        }
        
        
      </body>
    </html>
  );
}
