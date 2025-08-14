"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
import { getVacancies, updateVacancy } from "@/lib/actions/student-actions";
import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface TuitionRequest {
  id: string;
  studentId: string;
  status: 'active' | 'filled' | 'cancelled';
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

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

  useEffect(() => {
    let filtered: TuitionRequest[] = vacancies;

    if (searchTerm) {
      filtered = filtered.filter((vacancy: TuitionRequest) =>
        vacancy.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacancy.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacancy.student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((vacancy: TuitionRequest) => vacancy.status === statusFilter);
    }

    setFilteredVacancies(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, vacancies]);

  const updateLocalVacancy = (id: string, updates: Partial<TuitionRequest>) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    setFilteredVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const handleApprove = async (id: string, isApproved: boolean, status: 'active' | 'filled' | 'cancelled'): Promise<void> => {
    const newApproved = !isApproved;
    try {
      await updateVacancy({ id: id.toString(), isApproved: newApproved, status });
      updateLocalVacancy(id, { isApproved: newApproved });
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  const handleStatusChange = async (id: string, status: 'active' | 'filled' | 'cancelled'): Promise<void> => {
    try {
      await updateVacancy({ id: id, isApproved: true, status });
      updateLocalVacancy(id, { status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentVacancies = filteredVacancies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8 pb-6 bg-gray-50 min-h-screen">

      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardTitle className="flex items-center text-xl font-bold">
            <BookOpen className="h-6 w-6 mr-3" />
            Vacancies Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by student name, ID, or status..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-12 rounded-lg border-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-md">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading vacancies...</div>
          ) : filteredVacancies.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No vacancies found.</div>
          ) : (
            <>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">Student Name</TableHead>
                      <TableHead className="font-semibold text-gray-700">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700">Approved</TableHead>
                      <TableHead className="font-semibold text-gray-700">Created</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentVacancies.map((vacancy: TuitionRequest) => (
                      <TableRow key={vacancy.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <Link
                            href={`/admin/vacancies/${vacancy.id}`}
                            className="group relative inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <span className="font-medium">
                              {vacancy.student.name}
                            </span>

                            {/* Link Icon */}
                            <ArrowUpRight
                              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                              size={16}
                            />

                            {/* Tooltip */}
                            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-gray-600 bg-white border px-2 py-1 rounded shadow transition-all whitespace-nowrap">
                              View Details
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={vacancy.status === 'active' ? 'default' : vacancy.status === 'filled' ? 'secondary' : 'destructive'}
                            className="px-3 py-1 rounded-full"
                          >
                            {vacancy.status.charAt(0).toUpperCase() + vacancy.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(vacancy.id, vacancy.isApproved, vacancy.status)}
                            className="hover:bg-gray-100 rounded-full p-2"
                          >
                            {vacancy.isApproved ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(vacancy.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} {/* Improved date format */}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={vacancy.status}
                            onValueChange={(value: 'active' | 'filled' | 'cancelled') => handleStatusChange(vacancy.id, value)}
                          >
                            <SelectTrigger className="w-32 h-10 rounded-md border-gray-300"> {/* Adjusted size */}
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-md shadow-md">
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="filled">Filled</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="demo">Demo Class</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-end">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) paginate(currentPage - 1);
                          }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              paginate(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) paginate(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}