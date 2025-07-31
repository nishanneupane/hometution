import { getStudents } from "@/lib/actions/student-actions"
import { StudentsTableClient } from "@/components/admin/students-table-client"

export async function StudentsTable() {
  const students = await getStudents()

  return <StudentsTableClient students={students} />
}
