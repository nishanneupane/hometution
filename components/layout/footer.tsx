import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/hrlogo.png"
                alt="HR Home Tuition Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
              <div>
                <span className="text-xl font-bold text-background">HR Home Tuition</span>
                <p className="text-xs text-background">हाम्रो पनि, राम्रो पनि</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nepal's most trusted home tutoring platform. Connecting students with qualified tutors across Nepal for personalized learning experiences.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61566018680593"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>

              <a
                href="https://www.instagram.com/hrhometuition/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/student" className="text-slate-400 hover:text-white transition-colors">
                  For Students/Schools
                </Link>
              </li>
              <li>
                <Link href="/teacher" className="text-slate-400 hover:text-white transition-colors">
                  For Teachers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400">Home Tutoring</span>
              </li>
              <li>
                <span className="text-slate-400">Online Classes</span>
              </li>
              <li>
                <span className="text-slate-400">Group Sessions</span>
              </li>
              <li>
                <span className="text-slate-400">Exam Preparation</span>
              </li>
              <li>
                <span className="text-slate-400">Assignment Help</span>
              </li>
              <li>
                <span className="text-slate-400">Physical Class</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">Dilli bazar,Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-slate-400">+977 9767482282</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@hrhometuition.com"
                  className="text-slate-400 hover:underline"
                >
                  info@hrhometuition.com
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2024 HR Home Tuition. All rights reserved.</p>

          </div>
        </div>
      </div>
    </footer>
  )
}
