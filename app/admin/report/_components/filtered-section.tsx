'use client';

import { useState, useEffect, useCallback } from 'react';
import FilterControls from './filter-controls';
import FilteredTable from './filter-table';
import StudentDownloadButton from './student-download-button';
import TeacherDownloadButton from './teacher-download-button';
import ApplicationDownloadButton from './application-download-button';
import TuitionRequestDownloadButton from './tuition-request-download-button';

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

interface FilteredSectionProps {
    items: any[];
    type: 'students' | 'teachers' | 'applications' | 'tuitionRequests';
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

export default function FilteredSection({ items, type }: FilteredSectionProps) {
    const [filteredItems, setFilteredItems] = useState(items);
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const applyFilters = useCallback((items: any[], filters: FilterState) => {
        return items.filter(item => {
            const itemToFilter = type === 'applications' ? item.tuitionRequest?.student || {} :
                type === 'tuitionRequests' ? item.student || {} : item;

            const matchesProvince = filters.province && filters.province !== 'all' ? itemToFilter.province === filters.province : true;
            const matchesDistrict = filters.district && filters.district !== 'all' ? itemToFilter.district === filters.district : true;
            const matchesMunicipality = filters.municipality && filters.municipality !== 'all' ? itemToFilter.municipality === filters.municipality : true;
            const matchesCity = filters.city && filters.city !== 'all' ? itemToFilter.city === filters.city : true;
            const matchesWard = filters.ward && filters.ward !== 'all' ? itemToFilter.ward === filters.ward : true;
            const matchesGender = filters.gender && filters.gender !== 'all' ? itemToFilter.gender === filters.gender : true;
            const matchesApproved = filters.isApproved !== null ? itemToFilter.isApproved === filters.isApproved : true;
            const matchesSubjects = filters.subjects && filters.subjects.length > 0 ? filters.subjects.every(subject => itemToFilter.subject?.includes(subject)) : true;
            const matchesClass = filters.class && filters.class !== 'all' ? itemToFilter.class === filters.class : true;
            const matchesTime = filters.preferredTime && filters.preferredTime !== 'all' ? `${itemToFilter.preferredTimeFrom} - ${itemToFilter.preferredTimeTo}` === filters.preferredTime : true;
            const matchesStatus = filters.status && filters.status !== 'all' && (type === 'applications' || type === 'tuitionRequests') ? item.status === filters.status : true;

            return matchesProvince && matchesDistrict && matchesMunicipality && matchesCity && matchesWard &&
                matchesGender && matchesApproved && matchesSubjects && matchesClass && matchesTime && matchesStatus;
        });
    }, [type]);

    useEffect(() => {
        const filtered = applyFilters(items, filters);
        setFilteredItems(filtered);
    }, [items, filters, applyFilters]);

    const handleApply = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleReset = () => {
        setFilters(initialFilters);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <FilterControls
                    items={items}
                    type={type}
                    currentFilters={filters}
                    onApply={handleApply}
                    onReset={handleReset}
                />
                <div>
                    {type === 'students' && <StudentDownloadButton data={filteredItems} />}
                    {type === 'teachers' && <TeacherDownloadButton data={filteredItems} />}
                    {type === 'applications' && <ApplicationDownloadButton data={filteredItems} />}
                    {type === 'tuitionRequests' && <TuitionRequestDownloadButton data={filteredItems} />}
                </div>
            </div>
            <FilteredTable items={filteredItems} type={type} />
        </div>
    );
}