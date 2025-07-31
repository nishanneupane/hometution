import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import { MapPin, Clock, BookOpen, Users } from "lucide-react"

async function getTuitionRequests() {
  try {
    const requests = await prisma.tuitionRequest.findMany({
      where: {
        status: "active",
      },
      include: {
        student: true,
        applications: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return requests
  } catch (error) {
    console.error("Error fetching tuition requests:", error)
    return []
  }
}

export default async function CareersPage() {
  const tuitionRequests = await getTuitionRequests()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tutoring Opportunities</h1>
          <p className="text-xl text-muted-foreground">Browse available tutoring requests from students in your area</p>
        </div>

        {tuitionRequests.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No opportunities available</h3>
            <p className="text-muted-foreground">Check back later for new tutoring requests</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tuitionRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.student.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {request.student.city}, {request.student.district}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{request.applications.length} Applied</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">SUBJECTS</h4>
                    <div className="flex flex-wrap gap-1">
                      {request.student.subject.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">SCHOOL</h4>
                    <p className="text-sm">{request.student.schoolName}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {request.student.preferredTimeFrom} - {request.student.preferredTimeTo}
                      </span>
                    </div>
                  </div>

                  {request.student.extraInfo && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">ADDITIONAL INFO</h4>
                      <p className="text-sm text-muted-foreground">{request.student.extraInfo}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button className="w-full" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Apply to Teach
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
