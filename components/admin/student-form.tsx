"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { LocationSelector } from "@/components/location-selector"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentRegistrationSchema, type StudentRegistrationData } from "@/lib/validations"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createStudent, updateStudent } from "@/lib/actions/student-actions"
import { toast } from "sonner"

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Nepali",
  "Social Studies",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Accountancy",
  "Economics",
]

interface StudentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student?: any
  mode: "create" | "edit"
}

export function StudentForm({ open, onOpenChange, student, mode }: StudentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StudentRegistrationData>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      name: student?.name || "",
      schoolName: student?.schoolName || "",
      phoneOrWhatsapp: student?.phoneOrWhatsapp || "",
      province: student?.province || "",
      district: student?.district || "",
      municipality: student?.municipality || "",
      city: student?.city || "",
      subject: student?.subject || [],
      preferredTimeFrom: student?.preferredTimeFrom || "",
      preferredTimeTo: student?.preferredTimeTo || "",
      parentCtzOrStudentCtz: student?.parentCtzOrStudentCtz || "",
      extraInfo: student?.extraInfo || "",
    },
  })

  const onSubmit = async (data: StudentRegistrationData) => {
    setIsSubmitting(true)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "subject" && Array.isArray(value)) {
        value.forEach((subject) => formData.append("subject", subject))
      } else {
        formData.append(key, value as string)
      }
    })

    try {
      const result = mode === "create" ? await createStudent(formData) : await updateStudent(student.id, formData)

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
          <DialogTitle>{mode === "create" ? "Add New Student" : "Edit Student"}</DialogTitle>
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
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter school name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <LocationSelector control={form.control} name="location" />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjects</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={field.value?.includes(subject)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, subject])
                            } else {
                              field.onChange(field.value?.filter((s) => s !== subject))
                            }
                          }}
                        />
                        <Label htmlFor={subject} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredTimeFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time From</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTimeTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time To</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="extraInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional information..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : mode === "create" ? "Create Student" : "Update Student"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
