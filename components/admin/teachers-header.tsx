"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeacherForm } from "@/components/admin/teacher-form"
import { Plus, Search } from "lucide-react"

export function TeachersHeader() {
  const [teacherFormOpen, setTeacherFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teachers</h1>
          <p className="text-slate-600 mt-2">Manage teacher registrations and approvals</p>
        </div>
        <Button onClick={() => setTeacherFormOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search teachers by name, code, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <TeacherForm open={teacherFormOpen} onOpenChange={setTeacherFormOpen} teacher={null} mode="create" />
    </div>
  )
}
