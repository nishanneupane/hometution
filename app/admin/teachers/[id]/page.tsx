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
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <Card className="w-full max-w-[600px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm mx-auto font-sans">
                <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-gray-800">Teacher Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Profile Picture and Basic Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <img
                            src={teacher.profilePicture || '/images/hrlogo.png'}
                            alt={`${teacher.name}'s profile picture`}
                            className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex flex-col gap-2 text-center sm:text-left">
                            <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>
                            <Badge
                                variant={teacher.isApproved ? 'default' : 'secondary'}
                                className={teacher.isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                                {teacher.isApproved ? 'Approved' : 'Not Approved'}
                            </Badge>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    <strong>Teacher Code:</strong> {teacher.teacherCode}
                                </span>
                                <CopyTeacherCodeButton teacherCode={teacher.teacherCode} />
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Email:</strong> {teacher.email}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Phone/WhatsApp:</strong> {teacher.phoneOrWhatsapp}
                            </span>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                            <span>
                                <strong>Location:</strong> {teacher.province}, {teacher.district}, {teacher.municipality}
                                {teacher.ward ? `-${teacher.ward}` : ''}, {teacher.city}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Gender:</strong> {teacher.gender}
                            </span>
                        </div>
                        {teacher.citizenship && (
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span>
                                    <strong>Citizenship:</strong>{' '}
                                    <a href={teacher.citizenship} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View Document
                                    </a>
                                </span>
                            </div>
                        )}
                        {teacher.cv && (
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span>
                                    <strong>CV:</strong>{' '}
                                    <a href={teacher.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View CV
                                    </a>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Applications Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <List className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-800">
                                <strong>Total Applications:</strong> {(teacher.applications || []).length}
                            </span>
                        </div>
                        {teacher.applications && teacher.applications.length > 0 ? (
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-800">Applications</h3>
                                <ul className="space-y-2 text-sm text-gray-800">
                                    {teacher.applications.map((application) => (
                                        <li key={application.id} className="flex items-center gap-2 border-t pt-2">
                                            <span>
                                                <strong>Vacancy ID:</strong> {application.vacancyId} |{' '}
                                                <strong>Status:</strong>{' '}
                                                <Badge
                                                    variant={application.status === 'approved' ? 'default' : 'secondary'}
                                                    className={
                                                        application.status === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                >
                                                    {application.status}
                                                </Badge>{' '}
                                                | <strong>Applied On:</strong> {formatDate(application.createdAt)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">No applications submitted.</p>
                        )}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-end">
                        <Button size="sm" className="text-sm px-4 py-1.5" asChild>
                            <Link href="/admin/teachers">Back to Teachers</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherIdPage;