import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateTuitionRequestApproval } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { teacherEmail, teacherName, vacancyDetails } = await req.json();

  try {
    const htmlContent = generateTuitionRequestApproval(
      teacherName,
      vacancyDetails
    );

    const { error } = await resend.emails.send({
      from: "HR Home Tuition <info@hrhometuition.com>",
      to: [teacherEmail],
      subject: "Your Application Has Been Approved!",
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
