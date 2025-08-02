"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, TrendingUp, FileText, Plus, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function QuickActions() {
  const router = useRouter()
  const [showVacancyDialog, setShowVacancyDialog] = useState(false)

  const handleAddStudent = () => {
    router.push("/admin/students?action=add")
    toast.success("Redirecting to add student...")
  }

  const handleAddTeacher = () => {
    router.push("/admin/teachers?action=add")
    toast.success("Redirecting to add teacher...")
  }

  const handleViewAnalytics = () => {
    router.push("/admin/analytics")
    toast.success("Loading analytics...")
  }

  const handleViewRequests = () => {
    router.push("/admin/requests")
    toast.success("Loading tuition requests...")
  }

  const handleAddVacancy = () => {
    setShowVacancyDialog(true)
  }

  const handleManageSettings = () => {
    router.push("/admin/settings")
    toast.success("Loading settings...")
  }

  return (
    <>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-blue-50 hover:border-blue-200 transition-all"
              onClick={handleAddStudent}
            >
              <Users className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Add Student</div>
                <div className="text-xs text-muted-foreground">Register new student</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-green-50 hover:border-green-200 transition-all"
              onClick={handleAddTeacher}
            >
              <GraduationCap className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Add Teacher</div>
                <div className="text-xs text-muted-foreground">Register new teacher</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-purple-50 hover:border-purple-200 transition-all"
              onClick={handleViewAnalytics}
            >
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-xs text-muted-foreground">Detailed insights</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-orange-50 hover:border-orange-200 transition-all"
              onClick={handleViewRequests}
            >
              <FileText className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <div className="font-medium">View Requests</div>
                <div className="text-xs text-muted-foreground">Tuition requests</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-teal-50 hover:border-teal-200 transition-all"
              onClick={handleAddVacancy}
            >
              <Plus className="h-5 w-5 text-teal-600" />
              <div className="text-left">
                <div className="font-medium">Add Vacancy</div>
                <div className="text-xs text-muted-foreground">Post new job</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 bg-transparent hover:bg-slate-50 hover:border-slate-200 transition-all"
              onClick={handleManageSettings}
            >
              <Settings className="h-5 w-5 text-slate-600" />
              <div className="text-left">
                <div className="font-medium">Settings</div>
                <div className="text-xs text-muted-foreground">Manage platform</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Vacancy Dialog */}
      <Dialog open={showVacancyDialog} onOpenChange={setShowVacancyDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Vacancy</DialogTitle>
            <DialogDescription>Create a new job posting for teachers</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center py-8">
              <Plus className="h-16 w-16 mx-auto mb-4 text-teal-500" />
              <h3 className="text-lg font-semibold mb-2">Vacancy Feature Coming Soon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This feature will allow you to post job vacancies for teachers to apply.
              </p>
              <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                Under Development
              </Badge>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowVacancyDialog(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowVacancyDialog(false)
                  toast.info("Feature will be available soon!")
                }}
              >
                Got it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
