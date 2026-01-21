import { format } from 'date-fns'
import MeetingBadge from './MeetingBadge'

function CalendarDay({ date, meetings, isCurrentMonth, isToday, onMeetingClick, onAddMeeting }) {
  const dayNumber = format(date, 'd')
  const dateString = format(date, 'yyyy-MM-dd')

  const handleDayClick = (e) => {
    // Only trigger add if clicking the day cell itself, not a meeting
    if (e.target === e.currentTarget || e.target.classList.contains('day-number')) {
      onAddMeeting(dateString)
    }
  }

  const classNames = [
    'calendar-day',
    !isCurrentMonth && 'other-month',
    isToday && 'today'
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classNames}
      onClick={handleDayClick}
      role="button"
      tabIndex={0}
      aria-label={`${format(date, 'EEEE, MMMM d, yyyy')}${meetings.length > 0 ? `, ${meetings.length} meeting${meetings.length > 1 ? 's' : ''}` : ''}`}
    >
      <span className="day-number">{dayNumber}</span>
      {meetings.length > 0 && (
        <div className="day-meetings">
          {meetings.slice(0, 2).map(meeting => (
            <MeetingBadge
              key={meeting.id}
              meeting={meeting}
              onClick={onMeetingClick}
            />
          ))}
          {meetings.length > 2 && (
            <span className="more-meetings">+{meetings.length - 2} more</span>
          )}
        </div>
      )}
    </div>
  )
}

export default CalendarDay
