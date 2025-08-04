import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getActiveStudentRequests } from "@/lib/actions/student-actions"
import { MapPin, Clock, BookOpen, User, School, Phone } from "lucide-react"
import Link from "next/link"

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

        <Card key={student.id} className="w-full max-w-[400px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-lg p-2 mx-auto font-sans">
          <CardContent className="flex flex-col h-full justify-between">

            {/* Top: Logo + Slogan + Code */}
            <div className="flex items-center justify-between gap-1 mb-4">
              <img src="/images/hrhometuition.jpeg" alt="HR Home Tuition" className="h-16 w-auto rounded-md shadow-none" />
              <p className="hidden md:flex flex-1 text-center text-xs font-semibold text-white bg-blue-600 rounded-full px-2 py-1 leading-tight tracking-wide shadow-md">
                “Teacher who love teaching, teach children to love learning”
              </p>
              {/* <p className="text-sm font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap select-none">
                Code: {student.id}
              </p> */}
            </div>

            {/* Headings */}
            <div className="text-center mb-5">
              <p className="text-red-600 font-extrabold text-lg tracking-wide">Urgent! Urgent !! Urgent !!!!</p>
              <h2 className="text-2xl font-black text-red-800 leading-tight mt-1">Home Tuition Teacher Needed</h2>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3 mb-6 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src="/images/hero2.jpg" alt="Tuition 1" className="object-cover w-full h-28" />
              <img src="/images/hero3.jpg" alt="Tuition 2" className="object-cover w-full h-28" />
            </div>

            {/* Details with custom bullets */}
            <div className="text-gray-800 space-y-4 text-sm font-medium">

              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                <span><strong>Location:</strong> {student.city}, {student.district}</span>
              </div>

              {/* Grade & Time side-by-side */}
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Grade: {student.class}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Time: {student.preferredTimeFrom}–{student.preferredTimeTo}</span>
                </div>
              </div>

              {/* Salary & Gender side-by-side */}
              <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Salary: {student.expectedFees}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Gender: {student.gender}</span>
                </div>
              </div>

              {/* Subject */}
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                <span>Subject: {student.subject.join(', ')}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Posted {new Date(student.createdAt).toLocaleDateString()}</span>
                <Button size="sm" asChild>
                  <Link href="/teacher">Apply Now</Link>
                </Button>
              </div>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Teaching Opportunities</h1>
            <p className="text-xl text-muted-foreground">
              Find tutoring opportunities in your area and start earning from home
            </p>
          </div>

          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Ready to Start Teaching?</CardTitle>
                <CardDescription className="text-blue-700">
                  Register as a teacher to apply for these opportunities and connect with students in your area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/teacher">Register as Teacher</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Suspense fallback={<CareersSkeleton />}>
            <CareersContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
