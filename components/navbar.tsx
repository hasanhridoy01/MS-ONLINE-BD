"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import LoginModal from "./login-modal";
import { AuthContext } from "@/context/AuthContext";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import axios from "axios";
import useHandleSnackbar from "@/lib/HandleSnakbar";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  // { name: "Our Pop", path: "/pop" },
  { name: "Pay Bill", path: "/dashboard" },
  { name: "Our Service", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Offer", path: "/offer" },
];

export default function Navbar() {
  const { msonline_auth, user, logout } = React.useContext<any>(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogOut = async () => {
    // Close the menu
    setIsMenuOpen(false);

    // Confirm logout
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${msonline_auth.token}`,
          },
        }
      );

      if (response.status !== 200) {
        handleSnackbarOpen("Logout failed. Please try again.", "error", 3000);
        return;
      }

      // Client-side logout
      logout();

      // ✅ Show toast
      handleSnackbarOpen("Logout Successful", "success", 3000);
    } catch (error) {
      console.error("Error during logout:", error);
      handleSnackbarOpen("An error occurred while logging out.", "error", 3000);
    }
  };

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
                  href="/approved"
                  className={`transition-colors font-roboto text-[13px] pr-4 border-r-2 border-primary/50
    ${
      pathname === "/approved"
        ? "text-primary font-bold"
        : "text-foreground/80 hover:text-primary font-medium"
    }`}
                >
                  BTRC Approved Tariff
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors font-medium font-roboto text-[13px] text-foreground/80"
                >
                  Support
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
                {/* <ThemeSwitcher /> */}

                {/* Login Modal */}
                <div className="hidden lg:block">
                  {msonline_auth.token ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-3 rounded-xl border border-primary px-4 py-2 shadow-sm bg-primary/10 transition-all duration-200">
                          <Avatar className="h-8 w-8 border-2 border-primary">
                            <AvatarImage
                              src={user?.avatarUrl || "/default-avatar.png"}
                              alt={user?.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                              {user?.name?.[0]?.toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold text-primary">
                            {user?.name}
                          </span>
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-44 shadow-lg p-3"
                      >
                        {/* Header */}
                        <div className="flex flex-col border-b border-primary/20 pb-2 mb-2">
                          <span className="font-semibold text-primary">
                            {user?.name}
                          </span>
                          <span className="text-sm text-primary/80">
                            {user?.email}
                          </span>
                        </div>

                        {/* Dashboard Link */}
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-primary hover:bg-primary/10 transition"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>

                          {/* Logout */}
                          <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <LoginModal />
                  )}
                </div>

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
                {/* Login Modal */}
                <div className="block lg:hidden mt-3">
                  {msonline_auth.token ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-3 rounded-xl border border-primary px-4 py-2 shadow-sm bg-primary/10 transition-all duration-200">
                          <Avatar className="h-8 w-8 border-2 border-primary">
                            <AvatarImage
                              src={user?.avatarUrl || "/default-avatar.png"}
                              alt={user?.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                              {user?.name?.[0]?.toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold text-primary">
                            {user?.name}
                          </span>
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="end"
                        className="w-44 shadow-lg p-3"
                      >
                        {/* Header */}
                        <div className="flex flex-col border-b border-primary/20 pb-2 mb-2">
                          <span className="font-semibold text-primary">
                            {user?.name}
                          </span>
                          <span className="text-sm text-primary/80">
                            {user?.email}
                          </span>
                        </div>

                        {/* Dashboard Link */}
                        <div className="flex flex-col gap-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-primary hover:bg-primary/10 transition"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>

                          {/* Logout */}
                          <button
                            onClick={handleLogOut}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <LoginModal />
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
