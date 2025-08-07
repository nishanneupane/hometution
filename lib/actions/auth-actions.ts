"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, message: "Invalid credentials" };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return { success: false, message: "Invalid credentials" };
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-session", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  redirect("/login");
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin-session")?.value;

  if (!sessionId) {
    return null;
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: sessionId },
    });
    return admin;
  } catch (error) {
    return null;
  }
}

export async function resetAdminPassword(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin-session")?.value;

    if (!sessionId) {
      return { success: false, message: "Unauthorized: No active session" };
    }

    const admin = await prisma.admin.findUnique({
      where: { id: sessionId },
    });

    if (!admin) {
      return { success: false, message: "Unauthorized: Admin not found" };
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isValidPassword) {
      return { success: false, message: "Current password is incorrect" };
    }

    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "New password and confirmation do not match",
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        message: "New password must be at least 8 characters long",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: sessionId },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, message: "Failed to reset password" };
  }
}
