"use server"

import { prisma } from "@/lib/prisma"
import { studentRegistrationSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

export async function createStudent(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      schoolName: formData.get("schoolName") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      subject: formData.getAll("subject") as string[],
      preferredTimeFrom: formData.get("preferredTimeFrom") as string,
      preferredTimeTo: formData.get("preferredTimeTo") as string,
      parentCtzOrStudentCtz: formData.get("parentCtzOrStudentCtz") as string,
      extraInfo: formData.get("extraInfo") as string,
    }

    const validatedData = studentRegistrationSchema.parse(data)

    const student = await prisma.student.create({
      data: validatedData,
    })

    // Create tuition request
    await prisma.tuitionRequest.create({
      data: {
        studentId: student.id,
        status: "active",
      },
    })

    revalidatePath("/admin")
    return { success: true, message: "Student created successfully" }
  } catch (error) {
    console.error("Error creating student:", error)
    return { success: false, message: "Failed to create student" }
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      schoolName: formData.get("schoolName") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      subject: formData.getAll("subject") as string[],
      preferredTimeFrom: formData.get("preferredTimeFrom") as string,
      preferredTimeTo: formData.get("preferredTimeTo") as string,
      parentCtzOrStudentCtz: formData.get("parentCtzOrStudentCtz") as string,
      extraInfo: formData.get("extraInfo") as string,
    }

    const validatedData = studentRegistrationSchema.parse(data)

    await prisma.student.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/admin")
    return { success: true, message: "Student updated successfully" }
  } catch (error) {
    console.error("Error updating student:", error)
    return { success: false, message: "Failed to update student" }
  }
}

export async function deleteStudent(id: string) {
  try {
    // Delete related tuition requests and applications first
    await prisma.application.deleteMany({
      where: {
        tuitionRequest: {
          studentId: id,
        },
      },
    })

    await prisma.tuitionRequest.deleteMany({
      where: { studentId: id },
    })

    await prisma.student.delete({
      where: { id },
    })

    revalidatePath("/admin")
    return { success: true, message: "Student deleted successfully" }
  } catch (error) {
    console.error("Error deleting student:", error)
    return { success: false, message: "Failed to delete student" }
  }
}

export async function getStudents(searchTerm?: string) {
  try {
    const students = await prisma.student.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { phoneOrWhatsapp: { contains: searchTerm, mode: "insensitive" } },
              { city: { contains: searchTerm, mode: "insensitive" } },
              { district: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        tuitionRequests: {
          include: {
            applications: {
              include: {
                teacher: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return students
  } catch (error) {
    console.error("Error fetching students:", error)
    return []
  }
}
