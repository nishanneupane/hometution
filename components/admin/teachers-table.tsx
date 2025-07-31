import { getTeachers } from "@/lib/actions/teacher-actions"
import { TeachersTableClient } from "./teachers-table-client"

export async function TeachersTable() {
  const teachers = await getTeachers()

  return <TeachersTableClient teachers={teachers} />
}
