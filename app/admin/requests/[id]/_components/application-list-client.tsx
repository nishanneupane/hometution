"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, XCircle, FileText, Building } from "lucide-react"
import { toast } from "sonner"
import { approveApplication, inviteToOffice, rejectApplication } from "@/lib/actions/application-actions"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ApplicationListClientProps {
    applications: any[]
}

export function ApplicationListClient({ applications }: ApplicationListClientProps) {
    const [appState, setAppState] = useState(applications)
    const router = useRouter()

    const handleApproveApplication = async (applicationId: string) => {
        const result = await approveApplication(applicationId)
        if (result.success) {
            toast.success(result.message)
            setAppState(prevApps => prevApps.map(app =>
                app.id === applicationId ? { ...app, status: "approved" } : app
            ))
            router.refresh()
        } else {
            toast.error(result.message)
        }
    }

    const handleRejectApplication = async (applicationId: string) => {
        const result = await rejectApplication(applicationId)
        if (result.success) {
            toast.success(result.message)
            setAppState(prevApps => prevApps.map(app =>
                app.id === applicationId ? { ...app, status: "rejected" } : app
            ))
            router.refresh()
        } else {
            toast.error(result.message)
        }
    }

    const handleInviteToOffice = async (applicationId: string) => {
        const result = await inviteToOffice(applicationId)
        if (result.success) {
            toast.success(result.message)
            setAppState(prevApps => prevApps.map(app =>
                app.id === applicationId ? { ...app, status: "invited" } : app
            ))
            router.refresh()
        } else {
            toast.error(result.message)
        }
    }

    if (appState.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No teacher applications yet</p>
                <p className="text-sm">Teachers will be able to apply once they are approved</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {appState.map((application: any) => (
                <div key={application.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <Link href={`/admin/teachers/${application.teacher.id}`}>
                            <Avatar className="h-10 w-10 hidden md:flex cursor-pointer hover:opacity-80 transition">
                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                    {application.teacher.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <p className="font-medium text-gray-900">{application.teacher.name}</p>
                            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mt-1">
                                <span>Code: {application.teacher.teacherCode}</span>
                                <span>{application.teacher.phoneOrWhatsapp}</span>
                                <span>
                                    {application.teacher.city}, {application.teacher.district}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Badge
                            variant={
                                application.status === "approved"
                                    ? "default"
                                    : application.status === "rejected"
                                        ? "destructive"
                                        : application.status === "invited"
                                            ? "outline"
                                            : "secondary"
                            }
                        >
                            {application.status}
                        </Badge>

                        {application.status === "pending" && (
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    onClick={() => handleInviteToOffice(application.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Building className="h-4 w-4 md:mr-1" />
                                    <p className="hidden md:block">Invite to Office</p>
                                </Button>
                            </div>
                        )}
                        {application.status === "invited" && (
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    onClick={() => handleApproveApplication(application.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <CheckCircle className="h-4 w-4 md:mr-1" />
                                    <p className="hidden md:block">Approve</p>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectApplication(application.id)}
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                    <XCircle className="h-4 w-4 md:mr-1" />
                                    <p className="hidden md:block">Reject</p>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}