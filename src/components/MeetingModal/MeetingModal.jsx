import { useState, useEffect, useRef } from 'react'
import { format, parseISO } from 'date-fns'
import { useMeetings } from '../../context/MeetingsContext'
import './MeetingModal.css'

function MeetingModal({ meeting, date, mode, onClose, onEdit }) {
  const { addMeeting, updateMeeting, deleteMeeting } = useMeetings()
  const modalRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    type: 'BOD',
    date: date || '',
    time: '10:00',
    duration: 60,
    location: '',
    description: '',
    attendees: []
  })
  const [attendeeInput, setAttendeeInput] = useState('')

  useEffect(() => {
    if (meeting && (mode === 'view' || mode === 'edit')) {
      setFormData({
        title: meeting.title,
        type: meeting.type,
        date: meeting.date,
        time: meeting.time,
        duration: meeting.duration,
        location: meeting.location || '',
        description: meeting.description || '',
        attendees: meeting.attendees || []
      })
    } else if (date) {
      setFormData(prev => ({ ...prev, date }))
    }
  }, [meeting, date, mode])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddAttendee = () => {
    if (attendeeInput.trim()) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, attendeeInput.trim()]
      }))
      setAttendeeInput('')
    }
  }

  const handleRemoveAttendee = (index) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'add') {
      addMeeting(formData)
    } else if (mode === 'edit') {
      updateMeeting(meeting.id, formData)
    }
    onClose()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      deleteMeeting(meeting.id)
      onClose()
    }
  }

  const formatDisplayDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), 'EEEE, MMMM d, yyyy')
    } catch {
      return dateStr
    }
  }

  const isEditing = mode === 'add' || mode === 'edit'

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {mode === 'add' && 'Add New Meeting'}
            {mode === 'edit' && 'Edit Meeting'}
            {mode === 'view' && meeting?.title}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {mode === 'view' && meeting && (
          <div className="modal-content">
            <div className={`meeting-type-badge ${meeting.type === 'BOD' ? 'badge-bod' : 'badge-bot'}`}>
              {meeting.type === 'BOD' ? 'Board of Directors' : 'Board of Trustees'}
            </div>

            <div className="meeting-details">
              <div className="detail-row">
                <span className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <span>{formatDisplayDate(meeting.date)}</span>
              </div>

              <div className="detail-row">
                <span className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>{meeting.time} ({meeting.duration} min)</span>
              </div>

              {meeting.location && (
                <div className="detail-row">
                  <span className="detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <span>{meeting.location}</span>
                </div>
              )}

              {meeting.description && (
                <div className="detail-section">
                  <h3>Description</h3>
                  <p>{meeting.description}</p>
                </div>
              )}

              {meeting.attendees && meeting.attendees.length > 0 && (
                <div className="detail-section">
                  <h3>Attendees ({meeting.attendees.length})</h3>
                  <ul className="attendee-list">
                    {meeting.attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => onEdit(meeting)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}

        {isEditing && (
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Meeting Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., Board of Directors Monthly Meeting"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Meeting Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="BOD">Board of Directors (BOD)</option>
                  <option value="BOT">Board of Trustees (BOT)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                >
                  <option value={30}>30 min</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                  <option value={180}>3 hours</option>
                  <option value={240}>4 hours</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Main Conference Room or Virtual - Zoom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Meeting agenda and notes..."
              />
            </div>

            <div className="form-group">
              <label>Attendees</label>
              <div className="attendee-input">
                <input
                  type="text"
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAttendee())}
                  placeholder="Enter attendee name"
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddAttendee}>
                  Add
                </button>
              </div>
              {formData.attendees.length > 0 && (
                <ul className="attendee-tags">
                  {formData.attendees.map((attendee, index) => (
                    <li key={index} className="attendee-tag">
                      {attendee}
                      <button
                        type="button"
                        onClick={() => handleRemoveAttendee(index)}
                        aria-label={`Remove ${attendee}`}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {mode === 'add' ? 'Create Meeting' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default MeetingModal
