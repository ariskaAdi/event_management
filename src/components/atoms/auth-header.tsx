"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export function AuthHeader() {
  return (
    <header className="w-full">
      <nav className="absolute top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 flex justify-between items-center bg-transparent backdrop-blur-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-3xl font-bold tracking-tight text-white">
            TixFlow.
          </div>
        </Link>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          {[Facebook, Twitter, Linkedin].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="text-sm text-white hover:text-white/80">
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
