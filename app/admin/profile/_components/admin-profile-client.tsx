'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { resetAdminPassword } from '@/lib/actions/auth-actions'

interface Admin {
    name: string
    id: string
    createdAt: Date
    email: string
    password: string
}

interface AdminProfileClientProps {
    admin: Admin | null
}

const AdminProfileClient: React.FC<AdminProfileClientProps> = ({ admin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        const formData = new FormData()
        formData.append('currentPassword', currentPassword)
        formData.append('newPassword', newPassword)
        formData.append('confirmPassword', confirmPassword)

        try {
            const result = await resetAdminPassword(formData)

            if (!result.success) {
                setError(result.message)
                return
            }

            setSuccess(result.message)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setIsModalOpen(false)
                setSuccess('')
            }, 2000)
        } catch (err) {
            setError('Failed to update password. Please try again.')
        }
    }

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                    <p className="mt-2 text-gray-600">Please log in to view this page.</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-800">{admin.name}</h1>
                    <p className="text-gray-600">{admin.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Member since {new Date(admin.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="border-t pt-4">
                        <h2 className="text-lg font-semibold text-gray-700">Account Details</h2>
                        <div className="mt-2 space-y-2">
                            <p><span className="font-medium text-gray-600">ID:</span> {admin.id}</p>
                            <p><span className="font-medium text-gray-600">Email:</span> {admin.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Reset Password
                    </button>
                </div>
            </div>

            {/* Password Reset Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
                        <form onSubmit={handlePasswordReset} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">{success}</p>}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setError('')
                                        setSuccess('')
                                        setCurrentPassword('')
                                        setNewPassword('')
                                        setConfirmPassword('')
                                    }}
                                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProfileClient