import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getActiveStudentRequests } from "@/lib/actions/student-actions"
import { MapPin, BookOpen, Tag, BadgeInfo, CalendarClock, Users, BookOpenCheck, Info } from "lucide-react"
import Link from "next/link"
import { convertToAmPm } from "@/lib/utils"
import { ApplyModal } from "./_components/apply-modal"

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

  if (students.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tuition requests available</h3>
          <p className="text-gray-600 text-center max-w-md">
            Check back later for new tutoring opportunities in your area.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        // <Card key={student.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
        //   <CardContent className="p-6">
        //     <div className="flex items-start justify-between mb-4">
        //       <div className="flex items-center space-x-3">
        //         <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        //           {student.requestType === "school" ? (
        //             <School className="h-6 w-6 text-primary" />
        //           ) : (
        //             <User className="h-6 w-6 text-primary" />
        //           )}
        //         </div>
        //         <div>
        //           <h3 className="font-semibold text-gray-900">{student.name}</h3>
        //           <p className="text-sm text-gray-600">{student.schoolName}</p>
        //         </div>
        //       </div>
        //       <Badge
        //         variant={student.requestType === "school" ? "default" : "secondary"}
        //         className={
        //           student.requestType === "school" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
        //         }
        //       >
        //         {student.requestType === "school" ? "School" : "Student"}
        //       </Badge>
        //     </div>

        //     <div className="space-y-3">

        //       <div className="flex items-center text-sm text-gray-600">
        //         <MapPin className="h-4 w-4 mr-2" />
        //         {student.city}, {student.district}
        //       </div>

        //       <div className="flex items-center text-sm text-gray-600">
        //         <Clock className="h-4 w-4 mr-2" />
        //         {student.preferredTimeFrom} - {student.preferredTimeTo}
        //       </div>
        //     </div>

        //     <div className="mt-4">
        //       <p className="text-sm font-medium text-gray-900 mb-2">Subjects Needed</p>
        //       <div className="flex flex-wrap gap-1">
        //         {student.subject.slice(0, 3).map((subject: string) => (
        //           <Badge key={subject} variant="outline" className="text-xs">
        //             {subject}
        //           </Badge>
        //         ))}
        //         {student.subject.length > 3 && (
        //           <Badge variant="outline" className="text-xs">
        //             +{student.subject.length - 3}
        //           </Badge>
        //         )}
        //       </div>
        //     </div>

        //     {student.extraInfo && (
        //       <div className="mt-4">
        //         <p className="text-sm font-medium text-gray-900 mb-1">Additional Info</p>
        //         <p className="text-sm text-gray-600 line-clamp-2">{student.extraInfo}</p>
        //       </div>
        //     )}

        //     <div className="mt-6 pt-4 border-t border-gray-100">
        //       <div className="flex items-center justify-between text-sm">
        //         <span className="text-gray-600">Posted {new Date(student.createdAt).toLocaleDateString()}</span>
        //         <Button size="sm" asChild>
        //           <Link href="/teacher">Apply Now</Link>
        //         </Button>
        //       </div>
        //     </div>
        //   </CardContent>
        // </Card>

        <Card key={student.id} className="w-full max-w-[380px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm px-1 pt-3 mx-auto font-sans">
          <CardContent className="flex flex-col gap-2 h-full">

            <div className="flex items-center justify-center gap-3">
              {/* Left: Logo */}
              <img
                src="/images/hrhometuition.jpeg"
                alt="HR Home Tuition"
                className="h-20 w-20 rounded object-cover shrink-0 float-start"
              />

              {/* Right: Content */}
              <div className="flex flex-col items-start gap-1">
                <p className="text-red-600 font-bold text-sm uppercase">Urgent! Urgent !! Urgent !!!</p>
                <h2 className="text-base font-semibold text-red-800 leading-tight">
                  {student.requestType === "school" ? "School Teacher Needed" : "Home Tuition Teacher Needed"}
                </h2>
                <Badge
                  variant={student.requestType === "school" ? "default" : "secondary"}
                  className={student.requestType === "school" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
                >
                  {student.requestType === "school" ? "School" : "Student"}
                </Badge>
              </div>
            </div>



            {/* Images */}
            <div className="grid grid-cols-2 gap-1">
              <img src="/images/hero2.jpg" alt="Tuition 1" className="object-cover h-20 w-full rounded" />
              <img src="/images/hero3.jpg" alt="Tuition 2" className="object-cover h-20 w-full rounded" />
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm text-gray-800">

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>
                  <strong>Location:</strong> {student.province}, {student.municipality}-{student.ward}, {student.city}
                </span>
              </div>

              {/* Vacancy Code */}
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-blue-600" />
                <span>
                  <strong>Vacancy Code:</strong> {student.id || "N/A"}
                </span>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-y-2">
                <div className="flex items-center gap-2">
                  <BadgeInfo className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>{student.requestType === "school" ? "Level" : "Grade"}:</strong> {student.class}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Time:</strong> {convertToAmPm(student.preferredTimeFrom)}–{convertToAmPm(student.preferredTimeTo)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Salary:</strong> {student.expectedFees}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>Gender:</strong> {student.gender}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div className="flex items-start gap-2">
                <BookOpenCheck className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>
                  <strong>Subject:</strong> {student.subject.join(', ')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-end">
              <ApplyModal studentId={student.id} />
            </div>

          </CardContent>
        </Card>


      ))}
    </div>
  )
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Teaching Opportunities</h1>
            <p className="text-lg text-muted-foreground">
              Find tutoring opportunities in your area and start earning from home
            </p>
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
