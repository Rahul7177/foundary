import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentTableData } from '../../data/agentsData';

const TAB_KEYS = ['business', 'operations', 'sdlc', 'data'];
const TAB_LABELS = { business: 'Business.Ai', operations: 'Operations.Ai', sdlc: 'SDLC.Ai', data: 'Data.Ai' };

export default function AgentTable({ activeTab: externalTab, onTabChange }) {
  const [internalTab, setInternalTab] = useState('operations');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const activeTab = externalTab ?? internalTab;

  const handleTabClick = useCallback(
    (key) => {
      if (onTabChange) onTabChange(key);
      else setInternalTab(key);
      setSearch('');
    },
    [onTabChange]
  );

  const agents = useMemo(() => {
    const list = agentTableData[activeTab] || [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.tools.some((t) => t.toLowerCase().includes(q))
    );
  }, [activeTab, search]);

  const handleAgentClick = useCallback(
    (agent) => {
      // Prefer internal React route over legacy external HTML link
      if (agent.internalRoute) {
        navigate(agent.internalRoute);
      } else if (agent.externalLink) {
        window.location.href = agent.externalLink;
      }
    },
    [navigate]
  );

  return (
    <div className="bottom-grid-section">
      <div className="bottom-grid-title">AI Agents Registry</div>
      <div className="agents-toolbar">
        <div className="tabs">
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              className={`tab${activeTab === key ? ' active' : ''}`}
              onClick={() => handleTabClick(key)}
            >
              {TAB_LABELS[key]}
            </button>
          ))}
        </div>
        <input
          className="search-bar"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="new-agent-btn" onClick={() => window.location.href = '../archive/agent-builder.html'}>
          <i className="fas fa-plus" style={{ marginRight: 6 }} /> New Agent
        </button>
      </div>
      <div className="bottom-grid-table-wrapper">
        <table className="bottom-grid-table">
          <thead>
            <tr>
              <th style={{ width: 30 }}></th>
              <th>Agent Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Trigger</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Tools</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td>
                  <button className="expand-row" title="Expand">
                    <i className="fas fa-chevron-right" />
                  </button>
                </td>
                <td>
                  <button className="agent-link" onClick={() => handleAgentClick(agent)}>
                    {agent.name}
                  </button>
                </td>
                <td>{agent.date}</td>
                <td>{agent.time}</td>
                <td>{agent.trigger}</td>
                <td>
                  <span className={`status-dot ${agent.status}`} />
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </td>
                <td>
                  <span className={`priority ${agent.priority}`}>
                    {agent.priority.charAt(0).toUpperCase() + agent.priority.slice(1)}
                  </span>
                </td>
                <td>
                  {agent.tools.map((tool, i) => (
                    <span key={i} className="ai-badge" style={{ marginRight: 4, marginBottom: 4, display: 'inline-block' }}>
                      {tool}
                    </span>
                  ))}
                </td>
                <td>
                  {(agent.externalLink || agent.internalRoute) && (
                    <button
                      className="link-btn edit-flow-btn"
                      onClick={() => handleAgentClick(agent)}
                      title="Open Agent"
                    >
                      <i className="fas fa-external-link-alt" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center text-muted" style={{ padding: 32 }}>
                  No agents found matching &quot;{search}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

