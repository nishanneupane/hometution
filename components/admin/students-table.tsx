import { getStudents } from "@/lib/actions/student-actions"
import { StudentsTableClient } from "./students-table-client"

export async function StudentsTable() {
  const students = await getStudents()

  return <StudentsTableClient students={students} />
}
