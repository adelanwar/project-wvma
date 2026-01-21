import { useMemo } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format
} from 'date-fns'
import CalendarDay from './CalendarDay'
import { useMeetings } from '../../context/MeetingsContext'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarGrid({ currentDate, onMeetingClick, onAddMeeting }) {
  const { getMeetingsForDate } = useMeetings()
  const today = new Date()

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentDate])

  return (
    <div className="calendar-grid-container">
      <div className="calendar-weekdays">
        {WEEKDAYS.map(day => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendarDays.map(day => {
          const dateString = format(day, 'yyyy-MM-dd')
          const meetings = getMeetingsForDate(dateString)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isToday = isSameDay(day, today)

          return (
            <CalendarDay
              key={dateString}
              date={day}
              meetings={meetings}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              onMeetingClick={onMeetingClick}
              onAddMeeting={onAddMeeting}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
