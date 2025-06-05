
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const BookingCalendar = ({ selectedDate, onDateSelect }: BookingCalendarProps) => {
  // Disable past dates and dates more than 30 days in the future
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const isDateDisabled = (date: Date) => {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateOnly < todayOnly || date > maxDate;
  };

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        disabled={isDateDisabled}
        className={cn("rounded-md border-0 pointer-events-auto")}
        classNames={{
          day_selected: "bg-green-600 text-white hover:bg-green-700",
          day_today: "bg-green-100 text-green-800 font-semibold",
          day: "hover:bg-green-50 transition-colors",
        }}
      />
    </div>
  );
};

export default BookingCalendar;
