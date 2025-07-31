"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonial-actions"
import { toast } from "sonner"
import { Star } from "lucide-react"

interface TestimonialFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  testimonial?: any
  mode?: "create" | "edit"
}

export function TestimonialForm({ open, onOpenChange, testimonial, mode = "create" }: TestimonialFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(testimonial?.rating || 5)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    try {
      formData.append("rating", rating.toString())

      const result =
        mode === "edit" && testimonial
          ? await updateTestimonial(testimonial.id, formData)
          : await createTestimonial(formData)

      if (result.success) {
        toast.success(result.message)
        onOpenChange(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onRatingChange(star)} className="focus:outline-none">
            <Star
              className={`h-6 w-6 ${
                star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
              } hover:text-yellow-400 transition-colors`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-slate-600">({rating}/5)</span>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update the testimonial details." : "Add a new testimonial from a student or parent."}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={testimonial?.name}
                placeholder="Student/Parent name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select name="role" defaultValue={testimonial?.role || "student"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Testimonial Message</Label>
            <Textarea
              id="message"
              name="message"
              defaultValue={testimonial?.message}
              placeholder="Write the testimonial message..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              name="location"
              defaultValue={testimonial?.location}
              placeholder="e.g., Kathmandu, Nepal"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-slate-900 hover:bg-slate-800">
              {isLoading ? "Saving..." : mode === "edit" ? "Update" : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
