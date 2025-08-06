"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { applyRequest } from "@/lib/actions/teacher-actions"
import { toast } from "sonner"

interface ApplyModalProps {
    studentId: string
}
export function ApplyModal({ studentId }: ApplyModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [phone, setPhone] = useState("")
    const [teacherCode, setTeacherCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [phoneError, setPhoneError] = useState("");

    const validatePhone = (value: string) => {
        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(value)) {
            setPhoneError("Please enter a valid phone number (7-15 digits)");
            return false;
        }
        setPhoneError("");
        return true;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validatePhone(phone)) return;
        setIsSubmitting(true);
        try {
            const response = await applyRequest({ studentId, phone, teacherCode });
            if (!response.success) {
                toast.error(response.message);
                return
            }
            setIsOpen(false);
            toast.success("Applied Successfully!!!");
            setPhone("");
            setTeacherCode("");
        } catch (error: any) {
            console.error("Error submitting application:", error);
            toast.error(error.message || "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Button
                size="sm"
                className="text-sm px-4 py-1.5"
                onClick={() => setIsOpen(true)}
            >
                Apply Now
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apply for Teaching Opportunity</DialogTitle>
                        <DialogDescription>
                            Please provide your phone number and teacher code to apply.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="mt-1"
                            />
                            {phoneError && <p className="text-red-600 text-xs mt-1">{phoneError}</p>}
                        </div>
                        <div>
                            <label htmlFor="teacherCode" className="block text-sm font-medium text-gray-700">
                                Teacher Code
                            </label>
                            <Input
                                id="teacherCode"
                                type="text"
                                value={teacherCode}
                                onChange={(e) => setTeacherCode(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}