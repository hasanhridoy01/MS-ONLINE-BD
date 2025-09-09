// components/layout-wrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <div>
        <Navbar />
        {!isDashboard && <HeroSection />}
      </div>
      {children}
      <Footer />
    </>
  );
}
