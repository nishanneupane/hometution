"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StudentForm } from "@/components/admin/student-form"
import { Plus, Search, Filter } from "lucide-react"

export function StudentsHeader() {
  const [studentFormOpen, setStudentFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage student registrations and tuition requests</p>
        </div>

        <Button onClick={() => setStudentFormOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students by name, school, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="shrink-0 bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <StudentForm open={studentFormOpen} onOpenChange={setStudentFormOpen} mode="create" />
    </>
  )
}
