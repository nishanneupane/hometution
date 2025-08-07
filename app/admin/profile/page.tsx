import { getAdminSession } from '@/lib/actions/auth-actions'
import AdminProfileClient from './_components/admin-profile-client'

const AdminProfile = async () => {
    const admin = await getAdminSession()
    return (
        <AdminProfileClient admin={admin} />
    )
}

export default AdminProfile