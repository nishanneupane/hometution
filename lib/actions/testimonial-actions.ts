"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTestimonial(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      message: formData.get("message") as string,
      rating: Number.parseInt(formData.get("rating") as string),
      location: (formData.get("location") as string) || null,
    }

    await prisma.testimonial.create({
      data,
    })

    revalidatePath("/admin/testimonials")
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
      role: formData.get("role") as string,
      message: formData.get("message") as string,
      rating: Number.parseInt(formData.get("rating") as string),
      location: (formData.get("location") as string) || null,
    }

    await prisma.testimonial.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/testimonials")
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
    return { success: true, message: "Testimonial deleted successfully" }
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return { success: false, message: "Failed to delete testimonial" }
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    })

    return testimonials
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
}
