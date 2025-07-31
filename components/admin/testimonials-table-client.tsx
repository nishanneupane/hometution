"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteTestimonial } from "@/lib/actions/testimonial-actions"
import { Edit, Trash2, Star, MessageSquare, User } from "lucide-react"

interface TestimonialsTableClientProps {
  testimonials: any[]
}

export function TestimonialsTableClient({ testimonials }: TestimonialsTableClientProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null)
  const [testimonialFormOpen, setTestimonialFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleEdit = (testimonial: any) => {
    setSelectedTestimonial(testimonial)
    setFormMode("edit")
    setTestimonialFormOpen(true)
  }

  const handleDelete = (testimonial: any) => {
    setSelectedTestimonial(testimonial)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedTestimonial) return
    return await deleteTestimonial(selectedTestimonial.id)
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-1 text-sm text-slate-600">({rating})</span>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Get started by adding your first testimonial to showcase student success stories.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        <User className="h-3 w-3 mr-1" />
                        {testimonial.role}
                      </Badge>
                      {testimonial.location && <span className="text-xs text-gray-500">{testimonial.location}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <StarRating rating={testimonial.rating} />

                <blockquote className="text-sm text-gray-700 italic leading-relaxed">
                  "{testimonial.message}"
                </blockquote>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Added</span>
                  <span className="text-gray-500">{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TestimonialForm
        open={testimonialFormOpen}
        onOpenChange={setTestimonialFormOpen}
        testimonial={selectedTestimonial}
        mode={formMode}
      />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Testimonial"
        description={`Are you sure you want to delete this testimonial from ${selectedTestimonial?.name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
