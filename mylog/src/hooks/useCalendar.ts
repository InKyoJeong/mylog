import {useState} from 'react';

import {getMonthYearDetails, getNewMonthYear} from '@/utils';

function useCalendar() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return {monthYear, selectedDate, handlePressDate, handleUpdateMonth};
}

export default useCalendar;
