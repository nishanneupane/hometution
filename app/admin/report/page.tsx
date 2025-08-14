
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DownloadReportButton from './_components/download-report-button';
import { getFullReportData } from '@/lib/actions/report';

export default async function ReportPage() {
    const data = await getFullReportData();

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Comprehensive Report</h1>
                <DownloadReportButton data={data} />
            </div>

            <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-5 gap-2">
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="teachers">Teachers</TabsTrigger>
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                    <TabsTrigger value="tuitionRequests">Tuition Requests</TabsTrigger>
                </TabsList>

                {/* Students Tab */}
                <TabsContent value="students">
                    <Card>
                        <CardHeader>
                            <CardTitle>Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>School</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Province</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Subjects</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.students.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="text-center">No students found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        data.students.map((s) => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.id}</TableCell>
                                                <TableCell>{s.name}</TableCell>
                                                <TableCell>{s.schoolName}</TableCell>
                                                <TableCell>{s.phoneOrWhatsapp}</TableCell>
                                                <TableCell>{s.province}</TableCell>
                                                <TableCell>{s.class}</TableCell>
                                                <TableCell>{s.subject.join(', ')}</TableCell>
                                                <TableCell>{s.gender}</TableCell>
                                                <TableCell>{s.createdAt.toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Teachers Tab */}
                <TabsContent value="teachers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Teachers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Province</TableHead>
                                        <TableHead>Teacher Code</TableHead>
                                        <TableHead>Approved</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.teachers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center">No teachers found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        data.teachers.map((t) => (
                                            <TableRow key={t.id}>
                                                <TableCell>{t.id}</TableCell>
                                                <TableCell>{t.name}</TableCell>
                                                <TableCell>{t.email}</TableCell>
                                                <TableCell>{t.phoneOrWhatsapp}</TableCell>
                                                <TableCell>{t.province}</TableCell>
                                                <TableCell>{t.teacherCode}</TableCell>
                                                <TableCell>{t.isApproved ? 'Yes' : 'No'}</TableCell>
                                                <TableCell>{t.createdAt.toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Applications Tab */}
                <TabsContent value="applications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Teacher</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Tuition Request</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Applied At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.applications.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center">No applications found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        data.applications.map((a) => (
                                            <TableRow key={a.id}>
                                                <TableCell>{a.id}</TableCell>
                                                <TableCell>{a.teacher.name}</TableCell>
                                                <TableCell>{a.tuitionRequest.student.name}</TableCell>
                                                <TableCell>{a.tuitionRequestId}</TableCell>
                                                <TableCell>{a.status}</TableCell>
                                                <TableCell>{a.appliedAt.toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tuition Requests Tab */}
                <TabsContent value="tuitionRequests">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tuition Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Approved</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.tuitionRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">No tuition requests found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        data.tuitionRequests.map((tr) => (
                                            <TableRow key={tr.id}>
                                                <TableCell>{tr.id}</TableCell>
                                                <TableCell>{tr.student.name}</TableCell>
                                                <TableCell>{tr.status}</TableCell>
                                                <TableCell>{tr.isApproved ? 'Yes' : 'No'}</TableCell>
                                                <TableCell>{tr.createdAt.toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>




            </Tabs>
        </div>
    );
}