import { z } from "zod"

export const studentRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  phoneOrWhatsapp: z.string().min(10, "Phone number must be at least 10 digits"),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  municipality: z.string().min(1, "Please select a municipality"),
  city: z.string().min(1, "City is required"),
  subject: z.array(z.string()).min(1, "Please select at least one subject"),
  preferredTimeFrom: z.string().min(1, "Please select start time"),
  preferredTimeTo: z.string().min(1, "Please select end time"),
  parentCtzOrStudentCtz: z.string().optional(),
  extraInfo: z.string().optional(),
})

export const teacherRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneOrWhatsapp: z.string().min(10, "Phone number must be at least 10 digits"),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  municipality: z.string().min(1, "Please select a municipality"),
  city: z.string().min(1, "City is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  citizenship: z.string().optional(),
  cv: z.string().optional(),
})

export type StudentRegistrationData = z.infer<typeof studentRegistrationSchema>
export type TeacherRegistrationData = z.infer<typeof teacherRegistrationSchema>
