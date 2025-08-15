"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { convertToAmPm } from "../utils";

export async function approveApplication(id: string) {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status: "approved" },
      include: {
        teacher: { select: { email: true, name: true } },
        tuitionRequest: {
          include: {
            student: true,
          },
        },
      },
    });

    await prisma.tuitionRequest.update({
      where: { id: application.tuitionRequestId },
      data: { status: "filled" },
    });

    const student = application.tuitionRequest.student;
    const vacancyDetails = {
      name: `${
        student.requestType === "school" ? student.schoolName : student.name
      }`,
      phone: student.phoneOrWhatsapp,
      requestType: student.requestType,
      location: `${student.city}, ${student.municipality}-${student.ward}, ${student.district}, ${student.province}`,
      subjects: student.subject.join(", "),
      preferredTime: `${convertToAmPm(
        student.preferredTimeFrom
      )} - ${convertToAmPm(student.preferredTimeTo)}`,
      expectedFees: student.expectedFees || "Not specified",
      vacancyId: student.id,
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-request-approval`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherEmail: application.teacher.email,
          teacherName: application.teacher.name,
          vacancyDetails,
        }),
      }
    );

    revalidatePath("/admin");
    revalidatePath("/careers");
    return { success: true, message: "Application approved successfully" };
  } catch (error) {
    console.error("Error approving application:", error);
    return { success: false, message: "Failed to approve application" };
  }
}

export async function inviteToOffice(applicationId: string) {
  try {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "invited",
        tuitionRequest: {
          update: {
            status: "demo",
          },
        },
      },
      include: {
        teacher: { select: { email: true, name: true } },
      },
    });

    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-office-invitation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherEmail: application.teacher.email,
          teacherName: application.teacher.name,
        }),
      }
    );

    revalidatePath("/admin");
    return { success: true, message: "Invitation to office sent successfully" };
  } catch (error) {
    console.error("Error sending office invitation:", error);
    return { success: false, message: "Failed to send office invitation" };
  }
}

export async function rejectApplication(id: string) {
  try {
    await prisma.application.update({
      where: { id },
      data: { status: "rejected" },
    });

    revalidatePath("/admin");
    return { success: true, message: "Application rejected successfully" };
  } catch (error) {
    console.error("Error rejecting application:", error);
    return { success: false, message: "Failed to reject application" };
  }
}

export async function getTuitionRequests() {
  try {
    const requests = await prisma.tuitionRequest.findMany({
      where: {
        isApproved: true,
        status: "active",
      },
      include: {
        student: true,
        applications: {
          include: {
            teacher: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return requests;
  } catch (error) {
    console.error("Error fetching tuition requests:", error);
    return [];
  }
}

export async function getTuitionRequestById(id: string) {
  try {
    const request = await prisma.tuitionRequest.findFirst({
      where: {
        id,
      },
      include: {
        student: true,
        applications: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return request;
  } catch (error) {
    console.error("Error fetching tuition request:", error);
    return [];
  }
}
