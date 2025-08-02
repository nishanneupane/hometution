"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"
import Image from "next/image"

export function MDWelcomeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card
            className={`
              relative overflow-hidden border-0 shadow-lg backdrop-blur-sm bg-white/90
              transition-all duration-500 ease-out
              ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
            `}
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-50/50" />
            <div
              className={`
                absolute top-4 right-4 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl
                transition-all duration-700 ease-out delay-500
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
            />
            <div
              className={`
                absolute bottom-4 left-4 w-24 h-24 bg-slate-100/40 rounded-full blur-xl
                transition-all duration-700 ease-out delay-600
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
            />

            <CardContent className="relative p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* MD Photo */}
                <div className="flex justify-center lg:justify-start">
                  <div
                    className={`
                      relative transition-all duration-600 ease-out delay-200
                      ${
                        isVisible
                          ? "opacity-100 translate-x-0 scale-100 rotate-0"
                          : "opacity-0 -translate-x-8 scale-90 -rotate-2"
                      }
                    `}
                  >
                    <div className="relative w-48 h-48 md:w-56 md:h-56">
                      <Image
                        src="/images/md.jpeg"
                        alt="Birendra Naral - MD, HR Home Tuition"
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Welcome Content */}
                <div
                  className={`
                    space-y-6 text-center lg:text-left
                    transition-all duration-600 ease-out delay-100
                    ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
                  `}
                >
                  <div className="space-y-4">
                    <Badge
                      variant="secondary"
                      className={`
                        bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium
                        transition-all duration-500 ease-out delay-400
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                      `}
                    >
                      Welcome Message
                    </Badge>

                    <h2
                      className={`
                        text-3xl md:text-4xl font-bold text-gray-900
                        transition-all duration-500 ease-out delay-500
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                      `}
                    >
                      Welcome to HR Home Tuition!
                    </h2>
                  </div>

                  <div
                    className={`
                      relative
                      transition-all duration-500 ease-out delay-600
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                  >
                    <Quote
                      className={`
                        absolute -top-2 -left-2 h-8 w-8 text-blue-200
                        transition-all duration-700 ease-out delay-800
                        ${isVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-12 scale-75"}
                      `}
                    />
                    <p className="text-lg text-gray-700 leading-relaxed pl-6">
                      We are excited to be a part of your educational journey. Our goal is to provide quality education
                      to students in the comfort of their own homes. We believe in nurturing students' potential through
                      experienced teachers and personalized attention.
                    </p>
                  </div>

                  <div
                    className={`
                      text-lg text-gray-700 leading-relaxed
                      transition-all duration-500 ease-out delay-700
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                  >
                    <p>
                      Our vision is to equip each student with the knowledge and skills necessary for success. We are
                      committed to your success.
                    </p>
                  </div>

                  <div
                    className={`
                      pt-4 border-t border-gray-200
                      transition-all duration-500 ease-out delay-700
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                  >
                    <p className="text-gray-600 mb-2">Thank you,</p>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 text-lg">Birendra Naral</p>
                      <p className="text-gray-600">MD, HR Home Tuition</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
