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
      <div className="max-w-5xl mx-auto px-4">
        <Card
          className={`
            bg-white shadow-lg border border-slate-200 rounded-xl overflow-hidden
            transition-all duration-700 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <CardContent className="p-6 space-y-6 text-center flex items-center flex-col md:flex-row">
            {/* Image */}
            <div className="w-32 h-32 mx-auto relative">
              <Image
                src="/images/md.jpeg"
                alt="Birendra Naral"
                fill
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <div className="">
              {/* Text Content */}
              <div className="space-y-2">
                <Badge className="bg-blue-100 text-blue-800">Welcome Message</Badge>
                <h2 className="text-xl font-semibold text-gray-900">Welcome to HR Home Tuition!</h2>
                <p className="text-sm text-gray-700">
                  <Quote className="inline-block w-4 h-4 text-blue-300 mr-1" />
                  We're here to guide your learning journey with experienced tutors and personalized attention.
                </p>
                <p className="text-sm text-gray-600">
                  Our vision is to equip every student with tools for success — from the comfort of their home.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-gray-200 text-sm text-gray-700">
                <p className="mb-1">Thank you,</p>
                <p className="font-medium text-gray-900">Birendra Naral</p>
                <p className="text-gray-500">MD, HR Home Tuition</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
