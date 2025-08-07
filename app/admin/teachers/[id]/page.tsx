import { getTeacherById } from '@/lib/actions/teacher-actions';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, User, FileText, List } from 'lucide-react';
import Link from 'next/link';
import CopyTeacherCodeButton from './copy-teacher-code';

interface TeacherIdPageProps {
    params: {
        id: string;
    };
}

interface Application {
    id: string;
    vacancyId: string;
    status: string;
    createdAt: string;
}

interface Teacher {
    id: string;
    name: string;
    email: string;
    phoneOrWhatsapp: string;
    province: string;
    district: string;
    municipality: string;
    city: string;
    ward: string | null;
    gender: string;
    profilePicture: string | null;
    citizenship: string | null;
    cv: string | null;
    teacherCode: string;
    isApproved: boolean;
    applications: Application[];
}

const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const TeacherIdPage = async ({ params }: TeacherIdPageProps) => {
    // @ts-ignore
    const teacher: Teacher | null = await getTeacherById(params.id);

    if (!teacher) {
        return (
            <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
                <Card className="w-full max-w-[600px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm mx-auto font-sans">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-2xl font-bold text-gray-800">Teacher Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600">No teacher found with the provided ID.</p>
                        <div className="flex justify-end mt-4">
                            <Button size="sm" className="text-sm px-4 py-1.5" asChild>
                                <Link href="/teachers">Back to Teachers</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                        <CardHeader className="p-0">
                            <CardTitle className="text-3xl font-bold">Teacher Profile</CardTitle>
                            <p className="text-sm opacity-80">Detailed information about {teacher.name}</p>
                        </CardHeader>
                    </div>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Profile Summary */}
                            <div className="col-span-1 flex flex-col items-center md:items-start">
                                <img
                                    src={teacher.profilePicture || '/images/hrlogo.png'}
                                    alt={`${teacher.name}'s profile picture`}
                                    className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
                                />
                                <h2 className="mt-4 text-2xl font-semibold text-gray-800">{teacher.name}</h2>
                                <Badge
                                    className={`mt-2 ${teacher.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                >
                                    {teacher.isApproved ? 'Approved' : 'Not Approved'}
                                </Badge>
                                <div className="mt-2 flex items-center gap-2">
                                    <p className="text-sm text-gray-600">
                                        <strong>Teacher Code:</strong> {teacher.teacherCode}
                                    </p>
                                    <CopyTeacherCodeButton teacherCode={teacher.teacherCode} />
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div className="col-span-2 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Email</p>
                                                <p className="text-gray-800">{teacher.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Phone/WhatsApp</p>
                                                <p className="text-gray-800">{teacher.phoneOrWhatsapp}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Location</p>
                                                <p className="text-gray-800">
                                                    {teacher.province}, {teacher.district}, {teacher.municipality}
                                                    {teacher.ward ? `-${teacher.ward}` : ''}, {teacher.city}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Gender</p>
                                                <p className="text-gray-800">{teacher.gender}</p>
                                            </div>
                                        </div>
                                        {teacher.citizenship && (
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Citizenship</p>
                                                    <a
                                                        href={teacher.citizenship}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View Document
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {teacher.cv && (
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">CV</p>
                                                    <a
                                                        href={teacher.cv}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View CV
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Applications Section */}
                                <div className="border-t pt-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <List className="h-5 w-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Applications ({(teacher.applications || []).length})
                                        </h3>
                                    </div>
                                    {teacher.applications && teacher.applications.length > 0 ? (
                                        <div className="mt-4 space-y-4">
                                            <ul className="space-y-3">
                                                {teacher.applications.map((application) => (
                                                    <li
                                                        key={application.id}
                                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm text-gray-800">
                                                                <strong>Vacancy ID:</strong> {application.vacancyId}
                                                            </span>
                                                            <Badge
                                                                className={
                                                                    application.status === 'approved'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                }
                                                            >
                                                                {application.status}
                                                            </Badge>
                                                        </div>
                                                        <span className="text-sm text-gray-600">
                                                            Applied on: {formatDate(application.createdAt)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600 mt-2">No applications submitted.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex justify-end mt-8">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all"
                                asChild
                            >
                                <Link href="/admin/teachers">Back to Teachers</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeacherIdPage;