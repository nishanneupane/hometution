"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudentForm } from "@/components/admin/student-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteStudent } from "@/lib/actions/student-actions"
import { Edit, Trash2, Phone, MapPin, Clock, Users, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentsTableClientProps {
  students: any[]
}

export function StudentsTableClient({ students }: StudentsTableClientProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [studentFormOpen, setStudentFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterSubjects, setFilterSubjects] = useState<string[]>([])
  const [filterCity, setFilterCity] = useState<string | null>(null)
  const [filterTime, setFilterTime] = useState<string | null>(null)

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

  // Extract unique values for filter options
  const uniqueSubjects = [...new Set(students.flatMap((student) => student.subject))].sort()
  const uniqueCities = [...new Set(students.map((student) => student.city))].sort()
  const uniqueTimes = [...new Set(students.map((student) => `${student.preferredTimeFrom} - ${student.preferredTimeTo}`))].sort()

  // Filter students based on search term and filters
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchLower = searchTerm.toLowerCase()
      const idMatch = student.id.toString() === searchTerm
      const textMatch = searchTerm
        ? idMatch ||
        student.name.toLowerCase().includes(searchLower) ||
        student.schoolName.toLowerCase().includes(searchLower) ||
        student.city.toLowerCase().includes(searchLower) ||
        student.district.toLowerCase().includes(searchLower) ||
        student.phoneOrWhatsapp.toLowerCase().includes(searchLower) ||
        student.subject.some((subject: string) => subject.toLowerCase().includes(searchLower))
        : true
      const subjectMatch = filterSubjects.length > 0
        ? filterSubjects.every((subject) => student.subject.includes(subject))
        : true
      const cityMatch = filterCity ? student.city === filterCity : true
      const timeMatch = filterTime ? `${student.preferredTimeFrom} - ${student.preferredTimeTo}` === filterTime : true
      return textMatch && subjectMatch && cityMatch && timeMatch
    })
  }, [students, searchTerm, filterSubjects, filterCity, filterTime])

  // Handle subject filter checkbox changes
  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFilterSubjects((prev) =>
      checked ? [...prev, subject] : prev.filter((s) => s !== subject)
    )
  }

  // Reset filters
  const handleResetFilters = () => {
    setFilterSubjects([])
    setFilterCity(null)
    setFilterTime(null)
  }

  // Check if any search or filter is applied
  const isSearchOrFilterApplied = searchTerm || filterSubjects.length > 0 || filterCity || filterTime

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by student ID, name, school, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="shrink-0 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter Students</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Subjects</Label>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">
                    {uniqueSubjects.length > 0 ? (
                      uniqueSubjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={filterSubjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No subjects available</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City</Label>
                  <Select value={filterCity || ""} onValueChange={(value) => setFilterCity(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {uniqueCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Preferred Time</Label>
                  <Select value={filterTime || ""} onValueChange={(value) => setFilterTime(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Times</SelectItem>
                      {uniqueTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset
                </Button>
                <Button onClick={() => setFilterOpen(false)}>Apply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSearchOrFilterApplied ? "No matching students found" : "No students found"}
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              {isSearchOrFilterApplied
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first student to the platform."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
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
                    {student.city}, {student.district} , {student.municipality} , {student.district}
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
      )}

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