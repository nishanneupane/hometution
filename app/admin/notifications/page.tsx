import { Suspense } from "react"
import { NotificationsTable } from "@/components/admin/notifications-table"
import { NotificationsHeader } from "@/components/admin/notifications-header"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function NotificationsTableSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <NotificationsHeader />
      <Suspense fallback={<NotificationsTableSkeleton />}>
        <NotificationsTable />
      </Suspense>
    </div>
  )
}
