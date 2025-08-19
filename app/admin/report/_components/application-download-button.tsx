'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ApplicationDownloadButtonProps {
    data: any[];
}

export default function ApplicationDownloadButton({ data }: ApplicationDownloadButtonProps) {
    const handleDownload = () => {
        const wb = XLSX.utils.book_new();
        const applicationData = data.map((a) => ({
            ID: a.id,
            TeacherID: a.teacherId,
            TeacherName: a.teacher.name,
            TuitionRequestID: a.tuitionRequestId,
            StudentName: a.tuitionRequest.student.name,
            Status: a.status,
            AppliedAt: a.appliedAt.toISOString(),
            UpdatedAt: a.updatedAt.toISOString(),
        }));
        const ws = XLSX.utils.json_to_sheet(applicationData);
        XLSX.utils.book_append_sheet(wb, ws, 'Applications');
        XLSX.writeFile(wb, 'applications_report.xlsx');
    };

    return (
        <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Applications
        </Button>
    );
}