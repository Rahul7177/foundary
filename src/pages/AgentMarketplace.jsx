import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceCategories, hrMarketplaceAgents, hrDomains } from '../data/marketplaceData';
import { agentTableData } from '../data/agentsData';
import '../styles/marketplace.css';

/* ── Tab configuration ── */
const TABS = [
  { key: 'business',   label: 'Business.Ai',   icon: 'fa-briefcase' },
  { key: 'operations', label: 'Operations.Ai',  icon: 'fa-cogs' },
  { key: 'sdlc',       label: 'SDLC.Ai',        icon: 'fa-code-branch' },
  { key: 'data',       label: 'Data.Ai',         icon: 'fa-database' },
];

/* ── Domain marketplace configs (Business.Ai sub-domains) ── */
const DOMAIN_CONFIGS = {
  'Human Resources': {
    title: 'HR Agent Marketplace',
    subtitle: 'Specialized AI agents for Human Resources operations',
    agents: hrMarketplaceAgents,
  },
};

/* ═══════════════════════════════════════════════════════════════════
   Reusable: StatCard
   ═══════════════════════════════════════════════════════════════════ */
function StatCard({ icon, iconClass, value, label }) {
  return (
    <div className="mp-stat-card">
      <div className={`mp-stat-icon ${iconClass}`}>
        <i className={`fas ${icon}`} />
      </div>
      <div>
        <div className="mp-stat-value">{value}</div>
        <div className="mp-stat-label">{label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: CategoryCard
   ═══════════════════════════════════════════════════════════════════ */
function CategoryCard({ category, onItemClick }) {
  return (
    <div className="mp-category-card">
      <img
        className="mp-category-hero"
        src={category.image}
        alt={category.title}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <div className="mp-category-body">
        <div className="mp-category-title">{category.title}</div>
        <ul className="mp-category-items">
          {category.items.map((item, idx) => {
            /* sub-headers come as objects { subheader: "..." } */
            if (typeof item === 'object' && item.subheader) {
              return (
                <li key={idx} className="mp-subheader">{item.subheader}</li>
              );
            }
            return (
              <li key={idx} onClick={() => onItemClick && onItemClick(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: AgentTableRow
   ═══════════════════════════════════════════════════════════════════ */
function AgentTableRow({ agent, onAgentClick }) {
  const navigate = useNavigate();
  const handleClick = () => onAgentClick(agent);
  const isClickable = agent.externalLink || agent.internalRoute;

  return (
    <tr className={isClickable ? 'mp-clickable' : ''} onClick={isClickable ? handleClick : undefined}>
      <td>
        <button
          className="mp-action-btn"
          title="Expand"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </td>
      <td>
        <button className="mp-agent-link" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
          {agent.name}
          {agent.agentAge === 'new' && <span className="mp-new-badge">NEW</span>}
        </button>
      </td>
      <td>{agent.date}</td>
      <td>{agent.time}</td>
      <td>{agent.trigger}</td>
      <td>
        <span className="mp-status">
          <span className={`mp-status-dot ${agent.status}`} />
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </td>
      <td>
        <span className={`mp-priority ${agent.priority}`}>
          {agent.priority.toUpperCase()}
        </span>
      </td>
      <td>
        {agent.tools.slice(0, 3).map((tool, i) => (
          <span key={i} className="mp-tool-chip">{tool}</span>
        ))}
        {agent.tools.length > 3 && (
          <span className="mp-tool-chip">+{agent.tools.length - 3}</span>
        )}
      </td>
      <td>
        <button
          className="mp-action-btn"
          title="View Agent"
          onClick={(e) => { e.stopPropagation(); handleClick(); }}
        >
          <i className="fas fa-eye" />
        </button>
        {agent.externalLink && (
          <button
            className="mp-action-btn"
            title="Edit Flow"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/agent-execution/upstream-apps-resolver');
            }}
          >
            <i className="fas fa-pencil-alt" />
          </button>
        )}
      </td>
    </tr>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: DomainMarketplace (sub-level agent cards)
   ═══════════════════════════════════════════════════════════════════ */
function DomainMarketplace({ config, onBack }) {
  return (
    <div className="mp-domain-overlay">
      <button className="mp-domain-back" onClick={onBack}>
        <i className="fas fa-arrow-left" /> Back to Categories
      </button>
      <div className="mp-domain-header">
        <h2>
          <span style={{ color: '#e6001f' }}>{config.title.split(' ')[0]}</span>{' '}
          {config.title.split(' ').slice(1).join(' ')}
        </h2>
        <p>{config.subtitle}</p>
      </div>
      <div className="mp-domain-grid">
        {config.agents.map((agent) => (
          <div key={agent.id} className="mp-domain-agent-card">
            <div className="mp-agent-icon">
              <i className={`fas ${agent.icon}`} />
            </div>
            <h3>{agent.name}</h3>
            <p>{agent.description}</p>
            <div className="mp-domain-tags">
              {agent.tags.map((tag) => (
                <span key={tag} className="mp-domain-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main: AgentMarketplace
   ═══════════════════════════════════════════════════════════════════ */
export default function AgentMarketplace() {
  const [activeTab, setActiveTab] = useState('business');
  const [search, setSearch] = useState('');
  const [activeDomain, setActiveDomain] = useState(null);
  const [ageFilter, setAgeFilter] = useState('new');
  const navigate = useNavigate();

  /* — filtered agents for table — */
  const agents = useMemo(() => {
    let list = agentTableData[activeTab] || [];
    if (ageFilter !== 'all') {
      list = list.filter((a) => (a.agentAge || 'old') === ageFilter);
    }
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tools.some((t) => t.toLowerCase().includes(q)) ||
        a.trigger.toLowerCase().includes(q)
    );
  }, [activeTab, search, ageFilter]);

  /* — categories for active tab — */
  const categories = useMemo(
    () => marketplaceCategories[activeTab] || [],
    [activeTab]
  );

  /* — stats — */
  const stats = useMemo(() => {
    const allAgents = Object.values(agentTableData).flat();
    const runningCount = allAgents.filter((a) => a.status === 'running').length;
    const toolSet = new Set(allAgents.flatMap((a) => a.tools));
    const catCount = Object.values(marketplaceCategories).flat().length;
    return {
      total: allAgents.length,
      running: runningCount,
      categories: catCount,
      tools: toolSet.size,
    };
  }, []);

  const handleAgentClick = useCallback(
    (agent) => {
      if (agent.internalRoute) {
        navigate(agent.internalRoute);
      } else if (agent.externalLink) {
        window.location.href = agent.externalLink;
      }
    },
    [navigate]
  );

  const handleCategoryItemClick = useCallback((item) => {
    if (DOMAIN_CONFIGS[item]) {
      setActiveDomain(item);
    }
  }, []);

  const handleTabChange = useCallback((key) => {
    setActiveTab(key);
    setActiveDomain(null);
    setSearch('');
  }, []);

  /* — If a domain sub-marketplace is open, render it — */
  if (activeDomain && DOMAIN_CONFIGS[activeDomain]) {
    return (
      <div className="marketplace-page">
        <DomainMarketplace
          config={DOMAIN_CONFIGS[activeDomain]}
          onBack={() => setActiveDomain(null)}
        />
      </div>
    );
  }

  return (
    <div className="marketplace-page">
      {/* Header */}
      <div className="mp-header">
        <h1>
          <i className="fas fa-store" style={{ color: '#e6001f', fontSize: '1.3rem' }} />
          Agent <span className="accent">Marketplace</span>
        </h1>
        <div className="mp-header-actions">
          <div className="mp-search-wrap">
            <i className="fas fa-search" />
            <input
              className="mp-search-input"
              type="text"
              placeholder="Search agents, tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="mp-new-agent-btn" onClick={() => window.location.href = '../archive/agent-builder.html'}>
            <i className="fas fa-plus" /> New Agent
          </button>
          <button
            className="mp-new-agent-btn"
            style={{ background: 'linear-gradient(135deg, #333, #222)' }}
          >
            <i className="fas fa-key" /> Request Access
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mp-stats-bar">
        <StatCard icon="fa-robot" iconClass="agents" value={stats.total} label="Total Agents" />
        <StatCard icon="fa-play-circle" iconClass="running" value={stats.running} label="Running" />
        <StatCard icon="fa-th-large" iconClass="categories" value={stats.categories} label="Categories" />
        <StatCard icon="fa-wrench" iconClass="tools" value={stats.tools} label="Unique Tools" />
      </div>

      {/* Tab Bar */}
      <div className="mp-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`mp-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            <i className={`fas ${tab.icon}`} />
            {tab.label}
            <span className="mp-tab-count">
              {(agentTableData[tab.key] || []).length}
            </span>
          </button>
        ))}
      </div>

      {/* Category Cards */}
      <div className="mp-categories" key={activeTab}>
        {categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            category={cat}
            onItemClick={handleCategoryItemClick}
          />
        ))}
      </div>

      {/* Agent Table */}
      <div className="mp-agents-section">
        <div className="mp-agents-header">
          <div className="mp-agents-title">
            <span className="mp-live-dot" />
            Currently Running Agents
          </div>
          <div className="mp-agents-toolbar">
            <div className="mp-age-filter">
              {['new', 'old', 'all'].map((val) => (
                <button
                  key={val}
                  className={`mp-age-btn${ageFilter === val ? ' active' : ''}`}
                  onClick={() => setAgeFilter(val)}
                >
                  {val === 'new' ? 'New' : val === 'old' ? 'Legacy' : 'All'}
                </button>
              ))}
            </div>
            <span style={{ color: '#888', fontSize: '0.82rem' }}>
              {agents.length} agent{agents.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="mp-table-wrap">
          <table className="mp-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
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
            <tbody key={`${activeTab}-${search}`}>
              {agents.map((agent) => (
                <AgentTableRow
                  key={agent.id}
                  agent={agent}
                  onAgentClick={handleAgentClick}
                />
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <div className="mp-empty">
                      <i className="fas fa-search" />
                      <p>No agents found{search ? ` matching "${search}"` : ''}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
