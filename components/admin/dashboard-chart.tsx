"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const monthlyData = [
  { month: "Jan", students: 45, teachers: 12, requests: 23 },
  { month: "Feb", students: 52, teachers: 18, requests: 31 },
  { month: "Mar", students: 61, teachers: 22, requests: 28 },
  { month: "Apr", students: 58, teachers: 25, requests: 35 },
  { month: "May", students: 67, teachers: 28, requests: 42 },
  { month: "Jun", students: 74, teachers: 31, requests: 38 },
]

const subjectData = [
  { name: "Mathematics", value: 35, color: "#3b82f6" },
  { name: "Science", value: 28, color: "#10b981" },
  { name: "English", value: 22, color: "#f59e0b" },
  { name: "Social Studies", value: 15, color: "#ef4444" },
]

export function DashboardChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Growth Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Monthly Growth</CardTitle>
              <CardDescription>Platform activity over the last 6 months</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              +12.5% growth
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="requests" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Subject Distribution */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Subject Distribution</CardTitle>
          <CardDescription>Most requested subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {subjectData.map((subject) => (
              <div key={subject.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                <span className="text-sm font-medium">{subject.name}</span>
                <span className="text-sm text-gray-500">{subject.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
