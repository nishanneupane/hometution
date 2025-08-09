"use server";

import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";
import { prisma } from "../prisma";

export async function getDashboardChartData() {
  const months = Array.from({ length: 6 }).map((_, i) => {
    const date = subMonths(new Date(), 5 - i);
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
      label: format(date, "MMM"),
    };
  });

  const studentCounts = await Promise.all(
    months.map(({ start, end }) =>
      prisma.student.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      })
    )
  );

  const teacherCounts = await Promise.all(
    months.map(({ start, end }) =>
      prisma.teacher.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      })
    )
  );

  const requestCounts = await Promise.all(
    months.map(({ start, end }) =>
      prisma.tuitionRequest.count({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      })
    )
  );

  const monthlyData = months.map(({ label }, i) => ({
    month: label,
    students: studentCounts[i],
    teachers: teacherCounts[i],
    requests: requestCounts[i],
  }));

  // Prisma does not support array field querying easily, so fetch all subjects and count in JS
  const allStudents = await prisma.student.findMany({
    select: { subject: true },
  });

  const subjectCounts: Record<string, number> = {};

  allStudents.forEach(({ subject }: { subject: any }) => {
    subject.forEach((subj: any) => {
      subjectCounts[subj] = (subjectCounts[subj] || 0) + 1;
    });
  });

  const sortedSubjects = Object.entries(subjectCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const subjectData = sortedSubjects.map(([name, value], i) => ({
    name,
    value,
    color: colors[i % colors.length],
  }));

  const lastMonth = studentCounts[5];
  const prevMonth = studentCounts[4] || 1;

  const growthPercent = Math.round(((lastMonth - prevMonth) / prevMonth) * 100);

  return {
    monthlyData,
    subjectData,
    growthPercent,
  };
}
