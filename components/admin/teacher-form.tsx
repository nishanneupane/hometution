"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationSelector } from "@/components/location-selector"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { teacherRegistrationSchema, type TeacherRegistrationData } from "@/lib/validations"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createTeacher, updateTeacher } from "@/lib/actions/teacher-actions"
import { toast } from "sonner"

interface TeacherFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacher?: any
  mode: "create" | "edit"
}

export function TeacherForm({ open, onOpenChange, teacher, mode }: TeacherFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeacherRegistrationData>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      name: teacher?.name || "",
      phoneOrWhatsapp: teacher?.phoneOrWhatsapp || "",
      province: teacher?.province || "",
      district: teacher?.district || "",
      municipality: teacher?.municipality || "",
      city: teacher?.city || "",
      gender: teacher?.gender || undefined,
      citizenship: teacher?.citizenship || "",
      cv: teacher?.cv || "",
      ward: teacher?.ward || "",
    },
  })

  const onSubmit = async (data: TeacherRegistrationData) => {
    setIsSubmitting(true)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    try {
      const result = mode === "create" ? await createTeacher(formData) : await updateTeacher(teacher.id, formData)

      if (result.success) {
        toast.success(result.message)
        onOpenChange(false)
        form.reset()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add New Teacher" : "Edit Teacher"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneOrWhatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone/WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <LocationSelector control={form.control} name="location" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city or specific area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward No.</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your ward" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : mode === "create" ? "Create Teacher" : "Update Teacher"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
