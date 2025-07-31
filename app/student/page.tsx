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
import { Navbar } from "@/components/navbar"
import { LocationSelector } from "@/components/location-selector"
import { studentRegistrationSchema, type StudentRegistrationData } from "@/lib/validations"
import { toast } from "sonner"
import { Upload, Clock, BookOpen } from "lucide-react"

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

  const onSubmit = async (data: StudentRegistrationData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject: selectedSubjects }),
      })

      if (response.ok) {
        toast.success("Registration successful! Your tuition request has been published.")
        form.reset()
        setSelectedSubjects([])
      } else {
        toast.error("Registration failed. Please try again.")
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
                <span>Student Registration</span>
              </CardTitle>
              <CardDescription>
                No account required - just submit your details and we'll connect you with tutors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
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
                            <Input placeholder="Enter your school name" {...field} />
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
                      <span>Citizenship Document (Optional)</span>
                    </h3>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Upload parent's or student's citizenship</p>
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
                            placeholder="Any specific requirements, learning goals, or additional information..."
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
