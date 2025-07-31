import { getTuitionRequests } from "@/lib/actions/application-actions"
import { RequestsTableClient } from "@/components/admin/requests-table-client"

export async function RequestsTable() {
  const requests = await getTuitionRequests()

  return <RequestsTableClient requests={requests} />
}
