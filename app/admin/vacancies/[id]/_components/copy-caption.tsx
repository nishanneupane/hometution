"use client"
import React, { useState } from "react";

interface Student {
    id: string;
    requestType: "school" | "student";
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

interface CopyCaptionProps {
    student: Student;
}

const CopyCaption: React.FC<CopyCaptionProps> = ({ student }) => {
    const [copied, setCopied] = useState(false);

    // Move convertToAmPm here (client-side)
    const convertToAmPm = (time: string): string => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const caption = `
${student.requestType === "school" ? "School Teacher Needed" : "Home Tuition Teacher Needed"} in ${student.city}.
Apply through this link: https://hrhometuition.com/careers/${student.id}
  `.trim();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(caption);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div className="w-[400px] bg-white p-4 rounded-xl shadow-md mt-6 mx-auto font-sans text-gray-900">
            <pre className="whitespace-pre-wrap text-sm mb-3 select-text">{caption}</pre>
            <button
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
                {copied ? "Copied!" : "Copy Caption"}
            </button>
        </div>
    );
};

export default CopyCaption;
