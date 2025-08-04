import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  image: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } }).onUploadComplete(
    () => {}
  ),
  images: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  attachment: f({
    // text: { maxFileSize: "8MB", maxFileCount: 1 },
    // audio: { maxFileSize: "8MB", maxFileCount: 1 },
    // video: { maxFileSize: "8MB", maxFileCount: 1 },
    // image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    blob: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
