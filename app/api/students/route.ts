import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { studentRegistrationSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = studentRegistrationSchema.parse(body)

    const student = await prisma.student.create({
      data: {
        requestType: validatedData.requestType,
        name: validatedData.name,
        schoolName: validatedData.schoolName,
        phoneOrWhatsapp: validatedData.phoneOrWhatsapp,
        province: validatedData.province,
        district: validatedData.district,
        municipality: validatedData.municipality,
        city: validatedData.city,
        subject: validatedData.subject,
        preferredTimeFrom: validatedData.preferredTimeFrom,
        preferredTimeTo: validatedData.preferredTimeTo,
        parentCtzOrStudentCtz: validatedData.parentCtzOrStudentCtz,
        extraInfo: validatedData.extraInfo,
      },
    })

    // Create tuition request
    await prisma.tuitionRequest.create({
      data: {
        studentId: student.id,
        status: "active",
      },
    })

    // Create notification
    await prisma.notification.create({
      data: {
        title: `New ${validatedData.requestType === "school" ? "School" : "Student"} Request`,
        message: `${validatedData.name} has submitted a tuition request for ${validatedData.subject.join(", ")}`,
        type: "student_registration",
      },
    })

    return NextResponse.json({ success: true, message: "Registration successful" })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        tuitionRequests: {
          include: {
            applications: {
              include: {
                teacher: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
