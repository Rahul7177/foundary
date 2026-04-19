import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { hrMarketplaceAgents, hrDomains } from '../../data/marketplaceData';

function AgentCard({ agent }) {
  return (
    <div className="agent-card">
      <div className="agent-header-card">
        <div className="agent-icon">
          <i className={`fas ${agent.icon}`} />
        </div>
        <h3>{agent.name}</h3>
      </div>
      <p className="agent-description-text">{agent.description}</p>
      <div className="agent-features">
        {agent.tags.map((tag) => (
          <span key={tag} className="feature-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function HRMarketplace({ onBack }) {
  const [selectedDomain, setSelectedDomain] = useState('');
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    if (onBack) onBack();
    else navigate('/');
  }, [onBack, navigate]);

  return (
    <div className="hr-marketplace">
      <div className="marketplace-navigation">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left" /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <select
            className="persona-dropdown"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{ minWidth: 200 }}
          >
            <option value="">All Domains</option>
            {hrDomains.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <button className="new-agent-btn">
            <i className="fas fa-plus" style={{ marginRight: 6 }} /> Request New Agent
          </button>
        </div>
      </div>

      <h2 style={{ color: '#fff', marginBottom: 20, fontSize: '1.5rem' }}>
        <span style={{ color: '#e6001f' }}>HR</span> Agent Marketplace
      </h2>

      <div className="marketplace-grid">
        {hrMarketplaceAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
