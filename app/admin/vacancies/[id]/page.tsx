import { getTuitionRequestById } from '@/lib/actions/application-actions';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DownloadButton from '@/components/download-button';
import VacancyCard from './_components/vacancy-card';

interface VacancyIdPageProps {
    params: {
        id: string;
    };
}

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

const convertToAmPm = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const VacancyIdPage = async ({ params }: VacancyIdPageProps) => {
    const vacancy = await getTuitionRequestById((await params).id);
    // @ts-ignore
    const student: Student = vacancy && vacancy.student;

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <VacancyCard student={student} convertToAmPm={convertToAmPm} />
            <div className="flex justify-between items-center mt-4 w-full max-w-[380px]">
                <DownloadButton vacancyId={student.id} />
            </div>
        </div>
    );
};

export default VacancyIdPage;