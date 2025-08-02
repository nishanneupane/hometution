"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { testimonialSchema } from "@/lib/validations"

export async function createTestimonial(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as "student" | "parent" | "teacher",
      message: formData.get("message") as string,
      rating: Number.parseInt(formData.get("rating") as string),
    }

    const validatedData = testimonialSchema.parse(data)

    await prisma.testimonial.create({
      data: validatedData,
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/") // Revalidate homepage to show new testimonial
    return { success: true, message: "Testimonial created successfully" }
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return { success: false, message: "Failed to create testimonial" }
  }
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as "student" | "parent" | "teacher",
      message: formData.get("message") as string,
      rating: Number.parseInt(formData.get("rating") as string),
    }

    const validatedData = testimonialSchema.parse(data)

    await prisma.testimonial.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true, message: "Testimonial updated successfully" }
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return { success: false, message: "Failed to update testimonial" }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return { success: true, message: "Testimonial deleted successfully" }
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return { success: false, message: "Failed to delete testimonial" }
  }
}

export async function getTestimonials(searchTerm?: string) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { message: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    })

    return testimonials
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
}
