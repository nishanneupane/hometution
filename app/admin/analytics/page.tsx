import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudents } from "@/lib/actions/student-actions"
import { getTeachers } from "@/lib/actions/teacher-actions"
import { getTuitionRequests } from "@/lib/actions/application-actions"
import { BarChart3, TrendingUp, Users, GraduationCap, Calendar, MapPin } from "lucide-react"

async function getAnalyticsData() {
  try {
    const [students, teachers, requests] = await Promise.all([getStudents(), getTeachers(), getTuitionRequests()])

    // Subject popularity
    const subjectCount: Record<string, number> = {}
    students.forEach((student) => {
      student.subject.forEach((subject: string) => {
        subjectCount[subject] = (subjectCount[subject] || 0) + 1
      })
    })

    // Location distribution
    const locationCount: Record<string, number> = {}
    students.forEach((student) => {
      const location = `${student.city}, ${student.district}`
      locationCount[location] = (locationCount[location] || 0) + 1
    })

    // Monthly registrations (mock data for demo)
    const monthlyData = [
      { month: "Jan", students: 12, teachers: 8 },
      { month: "Feb", students: 19, teachers: 12 },
      { month: "Mar", students: 15, teachers: 9 },
      { month: "Apr", students: 22, teachers: 15 },
      { month: "May", students: 28, teachers: 18 },
      { month: "Jun", students: 35, teachers: 22 },
    ]

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      approvedTeachers: teachers.filter((t) => t.isApproved).length,
      totalRequests: requests.length,
      totalApplications: requests.reduce((acc, req) => acc + req.applications.length, 0),
      subjectCount,
      locationCount,
      monthlyData,
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    return {
      totalStudents: 0,
      totalTeachers: 0,
      approvedTeachers: 0,
      totalRequests: 0,
      totalApplications: 0,
      subjectCount: {},
      locationCount: {},
      monthlyData: [],
    }
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  const topSubjects = Object.entries(data.subjectCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topLocations = Object.entries(data.locationCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Insights and trends from your tuition platform</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Students</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{data.totalStudents}</div>
            <p className="text-xs text-blue-700 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Active Teachers</CardTitle>
            <GraduationCap className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{data.approvedTeachers}</div>
            <p className="text-xs text-green-700 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Success Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              {data.totalApplications > 0 ? Math.round((data.approvedTeachers / data.totalApplications) * 100) : 0}%
            </div>
            <p className="text-xs text-purple-700 mt-1">Teacher approval rate</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Applications</CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{data.totalApplications}</div>
            <p className="text-xs text-orange-700 mt-1">Total teacher applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Popular Subjects
            </CardTitle>
            <CardDescription>Most requested subjects by students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSubjects.length > 0 ? (
                topSubjects.map(([subject, count]) => (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{subject}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(count / Math.max(...topSubjects.map(([, c]) => c))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No subject data available yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Top Locations
            </CardTitle>
            <CardDescription>Areas with highest demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLocations.length > 0 ? (
                topLocations.map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{location}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full"
                          style={{
                            width: `${(count / Math.max(...topLocations.map(([, c]) => c))) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No location data available yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Growth */}
      {/* <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Monthly Growth
          </CardTitle>
          <CardDescription>Student and teacher registrations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.monthlyData.map((month) => (
              <div key={month.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-900">{month.month}</div>
                <div className="flex-1 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-gray-600">Students: {month.students}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-sm text-gray-600">Teachers: {month.teachers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
