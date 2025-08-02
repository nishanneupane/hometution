"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"
import Image from "next/image"

export function MDWelcomeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container">
        <Card
          className={`relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <CardContent className="relative p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* MD's Photo */}
              <div
                className={`order-2 lg:order-1 flex justify-center lg:justify-start transition-all duration-600 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="relative">
                  <div
                    className={`relative w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-xl overflow-hidden border-4 border-white shadow-xl transition-all duration-500 ease-out delay-300 ${
                      isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-2"
                    }`}
                  >
                    <Image
                      src="/images/md.jpeg"
                      alt="Birendra Naral - MD, HR Home Tuition"
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </div>

                  {/* Animated glow effects */}
                  <div
                    className={`absolute -top-3 -right-3 w-10 h-10 bg-primary/30 rounded-full blur-md transition-all duration-700 ease-out delay-500 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-5 -left-5 w-14 h-14 bg-blue-400/20 rounded-full blur-lg transition-all duration-700 ease-out delay-600 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                </div>
              </div>

              {/* Welcome Message */}
              <div
                className={`order-1 lg:order-2 space-y-6 text-center lg:text-left transition-all duration-600 ease-out delay-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <div className="space-y-3">
                  <Badge
                    variant="outline"
                    className={`bg-primary/10 text-primary border-primary/20 transition-all duration-500 ease-out delay-400 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    Welcome Message
                  </Badge>
                  <h2
                    className={`text-3xl md:text-4xl font-bold text-slate-900 transition-all duration-500 ease-out delay-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    Welcome to HR Home Tuition!
                  </h2>
                </div>

                <div
                  className={`space-y-4 text-lg leading-relaxed text-slate-700 transition-all duration-500 ease-out delay-600 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p>
                    We are excited to be a part of your educational journey. Our goal is to provide quality education to
                    students in the comfort of their own homes. We believe in nurturing students' potential through
                    experienced teachers and personalized attention.
                  </p>
                  <p>
                    Our vision is to equip each student with the knowledge and skills necessary for success. We are
                    committed to your success.
                  </p>
                </div>

                {/* Signature */}
                <div
                  className={`pt-4 border-t border-slate-200 transition-all duration-500 ease-out delay-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-base text-slate-600">Thank you,</p>
                    <div className="space-y-1">
                      <p className="text-xl font-semibold text-slate-900">Birendra Naral</p>
                      <p className="text-sm text-primary font-medium">MD, HR Home Tuition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Quote decoration with animation */}
          <div
            className={`absolute top-6 right-6 transition-all duration-700 ease-out delay-800 ${
              isVisible ? "opacity-10 rotate-0 scale-100" : "opacity-0 rotate-12 scale-75"
            }`}
          >
            <Quote className="h-16 w-16 text-primary" />
          </div>
        </Card>
      </div>
    </section>
  )
}
