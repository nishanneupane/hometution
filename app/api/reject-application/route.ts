import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateTuitionRequestRejection } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { teacherEmail, teacherName, vacancyDetails } = await req.json();

    if (!teacherEmail || !teacherName || !vacancyDetails) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = generateTuitionRequestRejection(
      teacherName,
      vacancyDetails
    );

    const { error } = await resend.emails.send({
      from: "HR Home Tuition <info@hrhometuition.com>",
      to: [teacherEmail],
      subject: "Application Update – Not Selected",
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
