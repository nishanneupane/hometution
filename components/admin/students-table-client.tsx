"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudentForm } from "@/components/admin/student-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteStudent } from "@/lib/actions/student-actions"
import { Edit, Trash2, Phone, MapPin, Clock, Users } from "lucide-react"

interface StudentsTableClientProps {
  students: any[]
}

export function StudentsTableClient({ students }: StudentsTableClientProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [studentFormOpen, setStudentFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleEdit = (student: any) => {
    setSelectedStudent(student)
    setFormMode("edit")
    setStudentFormOpen(true)
  }

  const handleDelete = (student: any) => {
    setSelectedStudent(student)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedStudent) {
      return { success: false, message: "No student selected." }
    }
    return await deleteStudent(selectedStudent.id)
  }

  if (students.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Users className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Get started by adding your first student to the platform.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">
                      {student.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.schoolName}</p>
                  </div>
                </div>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(student)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(student)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {student.phoneOrWhatsapp}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {student.city}, {student.district}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {student.preferredTimeFrom} - {student.preferredTimeTo}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Subjects</p>
                <div className="flex flex-wrap gap-1">
                  {student.subject.slice(0, 3).map((subject: string) => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {student.subject.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{student.subject.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applications</span>
                  <Badge variant="secondary">{student.tuitionRequests[0]?.applications.length || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <StudentForm open={studentFormOpen} onOpenChange={setStudentFormOpen} student={selectedStudent} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Student"
        description={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone and will remove all associated tuition requests.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
