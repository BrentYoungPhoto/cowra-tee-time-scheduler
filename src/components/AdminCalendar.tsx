
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

interface AdminCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  className?: string;
}

const AdminCalendar = ({ selectedDate, onDateSelect, className }: AdminCalendarProps) => {
  return (
    <div className="w-full flex justify-center">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className={cn(
          "rounded-md border bg-white shadow-sm",
          "w-fit mx-auto relative z-10",
          className
        )}
        classNames={{
          day_selected: "bg-green-600 text-white hover:bg-green-700",
          day_today: "bg-green-100 text-green-800 font-semibold",
          day: "hover:bg-green-50 transition-colors",
          month: "space-y-4 w-full",
          table: "w-full border-collapse",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center",
          row: "flex w-full mt-2",
          cell: "flex-1 h-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        }}
      />
    </div>
  );
};

export default AdminCalendar;
