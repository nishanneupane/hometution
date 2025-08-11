"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StudentForm } from "@/components/admin/student-form"
import { Plus } from "lucide-react"

export function StudentsHeader() {
  const [studentFormOpen, setStudentFormOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students/Schools</h1>
          <p className="text-gray-600 mt-1">Manage registrations and tuition requests</p>
        </div>

        <Button onClick={() => setStudentFormOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <StudentForm open={studentFormOpen} onOpenChange={setStudentFormOpen} mode="create" />
    </>
  )
}
