"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, ArrowRight, Clock } from "lucide-react"

interface RecentActivityProps {
  recentStudents: any[]
  recentTeachers: any[]
}

export function RecentActivity({ recentStudents, recentTeachers }: RecentActivityProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest registrations and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students" className="text-xs">
              <Users className="h-4 w-4 mr-1" />
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className="text-xs">
              <GraduationCap className="h-4 w-4 mr-1" />
              Teachers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4 mt-4">
            {recentStudents.length > 0 ? (
              recentStudents.map((student: any) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {student.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{student.name}</p>
                    <p className="text-xs text-slate-600">{student.schoolName}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                      <span className="text-xs text-slate-500">{new Date(student.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {student.subject.length} subjects
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">No recent students</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="teachers" className="space-y-4 mt-4">
            {recentTeachers.length > 0 ? (
              recentTeachers.map((teacher: any) => (
                <div
                  key={teacher.id}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {teacher.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{teacher.name}</p>
                    <p className="text-xs text-slate-600">{teacher.teacherCode}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1 text-slate-400" />
                      <span className="text-xs text-slate-500">{new Date(teacher.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge variant={teacher.isApproved ? "default" : "secondary"} className="text-xs">
                    {teacher.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p className="text-sm">No recent teachers</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
            View All Activity
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
