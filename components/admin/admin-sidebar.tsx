"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  BarChart3,
  Menu,
  X,
  MessageSquare,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/lib/sidebar-context";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students/Schools", href: "/admin/students", icon: Users },
  { name: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { name: "Vacancies", href: "/admin/vacancies", icon: BookOpen },
  { name: "Tuition Requests", href: "/admin/requests", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();


  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg border-slate-200"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shadow-xl",
          isCollapsed ? "w-16" : "w-64 sm:w-72",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/hrlogo.png"
              alt="HR Home Tuition Logo"
              width={isCollapsed ? 40 : 60}
              height={isCollapsed ? 40 : 60}
              className="rounded-xl transition-all duration-300"
            />
            {!isCollapsed && (
              <div className="ml-3 hidden sm:block">
                <span className="text-lg font-bold text-foreground">HR Home Tuition</span>
                <p className="text-xs text-foreground">Admin Panel</p>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn("lg:flex hidden", isCollapsed ? "mx-auto" : "ml-auto")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2 gap-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group",
                    isCollapsed ? "justify-center" : "justify-start",
                    isActive
                      ? "bg-blue-700 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3 hidden sm:inline">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center justify-center sm:justify-start space-x-3 text-sm text-slate-600">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            {!isCollapsed && (
              <div className="hidden sm:block">
                <p className="font-medium text-slate-900">System Status</p>
                <p className="text-xs text-green-600">All systems operational</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}