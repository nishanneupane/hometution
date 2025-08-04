import { z } from "zod";

export const studentRegistrationSchema = z.object({
  requestType: z.enum(["student", "school"], {
    required_error: "Please select request type",
  }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  phoneOrWhatsapp: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  municipality: z.string().min(1, "Please select a municipality"),
  city: z.string().min(1, "City is required"),
  ward: z.string().min(1, "Ward is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  subject: z.array(z.string()).min(1, "Please select at least one subject"),
  class: z.string().min(1, "Class is required"),
  board: z.string().min(1, "Board is required"),
  preferredTimeFrom: z.string().min(1, "Please select start time"),
  preferredTimeTo: z.string().min(1, "Please select end time"),
  parentCtzOrStudentCtz: z.string().optional(),
  extraInfo: z.string().optional(),
  expectedFees: z.string().optional(),
});

export const teacherRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneOrWhatsapp: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  province: z.string().min(1, "Please select a province"),
  district: z.string().min(1, "Please select a district"),
  municipality: z.string().min(1, "Please select a municipality"),
  city: z.string().min(1, "City is required"),
  ward: z.string().min(1, "Ward is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  citizenship: z.string().optional(),
  cv: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  image: z.string().url("Invalid image URL").optional(),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating can't be more than 5")
    .optional(),
});

export type StudentRegistrationData = z.infer<typeof studentRegistrationSchema>;
export type TeacherRegistrationData = z.infer<typeof teacherRegistrationSchema>;
export type TestimonialData = z.infer<typeof testimonialSchema>;
