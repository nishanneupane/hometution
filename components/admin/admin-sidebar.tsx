"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { name: "Vacancies", href: "/admin/vacancies", icon: BookOpen },
  { name: "Tuition Requests", href: "/admin/requests", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        <div className="lg:hidden fixed inset-0 z-40 bg-primary" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-slate-200 px-6">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/hrlogo.png"
                alt="HR Home Tuition Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
              <div>
                <span className="text-xl font-bold text-foreground">HR Home Tuition</span>
                <p className="text-xs text-foreground">Admin Panel</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-blue-700 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-700",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>

                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center space-x-3 text-sm text-slate-600">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
            <div>
              <p className="font-medium text-slate-900">System Status</p>
              <p className="text-xs text-green-600">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
