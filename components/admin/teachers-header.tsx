"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeacherForm } from "@/components/admin/teacher-form"
import { Plus, Search, Filter } from "lucide-react"

export function TeachersHeader() {
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
          <p className="text-gray-600 mt-1">Manage teacher registrations and approvals</p>
        </div>

        <Button onClick={() => setTeacherFormOpen(true)} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} mode="create" />
    </>
  )
}
