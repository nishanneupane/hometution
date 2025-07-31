import { Suspense } from "react"
import { TeachersTable } from "@/components/admin/teachers-table"
import { TeachersHeader } from "@/components/admin/teachers-header"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function TeachersTableSkeleton() {
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

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <TeachersHeader />
      <Suspense fallback={<TeachersTableSkeleton />}>
        <TeachersTable />
      </Suspense>
    </div>
  )
}
