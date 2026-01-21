import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <h1 className="header-title">WVMA</h1>
          <span className="header-subtitle">Board Meeting Calendar</span>
        </div>
        <div className="header-legend">
          <div className="legend-item legend-bod">
            <span className="legend-dot"></span>
            <span className="legend-label">Board of Directors (BOD)</span>
          </div>
          <div className="legend-item legend-bot">
            <span className="legend-dot"></span>
            <span className="legend-label">Board of Trustees (BOT)</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
