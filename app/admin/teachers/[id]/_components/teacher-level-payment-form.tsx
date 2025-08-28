'use client';

import React, { useState } from 'react';
import { DollarSign, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { updateTeacherLevel, updateTeacherPayment } from '@/lib/actions/teacher-actions';

interface Teacher {
    id: string;
    leftPayment: string | null;
    priority: string | null;
}

interface TeacherLevelPaymentFormProps {
    teacher: Teacher;
}

const TeacherLevelPaymentForm: React.FC<TeacherLevelPaymentFormProps> = ({ teacher }) => {
    const [payment, setPayment] = useState(teacher.leftPayment ? `NPR ${parseFloat(teacher.leftPayment).toLocaleString('en-NP')}` : 'NPR 0');

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPayment(`NPR ${parseInt(value || '0').toLocaleString('en-NP')}`);
    };

    const onSubmitLevel = async (formData: FormData) => {
        try {
            const level = formData.get('priority') as string;
            await updateTeacherLevel(teacher.id, level);
            toast({ title: 'Success', description: 'Level updated successfully' });
        } catch (error: any) {
            toast({ title: 'Error', description: error?.message || 'Something went wrong', variant: 'destructive' });
        }
    };

    const onSubmitPayment = async (formData: FormData) => {
        try {
            const payment = formData.get('leftPayment') as string;
            await updateTeacherPayment(teacher.id, payment);
            toast({ title: 'Success', description: 'Payment updated successfully' });
        } catch (error: any) {
            toast({ title: 'Error', description: error?.message || 'Something went wrong', variant: 'destructive' });
        }
    };


    return (
        <div className="mt-4 space-y-4 w-full">
            <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <div>
                    <p className="text-sm font-medium text-gray-700">Level</p>
                    <form action={onSubmitLevel}>
                        <Select name="priority" defaultValue={teacher.priority || 'Basic'}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Primary">Primary</SelectItem>
                                <SelectItem value="Secondary">Secondary</SelectItem>
                                <SelectItem value="Bachelor">Bachelor</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit" size="sm" className="mt-2">Update Level</Button>
                    </form>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                    <p className="text-sm font-medium text-gray-700">Payment</p>
                    <form action={onSubmitPayment}>
                        <Input
                            name="leftPayment"
                            value={payment}
                            placeholder="NPR 0"
                            className="mt-1 w-full border-green-300 focus:border-green-500"
                            onChange={handlePaymentChange}
                        />
                        <Button type="submit" size="sm" className="mt-2 bg-green-600 hover:bg-green-700">Update Payment</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherLevelPaymentForm;