"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StudentForm } from "@/components/admin/student-form"
import { TeacherForm } from "@/components/admin/teacher-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { getStudents, deleteStudent } from "@/lib/actions/student-actions"
import { getTeachers, deleteTeacher, approveTeacher, rejectTeacher } from "@/lib/actions/teacher-actions"
import { getTuitionRequests, approveApplication, rejectApplication } from "@/lib/actions/application-actions"
import {
  Users,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [tuitionRequests, setTuitionRequests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // Modal states
  const [studentFormOpen, setStudentFormOpen] = useState(false)
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [deleteType, setDeleteType] = useState<"student" | "teacher">("student")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [studentsData, teachersData, requestsData] = await Promise.all([
        getStudents(),
        getTeachers(),
        getTuitionRequests(),
      ])
      setStudents(studentsData)
      setTeachers(teachersData)
      setTuitionRequests(requestsData)
    } catch (error) {
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term: string) => {
    setSearchTerm(term)
    if (term.trim()) {
      const [studentsData, teachersData] = await Promise.all([getStudents(term), getTeachers(term)])
      setStudents(studentsData)
      setTeachers(teachersData)
    } else {
      loadData()
    }
  }

  const handleDeleteStudent = (student: any) => {
    setSelectedItem(student)
    setDeleteType("student")
    setDeleteConfirmOpen(true)
  }

  const handleDeleteTeacher = (teacher: any) => {
    setSelectedItem(teacher)
    setDeleteType("teacher")
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteType === "student") {
      return await deleteStudent(selectedItem.id)
    } else {
      return await deleteTeacher(selectedItem.id)
    }
  }

  const handleApproveTeacher = async (teacherId: string) => {
    const result = await approveTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
      loadData()
    } else {
      toast.error(result.message)
    }
  }

  const handleRejectTeacher = async (teacherId: string) => {
    const result = await rejectTeacher(teacherId)
    if (result.success) {
      toast.success(result.message)
      loadData()
    } else {
      toast.error(result.message)
    }
  }

  const handleApproveApplication = async (applicationId: string) => {
    const result = await approveApplication(applicationId)
    if (result.success) {
      toast.success(result.message)
      loadData()
    } else {
      toast.error(result.message)
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    const result = await rejectApplication(applicationId)
    if (result.success) {
      toast.success(result.message)
      loadData()
    } else {
      toast.error(result.message)
    }
  }

  const stats = {
    totalStudents: students.length,
    totalTeachers: teachers.length,
    verifiedTeachers: teachers.filter((t) => t.isApproved).length,
    activeTuitionRequests: tuitionRequests.filter((r) => r.status === "active").length,
    totalApplications: tuitionRequests.reduce((acc, req) => acc + req.applications.length, 0),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage students, teachers, and tutoring requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTeachers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Teachers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.verifiedTeachers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTuitionRequests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search students, teachers..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="requests">Tuition Requests</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>View and manage all registered students</CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setFormMode("create")
                      setSelectedItem(null)
                      setStudentFormOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>School</TableHead>
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
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.schoolName}</TableCell>
                        <TableCell>{student.phoneOrWhatsapp}</TableCell>
                        <TableCell>
                          {student.city}, {student.district}
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
                          <Badge variant="secondary">{student.tuitionRequests[0]?.applications.length || 0}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFormMode("edit")
                                setSelectedItem(student)
                                setStudentFormOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Teacher Management</CardTitle>
                    <CardDescription>Approve, reject, and manage teacher registrations</CardDescription>
                  </div>
                  <Button
                    onClick={() => {
                      setFormMode("create")
                      setSelectedItem(null)
                      setTeacherFormOpen(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
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
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{teacher.teacherCode}</Badge>
                        </TableCell>
                        <TableCell>{teacher.phoneOrWhatsapp}</TableCell>
                        <TableCell>
                          {teacher.city}, {teacher.district}
                        </TableCell>
                        <TableCell className="capitalize">{teacher.gender}</TableCell>
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
                                  className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectTeacher(teacher.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setFormMode("edit")
                                setSelectedItem(teacher)
                                setTeacherFormOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteTeacher(teacher)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tuition Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tuition Requests</CardTitle>
                <CardDescription>Manage active tuition requests and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tuitionRequests.map((request) => (
                    <div key={request.id} className="p-6 border rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{request.student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {request.student.city}, {request.student.district} •{request.student.preferredTimeFrom} -{" "}
                            {request.student.preferredTimeTo}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {request.student.schoolName} • {request.student.phoneOrWhatsapp}
                          </p>
                        </div>
                        <Badge variant={request.status === "active" ? "default" : "secondary"}>{request.status}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {request.student.subject.map((subject: string) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      {request.student.extraInfo && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">
                            <strong>Additional Info:</strong> {request.student.extraInfo}
                          </p>
                        </div>
                      )}

                      {request.applications.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-medium text-sm">Applications ({request.applications.length})</h5>
                          {request.applications.map((application: any) => (
                            <div
                              key={application.id}
                              className="flex items-center justify-between p-4 bg-muted rounded-lg"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{application.teacher.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {application.teacher.teacherCode}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {application.teacher.phoneOrWhatsapp} •{application.teacher.city},{" "}
                                  {application.teacher.district}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    application.status === "approved"
                                      ? "default"
                                      : application.status === "rejected"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {application.status}
                                </Badge>
                                {application.status === "pending" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleApproveApplication(application.id)}
                                      className="text-green-600 border-green-600 bg-transparent hover:bg-green-50"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRejectApplication(application.id)}
                                      className="text-red-600 border-red-600 bg-transparent hover:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {request.applications.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">No applications yet</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <StudentForm open={studentFormOpen} onOpenChange={setStudentFormOpen} student={selectedItem} mode={formMode} />

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} teacher={selectedItem} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title={`Delete ${deleteType === "student" ? "Student" : "Teacher"}`}
        description={`Are you sure you want to delete ${selectedItem?.name}? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
