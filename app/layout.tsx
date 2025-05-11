import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat, Roboto, Kalam } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const kalam = Kalam({
  variable: "--font-kalam-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "NetConnect - Fast & Reliable Internet",
  description:
    "Fast, reliable internet with personalized local support for home and business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${roboto.variable} ${kalam.variable}`}
      >
        <ThemeProvider>
          <div className="">
            <Navbar />
            <HeroSection />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
