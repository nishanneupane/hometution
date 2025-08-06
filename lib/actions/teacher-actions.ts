"use server";

import { prisma } from "@/lib/prisma";
import { teacherRegistrationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

function generateTeacherCode(): string {
  const prefix = "HRT";
  const randomNum = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `${prefix}${randomNum}`;
}

export async function createTeacherRequest(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      ward: formData.get("ward") as string,
      profilePicture: formData.get("profilePicture") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      citizenship: formData.get("citizenship") as string,
      cv: formData.get("cv") as string,
    };

    const validatedData = teacherRegistrationSchema.parse(data);

    const duplicateTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [{ phoneOrWhatsapp: data.phoneOrWhatsapp }, { email: data.email }],
      },
    });

    if (duplicateTeacher) {
      return {
        success: false,
        message: "Teacher Already created with this number & email",
      };
    }

    // Generate unique teacher code
    let teacherCode = generateTeacherCode();
    let existingTeacher = await prisma.teacher.findUnique({
      where: { teacherCode },
    });

    while (existingTeacher) {
      teacherCode = generateTeacherCode();
      existingTeacher = await prisma.teacher.findUnique({
        where: { teacherCode },
      });
    }

    const teacher = await prisma.teacher.create({
      data: {
        ...validatedData,
        teacherCode,
        isApproved: false,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        title: "New Teacher Application",
        message: `${validatedData.name} has applied to become a teacher`,
        type: "teacher_registration",
      },
    });

    revalidatePath("/admin");
    return {
      success: true,
      message: "Registration successful",
      teacherCode: teacher.teacherCode,
    };
  } catch (error) {
    console.error("Error creating teacher request:", error);
    return { success: false, message: "Registration failed" };
  }
}

export async function createTeacher(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      profilePicture: formData.get("profilePicture") as string,
      ward: formData.get("ward") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      citizenship: formData.get("citizenship") as string,
      cv: formData.get("cv") as string,
    };

    const validatedData = teacherRegistrationSchema.parse(data);

    const duplicateTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [{ phoneOrWhatsapp: data.phoneOrWhatsapp }, { email: data.email }],
      },
    });

    if (duplicateTeacher) {
      return {
        success: false,
        message: "Teacher Already created with this number & email",
      };
    }
    let teacherCode = generateTeacherCode();
    let existingTeacher = await prisma.teacher.findUnique({
      where: { teacherCode },
    });

    while (existingTeacher) {
      teacherCode = generateTeacherCode();
      existingTeacher = await prisma.teacher.findUnique({
        where: { teacherCode },
      });
    }

    await prisma.teacher.create({
      data: {
        ...validatedData,
        teacherCode,
        isApproved: false,
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Teacher created successfully" };
  } catch (error) {
    console.error("Error creating teacher:", error);
    return { success: false, message: "Failed to create teacher" };
  }
}

export async function updateTeacher(id: string, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phoneOrWhatsapp: formData.get("phoneOrWhatsapp") as string,
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      municipality: formData.get("municipality") as string,
      city: formData.get("city") as string,
      profilePicture: formData.get("profilePicture") as string,
      ward: formData.get("ward") as string,
      gender: formData.get("gender") as "male" | "female" | "other",
      citizenship: formData.get("citizenship") as string,
      cv: formData.get("cv") as string,
    };

    const validatedData = teacherRegistrationSchema.parse(data);

    const duplicateTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [{ phoneOrWhatsapp: data.phoneOrWhatsapp }, { email: data.email }],
      },
    });

    if (duplicateTeacher) {
      return {
        success: false,
        message: "Teacher Already created with this number & email",
      };
    }

    await prisma.teacher.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/admin");
    return { success: true, message: "Teacher updated successfully" };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { success: false, message: "Failed to update teacher" };
  }
}

export async function approveTeacher(id: string) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { isApproved: true },
    });

    revalidatePath("/admin");
    return { success: true, message: "Teacher approved successfully" };
  } catch (error) {
    console.error("Error approving teacher:", error);
    return { success: false, message: "Failed to approve teacher" };
  }
}

export async function rejectTeacher(id: string) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { isApproved: false },
    });

    revalidatePath("/admin");
    return { success: true, message: "Teacher rejected successfully" };
  } catch (error) {
    console.error("Error rejecting teacher:", error);
    return { success: false, message: "Failed to reject teacher" };
  }
}

export async function deleteTeacher(id: string) {
  try {
    // Delete related applications first
    await prisma.application.deleteMany({
      where: { teacherId: id },
    });

    await prisma.teacher.delete({
      where: { id },
    });

    revalidatePath("/admin");
    return { success: true, message: "Teacher deleted successfully" };
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return { success: false, message: "Failed to delete teacher" };
  }
}

export async function getTeachers(searchTerm?: string) {
  try {
    const teachers = await prisma.teacher.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              {
                phoneOrWhatsapp: { contains: searchTerm, mode: "insensitive" },
              },
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
    });

    return teachers;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
}

export async function getTeacherById(id: string) {
  try {
    const teachers = await prisma.teacher.findFirst({
      where: {
        id,
      },
    });

    return teachers;
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return [];
  }
}

export async function applyRequest({
  studentId,
  phone,
  teacherCode,
}: {
  studentId: string;
  phone: string;
  teacherCode: string;
}) {
  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        teacherCode,
        phoneOrWhatsapp: phone,
      },
    });

    if (!teacher) {
      return { success: false, message: "Teacher not found" };
    }

    const tuitionRequest = await prisma.tuitionRequest.findFirst({
      where: {
        studentId,
        status: "active",
      },
    });

    if (!tuitionRequest) {
      return { success: false, message: "Active tuition request not found" };
    }

    // Check if application already exists
    const existingApplication = await prisma.application.findUnique({
      where: {
        teacherId_tuitionRequestId: {
          teacherId: teacher.id,
          tuitionRequestId: tuitionRequest.id,
        },
      },
    });

    if (existingApplication) {
      return { success: false, message: "Application already submitted" };
    }

    await prisma.application.create({
      data: {
        teacherId: teacher.id,
        tuitionRequestId: tuitionRequest.id,
        status: "pending",
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Application submitted successfully" };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, message: "Failed to submit application" };
  }
}
