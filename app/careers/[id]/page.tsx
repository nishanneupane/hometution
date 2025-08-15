import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, BookOpenCheck, CalendarClock, Users, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { getStudentById } from '@/lib/actions/student-actions';
import { Navbar } from '@/components/navbar';
import { convertToAmPm, formatSalary, getTimeAgo } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ApplyModal } from '../_components/apply-modal';

interface CareerIdPageProps {
    params: {
        id: string;
    };
}

interface TuitionRequest {
    id: string;
    createdAt: Date;
    status: string;
}

interface Student {
    id: string;
    requestType: string;
    name: string;
    schoolName: string;
    phoneOrWhatsapp: string;
    province: string;
    district: string;
    municipality: string;
    city: string;
    ward: string;
    class: string;
    board: string;
    gender: string;
    jobType: string | null;
    subject: string[];
    preferredTimeFrom: string;
    preferredTimeTo: string;
    parentCtzOrStudentCtz: string | null;
    extraInfo: string | null;
    expectedFees: string | null;
    createdAt: Date;
    tuitionRequests?: TuitionRequest[];
}

function CareerSkeleton() {
    return (
        <Card className="w-full max-w-[380px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm mx-auto">
            <CardContent className="flex flex-col gap-2 p-3">
                <div className="flex items-center justify-center gap-3">
                    <Skeleton className="h-20 w-20 rounded" />
                    <div className="flex flex-col items-start gap-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-48" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                    <Skeleton className="h-20 w-full rounded" />
                    <Skeleton className="h-20 w-full rounded" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between items-center gap-2">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

async function CareerContent({ id }: { id: string }) {
    const student: Student | null = await getStudentById(id);

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-lg bg-white shadow-lg rounded-xl border border-gray-300">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl font-bold text-gray-800">Vacancy Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">No vacancy found with the provided ID.</p>
                        <div className="flex justify-end mt-6">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all"
                                asChild
                            >
                                <Link href="/careers">Back to Careers</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-[380px] mx-auto">
            <Card className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm px-1 pt-3 font-sans">
                <CardContent className="flex flex-col gap-2 h-full">
                    <div className="flex items-center justify-center gap-3">
                        <img
                            src="/images/hrhometuition.jpeg"
                            alt="HR Home Tuition"
                            className="h-20 w-20 rounded object-cover shrink-0 float-start"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-red-600 font-bold text-sm uppercase">Urgent! Urgent !! Urgent !!!</p>
                            <h2 className="text-base font-semibold text-red-800 leading-tight">
                                {student.requestType === 'school' ? 'School Teacher Needed' : 'Home Tuition Teacher Needed'}
                            </h2>
                            <div className="flex gap-2">
                                <Badge
                                    variant={student.requestType === 'school' ? 'default' : 'secondary'}
                                    className={student.requestType === 'school' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                                >
                                    {student.requestType === 'school' ? 'School' : 'Student'}
                                </Badge>
                                <p className="text-xs font-semibold">Posted {getTimeAgo(student.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <img src="/images/hero2.jpg" alt="Tuition 1" className="object-cover h-20 w-full rounded" />
                        <img src="/images/hero3.jpg" alt="Tuition 2" className="object-cover h-20 w-full rounded" />
                    </div>
                    <div className="space-y-3 text-sm text-gray-700">
                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>
                                <strong>Location:</strong> {student.province}, {student.municipality}
                                {student.ward ? `-${student.ward}` : ''}, {student.city}
                            </span>
                        </div>
                        {/* Level & Gender */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <BookOpenCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>
                                    <strong>{student.requestType === 'school' ? 'Level' : 'Grade'}:</strong> {student.class}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                                <Users className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span className="text-sm">
                                    <strong>Gender:</strong> {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
                                </span>
                            </div>
                        </div>
                        {/* Time */}
                        <div className="flex items-center gap-2">
                            <CalendarClock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>
                                <strong>Time:</strong> {convertToAmPm(student.preferredTimeFrom)}–{convertToAmPm(student.preferredTimeTo)}
                            </span>
                        </div>
                        {/* Subject */}
                        <div className="flex items-center gap-2">
                            <BookOpenCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>
                                <strong>Subject:</strong> {student.subject.join(', ')}
                            </span>
                        </div>
                        {/* Salary & Apply */}
                        <div className="flex justify-between items-center gap-2">
                            <div className="flex items-center justify-center gap-2 bg-green-100 border border-green-400 rounded-md px-4 py-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CreditCard className="h-6 w-6 text-green-700" />
                                <span className="text-green-900 font-extrabold text-[15px] flex items-center gap-1">
                                    Salary: {formatSalary(student.expectedFees || "")}
                                </span>
                            </div>
                            <ApplyModal studentId={student.id} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="my-6">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-3">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                        <div>
                            <h3 className="text-base font-semibold text-blue-900">Ready to Start Teaching?</h3>
                            <p className="text-sm text-blue-700">
                                Register as a teacher to apply and connect with nearby students.
                            </p>
                        </div>
                        <div>
                            <Button
                                size="sm"
                                asChild
                                className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-1.5"
                            >
                                <Link href="/teacher">Register as Teacher</Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default async function CareerIdPage({ params }: CareerIdPageProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-2">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Teaching Opportunity Details</h1>
                    <div className="inline-block bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 rounded-md shadow-md animate-pulse">
                        🎉 Free 2-Day Demo Class on This Opportunity! Don&apos;t Miss Out! 🎉
                    </div>
                </div>
                <Suspense fallback={<CareerSkeleton />}>
                    <CareerContent id={params.id} />
                </Suspense>
            </div>
        </div>
    );
}