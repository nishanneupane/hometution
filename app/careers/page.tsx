import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getActiveStudentRequests } from "@/lib/actions/student-actions"
import Link from "next/link"
import { CareersTableClient } from "@/components/admin/careers-table-client"

function CareersSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-20 mb-2" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function CareersContent() {
  const students = await getActiveStudentRequests()
  return <CareersTableClient students={students} />
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Teaching Opportunities</h1>

            <div className="inline-block bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 rounded-md shadow-md animate-pulse">
              🎉 Free 2-Day Demo Class on All Opportunities! Don&apos;t Miss Out! 🎉
            </div>
          </div>

          <Suspense fallback={<CareersSkeleton />}>
            <CareersContent />
          </Suspense>
          <div className="my-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-blue-900">Ready to Start Teaching?</h3>
                  <p className="text-sm text-blue-700">
                    Register as a teacher to apply and connect with nearby students.
                  </p>
                </div>
                <div>
                  <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-1.5">
                    <Link href="/teacher">Register as Teacher</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}