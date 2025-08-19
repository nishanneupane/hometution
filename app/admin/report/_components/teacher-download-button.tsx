'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface TeacherDownloadButtonProps {
    data: any[];
}

export default function TeacherDownloadButton({ data }: TeacherDownloadButtonProps) {
    const handleDownload = () => {
        const wb = XLSX.utils.book_new();
        const teacherData = data.map((t) => ({
            ID: t.id,
            Name: t.name,
            Email: t.email,
            PhoneOrWhatsapp: t.phoneOrWhatsapp,
            Province: t.province,
            District: t.district,
            Municipality: t.municipality,
            City: t.city,
            Ward: t.ward || 'N/A',
            Gender: t.gender,
            TeacherCode: t.teacherCode,
            IsApproved: t.isApproved ? 'Yes' : 'No',
            CreatedAt: t.createdAt.toISOString(),
            UpdatedAt: t.updatedAt.toISOString(),
        }));
        const ws = XLSX.utils.json_to_sheet(teacherData);
        XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
        XLSX.writeFile(wb, 'teachers_report.xlsx');
    };

    return (
        <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Teachers
        </Button>
    );
}