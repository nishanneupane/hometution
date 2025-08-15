"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { approveApplication, inviteToOffice, rejectApplication } from "@/lib/actions/application-actions"
import { CheckCircle, XCircle, FileText, MapPin, Clock, Phone, User, School, Building } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface RequestsTableClientProps {
  requests: any[]
}

export function RequestsTableClient({ requests }: RequestsTableClientProps) {
  const handleApproveApplication = async (applicationId: string) => {
    const result = await approveApplication(applicationId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    const result = await rejectApplication(applicationId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const handleInviteToOffice = async (applicationId: string) => {
    const result = await inviteToOffice(applicationId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  if (requests.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tuition requests found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Tuition requests will appear here when students or schools register for tutoring services.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {requests.map((request) => (
        <Card key={request.id} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 ">
                  <AvatarFallback className="bg-primary text-white">
                    {request.student.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{request.student.name}</h3>
                    <div className="flex items-center space-x-1">
                      {request.student.requestType === "school" ? (
                        <School className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                      <Badge
                        variant={request.student.requestType === "school" ? "default" : "secondary"}
                        className={
                          request.student.requestType === "school"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {request.student.requestType === "school" ? "School" : "Student"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600">{request.student.schoolName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={request.status === "active" ? "default" : "secondary"}>{request.status}</Badge>
                <Link href={`/admin/requests/${request.id}`} passHref>
                  <Button variant="link" className="p-0 h-auto">
                    View All
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {request.student.city}, {request.student.district}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {request.student.preferredTimeFrom} - {request.student.preferredTimeTo}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {request.student.phoneOrWhatsapp}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Subjects</p>
              <div className="flex flex-wrap gap-2">
                {request.student.subject.map((subject: string) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            {request.student.extraInfo && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">Additional Information</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.student.extraInfo}</p>
              </div>
            )}

            {request.applications.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-4">


                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Teacher Applications ({request.applications.length})
                  </h4>
                  {request.applications.length > 2 && (
                    <Link href={`/admin/requests/${request.id}`} passHref>
                      <Button variant="link" className="p-0 h-auto">
                        View All
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="space-y-4">
                  {request.applications.slice(0, 2).map((application: any) => (
                    <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 hidden md:flex">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {application.teacher.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{application.teacher.name}</p>
                          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
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
                          className="hidden md:flex"
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
                              <Building className="h-4 w-4 mr-1" />
                              <p className="hidden md:block">Invite to Office</p>
                            </Button>
                            {/* <Button
                              size="sm"
                              onClick={() => handleApproveApplication(application.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <p className="hidden md:block">Approve</p>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectApplication(application.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              <p className="hidden md:block">Reject</p>
                            </Button> */}
                          </div>
                        )}
                        {application.status === "invited" && (
                          <div className="flex space-x-2">

                            <Button
                              size="sm"
                              onClick={() => handleApproveApplication(application.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <p className="hidden md:block">Approve</p>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectApplication(application.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              <p className="hidden md:block">Reject</p>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No teacher applications yet</p>
                <p className="text-sm">Teachers will be able to apply once they are approved</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
