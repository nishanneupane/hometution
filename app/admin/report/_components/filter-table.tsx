'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { convertToAmPm } from '@/lib/utils';

interface FilteredTableProps {
    items: any[];
    type: 'students' | 'teachers' | 'applications' | 'tuitionRequests';
}

export default function FilteredTable({ items, type }: FilteredTableProps) {
    return (
        <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No {type} found</h3>
                        <p className="text-gray-600 text-center max-w-md">
                            Try adjusting your filter criteria to see more results.
                        </p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {type === 'teachers' && (
                                    <>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Teacher Code</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Approval Status</TableHead>
                                        <TableHead>Applications</TableHead>
                                    </>
                                )}
                                {type === 'students' && (
                                    <>
                                        <TableHead>Name</TableHead>
                                        <TableHead>School</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Subjects</TableHead>
                                        <TableHead>Preferred Time</TableHead>
                                        <TableHead>Tuition Requests</TableHead>
                                    </>
                                )}
                                {(type === 'applications' || type === 'tuitionRequests') && (
                                    <>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Student Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Status</TableHead>
                                        {type === 'applications' && <TableHead>Teacher</TableHead>}
                                    </>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.id}>
                                    {type === 'teachers' && (
                                        <>
                                            <TableCell>{item.name || 'N/A'}</TableCell>
                                            <TableCell>{item.teacherCode || 'N/A'}</TableCell>
                                            <TableCell>{item.phoneOrWhatsapp || 'N/A'}</TableCell>
                                            <TableCell>
                                                {item.city && item.district && item.municipality && item.ward && item.province
                                                    ? `${item.city}, ${item.district}, ${item.municipality}, Ward ${item.ward}, ${item.province}`
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell>{item.gender || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.isApproved ? 'default' : 'secondary'}>
                                                    {item.isApproved ? 'Approved' : 'Pending'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{item.applications?.length || 0}</TableCell>
                                        </>
                                    )}
                                    {type === 'students' && (
                                        <>
                                            <TableCell>{item.name || 'N/A'}</TableCell>
                                            <TableCell>{item.schoolName || 'N/A'}</TableCell>
                                            <TableCell>{item.phoneOrWhatsapp || 'N/A'}</TableCell>
                                            <TableCell>
                                                {item.city && item.district && item.municipality && item.province
                                                    ? `${item.city}, ${item.district}, ${item.municipality}, ${item.province}`
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell>{item.class || 'N/A'}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.subject?.length > 0 ? (
                                                        item.subject.slice(0, 3).map((subject: string) => (
                                                            <Badge key={subject} variant="outline">{subject}</Badge>
                                                        ))
                                                    ) : (
                                                        <Badge variant="outline">None</Badge>
                                                    )}
                                                    {item.subject?.length > 3 && (
                                                        <Badge variant="outline">+{item.subject.length - 3}</Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {item.preferredTimeFrom && item.preferredTimeTo
                                                    ? `${convertToAmPm(item.preferredTimeFrom)} - ${convertToAmPm(item.preferredTimeTo)}`
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell>{item.tuitionRequests?.length || 0}</TableCell>
                                        </>
                                    )}
                                    {(type === 'applications' || type === 'tuitionRequests') && (
                                        <>
                                            <TableCell>{item.id || 'N/A'}</TableCell>
                                            <TableCell>{item.tuitionRequest?.student?.name || item.student?.name || 'N/A'}</TableCell>
                                            <TableCell>
                                                {item.tuitionRequest?.student?.city || item.student?.city || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.status || 'N/A'}</Badge>
                                            </TableCell>
                                            {type === 'applications' && (
                                                <TableCell>{item.teacher?.name || 'N/A'}</TableCell>
                                            )}
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}