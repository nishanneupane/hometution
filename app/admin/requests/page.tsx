import { Suspense } from "react"
import { RequestsTable } from "@/components/admin/requests-table"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function RequestsTableSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function RequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tuition Requests</h1>
        <p className="text-gray-600 mt-1">Manage active tuition requests and teacher applications</p>
      </div>

      <Suspense fallback={<RequestsTableSkeleton />}>
        <RequestsTable />
      </Suspense>
    </div>
  )
}
