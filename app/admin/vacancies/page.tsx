"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, CheckCircle, XCircle } from "lucide-react";
import { getVacancies, updateVacancy } from "@/lib/actions/student-actions";

// Define TypeScript interfaces based on TuitionRequest schema
interface TuitionRequest {
  id: string;
  studentId: string;
  status: 'active' | 'filled' | 'cancelled';
  isApproved: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  student: {
    name: string
  }
}

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<TuitionRequest[]>([]);
  const [filteredVacancies, setFilteredVacancies] = useState<TuitionRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch vacancies
  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async (): Promise<void> => {
    setLoading(true);
    try {
      // @ts-ignore
      const data: TuitionRequest[] = await getVacancies();
      setVacancies(data);
      setFilteredVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search and filter
  useEffect(() => {
    let filtered: TuitionRequest[] = vacancies;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter((vacancy: TuitionRequest) =>
        vacancy.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacancy.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((vacancy: TuitionRequest) => vacancy.status === statusFilter);
    }

    setFilteredVacancies(filtered);
  }, [searchTerm, statusFilter, vacancies]);

  // Handle approve toggle
  const handleApprove = async (id: string, isApproved: boolean, status: 'active' | 'filled' | 'cancelled'): Promise<void> => {
    try {
      await updateVacancy({ id: id.toString(), isApproved: !isApproved, status });
      await fetchVacancies(); // Refresh data
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  // Handle status change
  const handleStatusChange = async (id: string, status: 'active' | 'filled' | 'cancelled'): Promise<void> => {
    try {
      await updateVacancy({ id: id, isApproved: true, status });
      await fetchVacancies(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="space-y-8 p-2">

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Vacancies
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by student ID or status..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vacancies Table */}
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVacancies.map((vacancy: TuitionRequest) => (
                  <TableRow key={vacancy.id}>
                    <TableCell>{vacancy.student.name}</TableCell>
                    <TableCell>
                      <Badge variant={vacancy.status === 'active' ? 'default' : vacancy.status === 'filled' ? 'secondary' : 'destructive'}>
                        {vacancy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprove(vacancy.id, vacancy.isApproved, vacancy.status)}
                      >
                        {vacancy.isApproved ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{new Date(vacancy.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select
                        value={vacancy.status}
                        onValueChange={(value: 'active' | 'filled' | 'cancelled') => handleStatusChange(vacancy.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="filled">Filled</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}