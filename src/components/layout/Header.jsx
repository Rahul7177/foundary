import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../data/appConfig';
import { personas } from '../../data/dashboardData';
import { useAuth } from '../../context/AuthContext';

export default function Header({ currentPersona, onPersonaChange }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handlePersonaChange = useCallback(
    (e) => onPersonaChange(e.target.value),
    [onPersonaChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-left">
        <img src={`${config.iconsBasePath}Infosys_logo1.png`} alt="Infosys" className="header-logo" />
        <img src={`${config.iconsBasePath}AI Foundry Logo.svg?v=20260315`} alt="AI Foundry" className="header-ai-logo" />
        <span className="header-gradient-text">Unified AI Platform</span>
      </div>
      <div className="header-right">
        <button className="icon-btn" aria-label="Settings" title="Settings">
          <img src={`${config.iconsBasePath}setting.svg`} alt="Settings" />
        </button>
        <button className="icon-btn" aria-label="Help" title="Help">
          <img src={`${config.iconsBasePath}help.svg`} alt="Help" />
        </button>
        <button className="icon-btn" aria-label="Notifications" title="Notifications">
          <img src={`${config.iconsBasePath}notifications.svg`} alt="Notifications" />
        </button>
        <div className="user-info">
          <select
            className="persona-dropdown"
            value={currentPersona}
            onChange={handlePersonaChange}
          >
            {personas.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <div className="user-avatar">{user?.initials || 'BC'}</div>
          <span className="user-name">{user?.fullName || 'Bhupinder Singh Chawla'}</span>
          <div className="user-menu-wrapper" ref={menuRef}>
            <button
              className={`user-menu-toggle${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="User menu toggle"
            >
              <i className="fas fa-chevron-down" />
            </button>
            <div className={`user-menu-dropdown${menuOpen ? ' open' : ''}`}>
              <div className="user-menu-item" onClick={() => { setMenuOpen(false); alert('Profile settings'); }}>
                <i className="fas fa-user-circle" />
                <span>Profile</span>
              </div>
              <div className="user-menu-divider" />
              <div className="user-menu-item user-menu-static">
                <i className="fas fa-headset" />
                <span>Service Queue</span>
                <span className="user-menu-badge">Application Support</span>
              </div>
              <div className="user-menu-divider" />
              <div className="user-menu-item" onClick={() => { setMenuOpen(false); logout(); navigate('/login'); }}>
                <i className="fas fa-sign-out-alt" />
                <span>Sign Out</span>
              </div>
            </div>
          </div>
          <button
            className="icon-btn triage-btn"
            title="AI Triage Agent"
            onClick={() => navigate('/triage')}
          >
            <i className="fas fa-bolt" style={{ color: '#006734', fontSize: 18, filter: 'drop-shadow(0 0 6px rgba(0,103,52,0.5))' }} />
            <span className="triage-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
}
