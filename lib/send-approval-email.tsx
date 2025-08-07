import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail({
    email,
    name,
    teacherCode,
}: {
    email: string;
    name: string;
    teacherCode: string;
}) {
    return await resend.emails.send({
        from: "HR Home Tuition <info@hrhometuition.com>",
        to: [email],
        subject: "Welcome! Your Teacher Profile Has Been Approved",
        react: <EmailTemplate name={name} teacherCode={teacherCode} />,
    });
}
