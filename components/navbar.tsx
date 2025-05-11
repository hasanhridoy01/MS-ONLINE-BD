"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  { name: "Our Pop", path: "/pop" },
  { name: "Pay Bill", path: "/bill" },
  { name: "Our Service", path: "/service" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Offer", path: "/offer" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full backdrop-blur-3xl transition-all duration-300 md:py-5 py-4 fixed top-0 z-50">
      <div className="container rounded-[24px] px-4 mx-auto md:px-2">
        {/* Top Bar */}
        <div className="bg-muted/30 py-2.5 transition-colors duration-300 rounded-tl-[24px] rounded-tr-[24px]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex md:items-center items-start md:flex-row flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2 pr-4 border-r-2 border-primary/50">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium font-roboto text-[13px] text-foreground/80">
                    +09 639116116 | +880 1749090930
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href="mailto:info@msonlinebd.com"
                    className="hover:text-primary transition-colors font-medium font-roboto text-[13px] text-foreground/80"
                  >
                    info@msonlinebd.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="#"
                  className="hover:text-primary transition-colors font-medium font-roboto text-[13px] text-foreground/80 pr-4 border-r-2 border-primary/50"
                >
                  BTRC Approved Tariff
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors font-medium font-roboto text-[13px] text-foreground/80 pr-4 border-r-2 border-primary/50"
                >
                  Support
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors font-medium font-roboto text-[13px] text-foreground/80"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-background/80 backdrop-blur-md border-b border-border rounded-bl-[24px] rounded-br-[24px]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="NetConnect Logo"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center backdrop-blur-3xl gap-6 bg-primary/10 px-3 py-2 rounded-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={` hover:text-primary transition-colors text-[14px] font-[600] font-inter ${
                      pathname === link.path
                        ? "text-primary"
                        : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 hidden lg:block transition-colors rounded-[8px] font-inter">
                  LOGIN
                </button>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-green-800"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-7 px-1 h-screen z-1">
                <nav className="flex flex-col gap-4">
                  {navLinks.map(({ name, path }) => (
                    <Link
                      key={name}
                      href={path}
                      className={`pb-2 hover:text-primary transition-colors text-[14px] font-[600] font-inter ${
                        pathname === path
                          ? "text-primary"
                          : "text-foreground/80"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {name}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
