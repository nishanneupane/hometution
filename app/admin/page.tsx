import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Users, GraduationCap, Briefcase, TrendingUp, Eye, CheckCircle, XCircle } from "lucide-react"

async function getAdminStats() {
  try {
    const [totalStudents, totalTeachers, verifiedTeachers, activeTuitionRequests, totalApplications] =
      await Promise.all([
        prisma.student.count(),
        prisma.teacher.count(),
        prisma.teacher.count({ where: { isApproved: true } }),
        prisma.tuitionRequest.count({ where: { status: "active" } }),
        prisma.application.count(),
      ])

    return {
      totalStudents,
      totalTeachers,
      verifiedTeachers,
      activeTuitionRequests,
      totalApplications,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalStudents: 0,
      totalTeachers: 0,
      verifiedTeachers: 0,
      activeTuitionRequests: 0,
      totalApplications: 0,
    }
  }
}

async function getStudents() {
  try {
    return await prisma.student.findMany({
      include: {
        tuitionRequests: {
          include: {
            applications: {
              include: {
                teacher: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error fetching students:", error)
    return []
  }
}

async function getTeachers() {
  try {
    return await prisma.teacher.findMany({
      include: {
        applications: {
          include: {
            tuitionRequest: {
              include: {
                student: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return []
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  const students = await getStudents()
  const teachers = await getTeachers()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage students, teachers, and tutoring requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTeachers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Teachers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.verifiedTeachers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTuitionRequests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="requests">Tuition Requests</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage all registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {student.schoolName} • {student.city}, {student.district}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {student.subject.map((subject) => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          {student.tuitionRequests[0]?.applications.length || 0} Applications
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Management</CardTitle>
                <CardDescription>Approve, reject, and manage teacher registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{teacher.name}</h4>
                          <Badge variant={teacher.isApproved ? "default" : "secondary"}>
                            {teacher.isApproved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Code: {teacher.teacherCode} • {teacher.city}, {teacher.district}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {teacher.phoneOrWhatsapp} • {teacher.gender}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!teacher.isApproved && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tuition Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tuition Requests</CardTitle>
                <CardDescription>Manage active tuition requests and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) =>
                    student.tuitionRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.city}, {student.district} • {student.preferredTimeFrom} -{" "}
                              {student.preferredTimeTo}
                            </p>
                          </div>
                          <Badge variant={request.status === "active" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {student.subject.map((subject) => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>

                        {request.applications.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm">Applications ({request.applications.length})</h5>
                            {request.applications.map((application) => (
                              <div
                                key={application.id}
                                className="flex items-center justify-between p-2 bg-muted rounded"
                              >
                                <div>
                                  <span className="font-medium">{application.teacher.name}</span>
                                  <span className="text-sm text-muted-foreground ml-2">
                                    {application.teacher.teacherCode}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant={
                                      application.status === "approved"
                                        ? "default"
                                        : application.status === "rejected"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                  >
                                    {application.status}
                                  </Badge>
                                  {application.status === "pending" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-green-600 border-green-600 bg-transparent"
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-600 bg-transparent"
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
