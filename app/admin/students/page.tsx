import { Suspense } from "react"
import { StudentsTable } from "@/components/admin/students-table"
import { StudentsHeader } from "@/components/admin/students-header"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function StudentsTableSkeleton() {
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

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <StudentsHeader />
      <Suspense fallback={<StudentsTableSkeleton />}>
        <StudentsTable />
      </Suspense>
    </div>
  )
}
