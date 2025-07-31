"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCheck, Trash2 } from "lucide-react"

export function NotificationsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <Bell className="h-8 w-8 mr-3" />
          Notifications
          <Badge variant="secondary" className="ml-3">
            3 unread
          </Badge>
        </h1>
        <p className="text-slate-600 mt-1">Stay updated with platform activities</p>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  )
}
