"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TeacherForm } from "@/components/admin/teacher-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteTeacher, approveTeacher, rejectTeacher } from "@/lib/actions/teacher-actions"
import { Edit, Trash2, Phone, MapPin, CheckCircle, XCircle, GraduationCap } from "lucide-react"
import { toast } from "sonner"

interface TeachersTableClientProps {
  teachers: any[]
}

export function TeachersTableClient({ teachers }: TeachersTableClientProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher)
    setFormMode("edit")
    setTeacherFormOpen(true)
  }

  const handleDelete = (teacher: any) => {
    setSelectedTeacher(teacher)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedTeacher) {
      return { success: false, message: "No teacher selected." }
    }
    return await deleteTeacher(selectedTeacher.id)
  }

  const handleApprove = async (teacherId: string) => {
    const result = await approveTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const handleReject = async (teacherId: string) => {
    const result = await rejectTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  if (teachers.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <GraduationCap className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Get started by adding your first teacher to the platform.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {teacher.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {teacher.teacherCode}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(teacher)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {teacher.phoneOrWhatsapp}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {teacher.city}, {teacher.district}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">Gender: {teacher.gender}</span>
                  <Badge variant={teacher.isApproved ? "default" : "secondary"}>
                    {teacher.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </div>
              </div>

              {!teacher.isApproved && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(teacher.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(teacher.id)}
                      className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applications</span>
                  <Badge variant="secondary">{teacher.applications?.length || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} teacher={selectedTeacher} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${selectedTeacher?.name}? This action cannot be undone and will remove all associated applications.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
