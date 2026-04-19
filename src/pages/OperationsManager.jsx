import { useState } from 'react';
import {
  opsTabConfig, dashboardControls, opsKPIs, opsChartData,
  slaData, incidentData, requestData, problemData,
  leadershipTabConfig, leadershipData,
} from '../data/opsManagerData';
import '../styles/ops-manager.css';

function KPICard({ kpi }) {
  return (
    <div className={`ops-kpi-card ${kpi.cardClass || ''}`}>
      {kpi.icon && <div className="ops-kpi-icon"><i className={kpi.icon} /></div>}
      <div className="ops-kpi-content">
        <div className="ops-kpi-value">{kpi.value}</div>
        <div className="ops-kpi-title">{kpi.title}</div>
        <div className="ops-kpi-trend">{kpi.trend}</div>
      </div>
    </div>
  );
}

function KPIGrid({ items, cols }) {
  return (
    <div className={`ops-kpi-grid cols-${cols || items.length}`}>
      {items.map((k, i) => <KPICard key={i} kpi={k} />)}
    </div>
  );
}

function MiniBar({ data, maxVal, color }) {
  const pct = maxVal > 0 ? (data / maxVal) * 100 : 0;
  return (
    <div className="ops-mini-bar-track">
      <div className="ops-mini-bar-fill" style={{ width: `${pct}%`, background: color || '#0ea5e9' }} />
    </div>
  );
}

function HorizontalBarChart({ items, labelKey, valueKey, color, maxVal }) {
  const mv = maxVal || Math.max(...items.map((i) => i[valueKey]));
  return (
    <div className="ops-hbar-chart">
      {items.map((item, i) => (
        <div key={i} className="ops-hbar-row">
          <span className="ops-hbar-label">{item[labelKey]}</span>
          <MiniBar data={item[valueKey]} maxVal={mv} color={color} />
          <span className="ops-hbar-value">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows, className }) {
  return (
    <table className={`ops-table ${className || ''}`}>
      <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
      ))}</tbody>
    </table>
  );
}

function SLABadge({ value, className }) {
  return <span className={`ops-sla-badge ${className}`}>{value}</span>;
}

