"use client";
import { updateVacancy } from '@/lib/actions/student-actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

interface StudentActionsProps {
    studentId: string;
    isApproved: boolean;
}

const StudentActions = ({ studentId, isApproved }: StudentActionsProps) => {
    const handleApprove = async (id: string, isApproved: boolean, status: 'active' | 'filled' | 'cancelled') => {
        try {
            await updateVacancy({ id, isApproved: isApproved, status });
            toast.success("Successfully updated")
        } catch (error) {
            console.error('Error updating approval:', error);
        }
    };

    return (
        <div className="flex justify-end mt-8 space-x-4">
            {isApproved ? (
                <Button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg px-4 py-2 transition-all"
                    onClick={() => handleApprove(studentId, false, 'cancelled')}
                >
                    Unapprove Application
                </Button>
            ) : (
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition-all"
                    onClick={() => handleApprove(studentId, true, 'active')}
                >
                    Approve Application
                </Button>
            )}

            <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all"
                asChild
            >
                <Link href="/admin/students">Back to Students</Link>
            </Button>
        </div>
    );
};

export default StudentActions;