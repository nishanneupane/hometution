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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-10 bg-slate-50">
      <div className="w-full mx-auto px-4">
        <Card
          className={`
    w-full max-w-4xl mx-auto bg-white border border-slate-200 shadow-lg rounded-2xl overflow-hidden
    transition-all duration-700 ease-out
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
  `}
        >
          <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">

            {/* Image */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 flex-shrink-0">
              <Image
                src="/images/md.jpeg"
                alt="Birendra Naral"
                fill
                className="rounded-xl object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                Welcome Message
              </Badge>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Welcome to HR Home Tuition!
              </h2>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <Quote className="inline-block w-4 h-4 text-blue-300 mr-1" />
                We’re excited to be a part of your educational journey. Our goal is to provide quality education right at your doorstep — with experienced tutors and personalized attention.
              </p>

              <p className="text-sm sm:text-base text-gray-600">
                Our vision? To empower each student with the knowledge and confidence they need to thrive. Your success is our priority.
              </p>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700">Thank you,</p>
                <p className="text-base font-medium text-gray-900">Birendra Naral</p>
                <p className="text-sm text-gray-500">CEO, HR Home Tuition</p>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </section>
  )
}
