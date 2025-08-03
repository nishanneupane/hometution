import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Briefcase, Settings } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
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

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/student"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>For Students</span>
            </Link>
            <Link
              href="/teacher"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <GraduationCap className="h-4 w-4" />
              <span>For Teachers</span>
            </Link>
            <Link
              href="/careers"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Briefcase className="h-4 w-4" />
              <span>Careers</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
