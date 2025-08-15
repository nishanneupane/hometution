import { getStudentById, updateVacancy } from '@/lib/actions/student-actions'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, User, FileText, List, School, Clock, DollarSign, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { formatSalary } from '@/lib/utils'
import StudentActions from './_components/student-actions'

interface StudentIdPageProps {
    params: {
        id: string
    }
}

interface TuitionRequest {
    id: string
    createdAt: Date
    status: string
    isApproved: boolean
}

interface Student {
    id: string
    requestType: string
    name: string
    schoolName: string
    phoneOrWhatsapp: string
    province: string
    district: string
    municipality: string
    city: string
    ward: string
    class: string
    board: string
    gender: string
    jobType: string | null
    subject: string[]
    preferredTimeFrom: string
    preferredTimeTo: string
    parentCtzOrStudentCtz: string | null
    extraInfo: string | null
    expectedFees: string | null
    createdAt: Date
    tuitionRequests?: TuitionRequest[] // Made optional to handle undefined case
}

const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const formatTime = (time: string): string => {
    return new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
}

const StudentIdPage = async ({ params }: StudentIdPageProps) => {
    const student: Student | null = await getStudentById(params.id)

    const handleApprove = async (id: string, isApproved: boolean, status: 'active' | 'filled' | 'cancelled'): Promise<void> => {
        const newApproved = !isApproved;
        try {
            await updateVacancy({ id: id.toString(), isApproved: newApproved, status });
        } catch (error) {
            console.error('Error updating approval:', error);
        }
    };

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4">
                <Card className="w-full max-w-lg bg-white shadow-lg rounded-2xl border border-gray-200">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl font-bold text-gray-800">Student Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">No student found with the provided ID.</p>
                        <div className="flex justify-end mt-6">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all"
                                asChild
                            >
                                <Link href="/students">Back to Students</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <CardHeader className="p-0">
                            <CardTitle className="text-3xl font-bold">Student Profile</CardTitle>
                            <p className="text-sm opacity-80">Detailed information about {student.name}</p>
                        </CardHeader>
                    </div>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Profile Summary */}
                            <div className="col-span-1 flex flex-col items-center md:items-start">
                                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                                    {student.name.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="mt-4 text-2xl font-semibold text-gray-800">{student.name}</h2>
                                <Badge
                                    className={`mt-2 ${student.requestType === 'student'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}
                                >
                                    {student.requestType === 'student' ? 'Individual' : 'School'}
                                </Badge>
                                <p className="mt-2 text-sm text-gray-600">
                                    <strong>Class:</strong> {student.class} ({student.board})
                                </p>
                            </div>

                            {/* Personal and Academic Details */}
                            <div className="col-span-2 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Phone/WhatsApp</p>
                                                <p className="text-gray-800">{student.phoneOrWhatsapp}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Location</p>
                                                <p className="text-gray-800">
                                                    {student.province}, {student.district}, {student.municipality}
                                                    {student.ward ? `-${student.ward}` : ''}, {student.city}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <School className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">School</p>
                                                <p className="text-gray-800">{student.schoolName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Gender</p>
                                                <p className="text-gray-800">{student.gender}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Subjects</p>
                                                <p className="text-gray-800">{student.subject.join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="border-t pt-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Preferred Time</p>
                                            <p className="text-gray-800">
                                                {formatTime(student.preferredTimeFrom)} - {formatTime(student.preferredTimeTo)}
                                            </p>
                                        </div>
                                    </div>
                                    {student.jobType && (
                                        <div className="flex items-center gap-3">
                                            <List className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Job Type</p>
                                                <p className="text-gray-800">{student.jobType}</p>
                                            </div>
                                        </div>
                                    )}
                                    {student.expectedFees && (
                                        <div className="flex items-center gap-3">
                                            <DollarSign className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Expected Fees</p>
                                                <p className="text-gray-800">{formatSalary(student.expectedFees)}</p>
                                            </div>
                                        </div>
                                    )}
                                    {student.parentCtzOrStudentCtz && (
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Citizenship</p>
                                                <a
                                                    href={student.parentCtzOrStudentCtz}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Document
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {student.extraInfo && (
                                        <div className="flex items-start gap-3">
                                            <FileText className="h-5 w-5 text-blue-600 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Additional Info</p>
                                                <p className="text-gray-800">{student.extraInfo}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tuition Requests Section */}
                        <div className="border-t pt-6 mt-6">
                            <div className="flex items-center gap-3">
                                <List className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Tuition Requests ({student.tuitionRequests?.length || 0})
                                </h3>
                            </div>
                            {student.tuitionRequests && student.tuitionRequests.length > 0 ? (
                                <div className="mt-4 space-y-4">
                                    <ul className="space-y-3">
                                        {student.tuitionRequests.map((request) => (
                                            <li
                                                key={request.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-gray-800">
                                                        <strong>Request ID:</strong> {request.id}
                                                    </span>
                                                    <Badge
                                                        className={
                                                            request.status === 'approved'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }
                                                    >
                                                        {request.status}
                                                    </Badge>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    Applied on: {formatDate(request.createdAt)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-600 mt-2">No tuition requests submitted.</p>
                            )}
                        </div>

                        {
                            student.tuitionRequests && student.tuitionRequests.length > 0 && (
                                <StudentActions
                                    studentId={student.tuitionRequests[0].id}
                                    isApproved={student.tuitionRequests[0].isApproved}
                                />
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default StudentIdPage