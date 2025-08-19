// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Filter } from 'lucide-react';

interface FilterState {
    province?: string;
    district?: string;
    municipality?: string;
    city?: string;
    ward?: string;
    gender?: string;
    isApproved?: boolean | null;
    subjects?: string[];
    class?: string;
    preferredTime?: string;
    status?: string;
}

interface FilterControlsProps {
    items: any[];
    type: 'students' | 'teachers' | 'applications' | 'tuitionRequests';
    currentFilters: FilterState;
    onApply: (newFilters: FilterState) => void;
    onReset: () => void;
}

const initialFilters: FilterState = {
    province: 'all',
    district: 'all',
    municipality: 'all',
    city: 'all',
    ward: 'all',
    gender: 'all',
    isApproved: null,
    subjects: [],
    class: 'all',
    preferredTime: 'all',
    status: 'all',
};

export default function FilterControls({ items, type, currentFilters, onApply, onReset }: FilterControlsProps) {
    const [tempFilters, setTempFilters] = useState<FilterState>(currentFilters);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        if (filterOpen) {
            setTempFilters(currentFilters);
        }
    }, [filterOpen, currentFilters]);

    const getUniqueValues = (items: any[], key: string) => {
        const itemsToCheck = type === 'applications' ? items.map(item => item.tuitionRequest?.student || {}) :
            type === 'tuitionRequests' ? items.map(item => item.student || {}) : items;
        return [...new Set(itemsToCheck.map(item => item[key]).filter(Boolean))].sort();
    };

    const getUniqueSubjects = (items: any[]) => {
        const itemsToCheck = type === 'applications' ? items.map(item => item.tuitionRequest?.student || {}) :
            type === 'tuitionRequests' ? items.map(item => item.student || {}) : items;
        return [...new Set(itemsToCheck.flatMap(item => item.subject || []))].filter(Boolean).sort();
    };

    const getUniqueTimes = (items: any[]) => {
        const itemsToCheck = type === 'applications' ? items.map(item => item.tuitionRequest?.student || {}) :
            type === 'tuitionRequests' ? items.map(item => item.student || {}) : items;
        return [...new Set(itemsToCheck.map(item => item.preferredTimeFrom && item.preferredTimeTo ? `${item.preferredTimeFrom} - ${item.preferredTimeTo}` : null).filter(Boolean))].sort();
    };

    const handleSubjectChange = (subject: string, checked: boolean) => {
        setTempFilters(prev => ({
            ...prev,
            subjects: checked ? [...(prev.subjects || []), subject] : (prev.subjects || []).filter(s => s !== subject),
        }));
    };

    const handleApply = () => {
        onApply(tempFilters);
        setFilterOpen(false);
    };

    const handleReset = () => {
        setTempFilters(initialFilters);
        onReset();
        setFilterOpen(false);
    };

    return (
        <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="shrink-0 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter {type.charAt(0).toUpperCase() + type.slice(1)}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 sm:max-h-[350px] overflow-y-auto px-2">
                    {type === 'teachers' && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Province</Label>
                                <Select
                                    value={tempFilters.province || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, province: value, district: 'all', municipality: 'all', city: 'all', ward: 'all' })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Provinces</SelectItem>
                                        {getUniqueValues(items, 'province').map(province => (
                                            <SelectItem key={province} value={province}>{province}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">District</Label>
                                <Select
                                    value={tempFilters.district || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, district: value, municipality: 'all', city: 'all', ward: 'all' })}
                                    disabled={tempFilters.province === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select District" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Districts</SelectItem>
                                        {getUniqueValues(items.filter(item => item.province === tempFilters.province), 'district').map(district => (
                                            <SelectItem key={district} value={district}>{district}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Municipality</Label>
                                <Select
                                    value={tempFilters.municipality || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, municipality: value, city: 'all', ward: 'all' })}
                                    disabled={tempFilters.district === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Municipality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Municipalities</SelectItem>
                                        {getUniqueValues(items.filter(item => item.province === tempFilters.province && item.district === tempFilters.district), 'municipality').map(municipality => (
                                            <SelectItem key={municipality} value={municipality}>{municipality}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">City</Label>
                                <Select
                                    value={tempFilters.city || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, city: value, ward: 'all' })}
                                    disabled={tempFilters.municipality === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Cities</SelectItem>
                                        {getUniqueValues(items.filter(item => item.province === tempFilters.province && item.district === tempFilters.district && item.municipality === tempFilters.municipality), 'city').map(city => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Ward</Label>
                                <Select
                                    value={tempFilters.ward || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, ward: value })}
                                    disabled={tempFilters.city === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Ward" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Wards</SelectItem>
                                        {getUniqueValues(items.filter(item => item.province === tempFilters.province && item.district === tempFilters.district && item.municipality === tempFilters.municipality && item.city === tempFilters.city), 'ward').map(ward => (
                                            <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Gender</Label>
                                <Select
                                    value={tempFilters.gender || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, gender: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Genders</SelectItem>
                                        {getUniqueValues(items, 'gender').map(gender => (
                                            <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Approval Status</Label>
                                <Select
                                    value={tempFilters.isApproved !== null ? tempFilters.isApproved.toString() : 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, isApproved: value === 'true' ? true : value === 'false' ? false : null })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Approval Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="true">Approved</SelectItem>
                                        <SelectItem value="false">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    {type === 'students' && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Subjects</Label>
                                <div className="grid gap-2 max-h-40 overflow-y-auto">
                                    {getUniqueSubjects(items).length > 0 ? (
                                        getUniqueSubjects(items).map(subject => (
                                            <div key={subject} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`subject-${subject}`}
                                                    checked={tempFilters.subjects?.includes(subject) || false}
                                                    onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                                                />
                                                <Label htmlFor={`subject-${subject}`} className="text-sm">{subject}</Label>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No subjects available</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">City</Label>
                                <Select
                                    value={tempFilters.city || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, city: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Cities</SelectItem>
                                        {getUniqueValues(items, 'city').map(city => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Class</Label>
                                <Select
                                    value={tempFilters.class || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, class: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Classes</SelectItem>
                                        {getUniqueValues(items, 'class').map(cls => (
                                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Preferred Time</Label>
                                <Select
                                    value={tempFilters.preferredTime || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, preferredTime: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Preferred Time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Times</SelectItem>
                                        {getUniqueTimes(items).map(time => (
                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    )}
                    {(type === 'applications' || type === 'tuitionRequests') && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Province</Label>
                                <Select
                                    value={tempFilters.province || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, province: value, district: 'all', municipality: 'all', city: 'all' })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Provinces</SelectItem>
                                        {getUniqueValues(items, 'province').map(province => (
                                            <SelectItem key={province} value={province}>{province}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">District</Label>
                                <Select
                                    value={tempFilters.district || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, district: value, municipality: 'all', city: 'all' })}
                                    disabled={tempFilters.province === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select District" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Districts</SelectItem>
                                        {getUniqueValues(items.filter(item => (type === 'applications' ? item.tuitionRequest?.student?.province : type === 'tuitionRequests' ? item.student?.province : item.province) === tempFilters.province), 'district').map(district => (
                                            <SelectItem key={district} value={district}>{district}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Municipality</Label>
                                <Select
                                    value={tempFilters.municipality || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, municipality: value, city: 'all' })}
                                    disabled={tempFilters.district === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Municipality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Municipalities</SelectItem>
                                        {getUniqueValues(items.filter(item => (type === 'applications' ? item.tuitionRequest?.student?.province : type === 'tuitionRequests' ? item.student?.province : item.province) === tempFilters.province && (type === 'applications' ? item.tuitionRequest?.student?.district : type === 'tuitionRequests' ? item.student?.district : item.district) === tempFilters.district), 'municipality').map(municipality => (
                                            <SelectItem key={municipality} value={municipality}>{municipality}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">City</Label>
                                <Select
                                    value={tempFilters.city || 'all'}
                                    onValueChange={(value) => setTempFilters({ ...tempFilters, city: value })}
                                    disabled={tempFilters.municipality === 'all'}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Cities</SelectItem>
                                        {getUniqueValues(items.filter(item => (type === 'applications' ? item.tuitionRequest?.student?.province : type === 'tuitionRequests' ? item.student?.province : item.province) === tempFilters.province && (type === 'applications' ? item.tuitionRequest?.student?.district : type === 'tuitionRequests' ? item.student?.district : item.district) === tempFilters.district && (type === 'applications' ? item.tuitionRequest?.student?.municipality : type === 'tuitionRequests' ? item.student?.municipality : item.municipality) === tempFilters.municipality), 'city').map(city => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {type === 'applications' && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Select
                                        value={tempFilters.status || 'all'}
                                        onValueChange={(value) => setTempFilters({ ...tempFilters, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="invited">Invited</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            {type === 'tuitionRequests' && (
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Status</Label>
                                    <Select
                                        value={tempFilters.status || 'all'}
                                        onValueChange={(value) => setTempFilters({ ...tempFilters, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="invited">Invited</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="filled">Filled</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                            <SelectItem value="demo">Demo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => handleReset()}>
                        Reset
                    </Button>
                    <Button onClick={handleApply}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}