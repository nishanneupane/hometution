'use client';

import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadReportButtonProps {
    data: {
        students: any[];
        teachers: any[];
        applications: any[];
        tuitionRequests: any[];
    };
}

export default function DownloadReportButton({ data }: DownloadReportButtonProps) {
    const handleDownload = () => {
        const wb = XLSX.utils.book_new();

        // Students Sheet
        const studentData = data.students.map((s) => ({
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
        const studentWs = XLSX.utils.json_to_sheet(studentData);
        XLSX.utils.book_append_sheet(wb, studentWs, 'Students');

        // Teachers Sheet
        const teacherData = data.teachers.map((t) => ({
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
        const teacherWs = XLSX.utils.json_to_sheet(teacherData);
        XLSX.utils.book_append_sheet(wb, teacherWs, 'Teachers');

        // Applications Sheet
        const applicationData = data.applications.map((a) => ({
            ID: a.id,
            TeacherID: a.teacherId,
            TeacherName: a.teacher.name,
            TuitionRequestID: a.tuitionRequestId,
            StudentName: a.tuitionRequest.student.name,
            Status: a.status,
            AppliedAt: a.appliedAt.toISOString(),
            UpdatedAt: a.updatedAt.toISOString(),
        }));
        const applicationWs = XLSX.utils.json_to_sheet(applicationData);
        XLSX.utils.book_append_sheet(wb, applicationWs, 'Applications');

        // Tuition Requests Sheet
        const tuitionRequestData = data.tuitionRequests.map((tr) => ({
            ID: tr.id,
            StudentID: tr.studentId,
            StudentName: tr.student.name,
            Status: tr.status,
            IsApproved: tr.isApproved ? 'Yes' : 'No',
            CreatedAt: tr.createdAt.toISOString(),
            UpdatedAt: tr.updatedAt.toISOString(),
        }));
        const tuitionRequestWs = XLSX.utils.json_to_sheet(tuitionRequestData);
        XLSX.utils.book_append_sheet(wb, tuitionRequestWs, 'Tuition Requests');

        // Trigger download
        XLSX.writeFile(wb, 'full_report.xlsx');
    };

    return (
        <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Full Report
        </Button>
    );
}