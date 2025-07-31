"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function approveApplication(id: string) {
  try {
    await prisma.application.update({
      where: { id },
      data: { status: "approved" },
    })

    revalidatePath("/admin")
    return { success: true, message: "Application approved successfully" }
  } catch (error) {
    console.error("Error approving application:", error)
    return { success: false, message: "Failed to approve application" }
  }
}

export async function rejectApplication(id: string) {
  try {
    await prisma.application.update({
      where: { id },
      data: { status: "rejected" },
    })

    revalidatePath("/admin")
    return { success: true, message: "Application rejected successfully" }
  } catch (error) {
    console.error("Error rejecting application:", error)
    return { success: false, message: "Failed to reject application" }
  }
}

export async function getTuitionRequests() {
  try {
    const requests = await prisma.tuitionRequest.findMany({
      include: {
        student: true,
        applications: {
          include: {
            teacher: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return requests
  } catch (error) {
    console.error("Error fetching tuition requests:", error)
    return []
  }
}
