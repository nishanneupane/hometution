"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const chartData = [
  { month: "Jan", students: 45, teachers: 12, requests: 38 },
  { month: "Feb", students: 52, teachers: 18, requests: 45 },
  { month: "Mar", students: 48, teachers: 15, requests: 42 },
  { month: "Apr", students: 61, teachers: 22, requests: 55 },
  { month: "May", students: 55, teachers: 19, requests: 48 },
  { month: "Jun", students: 67, teachers: 25, requests: 62 },
]

const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
  teachers: {
    label: "Teachers",
    color: "hsl(var(--chart-2))",
  },
  requests: {
    label: "Requests",
    color: "hsl(var(--chart-3))",
  },
}

export function DashboardChart() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Platform Growth
        </CardTitle>
        <CardDescription>Monthly registrations and activity over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
              <YAxis className="text-xs" tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="students" fill="var(--color-students)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="var(--color-teachers)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="requests" fill="var(--color-requests)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
