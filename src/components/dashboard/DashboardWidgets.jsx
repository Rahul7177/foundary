import { useMemo } from 'react';
import { dashboardWidgets } from '../../data/dashboardData';

function TicketChart() {
  const { total, categories, trend } = dashboardWidgets.openTickets;

  // Build conic-gradient for pie chart
  const gradient = useMemo(() => {
    let acc = 0;
    const stops = categories.map((c) => {
      const start = acc;
      acc += (c.percent / 100) * 360;
      return `${c.color} ${start}deg ${acc}deg`;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }, [categories]);

  return (
    <div className="widget-card">
      <h3>Open Tickets</h3>
      <div className="widget-content">
        <div className="ticket-chart">
          <div className="ticket-chart-canvas">
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: gradient,
              }}
            />
            <div className="chart-center-label">{total}</div>
          </div>
          <div className="ticket-legend">
            {categories.map((c) => (
              <div key={c.label} className="legend-item">
                <span className="legend-color" style={{ background: c.color }} />
                <span>{c.label} ({c.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ticket-trend">
          <i className="fas fa-arrow-trend-up" />
          <span title={trend}>{trend}</span>
        </div>
      </div>
    </div>
  );
}

function MyOpenTickets() {
  const { count, criticalLabel, timeToComplete, criticalTicket } = dashboardWidgets.myOpenTickets;

  return (
    <div className="widget-card">
      <h3>My Open Tickets</h3>
      <div className="widget-content">
        <div className="my-tickets-header">
          <span className="count-large">{count}</span>
          <div className="tickets-info">
            <span className="critical-badge">{criticalLabel}</span>
            <span style={{ fontSize: 12, color: '#999' }}>Est. {timeToComplete}</span>
          </div>
        </div>
        {criticalTicket && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#ef4444', marginRight: 6 }} />
              {criticalTicket.id} — {criticalTicket.title}
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${criticalTicket.progress}%` }} />
            </div>
          </div>
        )}
        <div className="widget-insight">
          <span className="insight-label">
            <i className="fas fa-bolt" /> AI Insight
          </span>
          <span title={`Prioritize ${criticalTicket?.id} — SLA breach risk within 2 hours`}>Prioritize {criticalTicket?.id} — SLA breach risk within 2 hours</span>
        </div>
      </div>
    </div>
  );
}

function MTTRWidget() {
  const { thisMonth, lastMonth, annualAvg, teamAvg } = dashboardWidgets.mttr;

  return (
    <div className="widget-card">
      <h3>MTTR — This Month</h3>
      <div className="widget-content">
        <div className="mttr-display">
          <div className="mttr-value">{thisMonth}</div>
          <div className="mttr-label">Mean Time to Resolve</div>
        </div>
        <div className="widget-insight blue">
          <span className="insight-label">
            <i className="fas fa-chart-line" /> Comparison
          </span>
          <span title={`Last Month: ${lastMonth} | Annual Avg: ${annualAvg} | Team Avg: ${teamAvg}`}>Last Month: {lastMonth} | Annual Avg: {annualAvg} | Team Avg: {teamAvg}</span>
        </div>
      </div>
    </div>
  );
}

function KBWidget() {
  const { newSops, total, recent } = dashboardWidgets.kbContributions;

  return (
    <div className="widget-card">
      <h3>KB Contributions</h3>
      <div className="widget-content">
        <div className="kb-stats">
          <div className="kb-stat">
            <div className="kb-number">{newSops}</div>
            <div className="kb-label">New SOPs</div>
          </div>
          <div className="kb-stat">
            <div className="kb-number">{total}</div>
            <div className="kb-label">Total</div>
          </div>
        </div>
        <div className="widget-insight purple">
          <span className="insight-label">
            <i className="fas fa-book" /> Latest
          </span>
          <span title={`${recent.id}: ${recent.title}`}>{recent.id}: {recent.title}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardWidgets() {
  return (
    <div className="dashboard-widgets">
      <TicketChart />
      <MyOpenTickets />
      <MTTRWidget />
      <KBWidget />
    </div>
  );
}
