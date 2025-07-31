"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Database, Mail, Globe } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoApproval, setAutoApproval] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your platform configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Platform Configuration</span>
              </CardTitle>
              <CardDescription>Basic platform settings and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="HR Home Tuition" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" defaultValue="admin@hrtuition.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Input id="platform-description" defaultValue="Connect students with qualified home tutors" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Feature Toggles</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Teacher Approval</Label>
                    <p className="text-sm text-slate-600">Automatically approve new teacher registrations</p>
                  </div>
                  <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-slate-600">Put the platform in maintenance mode</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-600">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Info Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Version</span>
                <Badge variant="outline">v1.0.0</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Database</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Storage</span>
                <Badge variant="outline">2.4 GB</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Uptime</span>
                <Badge variant="outline">7d 12h</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">Need help? Contact our support team for assistance.</p>

              <div className="space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Globe className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                <Database className="h-4 w-4 mr-2" />
                Export Data
              </Button>

              <Button variant="outline" className="w-full bg-transparent">
                <Database className="h-4 w-4 mr-2" />
                Backup Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
