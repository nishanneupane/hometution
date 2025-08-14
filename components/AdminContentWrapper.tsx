"use client";

import { useSidebar } from "@/lib/sidebar-context";
import { cn } from "@/lib/utils";
import { AdminHeader } from "./admin/admin-header";

interface AdminContentWrapperProps {
    children: React.ReactNode;
    admin: any;
}

export function AdminContentWrapper({ children, admin }: AdminContentWrapperProps) {
    const { isCollapsed } = useSidebar();

    return (
        <div
            className={cn(
                "min-h-screen bg-slate-50 transition-all duration-300",
                isCollapsed ? "lg:pl-16" : "lg:pl-72 sm:pl-64 pl-0"
            )}
        >
            <AdminHeader admin={admin} />
            <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
    );
}