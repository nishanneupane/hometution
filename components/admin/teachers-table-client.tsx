"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TeacherForm } from "@/components/admin/teacher-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteTeacher, approveTeacher, rejectTeacher } from "@/lib/actions/teacher-actions"
import { Edit, Trash2, GraduationCap, Phone, MapPin, CheckCircle, XCircle, Plus } from "lucide-react"
import { toast } from "sonner"

interface TeachersTableClientProps {
  teachers: any[]
}

export function TeachersTableClient({ teachers }: TeachersTableClientProps) {
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleEditTeacher = (teacher: any) => {
    setSelectedTeacher(teacher)
    setFormMode("edit")
    setTeacherFormOpen(true)
  }

  const handleDeleteTeacher = (teacher: any) => {
    setSelectedTeacher(teacher)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedTeacher) {
      const result = await deleteTeacher(selectedTeacher.id)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    }
  }

  const handleApproveTeacher = async (teacherId: string) => {
    const result = await approveTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const handleRejectTeacher = async (teacherId: string) => {
    const result = await rejectTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <Card className="border-0 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>All Teachers ({teachers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {teachers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{teacher.name}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {teacher.teacherCode}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{teacher.phoneOrWhatsapp}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">
                          {teacher.city}, {teacher.district}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-sm">{teacher.gender}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={teacher.isApproved ? "default" : "secondary"}>
                        {teacher.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {!teacher.isApproved && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveTeacher(teacher.id)}
                              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectTeacher(teacher.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTeacher(teacher)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No teachers found</h3>
              <p className="text-slate-600 mb-4">Get started by adding your first teacher.</p>
              <Button onClick={() => setTeacherFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} teacher={selectedTeacher} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${selectedTeacher?.name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
