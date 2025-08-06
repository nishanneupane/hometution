import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Tag, BadgeInfo, CalendarClock, Info, Users, BookOpenCheck } from 'lucide-react';

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
        <div id="vacancy-card" className="w-full max-w-[380px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm px-1 pt-3 mx-auto font-sans">
            <CardContent className="flex flex-col gap-2 h-full">
                {/* Header Section */}
                <div className="flex items-center justify-center gap-3">
                    <img
                        src="/images/hrhometuition.jpeg"
                        alt="HR Home Tuition"
                        className="h-20 w-20 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-red-600 font-bold text-sm uppercase">Urgent! Urgent !! Urgent !!!</p>
                        <h2 className="text-base font-semibold text-red-800 leading-tight">
                            {student.requestType === 'school' ? 'School Teacher Needed' : 'Home Tuition Teacher Needed'}
                        </h2>

                    </div>
                </div>

                {/* Images Section */}
                <div className="grid grid-cols-2 gap-1">
                    <img src="/images/hero2.jpg" alt="Tuition 1" className="object-cover h-20 w-full rounded" />
                    <img src="/images/hero3.jpg" alt="Tuition 2" className="object-cover h-20 w-full rounded" />
                </div>

                {/* Details Section */}
                <div className="space-y-3 text-sm text-gray-800">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span>
                            <strong>Location:</strong> {student.province}, {student.municipality}-{student.ward}, {student.city}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-blue-600" />
                        <span>
                            <strong>Vacancy Code:</strong> {student.id}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2">
                        <div className="flex items-center gap-2">
                            <BadgeInfo className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>{student.requestType === 'school' ? 'Level' : 'Grade'}:</strong> {student.class}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Time:</strong> {convertToAmPm(student.preferredTimeFrom)}–{convertToAmPm(student.preferredTimeTo)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Salary:</strong> {student.expectedFees}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>
                                <strong>Gender:</strong> {student.gender}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <BookOpenCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span>
                            <strong>Subject:</strong> {student.subject.join(', ')}
                        </span>
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default VacancyCard;