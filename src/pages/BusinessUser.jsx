import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessUserSections, agentSwimLanes } from '../data/businessUserData';
import '../styles/business-user.css';

export default function BusinessUser() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('my-agents');

  const handleAgentClick = (agent) => {
    if (agent.link) navigate(agent.link);
  };

  return (
    <div className="bu-page">
      <div className="bu-page-header">
        <div>
          <h1 className="bu-page-title">My Agents</h1>
          <p className="bu-page-subtitle">Explore and manage your AI agents across different domains</p>
        </div>
        <div className="bu-section-tabs">
          {businessUserSections.map((s) => (
            <button key={s.id} className={`bu-section-tab ${activeSection === s.id ? 'active' : ''}`} onClick={() => setActiveSection(s.id)}>
              <i className={s.icon} />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activeSection === 'my-agents' && (
        <div className="bu-swim-lanes">
          {agentSwimLanes.map((lane) => (
            <div key={lane.category} className="bu-swim-lane">
              <div className="bu-lane-header">
                <div className="bu-lane-icon" style={{ color: lane.color }}>
                  <i className={lane.icon} />
                </div>
                <h2 className="bu-lane-title">{lane.category}</h2>
                <span className="bu-lane-count">{lane.agents.length} agents</span>
              </div>
              <div className="bu-agent-grid">
                {lane.agents.map((agent) => (
                  <div
                    key={agent.name}
                    className={`bu-agent-card ${agent.link ? 'clickable' : ''}`}
                    onClick={() => handleAgentClick(agent)}
                  >
                    <div className="bu-agent-header">
                      <div className="bu-agent-icon" style={{ color: lane.color }}>
                        <i className={agent.icon} />
                      </div>
                      <div>
                        <div className="bu-agent-name">{agent.name}</div>
                        <div className="bu-agent-category" style={{ color: lane.color }}>{lane.category}</div>
                      </div>
                    </div>
                    <p className="bu-agent-desc">{agent.description}</p>
                    <div className="bu-agent-stats">
                      {agent.stats.map((stat) => (
                        <div key={stat.label} className="bu-agent-stat">
                          <div className="bu-stat-value">{stat.value}</div>
                          <div className="bu-stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    {agent.link && (
                      <div className="bu-agent-action">
                        <span>Open Agent <i className="fas fa-arrow-right" /></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection !== 'my-agents' && (
        <div className="bu-placeholder">
          <i className={businessUserSections.find((s) => s.id === activeSection)?.icon || 'fas fa-info-circle'} />
          <h3>{businessUserSections.find((s) => s.id === activeSection)?.label}</h3>
          <p>This section is coming soon. Stay tuned for updates.</p>
        </div>
      )}
    </div>
  );
}
