import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardChart } from "@/components/admin/dashboard-chart"
import { RecentActivity } from "@/components/admin/recent-activity"
import { QuickActions } from "@/components/admin/quick-actions"
import { getStudents } from "@/lib/actions/student-actions"
import { getTeachers } from "@/lib/actions/teacher-actions"
import { getTuitionRequests } from "@/lib/actions/application-actions"
import { Users, GraduationCap, FileText, Clock, ArrowUpRight, Calendar } from "lucide-react"
import { getDashboardChartData } from "@/lib/actions/admin-actions"

async function getAdminStats() {
  try {
    const [students, teachers, requests] = await Promise.all([getStudents(), getTeachers(), getTuitionRequests()])

    const totalApplications = requests.reduce((acc, req) => acc + req.applications.length, 0)
    const approvedTeachers = teachers.filter((t) => t.isApproved).length
    const pendingApplications = requests.reduce(
      (acc, req) => acc + req.applications.filter((app) => app.status === "pending").length,
      0,
    )

    // Calculate growth percentages (mock data for demo)
    const growthData = {
      students: 12.5,
      teachers: 8.3,
      requests: 15.2,
      applications: 22.1,
    }

    return {
      totalStudents: students.length,
      totalTeachers: teachers.length,
      approvedTeachers,
      totalRequests: requests.length,
      totalApplications,
      pendingApplications,
      recentStudents: students.slice(0, 3),
      recentTeachers: teachers.slice(0, 3),
      allStudents: students,
      allTeachers: teachers,
      growthData,
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
      allStudents: [],
      allTeachers: [],
      growthData: { students: 0, teachers: 0, requests: 0, applications: 0 },
    }
  }
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  color = "blue",
}: {
  title: string
  value: number | string
  description: string
  icon: any
  trend?: number
  color?: "blue" | "green" | "purple" | "orange" | "yellow" | "teal"
}) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100/50 text-blue-900 border-blue-100",
    green: "from-green-50 to-green-100/50 text-green-900 border-green-100",
    purple: "from-purple-50 to-purple-100/50 text-purple-900 border-purple-100",
    orange: "from-orange-50 to-orange-100/50 text-orange-900 border-orange-100",
    yellow: "from-yellow-50 to-yellow-100/50 text-yellow-900 border-yellow-100",
    teal: "from-teal-50 to-teal-100/50 text-teal-900 border-teal-100",
  }

  const iconColors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    teal: "text-teal-600",
  }

  return (
    <Card
      className={`border-0 shadow-sm bg-gradient-to-br ${colorClasses[color]} hover:shadow-md transition-all duration-200`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColors[color]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs opacity-70">{description}</p>
          {/* {trend && (
            <div className="flex items-center text-xs font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{trend}%
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  const { monthlyData, subjectData, growthPercent } = await getDashboardChartData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All Systems Operational
          </Badge>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
            <Calendar className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          description="Active registrations"
          icon={Users}
          trend={stats.growthData.students}
          color="blue"
        />
        <StatCard
          title="Active Teachers"
          value={stats.approvedTeachers}
          description={`${stats.totalTeachers} total registered`}
          icon={GraduationCap}
          trend={stats.growthData.teachers}
          color="green"
        />
        <StatCard
          title="Tuition Requests"
          value={stats.totalRequests}
          description="Active requests"
          icon={FileText}
          trend={stats.growthData.requests}
          color="purple"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingApplications}
          description="Awaiting approval"
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-96 bg-white rounded-xl animate-pulse" />}>
            <DashboardChart
              monthlyData={monthlyData}
              subjectData={subjectData}
              growthPercent={growthPercent}
            />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div className="h-96 bg-white rounded-xl animate-pulse" />}>
            <RecentActivity
              recentStudents={stats.recentStudents}
              recentTeachers={stats.recentTeachers}
              allStudents={stats.allStudents}
              allTeachers={stats.allTeachers}
            />
          </Suspense>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
