"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { markNotificationAsRead, deleteNotification } from "@/lib/actions/notification-actions"
import { Bell, Users, GraduationCap, FileText, Check, X, Clock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface NotificationsTableClientProps {
  notifications: any[]
}

export function NotificationsTableClient({ notifications }: NotificationsTableClientProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleMarkAsRead = async (notificationId: string) => {
    setLoadingStates((prev) => ({ ...prev, [notificationId]: true }))

    try {
      const result = await markNotificationAsRead(notificationId)
      if (result.success) {
        toast.success("Notification marked as read")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to update notification")
    } finally {
      setLoadingStates((prev) => ({ ...prev, [notificationId]: false }))
    }
  }

  const handleDelete = async (notificationId: string) => {
    setLoadingStates((prev) => ({ ...prev, [notificationId]: true }))

    try {
      const result = await deleteNotification(notificationId)
      if (result.success) {
        toast.success("Notification deleted")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to delete notification")
    } finally {
      setLoadingStates((prev) => ({ ...prev, [notificationId]: false }))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "student_registration":
        return <Users className="h-5 w-5 text-blue-600" />
      case "teacher_application":
        return <GraduationCap className="h-5 w-5 text-green-600" />
      case "tuition_request":
        return <FileText className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "student_registration":
        return "bg-blue-100"
      case "teacher_application":
        return "bg-green-100"
      case "tuition_request":
        return "bg-purple-100"
      default:
        return "bg-gray-100"
    }
  }

  if (notifications.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Bell className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600 text-center max-w-md">
            You're all caught up! New notifications will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`border-0 shadow-sm hover:shadow-md transition-shadow ${!notification.isRead ? "bg-blue-50/50 border-l-4 border-l-blue-500" : ""
            }`}
        >
          <CardContent className="p-6">
            <Link href={`${notification.type === "student_registration" ? "/admin/students" : notification.type === "teacher_application" ? "/admin/teachers" : "/admin/requests"}`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {notification.title}
                        {!notification.isRead && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            New
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(notification.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={loadingStates[notification.id]}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        disabled={loadingStates[notification.id]}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
