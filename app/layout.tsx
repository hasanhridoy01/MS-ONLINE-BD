import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AuthContextProvider from "@/context/AuthContext";
import Footer from "@/components/footer";
import LayoutWrapper from "@/components/layout-wrapper";
import { SnackbarProvider } from "notistack";
import { Providers } from "@/components/providers";

/* 🧩 Load Local Fonts */
const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/static/Inter_24pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_24pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_24pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_28pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-sans",
  display: "swap",
});

const roboto = localFont({
  src: [
    {
      path: "../public/fonts/roboto/static/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/static/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/roboto/static/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto-sans",
  display: "swap",
});

const montserrat = localFont({
  src: [
    {
      path: "../public/fonts/montserrat/static/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/static/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/static/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/montserrat/static/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montserrat-sans",
  display: "swap",
});

const kalam = localFont({
  src: [
    {
      path: "../public/fonts/kalam/Kalam-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/kalam/Kalam-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/kalam/Kalam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kalam-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_COMPANY_NAME} - Fast & Reliable Internet`,
  description:
    "Fast, reliable internet with personalized local support for home and business",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${roboto.variable} ${kalam.variable}`}
    >
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
