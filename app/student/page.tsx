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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { LocationSelector } from "@/components/location-selector"
import { studentRegistrationSchema, type StudentRegistrationData } from "@/lib/validations"
import { createStudentRequest } from "@/lib/actions/student-actions"
import { toast } from "sonner"
import { Upload, Clock, BookOpen, User, School, X } from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"

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
  const [newSubject, setNewSubject] = useState<string>("")

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
      ward: "",
      board: "",
      class: "",
      expectedFees: "",
      gender: undefined,
      jobType: ""
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

  const handleAddSubject = () => {
    if (newSubject.trim() && !selectedSubjects.includes(newSubject.trim())) {
      const updatedSubjects = [...selectedSubjects, newSubject.trim()]
      setSelectedSubjects(updatedSubjects)
      form.setValue("subject", updatedSubjects)
      setNewSubject("")
    }
  }

  const handleRemoveSubject = (subject: string) => {
    const updatedSubjects = selectedSubjects.filter((s) => s !== subject)
    setSelectedSubjects(updatedSubjects)
    form.setValue("subject", updatedSubjects)
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
            <div className="inline-block w-full max-w-md bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 rounded-md shadow-md animate-pulse text-center">
              🎉 Free 2-Day Home Tuition Demo  🎉
            </div>

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
                          <FormLabel>{requestType === "school" ? "Contact Person Name" : "Student/Parent Name"}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                requestType === "school" ? "Enter contact person name" : "Enter student/Parent name"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
                              <SelectItem value="any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Subjects Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Subjects Needed</h3>
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Enter a subject (e.g., Mathematics)"
                        className="max-w-md"
                        onBlur={() => {
                          if (newSubject.trim()) {
                            handleAddSubject();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newSubject.trim()) {
                            e.preventDefault();
                            handleAddSubject();
                          }
                        }}
                      />

                      <Button
                        type="button"
                        onClick={handleAddSubject}
                        disabled={!newSubject.trim()}
                      >
                        Add Subject
                      </Button>
                    </div>
                    {selectedSubjects.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Selected Subjects:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubjects.map((subject) => (
                            <div
                              key={subject}
                              className="flex items-center space-x-2 bg-muted px-3 py-1 rounded-full"
                            >
                              <span className="text-sm">{subject}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSubject(subject)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedSubjects.length === 0 && (
                      <p className="text-sm text-destructive mt-2">Please add at least one subject</p>
                    )}
                  </div>

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
                            <FormLabel>To</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>


                  {/* File Upload */}
                  <FormField
                    control={form.control}
                    name="parentCtzOrStudentCtz"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold mb-4 flex items-center space-x-2">
                          <Upload className="h-5 w-5" />
                          <span>
                            {requestType === "school"
                              ? "Institution Document (Optional)"
                              : "Citizenship Document (Optional)"}
                          </span>
                        </FormLabel>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">
                            {requestType === "school"
                              ? "Upload institution registration or authorization document"
                              : "Upload parent's or student's citizenship"}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 5MB</p>
                          {!field.value ? (
                            <UploadButton
                              endpoint="images"
                              onClientUploadComplete={(res) => {
                                if (res && res[0]) {
                                  field.onChange(res[0].url)
                                }
                              }}
                              onUploadError={(err) => {
                                console.error(err)
                              }}
                              appearance={{
                                button:
                                  "bg-blue-600 border border-input text-background hover:bg-blue-700",
                              }}
                            />
                          ) : (
                            <div className="relative inline-block">
                              <img
                                src={field.value}
                                alt="Uploaded file"
                                className="mt-4 mx-auto max-h-40 rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => field.onChange("")}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                title="Remove image"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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