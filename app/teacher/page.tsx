"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { LocationSelector } from "@/components/location-selector"
import { teacherRegistrationSchema, type TeacherRegistrationData } from "@/lib/validations"
import { createTeacherRequest } from "@/lib/actions/teacher-actions"
import { toast } from "sonner"
import { Upload, GraduationCap, FileText, User } from "lucide-react"

export default function TeacherRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeacherRegistrationData>({
    resolver: zodResolver(teacherRegistrationSchema),
    defaultValues: {
      name: "",
      phoneOrWhatsapp: "",
      province: "",
      district: "",
      municipality: "",
      city: "",
      gender: undefined,
      citizenship: "",
      cv: "",
      ward: "",
    },
  })

  const onSubmit = async (data: TeacherRegistrationData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      const result = await createTeacherRequest(formData)

      if (result.success) {
        toast.success(`Registration successful! Your teacher code is: ${result.teacherCode}`)
        form.reset()
      } else {
        toast.error(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Join as a Teacher</h1>
            <p className="text-xl text-muted-foreground">
              Register to become a verified tutor and start earning from home tutoring
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span>Teacher Registration</span>
              </CardTitle>
              <CardDescription>Complete your profile to get verified and access tutoring opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </h3>

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
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
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
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Location</h3>
                    <LocationSelector control={form.control} name="location" />
                  </div>

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

                  {/* Document Uploads */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Documents</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Citizenship Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Citizenship Document</label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Upload your citizenship</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent" type="button">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      {/* CV Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">CV/Resume</label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Upload your CV</p>
                          <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent" type="button">
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• You'll receive a unique Teacher Code via WhatsApp/Email</li>
                      <li>• Our admin team will review and verify your documents</li>
                      <li>• Once approved, you can access and apply to tutoring opportunities</li>
                      <li>• Start earning by teaching students in your area</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register as Teacher"}
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
