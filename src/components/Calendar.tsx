import React from 'react';
import { useRecoilValue } from 'recoil';
import { savedOutfitsState, outfitLabelsState } from '../store/atoms';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const savedOutfits = useRecoilValue(savedOutfitsState);
  const labels = useRecoilValue(outfitLabelsState);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const outfitsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return savedOutfits.filter(outfit => {
      if (!outfit.plannedDate) return false;
      const plannedDate = new Date(outfit.plannedDate);
      return (
        plannedDate.getDate() === date.getDate() &&
        plannedDate.getMonth() === date.getMonth() &&
        plannedDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-6 h-6" />
          Outfit Calendar
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {monthName} {currentDate.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const outfits = outfitsForDay(day);
          const hasOutfits = outfits.length > 0;
          
          return (
            <div
              key={day}
              className={`aspect-square p-1 border rounded-lg ${
                hasOutfits ? 'border-primary-300 dark:border-primary-600' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="h-full flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-400">{day}</span>
                {hasOutfits && (
                  <div className="flex-1 flex flex-col gap-1 mt-1">
                    {outfits.map(outfit => {
                      const label = labels.find(l => l.id === outfit.label);
                      return (
                        <div
                          key={outfit.id}
                          className="text-xs p-1 rounded truncate"
                          style={{
                            backgroundColor: label ? label.color + '40' : undefined,
                            color: label ? label.color : undefined,
                          }}
                          title={outfit.name}
                        >
                          {outfit.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;