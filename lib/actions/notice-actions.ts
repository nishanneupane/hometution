"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../prisma";

const CreateNoticeSchema = z.object({
  text: z.string().min(1, "Text is required").max(2000, "Text is too long"),
  photoUrls: z
    .array(z.string().url("Invalid photo URL"))
    .optional()
    .default([]),
});

const UpdateNoticeSchema = CreateNoticeSchema.extend({
  id: z.number().int().positive("Invalid notice ID"),
});

const DeleteNoticeSchema = z.object({
  id: z.number().int().positive("Invalid notice ID"),
});

export async function createNotice(formData: FormData) {
  const validated = CreateNoticeSchema.safeParse({
    text: formData.get("text"),
    photoUrls: JSON.parse((formData.get("photoUrls") as string) || "[]"),
  });

  if (!validated.success) {
    throw new Error(validated.error.errors.map((e) => e.message).join(", "));
  }

  const { text, photoUrls } = validated.data;

  const notice = await prisma.notice.create({
    data: { text, photoUrls },
  });

  revalidatePath("/admin/notices");
  return notice;
}

export async function getNotices(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.notice.count(),
  ]);

  return { notices, total, page, limit };
}

export async function getNoticeById(id: number) {
  return prisma.notice.findUnique({ where: { id } });
}

export async function updateNotice(formData: FormData) {
  const validated = UpdateNoticeSchema.safeParse({
    id: Number(formData.get("id")),
    text: formData.get("text"),
    photoUrls: JSON.parse((formData.get("photoUrls") as string) || "[]"),
  });

  if (!validated.success) {
    throw new Error(validated.error.errors.map((e) => e.message).join(", "));
  }

  const { id, text, photoUrls } = validated.data;

  const notice = await prisma.notice.update({
    where: { id },
    data: { text, photoUrls },
  });

  revalidatePath("/admin/notices");
  return notice;
}

export async function deleteNotice(formData: FormData) {
  const validated = DeleteNoticeSchema.safeParse({
    id: Number(formData.get("id")),
  });

  if (!validated.success) {
    throw new Error(validated.error.errors.map((e) => e.message).join(", "));
  }

  const { id } = validated.data;

  await prisma.notice.delete({ where: { id } });

  revalidatePath("/admin/notices");
}
