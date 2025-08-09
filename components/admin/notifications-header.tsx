"use client"

import { Button } from "@/components/ui/button"
import { clearAllNotifications, markAllNotificationsAsRead } from "@/lib/actions/notification-actions";
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function NotificationsHeader() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  async function handleMarkAllRead() {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      router.refresh()
    });
  }

  async function handleClearAll() {
    if (!confirm("Are you sure you want to clear all notifications? This cannot be undone.")) {
      return;
    }
    startTransition(async () => {
      await clearAllNotifications();
      router.refresh()
      toast.success("Cleared all notifications!!")
    });
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Bell className="h-8 w-8 mr-3" />
          Notifications

        </h1>
        <p className="text-slate-600 mt-1">Stay updated with platform activities</p>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={handleMarkAllRead}
        >
          <CheckCheck className="h-4 w-4 mr-2" />
          {isPending ? "Marking..." : "Mark All Read"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          onClick={handleClearAll}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isPending ? "Clearing..." : "Clear All"}
        </Button>
      </div>
    </div>
  )
}
