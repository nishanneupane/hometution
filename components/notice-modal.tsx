'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Notice } from "@prisma/client";


type NoticeModalProps = {
    notice: Notice;
};

export function NoticeModal({ notice }: NoticeModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const shownNotices = sessionStorage.getItem("shownNotices");
        const shownNoticeIds = shownNotices ? JSON.parse(shownNotices) : [];

        if (!shownNoticeIds.includes(notice.id)) {
            setIsOpen(true);
        }
    }, [notice.id]);


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] rounded-2xl bg-white shadow-xl">

                <div className="space-y-4">
                    {Array.isArray(notice.photoUrls) && notice.photoUrls.length > 0 && (
                        <div className="flex flex-col items-center gap-4">
                            {notice.photoUrls
                                .filter((url): url is string => typeof url === "string" && url !== "")
                                .map((url, idx) => (
                                    <Image
                                        key={idx}
                                        src={url}
                                        alt={`Notice image ${idx + 1}`}
                                        width={300}
                                        height={200}
                                        className="rounded-xl object-cover shadow-md border border-gray-100 max-w-full"
                                        loading="lazy"
                                    />
                                ))}
                        </div>
                    )}
                    <p className="text-sm text-gray-600 leading-relaxed text-center">{notice.text}</p>
                </div>

            </DialogContent>
        </Dialog>
    );
}