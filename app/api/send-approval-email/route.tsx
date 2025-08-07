import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);


export function generateApprovalEmailHTML(name: string, teacherCode: string): string {
  return `
    <div style="
      font-family: Arial, sans-serif; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
      background-color: #f9f9f9;
    ">
      <div style="
        background-color: #ffffff; 
        padding: 30px; 
        border-radius: 8px; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      ">
        <h1 style="
          color: #333; 
          font-size: 24px; 
          margin-bottom: 20px;
        ">
          Welcome, ${name}!
        </h1>
        <p style="
          color: #555; 
          line-height: 1.6; 
          margin-bottom: 20px;
        ">
          Congratulations! You have been selected as a verified teacher at
          <strong> HRHomeTuition.com</strong>. Our admin team has reviewed and
          approved your profile.
        </p>
        <p style="
          color: #555; 
          line-height: 1.6; 
          margin-bottom: 20px;
        ">
          Your unique teacher code is: <strong>${teacherCode}</strong>
        </p>
        <p style="
          color: #555; 
          line-height: 1.6; 
          margin-bottom: 20px;
        ">
          Please keep this code confidential and do not share it with anyone.
          This code is important for your account security and verification
          purposes.
        </p>
        <p style="
          color: #555; 
          line-height: 1.6; 
          margin-bottom: 20px;
        ">
          We're excited to have you on board! You can now start connecting with
          students and sharing your expertise through our platform.
        </p>
        <div style="
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #eee; 
          color: #777; 
          font-size: 14px;
        ">
          <p>Best regards,</p>
          <p>The HR Home Tuition Team</p>
          <p><a href="https://hrhometuition.com" style="color: #0066cc;">hrhometuition.com</a></p>
        </div>
      </div>
    </div>
  `;
}


export async function POST(req: Request) {
  const { email, name, teacherCode } = await req.json();

  try {
    const htmlContent = generateApprovalEmailHTML(name, teacherCode);

    const { error } = await resend.emails.send({
      from: "HR Home Tuition <info@hrhometuition.com>",
      to: [email],
      subject: "Welcome! Your Teacher Profile Has Been Approved",
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
