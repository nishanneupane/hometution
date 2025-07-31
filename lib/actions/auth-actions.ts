"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return { success: false, message: "Invalid credentials" }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password)

    if (!isValidPassword) {
      return { success: false, message: "Invalid credentials" }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("admin-session", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login failed" }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
  redirect("/admin/login")
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("admin-session")?.value

  if (!sessionId) {
    return null
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: sessionId },
    })
    return admin
  } catch (error) {
    return null
  }
}
