"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, LogOut, Settings, User, X, Trash2 } from "lucide-react"
import { logoutAdmin } from "@/lib/actions/auth-actions"
import { getNotifications, markNotificationAsRead, deleteNotification } from "@/lib/actions/notification-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface AdminHeaderProps {
  admin: {
    id: string
    name: string
    email: string
  }
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<any[]>([])
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await getNotifications()
      setNotifications(data)
      setUnreadCount(data.filter((n: any) => !n.isRead).length)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast.error("Failed to load notifications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleNotificationClick = async (notification: any) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsRead(notification.id)
        setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
        toast.success("Notification marked as read")
      }

      // Navigate based on notification type
      switch (notification.type) {
        case "student_registration":
          router.push("/admin/students")
          break
        case "teacher_application":
          router.push("/admin/teachers")
          break
        case "tuition_request":
          router.push("/admin/requests")
          break
        default:
          break
      }
    } catch (error) {
      console.error("Error handling notification:", error)
      toast.error("Failed to update notification")
    }
  }

  const handleDeleteNotification = async (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await deleteNotification(notificationId)
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
      toast.success("Notification deleted")
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast.error("Failed to delete notification")
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "student_registration":
        return "👨‍🎓"
      case "teacher_application":
        return "👩‍🏫"
      case "tuition_request":
        return "📚"
      default:
        return "🔔"
    }
  }

  const handleNotificationBellClick = () => {
    setNotificationDialogOpen(true)
    if (!loading && notifications.length === 0) {
      fetchNotifications()
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-slate-900">Admin Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-slate-100"
            onClick={handleNotificationBellClick}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500 animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={admin.name} />
                  <AvatarFallback className="bg-slate-900 text-white">
                    {admin.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{admin.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{admin.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logoutAdmin()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" onClick={() => setNotificationDialogOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>Stay updated with the latest platform activities</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-80">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors group ${!notification.isRead
                        ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                onClick={(e) => handleDeleteNotification(notification.id, e)}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No notifications yet</p>
                    <p className="text-xs text-gray-400 mt-1">New notifications will appear here</p>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {notifications.length > 0 && (
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => router.push("/admin/notifications")}>
                View All
              </Button>
              <p className="text-xs text-gray-500">
                {unreadCount} unread of {notifications.length} total
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </header>
  )
}
