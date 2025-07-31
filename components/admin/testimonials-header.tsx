"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { MessageSquare, Plus, Search } from "lucide-react"

export function TestimonialsHeader() {
  const [testimonialFormOpen, setTestimonialFormOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <MessageSquare className="h-8 w-8 mr-3" />
          Testimonials
        </h1>
        <p className="text-slate-600 mt-1">Manage student and parent testimonials</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input placeholder="Search testimonials..." className="pl-10 w-64" />
        </div>
        <Button onClick={() => setTestimonialFormOpen(true)} className="bg-slate-900 hover:bg-slate-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <TestimonialForm open={testimonialFormOpen} onOpenChange={setTestimonialFormOpen} />
    </div>
  )
}
