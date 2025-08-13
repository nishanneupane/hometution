"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, Users } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Message sent successfully! We'll get back to you soon.")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="w-fit mx-auto">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              We're Here to
              <span className="text-primary"> Help You</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our tutoring services? Need help finding the right tutor? Our friendly support team
              is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Sun-Fri 9AM-6PM</p>
                <p className="font-semibold">+977 9767482282</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">We reply within 24 hours</p>
                <p className="font-semibold">info@hrhometuition.com</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Our main office</p>
                <p className="font-semibold">Dilli bazar,Kathmandu, Nepal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Sunday - Friday</p>
                <p className="font-semibold">9:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>


          {/* Additional Info */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4">
                Quick Help
              </Badge>
              <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">How do I find a tutor?</h4>
                  <p className="text-sm text-muted-foreground">
                    Simply fill out our student registration form with your requirements, and we'll match you with
                    qualified tutors in your area.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">How much do tutoring sessions cost?</h4>
                  <p className="text-sm text-muted-foreground">
                    Rates vary based on subject, grade level, and tutor experience. Most sessions range from Rs.
                    500-2000 per hour.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Can I change tutors if needed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we understand that finding the right fit is important. You can request a different tutor at
                    any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Map Section */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Find Us</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-muted-foreground">
              Visit our office in Kathmandu for in-person consultations and support.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                title="Dillibazaar Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7064.769989853968!2d85.31716725390625!3d27.705397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzE5LjQiTiA4NcKwMTknMzEuNSJF!5e0!3m2!1sen!2snp!4v1754931547457!5m2!1sen!2snp"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>
          </div>
        </div>
      </section>

      <section id="group-tuition" className="relative py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto mb-5">
        <div className="container mx-auto px-4 text-center space-y-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Quality Tuition, Shared Cost 💡
          </h2>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
            Learn with friends or peers in small, focused groups — taught by the same expert tutors from our home tuition program. Affordable, effective, and limited seats only.
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSdI5SyEBW2y48dnglnth_eCzArSqfN08kpLUzCgB5Gf17VmPA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md text-sm md:text-base transition"
          >
            Fill the Form & Join Now
          </Link>
        </div>

        {/* Glow accents */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300 rounded-full blur-2xl opacity-20"></div>
      </section>

      <Footer />
    </div>
  )
}
