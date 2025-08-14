// components/report-filter.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportFilterProps {
    filters: {
        startDate?: string;
        endDate?: string;
        province?: string;
        district?: string;
        studentGender?: string;
        teacherGender?: string;
        applicationStatus?: string;
        tuitionRequestStatus?: string;
    };
}

export default function ReportFilter({ filters }: ReportFilterProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Filter Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <form action="/report" method="GET" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Date Range */}
                        <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                type="date"
                                id="startDate"
                                name="startDate"
                                defaultValue={filters.startDate}
                            />
                        </div>
                        <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                type="date"
                                id="endDate"
                                name="endDate"
                                defaultValue={filters.endDate}
                            />
                        </div>

                        {/* Province */}
                        <div>
                            <Label htmlFor="province">Province</Label>
                            <Input
                                type="text"
                                id="province"
                                name="province"
                                defaultValue={filters.province}
                                placeholder="e.g., Bagmati"
                            />
                        </div>

                        {/* District */}
                        <div>
                            <Label htmlFor="district">District</Label>
                            <Input
                                type="text"
                                id="district"
                                name="district"
                                defaultValue={filters.district}
                                placeholder="e.g., Kathmandu"
                            />
                        </div>

                        {/* Student Gender */}
                        <div>
                            <Label htmlFor="studentGender">Student Gender</Label>
                            <Select name="studentGender" defaultValue={filters.studentGender}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Teacher Gender */}
                        <div>
                            <Label htmlFor="teacherGender">Teacher Gender</Label>
                            <Select name="teacherGender" defaultValue={filters.teacherGender}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Application Status */}
                        <div>
                            <Label htmlFor="applicationStatus">Application Status</Label>
                            <Select name="applicationStatus" defaultValue={filters.applicationStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tuition Request Status */}
                        <div>
                            <Label htmlFor="tuitionRequestStatus">Tuition Request Status</Label>
                            <Select name="tuitionRequestStatus" defaultValue={filters.tuitionRequestStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit">Apply Filters</Button>
                        <Button type="button" variant="outline" onClick={() => window.location.href = '/report'}>
                            Clear Filters
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}