// components/sidebar.tsx
"use client";

import { ArrowLeft, Menu, User, Bell, TableProperties } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const sidebarItems = [
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: TableProperties, label: "Manage", href: "/dashboard/manage" },
  { icon: Bell, label: "Notification", href: "/dashboard/notification" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-20 bg-white shadow-sm flex-col items-center py-6 space-y-8">
        <Link href="/">
          <Button
            className=" bg-orange-500 rounded-lg flex items-center justify-center"
            asChild>
            <ArrowLeft className="w-12 h-12 text-white" />
          </Button>
        </Link>
        <nav className="flex flex-col space-y-6">
          {sidebarItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={index}
                href={item.href}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}>
                <item.icon className="w-6 h-6" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-6">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-8">
              <ArrowLeft className="w-5 h-5 text-white" />
            </div>
            <nav className="space-y-4">
              {sidebarItems.map((item, index) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
