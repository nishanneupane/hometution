"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createNotification(data: {
  title: string
  message: string
  type: string
  relatedId?: string
}) {
  try {
    await prisma.notification.create({
      data: {
        ...data,
        isRead: false,
      },
    })

    revalidatePath("/admin/notifications")
    return { success: true, message: "Notification created successfully" }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { success: false, message: "Failed to create notification" }
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    })

    revalidatePath("/admin/notifications")
    return { success: true, message: "Notification marked as read" }
  } catch (error) {
    console.error("Error updating notification:", error)
    return { success: false, message: "Failed to update notification" }
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({
      where: { id },
    })

    revalidatePath("/admin/notifications")
    return { success: true, message: "Notification deleted successfully" }
  } catch (error) {
    console.error("Error deleting notification:", error)
    return { success: false, message: "Failed to delete notification" }
  }
}

export async function getNotifications() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    })

    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

export async function markAllNotificationsAsRead() {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })

    revalidatePath("/admin/notifications")
    return { success: true, message: "All notifications marked as read" }
  } catch (error) {
    console.error("Error updating notifications:", error)
    return { success: false, message: "Failed to update notifications" }
  }
}
