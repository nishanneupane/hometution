"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { MapPin, BookOpen, Tag, BadgeInfo, CalendarClock, Users, BookOpenCheck, Search, Filter, Info, Coins, CreditCard } from "lucide-react"
import { convertToAmPm, formatSalary, getTimeAgo } from "@/lib/utils"
import { ApplyModal } from "@/app/careers/_components/apply-modal"
import { useSearchParams } from "next/navigation"

interface CareersTableClientProps {
    students: any[]
}

export function CareersTableClient({ students }: CareersTableClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterOpen, setFilterOpen] = useState(false)
    const [province, setProvince] = useState<string | null>(null)
    const [filterDistrict, setFilterDistrict] = useState<string | null>(null)
    const [filterMun, setFilterMun] = useState<string | null>(null)
    const [filterClass, setFilterClass] = useState<string | null>(null)
    const [filterGender, setFilterGender] = useState<string | null>(null)
    const [filterRequestType, setFilterRequestType] = useState<string | null>(null)
    const [filterSubject, setFilterSubject] = useState<string | null>(null)
    const searchParams = useSearchParams()
    const vacancyId = searchParams.get("id")

    // Extract unique values for filter options
    const uniqueProvinces = [...new Set(students.map((student) => student.province))].sort()
    const uniqueDistricts = [...new Set(students.map((student) => student.district))].sort()
    const uniqueMuns = [...new Set(students.map((student) => student.municipality))].sort()
    const uniqueClasses = [...new Set(students.map((student) => student.class))].sort()
    const uniqueGenders = [...new Set(students.map((student) => student.gender))].sort()
    const uniqueRequestTypes = [...new Set(students.map((student) => student.requestType))].sort()
    const uniqueSubjects = [...new Set(students.flatMap((student) => student.subject))].sort()

    // Filter students based on search term and filters
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const searchLower = searchTerm.toLowerCase()
            const idMatch = student.id.toString() === searchTerm
            const textMatch = searchTerm
                ? idMatch ||
                student.name.toLowerCase().includes(searchLower) ||
                student.city.toLowerCase().includes(searchLower) ||
                student.district.toLowerCase().includes(searchLower) ||
                student.subject.some((subj: string) => subj.toLowerCase().includes(searchLower)) ||
                student.class.toLowerCase().includes(searchLower)
                : true
            const districtMatch = filterDistrict ? student.district === filterDistrict : true
            const provinceMatch = province ? student.province === province : true
            const munMatch = filterMun ? student.municipality === filterMun : true
            const classMatch = filterClass ? student.class === filterClass : true
            const genderMatch = filterGender ? student.gender === filterGender : true
            const requestTypeMatch = filterRequestType ? student.requestType === filterRequestType : true
            const subjectMatch = filterSubject ? student.subject.includes(filterSubject) : true
            return textMatch && districtMatch && genderMatch && requestTypeMatch && subjectMatch && provinceMatch && munMatch && classMatch
        })
    }, [students, searchTerm, filterDistrict, filterGender, filterRequestType, filterSubject, province, filterMun, filterClass])

    // Reset filters
    const handleResetFilters = () => {
        setFilterDistrict(null)
        setFilterGender(null)
        setFilterRequestType(null)
        setFilterSubject(null)
        setProvince(null)
        setFilterMun(null)
        setFilterClass(null)
    }

    // Check if any search or filter is applied
    const isSearchOrFilterApplied = searchTerm || filterDistrict || filterGender || filterRequestType || filterSubject || province || filterMun || filterClass

    useEffect(() => {
        if (vacancyId) {
            const element = document.getElementById(`vacancy-${vacancyId}`)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" })
            }
        }
    }, [vacancyId])
    return (
        <>
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by ID, name, city, district, subject, or class..."
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
                                <DialogTitle>Filter vacancies</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 h-[400px] overflow-y-auto px-2">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Province</Label>
                                    <Select value={province || ""} onValueChange={(value) => setProvince(value || null)}>
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
                                    <Label className="text-sm font-medium">Municipality</Label>
                                    <Select value={filterMun || ""} onValueChange={(value) => setFilterMun(value || null)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select municipality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {uniqueMuns.map((municipality) => (
                                                <SelectItem key={municipality} value={municipality}>
                                                    {municipality}
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
                                        <SelectContent className="max-h-60 overflow-y-auto">
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
                                            {uniqueGenders.map((gender) => (
                                                <SelectItem key={gender} value={gender}>
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Class</Label>
                                    <Select value={filterClass || ""} onValueChange={(value) => setFilterClass(value || null)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {uniqueClasses.map((className) => (
                                                <SelectItem key={className} value={className}>
                                                    {className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Request Type</Label>
                                    <Select value={filterRequestType || ""} onValueChange={(value) => setFilterRequestType(value || null)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select request type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {uniqueRequestTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Subject</Label>
                                    <Select value={filterSubject || ""} onValueChange={(value) => setFilterSubject(value || null)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {uniqueSubjects.map((subject) => (
                                                <SelectItem key={subject} value={subject}>
                                                    {subject}
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
                        <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {isSearchOrFilterApplied ? "No matching vacancies found" : "No vacancies available"}
                        </h3>
                        <p className="text-gray-600 text-center max-w-md">
                            {isSearchOrFilterApplied
                                ? "Try adjusting your search or filter criteria."
                                : "Check back later for new tutoring opportunities in your area."}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-semibold">
                    {filteredStudents.map((student) => (
                        <Card
                            id={`vacancy-${student.id}`}
                            key={student.id}
                            className="w-full max-w-[380px] bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm px-1 pt-3 mx-auto font-sans"
                        >
                            <CardContent className="flex flex-col gap-2 h-full">
                                <div className="flex items-center justify-center gap-3">
                                    <img
                                        src="/images/hrhometuition.jpeg"
                                        alt="HR Home Tuition"
                                        className="h-20 w-20 rounded object-cover shrink-0 float-start"
                                    />
                                    <div className="flex flex-col items-start gap-1">
                                        <p className="text-red-600 font-bold text-sm uppercase">Urgent! Urgent !! Urgent !!!</p>
                                        <h2 className="text-base font-semibold text-red-800 leading-tight">
                                            {student.requestType === "school" ? "School Teacher Needed" : "Home Tuition Teacher Needed"}
                                        </h2>
                                        <div className="flex gap-2">
                                            <Badge
                                                variant={student.requestType === "school" ? "default" : "secondary"}
                                                className={student.requestType === "school" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
                                            >
                                                {student.requestType === "school" ? "School" : "Student"}
                                            </Badge>
                                            <p className="text-xs font-semibold">Posted {getTimeAgo(student.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    <img src="/images/hero2.jpg" alt="Tuition 1" className="object-cover h-20 w-full rounded" />
                                    <img src="/images/hero3.jpg" alt="Tuition 2" className="object-cover h-20 w-full rounded" />
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    {/* Location */}
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>
                                            <strong>Location:</strong> {student.province}, {student.district}, {student.municipality}-
                                            {student.ward}, {student.city}
                                        </span>
                                    </div>

                                    {/* Level & Time */}
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <BadgeInfo className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                            <span>
                                                <strong>
                                                    {student.requestType === "school" ? "Level" : "Grade"}:
                                                </strong>{" "}
                                                {student.class}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <Users className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                            <span className="text-sm">
                                                <strong>Gender:</strong> {student.gender.charAt(0).toUpperCase() + student.gender.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>
                                            <strong>Time:</strong>{" "}
                                            {convertToAmPm(student.preferredTimeFrom)}–{convertToAmPm(student.preferredTimeTo)}
                                        </span>
                                    </div>

                                    {/* Subject */}
                                    <div className="flex items-center gap-2">
                                        <BookOpenCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span>
                                            <strong>Subject:</strong> {student.subject.join(", ")}
                                        </span>
                                    </div>

                                    {/* Salary & Gender */}

                                    <div className="flex justify-between items-center gap-2">
                                        <div className="flex items-center justify-center gap-2 bg-green-100 border border-green-400 rounded-md px-4 py-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                                            <CreditCard className="h-6 w-6 text-green-700" />
                                            <span className="text-green-900 font-extrabold text-[15px] flex items-center gap-1">
                                                Salary : {formatSalary(student.expectedFees)}
                                            </span>
                                        </div>

                                        <ApplyModal studentId={student.id} />
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div >
            )
            }
        </>
    )
}