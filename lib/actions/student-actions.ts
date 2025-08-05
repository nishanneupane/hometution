"use server";

import { prisma } from "@/lib/prisma";
import { studentRegistrationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createStudentRequest(formData: FormData) {
  try {
    const rawSubjects = formData.getAll("subject") as string[];
    const data = {
      requestType: formData.get("requestType") as string,
      name: formData.get("name") as string,
      schoolName: formData.get("schoolName") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      board: formData.get("board") as string,
      class: formData.get("class") as string,
      ward: formData.get("ward") as string,
      expectedFees: formData.get("expectedFees") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      subject: [...new Set(rawSubjects.map((s) => s.trim()))],
      preferredTimeFrom: formData.get("preferredTimeFrom") as string,
      preferredTimeTo: formData.get("preferredTimeTo") as string,
      parentCtzOrStudentCtz: formData.get("parentCtzOrStudentCtz") as string,
      extraInfo: formData.get("extraInfo") as string,
    };

    const validatedData = studentRegistrationSchema.parse(data);

    const student = await prisma.student.create({
      data: validatedData,
    });

    // Create tuition request
    await prisma.tuitionRequest.create({
      data: {
        studentId: student.id,
        status: "active",
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: `New ${
          validatedData.requestType === "school" ? "School" : "Student"
        } Request`,
        message: `${
          validatedData.name
        } has submitted a tuition request for ${validatedData.subject.join(
          ", "
        )}`,
        type: "student_registration",
      },
    });

    revalidatePath("/careers");
    revalidatePath("/admin");
    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.error("Error creating student request:", error);
    return { success: false, message: "Registration failed" };
  }
}

export async function createStudent(formData: FormData) {
  try {
    const data = {
      requestType: (formData.get("requestType") as string) || "student",
      name: formData.get("name") as string,
      schoolName: formData.get("schoolName") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      board: formData.get("board") as string,
      class: formData.get("class") as string,
      ward: formData.get("ward") as string,
      expectedFees: formData.get("expectedFees") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      subject: formData.getAll("subject") as string[],
      preferredTimeFrom: formData.get("preferredTimeFrom") as string,
      preferredTimeTo: formData.get("preferredTimeTo") as string,
      parentCtzOrStudentCtz: formData.get("parentCtzOrStudentCtz") as string,
      extraInfo: formData.get("extraInfo") as string,
    };

    const validatedData = studentRegistrationSchema.parse(data);

    const student = await prisma.student.create({
      data: validatedData,
    });

    // Create tuition request
    await prisma.tuitionRequest.create({
      data: {
        studentId: student.id,
        status: "active",
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Student created successfully" };
  } catch (error) {
    console.error("Error creating student:", error);
    return { success: false, message: "Failed to create student" };
  }
}

export async function updateStudent(id: string, formData: FormData) {
  try {
    const data = {
      requestType: (formData.get("requestType") as string) || "student",
      name: formData.get("name") as string,
      schoolName: formData.get("schoolName") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      board: formData.get("board") as string,
      class: formData.get("class") as string,
      ward: formData.get("ward") as string,
      expectedFees: formData.get("expectedFees") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      subject: formData.getAll("subject") as string[],
      preferredTimeFrom: formData.get("preferredTimeFrom") as string,
      preferredTimeTo: formData.get("preferredTimeTo") as string,
      parentCtzOrStudentCtz: formData.get("parentCtzOrStudentCtz") as string,
      extraInfo: formData.get("extraInfo") as string,
    };

    const validatedData = studentRegistrationSchema.parse(data);

    await prisma.student.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin");
    return { success: true, message: "Student updated successfully" };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, message: "Failed to update student" };
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
    });

    await prisma.tuitionRequest.deleteMany({
      where: { studentId: id },
    });

    await prisma.student.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/careers");
    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, message: "Failed to delete student" };
  }
}

export async function getStudents(searchTerm?: string) {
  try {
    const students = await prisma.student.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              {
                phoneOrWhatsapp: { contains: searchTerm, mode: "insensitive" },
              },
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
    });

    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function getActiveStudentRequests() {
  try {
    const students = await prisma.student.findMany({
      include: {
        tuitionRequests: {
          where: {
            status: "active",
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter students who have active tuition requests
    return students.filter((student) => student.tuitionRequests.length > 0);
  } catch (error) {
    console.error("Error fetching active student requests:", error);
    return [];
  }
}

export async function getVacancies() {
  try {
    const vacancies = await prisma.tuitionRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: {
            name: true,
          },
        },
      },
    });

    return vacancies;
  } catch (error) {
    console.error("Error fetching active student requests:", error);
    return [];
  }
}
export async function updateVacancy({
  id,
  isApproved,
  status,
}: {
  id: string;
  isApproved: boolean;
  status: string;
}) {
  try {
    const vacancies = await prisma.tuitionRequest.update({
      where: {
        id,
      },
      data: {
        isApproved,
        status,
      },
    });

    return vacancies;
  } catch (error) {
    console.error("Error fetching active student requests:", error);
    return [];
  }
}
