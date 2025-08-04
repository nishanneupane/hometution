"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap, Menu, Phone, Mail, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Students/Schools", href: "/student" },
  { name: "For Teachers", href: "/teacher" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-0 md:py-2 text-sm">
        <div className="container hidden md:flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+977 9767482282</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@hrhometuition.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="secondary" size="sm" >
                Admin Panel
              </Button>
            </Link>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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
                <p className="text-xs text-muted-foreground">हाम्रो पनि, राम्रो पनि</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">

              {/* <Link href="/student">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link> */}
              <Link href="#">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        pathname === item.href ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t space-y-3">
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Admin Panel
                      </Button>
                    </Link>
                    <Link href="/student" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
