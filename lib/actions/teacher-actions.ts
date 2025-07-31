"use server"

import { prisma } from "@/lib/prisma"
import { teacherRegistrationSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

function generateTeacherCode(): string {
  const prefix = "HRT"
  const randomNum = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `${prefix}${randomNum}`
}

export async function createTeacher(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      citizenship: formData.get("citizenship") as string,
      cv: formData.get("cv") as string,
    }

    const validatedData = teacherRegistrationSchema.parse(data)

    // Generate unique teacher code
    let teacherCode = generateTeacherCode()
    let existingTeacher = await prisma.teacher.findUnique({
      where: { teacherCode },
    })

    while (existingTeacher) {
      teacherCode = generateTeacherCode()
      existingTeacher = await prisma.teacher.findUnique({
        where: { teacherCode },
      })
    }

    await prisma.teacher.create({
      data: {
        ...validatedData,
        teacherCode,
        isApproved: false,
      },
    })

    revalidatePath("/admin")
    return { success: true, message: "Teacher created successfully" }
  } catch (error) {
    console.error("Error creating teacher:", error)
    return { success: false, message: "Failed to create teacher" }
  }
}

export async function updateTeacher(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      citizenship: formData.get("citizenship") as string,
      cv: formData.get("cv") as string,
    }

    const validatedData = teacherRegistrationSchema.parse(data)

    await prisma.teacher.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/admin")
    return { success: true, message: "Teacher updated successfully" }
  } catch (error) {
    console.error("Error updating teacher:", error)
    return { success: false, message: "Failed to update teacher" }
  }
}

export async function approveTeacher(id: string) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { isApproved: true },
    })

    revalidatePath("/admin")
    return { success: true, message: "Teacher approved successfully" }
  } catch (error) {
    console.error("Error approving teacher:", error)
    return { success: false, message: "Failed to approve teacher" }
  }
}

export async function rejectTeacher(id: string) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { isApproved: false },
    })

    revalidatePath("/admin")
    return { success: true, message: "Teacher rejected successfully" }
  } catch (error) {
    console.error("Error rejecting teacher:", error)
    return { success: false, message: "Failed to reject teacher" }
  }
}

export async function deleteTeacher(id: string) {
  try {
    // Delete related applications first
    await prisma.application.deleteMany({
      where: { teacherId: id },
    })

    await prisma.teacher.delete({
      where: { id },
    })

    revalidatePath("/admin")
    return { success: true, message: "Teacher deleted successfully" }
  } catch (error) {
    console.error("Error deleting teacher:", error)
    return { success: false, message: "Failed to delete teacher" }
  }
}

export async function getTeachers(searchTerm?: string) {
  try {
    const teachers = await prisma.teacher.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { phoneOrWhatsapp: { contains: searchTerm, mode: "insensitive" } },
              { teacherCode: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        applications: {
          include: {
            tuitionRequest: {
              include: {
                student: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return teachers
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return []
  }
}
