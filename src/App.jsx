import { useState } from 'react'
import Header from './components/Header/Header'
import Calendar from './components/Calendar/Calendar'
import MeetingModal from './components/MeetingModal/MeetingModal'
import { MeetingsProvider } from './context/MeetingsContext'
import './styles/App.css'

function App() {
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('view') // 'view', 'add', 'edit'
  const [selectedDate, setSelectedDate] = useState(null)

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleAddMeeting = (date) => {
    setSelectedDate(date)
    setSelectedMeeting(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMeeting(null)
    setSelectedDate(null)
  }

  return (
    <MeetingsProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <Calendar
            onMeetingClick={handleMeetingClick}
            onAddMeeting={handleAddMeeting}
          />
        </main>
        {isModalOpen && (
          <MeetingModal
            meeting={selectedMeeting}
            date={selectedDate}
            mode={modalMode}
            onClose={handleCloseModal}
            onEdit={handleEditMeeting}
          />
        )}
      </div>
    </MeetingsProvider>
  )
}

export default App
