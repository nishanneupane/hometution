import { Card } from "@/components/ui/card";
import { getNotices } from "@/lib/actions/notice-actions";
import { Notice } from "@prisma/client";
import Image from "next/image";
import { NoticesTableClient } from "./notice-table-client";

// Server component for rendering the table
export async function NoticesTable() {
    const { notices } = await getNotices();

    return (
        <Card className="p-6">
            <div className="space-y-4">
                {notices.length === 0 ? (
                    <p className="text-center text-muted-foreground">No notices found.</p>
                ) : (
                    notices.map((notice: Notice) => (
                        <div
                            key={notice.id}
                            className="flex items-start space-x-4 border-b pb-4 last:border-b-0"
                            role="row"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{notice.text}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {Array.isArray(notice.photoUrls) &&
                                        notice.photoUrls
                                            .filter((url): url is string => typeof url === "string" && url !== "")
                                            .map((url, idx) => (
                                                <Image
                                                    key={idx}
                                                    src={url}
                                                    alt={`Notice photo ${idx + 1}`}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md object-cover"
                                                    loading="lazy"
                                                />
                                            ))}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Created: {new Date(notice.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <NoticesTableClient notice={notice} />
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
}