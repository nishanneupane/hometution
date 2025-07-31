import { Suspense } from "react"
import { FeesTable } from "@/components/admin/fees-table"
import { FeesHeader } from "@/components/admin/fees-header"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function FeesTableSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <FeesHeader />
      <Suspense fallback={<FeesTableSkeleton />}>
        <FeesTable />
      </Suspense>
    </div>
  )
}
