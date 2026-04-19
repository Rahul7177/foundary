import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sidebarNavItems } from '../../data/marketplaceData';
import config from '../../data/appConfig';

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = useCallback(
    (item) => {
      if (item.externalLink) {
        window.location.href = item.externalLink;
      } else if (item.route && item.route !== '#') {
        navigate(item.route);
      }
    },
    [navigate]
  );

  const toggleIcon = collapsed
    ? `${config.iconsBasePath}left Nav bar (Expand).svg`
    : `${config.iconsBasePath}left Nav bar (close).svg`;

  return (
    <nav className={`side-nav${collapsed ? ' collapsed' : ''}`}>
      {/* Collapse toggle */}
      <button className="side-nav-toggle" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
        <img src={toggleIcon} alt="Toggle Nav" />
      </button>

      {/* Nav items */}
      <ul className="side-nav-menu">
        {sidebarNavItems.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <li key={`hdr-${idx}`} className="side-nav-category">
                <span>{item.label}</span>
              </li>
            );
          }
          const isActive = item.route === location.pathname ||
            (item.isDefault && location.pathname === '/');
          return (
            <li key={item.id}>
              <a
                className={`side-nav-link${isActive ? ' active' : ''}`}
                onClick={() => handleNavClick(item)}
                role="button"
                tabIndex={0}
              >
                <i className={item.icon} style={{ color: '#e6001f' }} />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
