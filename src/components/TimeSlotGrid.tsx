
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface TimeSlotGridProps {
  selectedDate: Date | undefined;
  onTimeSelect: (time: string) => void;
}

const TimeSlotGrid = ({ selectedDate, onTimeSelect }: TimeSlotGridProps) => {
  // Generate time slots from 6:00 AM to 6:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ time, display });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Mock data for booked/blocked slots
  const getSlotStatus = (time: string) => {
    // Simulate some booked times
    const bookedTimes = ['08:00', '09:15', '10:30', '14:00', '15:45'];
    const blockedTimes = ['12:00', '12:15', '12:30', '12:45']; // Lunch break
    
    if (bookedTimes.includes(time)) return 'booked';
    if (blockedTimes.includes(time)) return 'blocked';
    return 'available';
  };

  if (!selectedDate) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>Please select a date to view available times</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Available
        </Badge>
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Booked
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
          Blocked
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
        {timeSlots.map(({ time, display }) => {
          const status = getSlotStatus(time);
          
          return (
            <Button
              key={time}
              variant={status === 'available' ? 'outline' : 'secondary'}
              size="sm"
              disabled={status !== 'available'}
              onClick={() => onTimeSelect(time)}
              className={`
                h-12 text-sm transition-all duration-200
                ${status === 'available' 
                  ? 'hover:bg-green-50 hover:border-green-300 hover:text-green-700' 
                  : status === 'booked'
                  ? 'bg-red-50 text-red-700 border-red-200 cursor-not-allowed'
                  : 'bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed'
                }
              `}
            >
              {display}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
