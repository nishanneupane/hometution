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
  Info,
  Mail,
  Facebook,
  FormInput,
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
  { name: "Reports", href: "/admin/report", icon: Info },
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
                  {(isMobileMenuOpen || !isCollapsed) && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t border-slate-200 p-4">
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-slate-800 mb-3 hidden sm:block">
              Quick Links
            </h3>
          )}
          <div className={`flex ${isCollapsed && "flex-col justify-center"} items-center overflow-auto whitespace-nowrap scrollbar-hide gap-2`}>
            <a
              href="https://mail.zoho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Zoho Mail"
            >
              <Mail className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
              <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white group-hover:block sm:hidden">
                Zoho Mail
              </span>
            </a>
            <a
              href="https://business.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Facebook Business Suite"
            >
              <Facebook className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
              <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white group-hover:block sm:hidden">
                Facebook Business
              </span>
            </a>
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Google Forms"
            >
              <FormInput className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
              <span className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white group-hover:block sm:hidden">
                Google Forms
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}