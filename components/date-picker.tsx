'use client';

import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DatePickerWithRangeProps {
    onChange: (range: { from?: Date; to?: Date }) => void;
    defaultValue?: { from?: Date; to?: Date };
}

export function DatePickerWithRange({ onChange, defaultValue }: DatePickerWithRangeProps) {
    const [range, setRange] = useState<DateRange | undefined>(
        defaultValue && defaultValue.from ? { from: defaultValue.from, to: defaultValue.to } : undefined
    );

    const handleSelect = (newRange: DateRange | undefined) => {
        setRange(newRange);
        onChange(newRange || { from: undefined, to: undefined });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {range?.from ? (
                        range.to ? (
                            <>
                                {format(range.from, 'LLL dd, y')} - {format(range.to, 'LLL dd, y')}
                            </>
                        ) : (
                            format(range.from, 'LLL dd, y')
                        )
                    ) : (
                        <span>Pick a date range</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    numberOfMonths={2}
                    className="p-4"
                />
            </PopoverContent>
        </Popover>
    );
}