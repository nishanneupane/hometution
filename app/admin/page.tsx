import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStudents } from "@/lib/actions/student-actions"
import { getTeachers } from "@/lib/actions/teacher-actions"
import { getTuitionRequests } from "@/lib/actions/application-actions"
import { Users, GraduationCap, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react"

async function getAdminStats() {
  try {
    const [students, teachers, requests] = await Promise.all([getStudents(), getTeachers(), getTuitionRequests()])

    const totalApplications = requests.reduce((acc, req) => acc + req.applications.length, 0)
    const approvedTeachers = teachers.filter((t) => t.isApproved).length
    const pendingApplications = requests.reduce(
      (acc, req) => acc + req.applications.filter((app) => app.status === "pending").length,
      0,
    )

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      approvedTeachers,
      totalRequests: requests.length,
      totalApplications,
      pendingApplications,
      recentStudents: students.slice(0, 5),
      recentTeachers: teachers.slice(0, 5),
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalStudents: 0,
      totalTeachers: 0,
      approvedTeachers: 0,
      totalRequests: 0,
      totalApplications: 0,
      pendingApplications: 0,
      recentStudents: [],
      recentTeachers: [],
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your tuition platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Students</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.totalStudents}</div>
            <p className="text-xs text-blue-700 mt-1">Active registrations</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Total Teachers</CardTitle>
            <GraduationCap className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.totalTeachers}</div>
            <p className="text-xs text-green-700 mt-1">{stats.approvedTeachers} approved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Tuition Requests</CardTitle>
            <FileText className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.totalRequests}</div>
            <p className="text-xs text-purple-700 mt-1">Active requests</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Total Applications</CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.totalApplications}</div>
            <p className="text-xs text-orange-700 mt-1">Teacher applications</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">Pending Reviews</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{stats.pendingApplications}</div>
            <p className="text-xs text-yellow-700 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-teal-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">Success Rate</CardTitle>
            <CheckCircle className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-900">
              {stats.totalApplications > 0 ? Math.round((stats.approvedTeachers / stats.totalApplications) * 100) : 0}%
            </div>
            <p className="text-xs text-teal-700 mt-1">Approval rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Students</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentStudents.length > 0 ? (
                stats.recentStudents.map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.schoolName}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.subject.slice(0, 2).map((subject: string) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {student.subject.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.subject.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{student.city}</p>
                      <p className="text-xs text-gray-500">{new Date(student.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No students registered yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Teachers</CardTitle>
            <CardDescription>Latest teacher registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentTeachers.length > 0 ? (
                stats.recentTeachers.map((teacher: any) => (
                  <div key={teacher.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                      <p className="text-sm text-gray-600">Code: {teacher.teacherCode}</p>
                      <Badge variant={teacher.isApproved ? "default" : "secondary"} className="mt-1">
                        {teacher.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{teacher.city}</p>
                      <p className="text-xs text-gray-500">{new Date(teacher.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No teachers registered yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
