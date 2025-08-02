"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { LocationSelector } from "@/components/location-selector"
import { studentRegistrationSchema, type StudentRegistrationData } from "@/lib/validations"
import { createStudentRequest } from "@/lib/actions/student-actions"
import { toast } from "sonner"
import { Upload, Clock, BookOpen, User, School } from "lucide-react"

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

const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
]

export default function StudentRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const form = useForm<StudentRegistrationData>({
    resolver: zodResolver(studentRegistrationSchema),
    defaultValues: {
      requestType: "student",
      name: "",
      schoolName: "",
      phoneOrWhatsapp: "",
      province: "",
      district: "",
      municipality: "",
      city: "",
      subject: [],
      preferredTimeFrom: "",
      preferredTimeTo: "",
      parentCtzOrStudentCtz: "",
      extraInfo: "",
    },
  })

  const requestType = form.watch("requestType")

  const onSubmit = async (data: StudentRegistrationData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === "subject" && Array.isArray(value)) {
          value.forEach((subject) => formData.append("subject", subject))
        } else {
          formData.append(key, value as string)
        }
      })

      // Add selected subjects to form data
      selectedSubjects.forEach((subject) => formData.append("subject", subject))

      const result = await createStudentRequest(formData)

      if (result.success) {
        toast.success("Registration successful! Your tuition request has been published.")
        form.reset()
        setSelectedSubjects([])
      } else {
        toast.error(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject])
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    }
    form.setValue("subject", selectedSubjects)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Perfect Tutor</h1>
            <p className="text-xl text-muted-foreground">
              Fill out this form and qualified tutors in your area will apply to teach you
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Tuition Request</span>
              </CardTitle>
              <CardDescription>
                No account required - just submit your details and we'll connect you with tutors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Request Type Selection */}
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

                  {/* Personal Information */}
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
                        <FormLabel>Phone/WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone or WhatsApp number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Location</h3>
                    <LocationSelector control={form.control} name="location" />
                  </div>

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

                  {/* Subjects */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Subjects Needed</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={subject}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <label
                            htmlFor={subject}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedSubjects.length === 0 && (
                      <p className="text-sm text-destructive mt-2">Please select at least one subject</p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Preferred Time</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="preferredTimeFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select start time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredTimeTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select end time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <Upload className="h-5 w-5" />
                      <span>
                        {requestType === "school"
                          ? "Institution Document (Optional)"
                          : "Citizenship Document (Optional)"}
                      </span>
                    </h3>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">
                        {requestType === "school"
                          ? "Upload institution registration or authorization document"
                          : "Upload parent's or student's citizenship"}
                      </p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                      <Button variant="outline" className="mt-4 bg-transparent" type="button">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  {/* Extra Information */}
                  <FormField
                    control={form.control}
                    name="extraInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={
                              requestType === "school"
                                ? "Any specific requirements, number of students, teaching methodology preferences, or additional information..."
                                : "Any specific requirements, learning goals, or additional information..."
                            }
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
