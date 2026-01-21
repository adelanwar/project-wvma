import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import './Calendar.css'

function Calendar({ onMeetingClick, onAddMeeting }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
      />
      <CalendarGrid
        currentDate={currentDate}
        onMeetingClick={onMeetingClick}
        onAddMeeting={onAddMeeting}
      />
    </div>
  )
}

export default Calendar
