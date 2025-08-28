"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TeacherForm } from "@/components/admin/teacher-form"
import { DeleteConfirmation } from "@/components/admin/delete-confirmation"
import { deleteTeacher, approveTeacher, rejectTeacher, sendMessageToTeachers } from "@/lib/actions/teacher-actions"
import { Edit, Trash2, Phone, MapPin, CheckCircle, XCircle, GraduationCap, Search, Filter, ArrowRight, MessageSquare, ChevronRight, ChevronLeft, Upload, X } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { UploadButton } from "@/lib/uploadthing"
import { Textarea } from "../ui/textarea"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface TeachersTableClientProps {
  teachers: any[]
}

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}
function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TeachersTableClient({ teachers }: TeachersTableClientProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [bulkSend, setBulkSend] = useState(true)
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [messageConfirmOpen, setMessageConfirmOpen] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterCity, setFilterCity] = useState<string | null>(null)
  const [filterDistrict, setFilterDistrict] = useState<string | null>(null)
  const [filterGender, setFilterGender] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [filterApproved, setFilterApproved] = useState<boolean | null>(null)
  const [filterWard, setFilterWard] = useState<string | null>(null)
  const [filterMunicipality, setFilterMunicipality] = useState<string | null>(null)
  const [filterProvince, setFilterProvince] = useState<string | null>(null)

  const defaultMessage = `A vacancy is available in your area! Please check out https://hrhometuition/careers and apply based on your choice and area.`
  const [messageType, setMessageType] = useState<'default' | 'custom'>('default')
  const [customMessage, setCustomMessage] = useState('')
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const handleEdit = (teacher: any) => {
    setSelectedTeacher(teacher)
    setFormMode("edit")
    setTeacherFormOpen(true)
  }

  const handleDelete = (teacher: any) => {
    setSelectedTeacher(teacher)
    setDeleteConfirmOpen(true)
  }

  const handleSendMessage = (teacher?: any) => {
    if (!Array.isArray(teacher)) {
      setSelectedTeacher(teacher)
      setBulkSend(false)
    } else {
      setSelectedTeacher(null)
      setBulkSend(true)
    }
    setMessageConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedTeacher?.id) {
      toast.error("No teacher selected.")
      setDeleteConfirmOpen(false)
      return { success: false, message: "No teacher selected." }
    }
    const result = await deleteTeacher(selectedTeacher.id)
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
    setDeleteConfirmOpen(false)
    return result
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
  const uniqueLevels = [...new Set(teachers.map((teacher) => teacher.priority))].sort()
  const uniqueWards = [...new Set(teachers.map((teacher) => teacher.ward))].sort()
  const uniqueMunicipalities = [...new Set(teachers.map((teacher) => teacher.municipality))].sort()
  const uniqueProvinces = [...new Set(teachers.map((teacher) => teacher.province))].sort()

  // Filter teachers based on search term and filters
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      if (!teacher.id) return false // Skip teachers with undefined/null IDs
      const searchLower = searchTerm.toLowerCase()
      const idMatch = teacher.id.toString() === searchTerm
      const textMatch = searchTerm
        ? idMatch ||
        teacher.name.toLowerCase().includes(searchLower) ||
        teacher.email.toLowerCase().includes(searchLower) ||
        teacher.phoneOrWhatsapp.toLowerCase().includes(searchLower) ||
        teacher.city.toLowerCase().includes(searchLower) ||
        teacher.district.toLowerCase().includes(searchLower) ||
        teacher.teacherCode.toLowerCase().includes(searchLower) ||
        (teacher.ward && teacher.ward.toLowerCase().includes(searchLower)) ||
        (teacher.municipality && teacher.municipality.toLowerCase().includes(searchLower)) ||
        (teacher.province && teacher.province.toLowerCase().includes(searchLower))
        : true
      const cityMatch = filterCity ? teacher.city === filterCity : true
      const districtMatch = filterDistrict ? teacher.district === filterDistrict : true
      const genderMatch = filterGender ? teacher.gender === filterGender : true
      const levelMatch = filterLevel ? teacher.priority === filterLevel : true
      const approvedMatch = filterApproved !== null ? teacher.isApproved === filterApproved : true
      const wardMatch = filterWard ? teacher.ward === filterWard : true
      const municipalityMatch = filterMunicipality ? teacher.municipality === filterMunicipality : true
      const provinceMatch = filterProvince ? teacher.province === filterProvince : true
      return textMatch && cityMatch && districtMatch && genderMatch && approvedMatch && wardMatch && municipalityMatch && provinceMatch && levelMatch
    })
  }, [teachers, searchTerm, filterCity, filterDistrict, filterGender, filterApproved, filterWard, filterMunicipality, filterProvince, filterLevel])

  const handleConfirmSendMessage = async () => {
    if (messageType === 'custom' && !customMessage.trim() && !imageUrl) {
      toast.error("For custom, provide at least a message or an image.")
      return { success: false, message: "Invalid custom input." }
    }

    const message = messageType === 'default' ? defaultMessage : customMessage
    const sendImageUrl = messageType === 'default' ? undefined : imageUrl
    let result
    let validTeacherIds: string[] = []

    if (bulkSend) {
      validTeacherIds = filteredTeachers
        .filter(teacher => teacher?.id && typeof teacher.id === 'string' && teacher.id.trim() !== '')
        .map(teacher => teacher.id)
      if (validTeacherIds.length === 0) {
        toast.error("No valid teachers found in the filtered list. Try adjusting your search or filters.")
        setMessageConfirmOpen(false)
        return { success: false, message: "No valid teachers found." }
      }
      result = await sendMessageToTeachers(validTeacherIds, message, sendImageUrl, selectedEmail ?? undefined)
    } else {
      if (!selectedTeacher?.id || typeof selectedTeacher.id !== 'string' || selectedTeacher.id.trim() === '') {
        toast.error("No valid teacher selected.")
        setMessageConfirmOpen(false)
        return { success: false, message: "No valid teacher selected." }
      }
      validTeacherIds = [selectedTeacher.id]
      result = await sendMessageToTeachers(validTeacherIds, message, sendImageUrl)
    }

    if (result.success) {
      toast.success(bulkSend ? `Message sent to ${validTeacherIds.length} teacher(s) successfully!` : `Message sent to ${selectedTeacher.name} successfully!`)
    } else {
      toast.error(result.message)
    }
    setMessageConfirmOpen(false)
    setMessageType('default')
    setCustomMessage('')
    setImageUrl(undefined)
  }
  // Reset filters
  const handleResetFilters = () => {
    setFilterCity(null)
    setFilterDistrict(null)
    setFilterGender(null)
    setFilterLevel(null)
    setFilterApproved(null)
    setFilterWard(null)
    setFilterMunicipality(null)
    setFilterProvince(null)
  }

  const isSearchOrFilterApplied = searchTerm || filterCity || filterDistrict || filterGender || filterApproved !== null || filterWard || filterMunicipality || filterProvince || filterLevel

  const paginatedTeachers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredTeachers.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredTeachers, currentPage])


  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by teacher ID, name, email, code, contact, ward, municipality, or province..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => handleSendMessage(filteredTeachers)} className="shrink-0">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send to All
          </Button>

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
              <div className="grid gap-4 py-4 sm:max-h-[350px] overflow-scroll px-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">City</Label>
                  <Select value={filterCity || ""} onValueChange={(value) => setFilterCity(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
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
                      {uniqueDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ward</Label>
                  <Select value={filterWard || ""} onValueChange={(value) => setFilterWard(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueWards.map((ward) => (
                        <SelectItem key={ward} value={ward}>
                          {ward}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Municipality</Label>
                  <Select value={filterMunicipality || ""} onValueChange={(value) => setFilterMunicipality(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueMunicipalities.map((municipality) => (
                        <SelectItem key={municipality} value={municipality}>
                          {municipality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Province</Label>
                  <Select value={filterProvince || ""} onValueChange={(value) => setFilterProvince(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueProvinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
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
                      {uniqueGenders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Level</Label>
                  <Select value={filterLevel || ""} onValueChange={(value) => setFilterLevel(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
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

      {paginatedTeachers.length === 0 ? (
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
          {paginatedTeachers.map((teacher) => (
            <Card key={teacher.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Link href={`/admin/teachers/${teacher.id}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="group flex items-center space-x-3 p-2 rounded-md transition-all hover:backdrop-blur-sm hover:bg-blue-50 hover:shadow-sm cursor-pointer">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-primary text-white">
                                {teacher.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {teacher.teacherCode}
                              </Badge>
                            </div>
                            <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          View profile
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>


                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {teacher.phoneOrWhatsapp}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {teacher.city}, {teacher.district}, {teacher.municipality}, Ward {teacher.ward}, {teacher.province}
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

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Applications</span>
                    <Badge variant="secondary">{teacher.applications?.length || 0}</Badge>
                  </div>

                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(teacher)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleSendMessage(teacher)}>
                      <MessageSquare className="h-4 w-4 text-blue-500" />
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        totalItems={filteredTeachers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} teacher={selectedTeacher} mode={formMode} />

      <DeleteConfirmation
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${selectedTeacher?.name}? This action cannot be undone and will remove all associated applications.`}
        onConfirm={handleConfirmDelete}
      />

      <Dialog open={messageConfirmOpen} onOpenChange={setMessageConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Vacancy Message</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <RadioGroup value={messageType} onValueChange={(v) => setMessageType(v as 'default' | 'custom')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">Default Message</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom Message</Label>
              </div>
            </RadioGroup>

            {messageType === 'default' ? (
              <p className="text-sm text-gray-600">
                Message: {defaultMessage}
              </p>
            ) : (
              <div className="max-h-[300px] overflow-auto p-2">
                <div className="space-y-2">
                  <Label>Custom Message (required if no image)</Label>
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Enter your custom message"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Image (required if no message)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center relative">
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt="Uploaded image"
                          className="w-full max-h-48 object-contain mx-auto rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setImageUrl(undefined)}
                          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload an image</p>
                        <p className="text-xs text-muted-foreground mb-4">PNG, JPG up to 8MB</p>
                        <UploadButton
                          endpoint="image"
                          onClientUploadComplete={(res) => {
                            if (res && res[0]) {
                              setImageUrl(res[0].url)
                            }
                          }}
                          onUploadError={(err) => console.error(err)}
                          appearance={{
                            button: "bg-blue-600 border border-input text-background hover:bg-blue-700",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Send From</Label>
                  <Select
                    value={selectedEmail || ""}
                    onValueChange={(value) => setSelectedEmail(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support@hrhometuition.com">support@hrhometuition.com</SelectItem>
                      <SelectItem value="birendra.naral@hrhometuition.com">birendra.naral@hrhometuition.com</SelectItem>
                      <SelectItem value="info@hrhometuition.com">info@hrhometuition.com</SelectItem>
                      <SelectItem value="hr2025@hrhometuition.com">hr2025@hrhometuition.com</SelectItem>
                      <SelectItem value="contact@hrhometuition.com">contact@hrhometuition.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-600">
              {bulkSend
                ? `Are you sure you want to send this to ${filteredTeachers.length} teacher(s)?`
                : selectedTeacher && selectedTeacher.name
                  ? `Are you sure you want to send this to ${selectedTeacher.name}?`
                  : `Are you sure you want to send this?`}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSendMessage}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}