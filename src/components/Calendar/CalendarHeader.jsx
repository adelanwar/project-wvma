import { format } from 'date-fns'

function CalendarHeader({ currentDate, onPrevious, onNext, onToday }) {
  const monthYear = format(currentDate, 'MMMM yyyy')

  return (
    <div className="calendar-header">
      <div className="calendar-nav">
        <button
          className="nav-btn"
          onClick={onPrevious}
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="nav-btn today-btn"
          onClick={onToday}
        >
          Today
        </button>
        <button
          className="nav-btn"
          onClick={onNext}
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <h2 className="calendar-title">{monthYear}</h2>
      <div className="calendar-header-actions">
        {/* Future: Add view toggle (month/week) */}
      </div>
    </div>
  )
}

export default CalendarHeader
