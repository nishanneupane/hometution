"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StudentForm } from "@/components/admin/student-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteStudent } from "@/lib/actions/student-actions"
import { Edit, Trash2, Users, Phone, MapPin, Plus } from "lucide-react"
import { toast } from "sonner"

interface StudentsTableClientProps {
  students: any[]
}

export function StudentsTableClient({ students }: StudentsTableClientProps) {
  const [studentFormOpen, setStudentFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student)
    setFormMode("edit")
    setStudentFormOpen(true)
  }

  const handleDeleteStudent = (student: any) => {
    setSelectedStudent(student)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      const result = await deleteStudent(selectedStudent.id)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    }
  }

  return (
    <>
      <Card className="border-0 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>All Students ({students.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{student.name}</p>
                          <p className="text-sm text-slate-600">{student.schoolName}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{student.phoneOrWhatsapp}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">
                          {student.city}, {student.district}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.subject.slice(0, 2).map((subject: string) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {student.subject.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.subject.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {student.tuitionRequests[0]?.applications.length || 0}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStudent(student)}
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
              <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No students found</h3>
              <p className="text-slate-600 mb-4">Get started by adding your first student.</p>
              <Button onClick={() => setStudentFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <StudentForm open={studentFormOpen} onOpenChange={setStudentFormOpen} student={selectedStudent} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Student"
        description={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
