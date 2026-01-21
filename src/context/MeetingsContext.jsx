import { createContext, useContext, useState, useCallback } from 'react'

const MeetingsContext = createContext(null)

// Sample meetings data
const initialMeetings = [
  {
    id: '1',
    title: 'Board of Directors Monthly Meeting',
    type: 'BOD',
    date: '2026-01-15',
    time: '10:00',
    duration: 120,
    location: 'Main Conference Room',
    description: 'Monthly review of organizational performance and strategic initiatives.',
    attendees: ['John Smith', 'Jane Doe', 'Robert Johnson']
  },
  {
    id: '2',
    title: 'Board of Trustees Quarterly Review',
    type: 'BOT',
    date: '2026-01-22',
    time: '14:00',
    duration: 180,
    location: 'Board Room A',
    description: 'Quarterly financial review and trust fund allocation decisions.',
    attendees: ['Sarah Wilson', 'Michael Brown', 'Emily Davis']
  },
  {
    id: '3',
    title: 'BOD Emergency Session',
    type: 'BOD',
    date: '2026-01-28',
    time: '09:00',
    duration: 60,
    location: 'Virtual - Zoom',
    description: 'Emergency session to discuss urgent matters.',
    attendees: ['John Smith', 'Jane Doe']
  },
  {
    id: '4',
    title: 'Board of Directors Planning Session',
    type: 'BOD',
    date: '2026-02-05',
    time: '10:00',
    duration: 240,
    location: 'Executive Suite',
    description: 'Annual planning and goal setting session.',
    attendees: ['John Smith', 'Jane Doe', 'Robert Johnson', 'Sarah Wilson']
  },
  {
    id: '5',
    title: 'Board of Trustees Investment Review',
    type: 'BOT',
    date: '2026-02-12',
    time: '13:00',
    duration: 120,
    location: 'Board Room B',
    description: 'Review of investment portfolio and performance metrics.',
    attendees: ['Michael Brown', 'Emily Davis', 'David Lee']
  },
  {
    id: '6',
    title: 'Joint BOD/BOT Annual Meeting',
    type: 'BOD',
    date: '2026-02-19',
    time: '09:00',
    duration: 300,
    location: 'Grand Conference Hall',
    description: 'Annual joint meeting of both boards for strategic alignment.',
    attendees: ['John Smith', 'Jane Doe', 'Sarah Wilson', 'Michael Brown']
  }
]

export function MeetingsProvider({ children }) {
  const [meetings, setMeetings] = useState(initialMeetings)

  const getMeetingsForDate = useCallback((dateString) => {
    return meetings.filter(meeting => meeting.date === dateString)
  }, [meetings])

  const getMeetingsForMonth = useCallback((year, month) => {
    const monthStr = String(month + 1).padStart(2, '0')
    const prefix = `${year}-${monthStr}`
    return meetings.filter(meeting => meeting.date.startsWith(prefix))
  }, [meetings])

  const addMeeting = useCallback((meeting) => {
    const newMeeting = {
      ...meeting,
      id: String(Date.now())
    }
    setMeetings(prev => [...prev, newMeeting])
    return newMeeting
  }, [])

  const updateMeeting = useCallback((id, updates) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id === id ? { ...meeting, ...updates } : meeting
      )
    )
  }, [])

  const deleteMeeting = useCallback((id) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id))
  }, [])

  const value = {
    meetings,
    getMeetingsForDate,
    getMeetingsForMonth,
    addMeeting,
    updateMeeting,
    deleteMeeting
  }

  return (
    <MeetingsContext.Provider value={value}>
      {children}
    </MeetingsContext.Provider>
  )
}

export function useMeetings() {
  const context = useContext(MeetingsContext)
  if (!context) {
    throw new Error('useMeetings must be used within a MeetingsProvider')
  }
  return context
}
