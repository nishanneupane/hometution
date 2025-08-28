import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { teacherEmail, teacherName, message, imageUrl, fromEmail } =
    await req.json();

  try {
    if (!teacherEmail || !teacherName || !message || !fromEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: teacherEmail, teacherName, message, or fromEmail",
        },
        { status: 400 }
      );
    }

    const validFromEmails = [
      "support@hrhometuition.com",
      "birendra.naral@hrhometuition.com",
      "info@hrhometuition.com",
      "hr2025@hrhometuition.com",
      "contact@hrhometuition.com",
    ];
    if (!validFromEmails.includes(fromEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid fromEmail address" },
        { status: 400 }
      );
    }

    const batchEmails = [
      {
        from: `HR Home Tuition <${fromEmail}>`,
        to: [teacherEmail],
        subject: "New Vacancy Available!",
        html: `
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
      `,
      },
    ];

    const { data, error } = await resend.batch.send(batchEmails);

    if (error) {
      console.error("Resend batch error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
