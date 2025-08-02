"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getNotifications() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return []
  }
}

export async function markNotificationAsRead(id: string) {
  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw new Error("Failed to mark notification as read")
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({
      where: { id },
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error deleting notification:", error)
    throw new Error("Failed to delete notification")
  }
}

export async function createNotification(data: {
  title: string
  message: string
  type: string
}) {
  try {
    const notification = await prisma.notification.create({
      data,
    })
    revalidatePath("/admin")
    return notification
  } catch (error) {
    console.error("Error creating notification:", error)
    throw new Error("Failed to create notification")
  }
}

export async function markAllNotificationsAsRead() {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    throw new Error("Failed to mark all notifications as read")
  }
}
