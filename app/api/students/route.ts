import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { studentRegistrationSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = studentRegistrationSchema.parse(body)

    // Create student record
    const student = await prisma.student.create({
      data: validatedData,
    })

    // Create tuition request
    await prisma.tuitionRequest.create({
      data: {
        studentId: student.id,
        status: "active",
      },
    })

    return NextResponse.json({ success: true, studentId: student.id })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student record" }, { status: 500 })
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
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
