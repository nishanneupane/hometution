import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFullReportData } from '@/lib/actions/report';
import FilteredSection from './_components/filtered-section';

export default async function ReportPage() {
    const data = await getFullReportData();

    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Comprehensive Report</h1>

            <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-4 gap-2">
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
                            <FilteredSection items={data.students} type="students" />
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
                            <FilteredSection items={data.teachers} type="teachers" />
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
                            <FilteredSection items={data.applications} type="applications" />
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
                            <FilteredSection items={data.tuitionRequests} type="tuitionRequests" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}