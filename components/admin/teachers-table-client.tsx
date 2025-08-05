"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TeacherForm } from "@/components/admin/teacher-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteTeacher, approveTeacher, rejectTeacher } from "@/lib/actions/teacher-actions"
import { Edit, Trash2, Phone, MapPin, CheckCircle, XCircle, GraduationCap, Search, Filter } from "lucide-react"
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
import { toast } from "sonner"

interface TeachersTableClientProps {
  teachers: any[]
}

export function TeachersTableClient({ teachers }: TeachersTableClientProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterCity, setFilterCity] = useState<string | null>(null)
  const [filterDistrict, setFilterDistrict] = useState<string | null>(null)
  const [filterGender, setFilterGender] = useState<string | null>(null)
  const [filterApproved, setFilterApproved] = useState<boolean | null>(null)

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

  // Extract unique values for filter options
  const uniqueCities = [...new Set(teachers.map((teacher) => teacher.city))].sort()
  const uniqueDistricts = [...new Set(teachers.map((teacher) => teacher.district))].sort()
  const uniqueGenders = [...new Set(teachers.map((teacher) => teacher.gender))].sort()

  // Filter teachers based on search term and filters
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const searchLower = searchTerm.toLowerCase()
      const idMatch = teacher.id.toString() === searchTerm
      const textMatch = searchTerm
        ? idMatch ||
        teacher.name.toLowerCase().includes(searchLower) ||
        teacher.email.toLowerCase().includes(searchLower) ||
        teacher.phoneOrWhatsapp.toLowerCase().includes(searchLower) ||
        teacher.city.toLowerCase().includes(searchLower) ||
        teacher.district.toLowerCase().includes(searchLower) ||
        teacher.teacherCode.toLowerCase().includes(searchLower)
        : true
      const cityMatch = filterCity ? teacher.city === filterCity : true
      const districtMatch = filterDistrict ? teacher.district === filterDistrict : true
      const genderMatch = filterGender ? teacher.gender === filterGender : true
      const approvedMatch = filterApproved !== null ? teacher.isApproved === filterApproved : true
      return textMatch && cityMatch && districtMatch && genderMatch && approvedMatch
    })
  }, [teachers, searchTerm, filterCity, filterDistrict, filterGender, filterApproved])

  // Reset filters
  const handleResetFilters = () => {
    setFilterCity(null)
    setFilterDistrict(null)
    setFilterGender(null)
    setFilterApproved(null)
  }

  // Check if any search or filter is applied
  const isSearchOrFilterApplied = searchTerm || filterCity || filterDistrict || filterGender || filterApproved !== null

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by teacher ID, name, email, code, or contact..."
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
                <DialogTitle>Filter Teachers</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                  <Label className="text-sm font-medium">District</Label>
                  <Select value={filterDistrict || ""} onValueChange={(value) => setFilterDistrict(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {uniqueDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender</Label>
                  <Select value={filterGender || ""} onValueChange={(value) => setFilterGender(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      {uniqueGenders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Approval Status</Label>
                  <Select
                    value={filterApproved !== null ? filterApproved.toString() : ""}
                    onValueChange={(value) => setFilterApproved(value === "true" ? true : value === "false" ? false : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select approval status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="true">Approved</SelectItem>
                      <SelectItem value="false">Pending</SelectItem>
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

      {filteredTeachers.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <GraduationCap className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSearchOrFilterApplied ? "No matching teachers found" : "No teachers found"}
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              {isSearchOrFilterApplied
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first teacher to the platform."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
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
      )}

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