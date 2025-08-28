import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, MapPin, Clock, Phone, User, School } from "lucide-react"
import { ApplicationListClient } from "./_components/application-list-client"
import { getTuitionRequestById } from "@/lib/actions/application-actions"
import Link from "next/link"

export default async function VacancyPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const request: any = await getTuitionRequestById(id)

    if (!request) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FileText className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Request not found</h3>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                        {/* Student/School Info (Static) */}
                        <div className="flex items-center space-x-4">
                            <Link href={`/admin/students/${request.student.id}`}>
                                <Avatar className="h-12 w-12 cursor-pointer hover:opacity-80 transition">
                                    <AvatarFallback className="bg-primary text-white">
                                        {request.student.name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
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
                        <Badge variant={request.status === "active" ? "default" : "secondary"}>{request.status}</Badge>
                    </div>

                    {/* Request Details (Static) */}
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

                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                        All Teacher Applications ({request.applications.length})
                    </h4>

                    <ApplicationListClient applications={request.applications} />
                </CardContent>
            </Card>
        </div>
    )
}