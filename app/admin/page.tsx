import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStudents } from "@/lib/actions/student-actions"
import { getTeachers } from "@/lib/actions/teacher-actions"
import { getTuitionRequests } from "@/lib/actions/application-actions"
import { Users, GraduationCap, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react"

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
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your tuition platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalStudents}</div>
            <p className="text-xs text-slate-500 mt-1">Active registrations</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Teachers</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalTeachers}</div>
            <p className="text-xs text-slate-500 mt-1">{stats.approvedTeachers} approved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Monthly Revenue</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">$12,450</div>
            <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Applications</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.totalApplications}</div>
            <p className="text-xs text-slate-500 mt-1">Teacher applications</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending Reviews</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{stats.pendingApplications}</div>
            <p className="text-xs text-slate-500 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Success Rate</CardTitle>
            <div className="p-2 bg-teal-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {stats.totalApplications > 0 ? Math.round((stats.approvedTeachers / stats.totalApplications) * 100) : 0}%
            </div>
            <p className="text-xs text-slate-500 mt-1">Approval rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Students</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentStudents.length > 0 ? (
                stats.recentStudents.map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-sm text-slate-600">{student.schoolName}</p>
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
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{student.city}</p>
                      <p className="text-xs text-slate-500">{new Date(student.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>No students registered yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Teachers</CardTitle>
            <CardDescription>Latest teacher registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentTeachers.length > 0 ? (
                stats.recentTeachers.map((teacher: any) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{teacher.name}</p>
                        <p className="text-sm text-slate-600">Code: {teacher.teacherCode}</p>
                        <Badge variant={teacher.isApproved ? "default" : "secondary"} className="mt-1">
                          {teacher.isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{teacher.city}</p>
                      <p className="text-xs text-slate-500">{new Date(teacher.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-slate-300" />
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
