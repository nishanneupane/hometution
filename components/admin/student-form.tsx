"use client"

import { useEffect, useState } from "react"
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
import { School, User, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const subjects = [
  "Mathematics",
  "English",
  "Nepali",
  "Science",
  "Social Studies",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Accountancy",
  "Business Studies",
  "History",
  "Geography",
]

interface StudentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  student?: any
  mode: "create" | "edit"
}

export function StudentForm({ open, onOpenChange, student, mode }: StudentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSubject, setNewSubject] = useState<string>("")

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
      board: student?.board || "",
      class: student?.class || "",
      ward: student?.ward || "",
      expectedFees: student?.expectedFees || "",
      requestType: student?.requestType || "student",
      gender: student?.gender || undefined,
    },
  })


  const requestType = form.watch("requestType")


  useEffect(() => {
    if (student && mode === "edit") {
      form.reset({
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
        board: student?.board || "",
        class: student?.class || "",
        ward: student?.ward || "",
        expectedFees: student?.expectedFees || "",
        requestType: student?.requestType || "student",
        gender: student?.gender || undefined,
      })
    }
  }, [student, mode, form])

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

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">I'm requesting tuition as:</h3>
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="student" id="student" />
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-primary" />
                            <div>
                              <label htmlFor="student" className="text-sm font-medium cursor-pointer">
                                Individual Student
                              </label>
                              <p className="text-xs text-muted-foreground">
                                I'm a student or parent looking for a tutor
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value="school" id="school" />
                          <div className="flex items-center space-x-3">
                            <School className="h-5 w-5 text-primary" />
                            <div>
                              <label htmlFor="school" className="text-sm font-medium cursor-pointer">
                                School/Institution
                              </label>
                              <p className="text-xs text-muted-foreground">
                                I represent a school looking for teachers
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{requestType === "school" ? "Contact Person Name" : "Student Name"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          requestType === "school" ? "Enter contact person name" : "Enter student name"
                        }
                        {...field}
                      />
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
                    <FormLabel>{requestType === "school" ? "School/Institution Name" : "School Name"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={requestType === "school" ? "Enter institution name" : "Enter school name"}
                        {...field}
                      />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your Ward" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="board"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg : NEB , ALevels etc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{requestType === "school" ? "Level" : "Grade"}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter your ${requestType === "school" ? "Level" : "Class"}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedFees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{requestType === "student" ? "Expected Fees" : "Salary"}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter your ${requestType === "student" ? "Expected Fees" : "Salary"} per Month`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {
                requestType === "school" && (
                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="part-time" />
                              </FormControl>
                              <FormLabel className="font-normal">Part Time</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="full-time" />
                              </FormControl>
                              <FormLabel className="font-normal">Full Time</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }
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
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Subjects Needed</h3>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Enter a subject (e.g., Mathematics)"
                  className="max-w-md"
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newSubject.trim() && !form.getValues("subject").includes(newSubject.trim())) {
                      form.setValue("subject", [...form.getValues("subject"), newSubject.trim()])
                      setNewSubject("")
                    }
                  }}
                  disabled={!newSubject.trim()}
                >
                  Add Subject
                </Button>
              </div>
              {form.getValues("subject").length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Selected Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("subject").map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{subject}</span>
                        <button
                          type="button"
                          onClick={() => form.setValue("subject", form.getValues("subject").filter((s) => s !== subject))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {form.getValues("subject").length === 0 && (
                <p className="text-sm text-destructive mt-2">Please add at least one subject</p>
              )}
            </div>

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
