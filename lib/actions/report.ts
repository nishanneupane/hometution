"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define filter schema for validation
const FilterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  studentGender: z.string().optional(),
  teacherGender: z.string().optional(),
  applicationStatus: z.string().optional(),
  tuitionRequestStatus: z.string().optional(),
});

type FilterParams = z.infer<typeof FilterSchema>;

export async function getFullReportData(filters: FilterParams = {}) {
  try {
    // Validate and parse filters
    const parsedFilters = FilterSchema.parse(filters);

    const {
      startDate,
      endDate,
      province,
      district,
      studentGender,
      teacherGender,
      applicationStatus,
      tuitionRequestStatus,
    } = parsedFilters;

    // Common date filter
    const dateFilter =
      startDate && endDate
        ? {
            gte: new Date(startDate),
            lte: new Date(endDate),
          }
        : undefined;

    // Area filter for students and teachers
    const areaFilter = {
      ...(province && { province: { equals: province } }),
      ...(district && { district: { equals: district } }),
    };

    const [students, teachers, applications, tuitionRequests] =
      await Promise.all([
        prisma.student.findMany({
          where: {
            ...areaFilter,
            ...(studentGender && { gender: { equals: studentGender } }),
            ...(dateFilter && { createdAt: dateFilter }),
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.teacher.findMany({
          where: {
            ...areaFilter,
            ...(teacherGender && { gender: { equals: teacherGender } }),
            ...(dateFilter && { createdAt: dateFilter }),
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.application.findMany({
          where: {
            ...(applicationStatus && { status: { equals: applicationStatus } }),
            ...(dateFilter && { appliedAt: dateFilter }),
          },
          include: {
            teacher: true,
            tuitionRequest: {
              include: {
                student: true,
              },
            },
          },
          orderBy: { appliedAt: "desc" },
        }),
        prisma.tuitionRequest.findMany({
          where: {
            ...(tuitionRequestStatus && {
              status: { equals: tuitionRequestStatus },
            }),
            ...(dateFilter && { createdAt: dateFilter }),
          },
          include: {
            student: true,
            applications: {
              include: {
                teacher: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
      ]);

    return {
      students,
      teachers,
      applications,
      tuitionRequests,
    };
  } catch (error) {
    console.error("Error fetching report data:", error);
    return {
      students: [],
      teachers: [],
      applications: [],
      tuitionRequests: [],
    };
  }
}
