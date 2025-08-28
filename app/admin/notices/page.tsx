import { NoticesHeader } from "@/components/admin/notice-header";
import { NoticesTableSkeleton } from "@/components/admin/notice-skeleton";
import { NoticesTable } from "@/components/admin/notice-table";
import { Suspense } from "react";


export default function NoticesPage() {
    return (
        <div className="space-y-6">
            <NoticesHeader />
            <Suspense fallback={<NoticesTableSkeleton />}>
                <NoticesTable />
            </Suspense>
        </div>
    );
}