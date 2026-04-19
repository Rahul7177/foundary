import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { inboxTickets } from '../../data/dashboardData';

const TABS = [
  { key: 'assignedToAgents', label: 'Assigned to Agents', count: inboxTickets.assignedToAgents.length },
  { key: 'assignedToMe', label: 'Assigned to Me', count: inboxTickets.assignedToMe.length },
  { key: 'myApprovals', label: 'My Approvals', count: inboxTickets.myApprovals.length },
];

function StatusBadge({ statusType, label }) {
  return <span className={`ticket-status status-${statusType}`}>{label}</span>;
}

function TicketCard({ ticket, navigate }) {
  const handleClick = useCallback(() => {
    if (ticket.link) {
      if (ticket.link.startsWith('/')) {
        navigate(ticket.link);
      } else {
        window.location.href = ticket.link;
      }
    }
  }, [ticket.link, navigate]);

  return (
    <div className="inbox-item fade-in" onClick={handleClick} style={{ cursor: ticket.link ? 'pointer' : 'default' }}>
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <StatusBadge statusType={ticket.statusType} label={ticket.status} />
      </div>
      <div className="inbox-title">{ticket.title}</div>
      {ticket.agent && <div className="inbox-desc"><i className="fas fa-robot" style={{ marginRight: 6 }} />{ticket.agent}</div>}
      <div className="ticket-metadata">
        <span className="ticket-meta-item">
          <i className="fas fa-flag" /> {ticket.priority}
        </span>
        {ticket.time && (
          <span className="ticket-meta-item">
            <i className="fas fa-clock" /> {ticket.time}
          </span>
        )}
        {ticket.category && (
          <span className="ticket-meta-item">
            <i className="fas fa-tag" /> {ticket.category}
          </span>
        )}
        {ticket.assignmentGroup && (
          <span className="ticket-meta-item">
            <i className="fas fa-users" /> {ticket.assignmentGroup}
          </span>
        )}
        {ticket.risk && (
          <span className="ticket-meta-item">
            <i className="fas fa-shield-alt" /> Risk: {ticket.risk}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Inbox() {
  const [activeTab, setActiveTab] = useState('assignedToAgents');
  const navigate = useNavigate();

  const tickets = useMemo(() => inboxTickets[activeTab] || [], [activeTab]);

  return (
    <div className="inbox-section">
      <div className="inbox-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`inbox-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
      <div className="inbox-items">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
