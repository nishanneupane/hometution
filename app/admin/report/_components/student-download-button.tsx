'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface StudentDownloadButtonProps {
    data: any[];
}

export default function StudentDownloadButton({ data }: StudentDownloadButtonProps) {
    const handleDownload = () => {
        const wb = XLSX.utils.book_new();
        const studentData = data.map((s) => ({
            ID: s.id,
            RequestType: s.requestType,
            Name: s.name,
            SchoolName: s.schoolName,
            PhoneOrWhatsapp: s.phoneOrWhatsapp,
            Province: s.province,
            District: s.district,
            Municipality: s.municipality,
            City: s.city,
            Ward: s.ward,
            Class: s.class,
            Board: s.board,
            Gender: s.gender,
            JobType: s.jobType || 'N/A',
            Subjects: s.subject.join(', '),
            PreferredTimeFrom: s.preferredTimeFrom,
            PreferredTimeTo: s.preferredTimeTo,
            ExtraInfo: s.extraInfo || 'N/A',
            ExpectedFees: s.expectedFees || 'N/A',
            CreatedAt: s.createdAt.toISOString(),
            UpdatedAt: s.updatedAt.toISOString(),
        }));
        const ws = XLSX.utils.json_to_sheet(studentData);
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'students_report.xlsx');
    };

    return (
        <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Students
        </Button>
    );
}