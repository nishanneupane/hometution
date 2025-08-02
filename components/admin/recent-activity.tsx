"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, GraduationCap, ArrowRight, Clock, X } from "lucide-react"

interface RecentActivityProps {
  recentStudents: any[]
  recentTeachers: any[]
  allStudents: any[]
  allTeachers: any[]
}

export function RecentActivity({ recentStudents, recentTeachers, allStudents, allTeachers }: RecentActivityProps) {
  const [showAllDialog, setShowAllDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("students")

  const handleShowAll = async () => {
    setLoading(true)
    setShowAllDialog(true)
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const ActivityItem = ({ item, type }: { item: any; type: "student" | "teacher" }) => (
    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback className={type === "student" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
          {item.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-slate-900 truncate">{item.name}</p>
        <p className="text-xs text-slate-600">{type === "student" ? item.schoolName : item.teacherCode}</p>
        <div className="flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1 text-slate-400" />
          <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <Badge variant={type === "student" ? "outline" : item.isApproved ? "default" : "secondary"} className="text-xs">
        {type === "student" ? `${item.subject?.length || 0} subjects` : item.isApproved ? "Approved" : "Pending"}
      </Badge>
    </div>
  )

  return (
    <>
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
                recentStudents.map((student: any) => <ActivityItem key={student.id} item={student} type="student" />)
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-sm">No recent students</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="teachers" className="space-y-4 mt-4">
              {recentTeachers.length > 0 ? (
                recentTeachers.map((teacher: any) => <ActivityItem key={teacher.id} item={teacher} type="teacher" />)
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-sm">No recent teachers</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs" onClick={handleShowAll}>
              View All Activity
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Activity Dialog */}
      <Dialog open={showAllDialog} onOpenChange={setShowAllDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>All Activity</span>
              <Button variant="ghost" size="sm" onClick={() => setShowAllDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>Complete list of all platform activities</DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">
                  <Users className="h-4 w-4 mr-2" />
                  All Students ({allStudents.length})
                </TabsTrigger>
                <TabsTrigger value="teachers">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  All Teachers ({allTeachers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {allStudents.length > 0 ? (
                      allStudents.map((student: any) => <ActivityItem key={student.id} item={student} type="student" />)
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                        <p className="text-lg font-medium mb-2">No Students Found</p>
                        <p className="text-sm">No students have registered yet.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="teachers" className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {allTeachers.length > 0 ? (
                      allTeachers.map((teacher: any) => <ActivityItem key={teacher.id} item={teacher} type="teacher" />)
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <GraduationCap className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                        <p className="text-lg font-medium mb-2">No Teachers Found</p>
                        <p className="text-sm">No teachers have registered yet.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
