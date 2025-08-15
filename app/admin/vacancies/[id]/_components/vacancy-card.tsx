import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Tag, BadgeInfo, CalendarClock, Info, Users, BookOpenCheck, CreditCard } from 'lucide-react';
import { formatSalary } from '@/lib/utils';

interface Student {
    id: string;
    requestType: 'school' | 'student';
    province: string;
    municipality: string;
    ward: string;
    city: string;
    class: string;
    preferredTimeFrom: string;
    preferredTimeTo: string;
    expectedFees: string;
    gender: string;
    subject: string[];
}

interface VacancyCardProps {
    student: Student;
    convertToAmPm: (time: string) => string;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ student, convertToAmPm }) => {
    return (
        <div
            id="vacancy-card"
            className="max-w-md bg-white text-gray-900 border border-gray-200 rounded-xl shadow-lg overflow-hidden font-sans mx-auto"
        >
            <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-center gap-3">
                    <img
                        src="/images/hrhometuition.jpeg"
                        alt="HR Home Tuition"
                        className="h-20 w-20 rounded object-cover shrink-0 float-start"
                    />
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-red-600 font-bold text-sm uppercase">Urgent! Urgent !! Urgent !!!</p>
                        <h2 className="text-base font-semibold text-red-800 leading-tight">
                            {student.requestType === "school" ? "School Teacher Needed" : "Home Tuition Teacher Needed"}
                        </h2>
                        {/* <div className="flex gap-2">
                            <Badge
                                variant={student.requestType === "school" ? "default" : "secondary"}
                                className={student.requestType === "school" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
                            >
                                {student.requestType === "school" ? "School" : "Student"}
                            </Badge>
                        </div> */}
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-2">
                    <img
                        src="/images/hero2.jpg"
                        alt="Tuition 1"
                        className="object-cover h-24 w-full rounded-lg"
                    />
                    <img
                        src="/images/hero3.jpg"
                        alt="Tuition 2"
                        className="object-cover h-24 w-full rounded-lg"
                    />
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm text-gray-700">
                    {/* Location */}
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span>
                            <strong>Location:</strong> {student.province}, {student.municipality}-
                            {student.ward}, {student.city}
                        </span>
                    </div>

                    {/* Level & Time */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <BadgeInfo className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>
                                <strong>
                                    {student.requestType === "school" ? "Level" : "Grade"}:
                                </strong>{" "}
                                {student.class}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">
                                <strong>Gender:</strong> {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarClock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span>
                            <strong>Time:</strong>{" "}
                            {convertToAmPm(student.preferredTimeFrom)}–{convertToAmPm(student.preferredTimeTo)}
                        </span>
                    </div>

                    {/* Subject */}
                    <div className="flex items-center gap-2">
                        <BookOpenCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span>
                            <strong>Subject:</strong> {student.subject.join(", ")}
                        </span>
                    </div>



                    <div className="bg-green-100 border border-green-400 rounded-md shadow-md px-4 py-1 flex items-center justify-center h-10">
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-6 w-6 text-green-700 flex-shrink-0" />
                            <span className="text-green-900 font-extrabold text-[15px] leading-none">
                                Salary: {formatSalary(student.expectedFees)}
                            </span>
                        </div>
                    </div>



                </div>
            </CardContent>
        </div>
    );
};

export default VacancyCard;