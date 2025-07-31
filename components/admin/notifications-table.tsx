import { getNotifications } from "@/lib/actions/notification-actions"
import { NotificationsTableClient } from "@/components/admin/notifications-table-client"

export async function NotificationsTable() {
  const notifications = await getNotifications()

  return <NotificationsTableClient notifications={notifications} />
}
