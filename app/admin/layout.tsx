import type React from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

import { getAdminSession } from "@/lib/actions/auth-actions";
import { SidebarProvider } from "@/lib/sidebar-context";
import { AdminContentWrapper } from "@/components/AdminContentWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <AdminContentWrapper admin={session}>{children}</AdminContentWrapper>
    </SidebarProvider>
  );
}