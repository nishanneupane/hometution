import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { teacherRegistrationSchema } from "@/lib/validations"

function generateTeacherCode(): string {
  const prefix = "HRT"
  const randomNum = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `${prefix}${randomNum}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = teacherRegistrationSchema.parse(body)

    // Generate unique teacher code
    let teacherCode = generateTeacherCode()
    let existingTeacher = await prisma.teacher.findUnique({
      where: { teacherCode },
    })

    // Ensure unique teacher code
    while (existingTeacher) {
      teacherCode = generateTeacherCode()
      existingTeacher = await prisma.teacher.findUnique({
        where: { teacherCode },
      })
    }

    // Create teacher record
    const teacher = await prisma.teacher.create({
      data: {
        ...validatedData,
        teacherCode,
        isApproved: false,
      },
    })

    return NextResponse.json({
      success: true,
      teacherId: teacher.id,
      teacherCode: teacher.teacherCode,
    })
  } catch (error) {
    console.error("Error creating teacher:", error)
    return NextResponse.json({ error: "Failed to create teacher record" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        applications: {
          include: {
            tuitionRequest: {
              include: {
                student: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(teachers)
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 })
  }
}
