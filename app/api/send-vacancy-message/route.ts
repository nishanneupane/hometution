import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { teacherEmail, teacherName, message, imageUrl } = await req.json();

  try {
    if (!teacherEmail || !teacherName || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: teacherEmail, teacherName, or message",
        },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Hello ${teacherName},</h2>
        <p>${message}</p>
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="Vacancy Image" style="max-width: 100%; height: auto; margin-top: 10px;" />`
            : ""
        }
        <p>Best regards,<br>HR Home Tuition Team</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "HR Home Tuition <info@hrhometuition.com>",
      to: [teacherEmail],
      subject: "New Vacancy Available!",
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
