"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Twitter, Linkedin } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "../ui/button";
import AvatarProfile from "../profile/avatar-profile";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Category", href: "/rooms" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  return (
    <header className="w-full">
      <nav
        className={`absolute top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 flex justify-between items-center transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-stone-900/95 backdrop-blur-sm"
            : "bg-transparent"
        }`}>
        <Link href="/" className="flex items-center">
          <div className="text-4xl font-bold tracking-tight text-white">
            TixFlow.
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-white underline underline-offset-4"
                  : "text-white hover:text-white/80"
              }`}>
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              href="/tickets"
              className={`text-sm font-medium transition-colors ${
                pathname === "/payment"
                  ? "text-white underline underline-offset-4"
                  : "text-white hover:text-white/80"
              }`}>
              My Tickets
            </Link>
          )}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <AvatarProfile />
          ) : (
            <>
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-sm text-white hover:text-white/80">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
              <Button
                className="bg-white text-black hover:backdrop-blur-2xl hover:text-white hover:bg-white/20"
                asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-stone-900/95 backdrop-blur-sm z-40 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden pt-20`}>
        <div className="container mx-auto px-4 py-8 flex flex-col h-full">
          <div className="flex flex-col space-y-6 text-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg font-medium py-2 border-b border-white/10 ${
                  pathname === href ? "text-white font-bold" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center space-x-4 mb-4">
            <Button
              className="bg-white text-black hover:backdrop-blur-2xl hover:text-white hover:bg-white/20"
              asChild>
              <Link href="/signIn" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </Button>
          </div>

          <div className="mt-auto flex justify-center space-x-6">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <Link key={i} href="#" className="text-white hover:text-white/80">
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
