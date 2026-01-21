function MeetingBadge({ meeting, onClick }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onClick(meeting)
  }

  const typeClass = meeting.type === 'BOD' ? 'meeting-bod' : 'meeting-bot'

  return (
    <button
      className={`meeting-badge ${typeClass}`}
      onClick={handleClick}
      title={meeting.title}
    >
      <span className="meeting-type">{meeting.type}</span>
      <span className="meeting-time">{meeting.time}</span>
    </button>
  )
}

export default MeetingBadge
