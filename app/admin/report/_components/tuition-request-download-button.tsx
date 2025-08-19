'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface TuitionRequestDownloadButtonProps {
    data: any[];
}

export default function TuitionRequestDownloadButton({ data }: TuitionRequestDownloadButtonProps) {
    const handleDownload = () => {
        const wb = XLSX.utils.book_new();
        const tuitionRequestData = data.map((tr) => ({
            ID: tr.id,
            StudentID: tr.studentId,
            StudentName: tr.student.name,
            Status: tr.status,
            IsApproved: tr.isApproved ? 'Yes' : 'No',
            CreatedAt: tr.createdAt.toISOString(),
            UpdatedAt: tr.updatedAt.toISOString(),
        }));
        const ws = XLSX.utils.json_to_sheet(tuitionRequestData);
        XLSX.utils.book_append_sheet(wb, ws, 'Tuition Requests');
        XLSX.writeFile(wb, 'tuition_requests_report.xlsx');
    };

    return (
        <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Tuition Requests
        </Button>
    );
}