// Tab content renderers
function OpsTab() {
  return (
    <div className="ops-tab-content">
      <KPIGrid items={opsKPIs.row1} cols={5} />
      <KPIGrid items={opsKPIs.row2} cols={5} />
      <KPIGrid items={opsKPIs.row3} cols={5} />
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-chart-bar" /> Ticket Trend (Weekly)</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['Week', ...opsChartData.ticketTrend.datasets.map((d) => d.label)]}
              rows={opsChartData.ticketTrend.labels.map((l, i) => [l, ...opsChartData.ticketTrend.datasets.map((d) => d.data[i])])}
            />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-chart-area" /> Incidents Resolved (Agent vs Human)</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['Week', ...opsChartData.incidentsResolved.datasets.map((d) => d.label)]}
              rows={opsChartData.incidentsResolved.labels.map((l, i) => [l, ...opsChartData.incidentsResolved.datasets.map((d) => d.data[i])])}
            />
          </div>
        </div>
      </div>
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-th" /> Active Incidents Heatmap</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={opsChartData.heatmap.headers}
              rows={opsChartData.heatmap.rows}
            />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-pause-circle" /> On Hold Reasons</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={opsChartData.onHoldReasons} labelKey="reason" valueKey="value" color="#f97316" />
          </div>
        </div>
      </div>
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-tasks" /> Service Requests (Created vs Closed)</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['Week', ...opsChartData.serviceRequests.datasets.map((d) => d.label)]}
              rows={opsChartData.serviceRequests.labels.map((l, i) => [l, ...opsChartData.serviceRequests.datasets.map((d) => d.data[i])])}
            />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-building" /> Top 5 Apps by Ticket Volume</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['App', 'Change', 'Incident', 'Request', 'Total']}
              rows={opsChartData.topApps.map((a) => [a.app, a.change, a.incident, a.request, a.total])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SLAsTab() {
  return (
    <div className="ops-tab-content">
      <KPIGrid items={slaData.agentKPIs} cols={4} />
      <KPIGrid items={slaData.complianceKPIs} cols={4} />
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-chart-pie" /> Breached by Priority</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={slaData.breachedByPriority} labelKey="priority" valueKey="count" color="#ef4444" />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-server" /> Breached by CI & Category</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['CI', 'Count', 'Category']}
              rows={slaData.breachedByCI.map((b) => [b.ci, b.count, b.category])}
            />
          </div>
        </div>
      </div>
      <div className="ops-card">
        <div className="ops-card-header"><h3><i className="fas fa-list" /> Active Incidents SLA Tracking</h3></div>
        <div className="ops-card-body">
          <table className="ops-table ops-sla-table">
            <thead>
              <tr><th>Number</th><th>Description</th><th>Handler</th><th>SLA Elapsed</th><th>Priority</th><th>State</th></tr>
            </thead>
            <tbody>
              {slaData.slaTrackingTable.map((row) => (
                <tr key={row.number}>
                  <td className="ops-ticket-num">{row.number}</td>
                  <td>{row.desc}</td>
                  <td><span className={`ops-handler-badge ${row.handler.toLowerCase()}`}>{row.handler}</span></td>
                  <td><SLABadge value={row.sla} className={row.slaClass} /></td>
                  <td>{row.priority}</td>
                  <td>{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IncidentsTab() {
  return (
    <div className="ops-tab-content">
      <KPIGrid items={incidentData.agentKPIs} cols={5} />
      <KPIGrid items={incidentData.kpis} cols={4} />
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-chart-bar" /> By Priority</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={incidentData.byPriority} labelKey="priority" valueKey="count" color="#ef4444" />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-stream" /> By State</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={incidentData.byState} labelKey="state" valueKey="count" color="#0ea5e9" />
          </div>
        </div>
      </div>
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-chart-line" /> Agent vs Human (Daily)</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['Day', 'Agent', 'Human', 'Total']}
              rows={incidentData.agentVsHumanDaily.map((d) => [d.day, d.agent, d.human, d.total])}
            />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-tags" /> Top Categories (Agent vs Human)</h3></div>
          <div className="ops-card-body">
            <DataTable
              headers={['Category', 'Agent', 'Human', 'Total']}
              rows={incidentData.topCategories.map((c) => [c.category, c.agent, c.human, c.total])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestsTab() {
  return (
    <div className="ops-tab-content">
      <KPIGrid items={requestData.agentKPIs} cols={4} />
      <KPIGrid items={requestData.kpis} cols={4} />
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-star" /> Top Catalog Items</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={requestData.topCatalogItems} labelKey="item" valueKey="value" color="#22c55e" />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-stream" /> Requests by State</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={requestData.byState} labelKey="state" valueKey="value" color="#8b5cf6" />
          </div>
        </div>
      </div>
      <div className="ops-card">
        <div className="ops-card-header"><h3><i className="fas fa-chart-area" /> Fulfillment Trend (Agent vs Human)</h3></div>
        <div className="ops-card-body">
          <DataTable
            headers={['Week', 'Agent', 'Human', 'Total']}
            rows={requestData.fulfillmentTrend.map((r) => [r.week, r.agent, r.human, r.total])}
          />
        </div>
      </div>
    </div>
  );
}

function ProblemsTab() {
  return (
    <div className="ops-tab-content">
      <KPIGrid items={problemData.agentKPIs} cols={4} />
      <KPIGrid items={problemData.kpis} cols={4} />
      <div className="ops-grid-2col">
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-stream" /> Problems by State</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={problemData.byState} labelKey="state" valueKey="count" color="#8b5cf6" />
          </div>
        </div>
        <div className="ops-card">
          <div className="ops-card-header"><h3><i className="fas fa-hourglass-half" /> Problem Aging</h3></div>
          <div className="ops-card-body">
            <HorizontalBarChart items={problemData.aging} labelKey="range" valueKey="count" color="#f97316" />
          </div>
        </div>
      </div>
      <div className="ops-card">
        <div className="ops-card-header"><h3><i className="fas fa-tags" /> Top Categories (Agent vs Human)</h3></div>
        <div className="ops-card-body">
          <DataTable
            headers={['Category', 'Agent', 'Human', 'Total']}
            rows={problemData.topCategories.map((c) => [c.category, c.agent, c.human, c.total])}
          />
        </div>
      </div>
    </div>
  );
}

function LeadershipTab() {
  const [subTab, setSubTab] = useState('incident');
  const tabData = leadershipData[subTab];
  return (
    <div className="ops-tab-content">
      <div className="ops-subtabs">
        {leadershipTabConfig.map((t) => (
          <button key={t.id} className={`ops-subtab ${subTab === t.id ? 'active' : ''}`} onClick={() => setSubTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tabData && <KPIGrid items={tabData.kpis} cols={5} />}
      {subTab === 'incident' && tabData.byPriority && (
        <div className="ops-grid-2col">
          <div className="ops-card">
            <div className="ops-card-header"><h3><i className="fas fa-chart-bar" /> Open by Priority (Agent/Human)</h3></div>
            <div className="ops-card-body">
              <DataTable
                headers={['Priority', 'Agent', 'Human', 'Total']}
                rows={tabData.byPriority.map((p) => [p.priority, p.agent, p.human, p.total])}
              />
            </div>
          </div>
          <div className="ops-card">
            <div className="ops-card-header"><h3><i className="fas fa-stream" /> Open by State (Agent/Human)</h3></div>
            <div className="ops-card-body">
              <DataTable
                headers={['State', 'Agent', 'Human', 'Total']}
                rows={tabData.byState.map((s) => [s.state, s.agent, s.human, s.total])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const tabComponents = {
  ops: OpsTab,
  slas: SLAsTab,
  incidents: IncidentsTab,
  requests: RequestsTab,
  problems: ProblemsTab,
  leadership: LeadershipTab,
};

export default function OperationsManager() {
  const [activeTab, setActiveTab] = useState('ops');
  const [timePeriod, setTimePeriod] = useState(dashboardControls.defaultPeriod);
  const TabContent = tabComponents[activeTab];

  return (
    <div className="ops-page">
      <div className="ops-page-header">
        <div>
          <h1 className="ops-page-title">ServiceNow Operations Dashboard</h1>
          <p className="ops-page-subtitle">AI Agent-Augmented IT Service Management</p>
        </div>
        <div className="ops-controls">
          <div className="ops-time-toggle">
            {dashboardControls.timePeriods.map((p) => (
              <button key={p} className={`ops-time-btn ${timePeriod === p ? 'active' : ''}`} onClick={() => setTimePeriod(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ops-tabs">
        {opsTabConfig.map((tab) => (
          <button key={tab.id} className={`ops-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <i className={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {TabContent && <TabContent />}
    </div>
  );
}
