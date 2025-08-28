"use server";

import { EmailTemplate } from "@/components/email-template";
import { prisma } from "@/lib/prisma";
import { teacherRegistrationSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { sendApprovalEmail } from "../send-approval-email";

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

    if (!data.citizenship || !data.cv || !data.profilePicture) {
      return {
        success: false,
        message: "Please fill all the information",
      };
    }

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
        link: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/teachers/${teacher.id}`,
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
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        teacherCode: true,
      },
    });

    if (!teacher) {
      return { success: false, message: "Teacher not found" };
    }

    await prisma.teacher.update({
      where: { id },
      data: { isApproved: true },
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-approval-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: teacher.email,
          name: teacher.name,
          teacherCode: teacher.teacherCode,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("API error:", data.error);
      return {
        success: true,
        message: "Teacher approved but email failed",
      };
    }

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
      include: {
        applications: true,
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
      include: {
        student: {
          select: {
            name: true,
            requestType: true,
            schoolName: true,
          },
        },
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

    await prisma.notification.create({
      data: {
        title: "New Teacher Application",
        message: `${teacher.name} has applied for the tuition request of ${
          tuitionRequest.student.requestType === "school" ? "School" : "Student"
        } ${
          tuitionRequest.student.requestType === "school"
            ? tuitionRequest.student.schoolName
            : tuitionRequest.student.name
        }.`,
        type: "teacher_application",
        link: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/requests/${tuitionRequest.id}`,
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Application submitted successfully" };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, message: "Failed to submit application" };
  }
}

// export async function sendMessageToTeachers(
//   teacherIds: string[],
//   message: string,
//   imageUrl?: string
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     if (!message.trim()) {
//       return { success: false, message: "Message cannot be empty" };
//     }
//     if (imageUrl && !imageUrl) {
//       return { success: false, message: "Invalid image URL" };
//     }

//     const validTeacherIds = teacherIds.filter(
//       (id) => id && typeof id === "string" && id.trim() !== ""
//     );
//     if (validTeacherIds.length === 0) {
//       return { success: false, message: "No valid teacher IDs provided" };
//     }

//     const teachers = await prisma.teacher.findMany({
//       where: { id: { in: validTeacherIds } },
//       select: { id: true, email: true, name: true },
//     });

//     if (teachers.length === 0) {
//       return {
//         success: false,
//         message: "No teachers found for the provided IDs",
//       };
//     }

//     const results = await Promise.all(
//       teachers.map(async (teacher) => {
//         try {
//           const response = await fetch(
//             `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-vacancy-message`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 teacherEmail: teacher.email,
//                 teacherName: teacher.name,
//                 message,
//                 imageUrl,
//               }),
//             }
//           );

//           if (!response.ok) {
//             throw new Error(
//               `Failed to send message to ${teacher.email}: ${response.statusText}`
//             );
//           }

//           return { success: true, teacherId: teacher.id };
//         } catch (error) {
//           console.error(`Error sending message to ${teacher.email}:`, error);
//           return {
//             success: false,
//             teacherId: teacher.id,
//             error: String(error),
//           };
//         }
//       })
//     );

//     const failedSends = results.filter((result) => !result.success);
//     if (failedSends.length > 0) {
//       const errorMessage = `Failed to send message to ${
//         failedSends.length
//       } teacher(s): ${failedSends.map((r) => r.teacherId).join(", ")}`;
//       return { success: false, message: errorMessage };
//     }

//     revalidatePath("/admin/teachers");
//     revalidatePath("/admin");

//     return {
//       success: true,
//       message: `Vacancy message sent successfully to ${teachers.length} teacher(s)`,
//     };
//   } catch (error) {
//     console.error("Error sending vacancy messages:", error);
//     return {
//       success: false,
//       message: "Failed to send vacancy messages due to server error",
//     };
//   }
// }

export async function sendMessageToTeachers(
  teacherIds: string[],
  message: string,
  imageUrl?: string,
  selectedEmail?: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!message.trim()) {
      return { success: false, message: "Message cannot be empty" };
    }
    if (imageUrl && !imageUrl) {
      return { success: false, message: "Invalid image URL" };
    }

    const validTeacherIds = teacherIds.filter(
      (id) => id && typeof id === "string" && id.trim() !== ""
    );
    if (validTeacherIds.length === 0) {
      return { success: false, message: "No valid teacher IDs provided" };
    }

    const teachers = await prisma.teacher.findMany({
      where: { id: { in: validTeacherIds } },
      select: { id: true, email: true, name: true },
    });

    if (teachers.length === 0) {
      return {
        success: false,
        message: "No teachers found for the provided IDs",
      };
    }

    const validFromEmails = [
      "support@hrhometuition.com",
      "birendra.naral@hrhometuition.com",
      "info@hrhometuition.com",
      "hr2025@hrhometuition.com",
      "contact@hrhometuition.com",
    ];

    const batchEmails = teachers.map((teacher, index) => {
      // If selectedEmail is provided and valid, use it; otherwise, distribute across validFromEmails
      const fromEmail =
        selectedEmail && validFromEmails.includes(selectedEmail)
          ? selectedEmail
          : validFromEmails[index % validFromEmails.length];

      return {
        from: `HR Home Tuition <${fromEmail}>`,
        to: [teacher.email],
        subject: "New Vacancy Available!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello ${teacher.name},</h2>
            <p>${message}</p>
            ${
              imageUrl
                ? `<img src="${imageUrl}" alt="Vacancy Image" style="max-width: 100%; height: auto; margin-top: 10px;" />`
                : ""
            }
            <p>Best regards,<br>HR Home Tuition Team</p>
          </div>
        `,
      };
    });

    // Split into chunks of 100 emails for batch API
    const chunkSize = 100;
    const emailChunks = [];
    for (let i = 0; i < batchEmails.length; i += chunkSize) {
      emailChunks.push(batchEmails.slice(i, i + chunkSize));
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const results = await Promise.all(
      emailChunks.map(async (chunk) => {
        try {
          const { data, error } = await resend.batch.send(chunk);

          if (error) {
            throw new Error(`Failed to send batch: ${error.message}`);
          }

          return { success: true, data };
        } catch (error) {
          console.error("Error sending batch:", error);
          return { success: false, error: String(error) };
        }
      })
    );

    const failedBatches = results.filter((result) => !result.success);
    if (failedBatches.length > 0) {
      const errorMessage = `Failed to send ${failedBatches.length} batch(es)`;
      return { success: false, message: errorMessage };
    }

    revalidatePath("/admin/teachers");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Vacancy message sent successfully to ${teachers.length} teacher(s)`,
    };
  } catch (error) {
    console.error("Error sending vacancy messages:", error);
    return {
      success: false,
      message: "Failed to send vacancy messages due to server error",
    };
  }
}

export async function updateTeacherLevel(id: string, priority: string) {
  try {
    await prisma.teacher.update({
      where: { id },
      data: { priority },
    });
    revalidatePath(`/teachers/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating teacher level:", error);
    return { success: false, error: "Failed to update level" };
  }
}

export async function updateTeacherPayment(id: string, leftPayment: string) {
  try {
    const cleanedPayment = leftPayment.replace(/[^0-9]/g, "");
    await prisma.teacher.update({
      where: { id },
      data: { leftPayment: cleanedPayment },
    });
    revalidatePath(`/teachers/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating teacher payment:", error);
    return { success: false, error: "Failed to update payment" };
  }
}
