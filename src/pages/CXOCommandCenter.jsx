import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  cxoKPIs,
  globalLocations,
  regionalTable,
  categoryHealth,
  categoryDetails,
  topIssues,
  weekOverWeek,
  productionData,
  aiAgentStatus,
} from '../data/cxoData';
import '../styles/cxo.css';

/* ─── live clock helper ─── */
function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ─── number counter animation ─── */
function AnimatedValue({ value, delay = 0 }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) { setDisplay(value); return; }
    const suffix = String(value).replace(/[\d.,]/g, '');
    const start = 0;
    const duration = 1200;
    const startTime = performance.now() + delay;

    function step(ts) {
      const elapsed = ts - startTime;
      if (elapsed < 0) { requestAnimationFrame(step); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (num - start) * eased;
      setDisplay(
        num % 1 === 0
          ? Math.round(current) + suffix
          : current.toFixed(1) + suffix
      );
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [value, delay]);

  return <span>{display}</span>;
}

/* ─── sparkline (tiny SVG) ─── */
function Sparkline({ data, color = '#006734', width = 80, height = 24 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`)
    .join(' ');
  return (
    <svg width={width} height={height} className="cxo-sparkline">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── KPI Card ─── */
function KPICard({ kpi, index }) {
  const sparkData = [65, 72, 68, 78, 82, 76, 88, 92, 85, 90];
  return (
    <div className={`cxo-kpi-card ${kpi.cardClass}`} style={{ animationDelay: `${index * 80}ms` }}>
      <div className="cxo-kpi-top-bar" />
      <div className="cxo-kpi-label">{kpi.label}</div>
      <div className="cxo-kpi-value">
        <AnimatedValue value={kpi.value} delay={index * 80} />
      </div>
      <div className={`cxo-kpi-status ${kpi.statusClass}`}>{kpi.sublabel}</div>
      <Sparkline data={sparkData} color={kpi.cardClass === 'green' ? '#4CAF50' : kpi.cardClass === 'amber' ? '#FF9800' : '#006734'} />
    </div>
  );
}

/* ─── Map auto-fit helper ─── */
function FitBounds({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length) {
      const bounds = locations.map(l => [l.lat, l.lng]);
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 5 });
    }
  }, [locations, map]);
  return null;
}

/* ─── Color helpers ─── */
const statusColors = { green: '#4CAF50', amber: '#FF9800', red: '#e6001f' };

/* ─── Global Operations Map + Table ─── */
function RegionalTableSection() {
  const mapContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* Real fullscreen using Fullscreen API (covers entire monitor like PPT) */
  const toggleFullscreen = useCallback(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className="cxo-widget-card">
      <div className="cxo-widget-header">
        <div className="cxo-widget-title"><i className="fas fa-globe-americas" /> Global Operations Health</div>
        <div className="cxo-widget-actions">
          <button className="cxo-widget-btn" onClick={toggleFullscreen}>
            <i className={`fas fa-${isFullscreen ? 'compress' : 'expand'}`} /> {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button className="cxo-widget-btn"><i className="fas fa-download" /> Export</button>
        </div>
      </div>

      {/* ── Leaflet Map ── */}
      <div
        ref={mapContainerRef}
        className={`cxo-map-wrapper${isFullscreen ? ' cxo-map-fullscreen' : ''}`}
      >
        {isFullscreen && (
          <button className="cxo-map-exit-fs" onClick={toggleFullscreen}>
            <i className="fas fa-times" /> Exit
          </button>
        )}
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={8}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
          className="cxo-leaflet-map"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <FitBounds locations={globalLocations} />
          {globalLocations.map((loc) => (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={loc.id === 'houston' || loc.id === 'spring' ? 10 : 7}
              pathOptions={{
                color: statusColors[loc.status] || '#4CAF50',
                fillColor: statusColors[loc.status] || '#4CAF50',
                fillOpacity: 0.75,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -12]} className="cxo-map-tooltip" permanent={false} sticky={true}>
                <div className="cxo-tooltip-inner">
                  <div className="cxo-tooltip-name">{loc.name}</div>
                  <div className="cxo-tooltip-region">{loc.region}</div>
                </div>
              </Tooltip>
              <Popup className="cxo-map-popup" maxWidth={280} closeButton={true}>
                <div className="cxo-popup-content">
                  <div className="cxo-popup-header">
                    <div className="cxo-popup-title">{loc.name} <span className="cxo-ops-text">Office</span></div>
                    <div className="cxo-popup-meta">{loc.type} • {loc.region}</div>
                  </div>
                  
                  <div className="cxo-popup-sep" />
                  
                  <div className="cxo-popup-row">
                    <div className="cxo-popup-icon location"><i className="fas fa-map-pin" /></div>
                    <div className="cxo-popup-label">Location:</div>
                    <div className="cxo-popup-value">{loc.name}</div>
                  </div>

                  <div className="cxo-popup-row">
                    <div className="cxo-popup-icon apps"><i className="fas fa-server" /></div>
                    <div className="cxo-popup-label">Apps Health:</div>
                    <div className="cxo-popup-value" style={{ color: '#4CAF50' }}>{loc.appsHealth}</div>
                  </div>

                  <div className="cxo-popup-row">
                    <div className="cxo-popup-icon infra"><i className="fas fa-network-wired" /></div>
                    <div className="cxo-popup-label">Infrastructure:</div>
                    <div className="cxo-popup-value" style={{ color: '#4CAF50' }}>{loc.infraHealth}</div>
                  </div>

                  <div className="cxo-popup-row">
                    <div className="cxo-popup-icon alert"><i className="fas fa-exclamation-circle" /></div>
                    <div className="cxo-popup-label">Active Alerts:</div>
                    <div className="cxo-popup-value" style={{ color: loc.alerts > 0 ? '#FF9800' : '#4CAF50' }}>{loc.alerts}</div>
                  </div>

                  <div className="cxo-popup-row">
                    <div className="cxo-popup-icon incident"><i className="fas fa-tasks" /></div>
                    <div className="cxo-popup-label">Open Incidents:</div>
                    <div className="cxo-popup-value" style={{ color: loc.incidents > 0 ? '#FF9800' : '#4CAF50' }}>{loc.incidents}</div>
                  </div>

                  <div className="cxo-popup-sep" />

                  <div className={`cxo-popup-status ${loc.status}`}>
                    <i className={`fas fa-${loc.status === 'green' ? 'check-circle' : loc.status === 'amber' ? 'exclamation-triangle' : 'times-circle'}`} />
                    <span>{loc.status === 'green' ? '✓ All Systems Operational' : loc.status === 'amber' ? '⚠ Monitor Required' : '✗ Critical Issues'}</span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* ── Location cards grid ── */}
      <div className="cxo-locations-grid" style={{ marginTop: 20 }}>
        {globalLocations.slice(0, 12).map((loc, i) => (
          <div key={loc.id} className={`cxo-location-card ${loc.status}`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="cxo-loc-header">
              <span className={`cxo-loc-dot ${loc.status}`} />
              <span className="cxo-loc-name">{loc.name}</span>
            </div>
            <div className="cxo-loc-stats">
              <div className="cxo-loc-stat"><span className="cxo-loc-stat-label">Apps</span><span className="cxo-loc-stat-value">{loc.appsHealth}</span></div>
              <div className="cxo-loc-stat"><span className="cxo-loc-stat-label">Infra</span><span className="cxo-loc-stat-value">{loc.infraHealth}</span></div>
              <div className="cxo-loc-stat"><span className="cxo-loc-stat-label">Alerts</span><span className="cxo-loc-stat-value">{loc.alerts}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Regional table ── */}
      <table className="cxo-regional-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Apps Health</th>
            <th>Infra Health</th>
            <th>Active Alerts</th>
            <th>Open Incidents</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {regionalTable.map((r, i) => (
            <tr key={i} style={{ animationDelay: `${i * 50}ms` }}>
              <td><strong>{r.region}</strong></td>
              <td>{r.appsHealth}</td>
              <td>{r.infraHealth}</td>
              <td>{r.alerts}</td>
              <td>{r.incidents}</td>
              <td>
                <span className={`cxo-health-badge ${r.status}`}>
                  <i className={`fas fa-${r.status === 'green' ? 'check-circle' : 'exclamation-triangle'}`} /> {r.statusLabel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Category Health ─── */
function CategoryHealthSection() {
  const [active, setActive] = useState('enterprise');
  const detail = categoryDetails[active];

  return (
    <div className="cxo-category-section">
      <div className="cxo-widget-header" style={{ marginBottom: 12 }}>
        <div className="cxo-widget-title"><i className="fas fa-th-large" /> Category Health by Function</div>
      </div>
      <div className="cxo-category-grid">
        {categoryHealth.map((cat) => (
          <div
            key={cat.id}
            className={`cxo-category-item ${active === cat.id ? 'active' : ''}`}
            onClick={() => setActive(active === cat.id ? null : cat.id)}
          >
            <div className="cxo-category-name">{cat.name}</div>
            <div className="cxo-category-status">
              <span className={`cxo-status-indicator ${cat.status}`} />
              <span style={{ color: cat.color, fontWeight: 700 }}>{cat.statusLabel}</span>
            </div>
          </div>
        ))}
      </div>
      {active && detail && (
        <div className="cxo-category-detail-panel">
          <div className="cxo-detail-header">
            <div className="cxo-detail-title">
              <i className={`fas ${detail.icon}`} /> {categoryHealth.find(c => c.id === active)?.name} — Detailed Metrics
            </div>
            <button className="cxo-close-detail" onClick={() => setActive(null)}>
              <i className="fas fa-times" />
            </button>
          </div>
          {/* Metric boxes */}
          <div className="cxo-detail-metrics-grid">
            {detail.metrics.map((m, i) => (
              <div key={i} className="cxo-metric-box">
                <span className="cxo-metric-label">{m.label}</span>
                <div className="cxo-metric-value">
                  {m.value}
                  <span className={`cxo-metric-trend ${m.trend}`}>
                    {m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* KPI table */}
          <table className="cxo-kpi-table">
            <thead>
              <tr><th>KPI</th><th>Current</th><th>Target</th><th>Status</th><th>Trend</th></tr>
            </thead>
            <tbody>
              {detail.kpis.map((kpi, i) => (
                <tr key={i}>
                  <td style={{ color: '#fff', fontWeight: 500 }}>{kpi.name}</td>
                  <td style={{ color: '#fff', fontWeight: 700 }}>{kpi.value}</td>
                  <td style={{ color: '#888' }}>{kpi.target}</td>
                  <td><span className={`cxo-kpi-status-badge ${kpi.status}`}>{kpi.status.toUpperCase()}</span></td>
                  <td style={{ color: '#888', fontSize: 11 }}>{kpi.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Top Issues ─── */
function TopIssuesCard() {
  const priorityClass = { P1: 'p1', P2: 'p2', P3: 'p3' };
  return (
    <div className="cxo-widget-card">
      <div className="cxo-widget-header">
        <div className="cxo-widget-title"><i className="fas fa-exclamation-circle" /> Top Issues Today</div>
        <span className="cxo-active-badge">{topIssues.length} Active</span>
      </div>
      <div className="cxo-issues-list">
        {topIssues.map((issue, i) => (
          <div key={issue.id} className={`cxo-issue-item ${priorityClass[issue.priority]}`} style={{ animationDelay: `${i * 70}ms` }}>
            <div className="cxo-issue-header">
              <span className="cxo-issue-id">{issue.id}</span>
              <span className={`cxo-issue-priority ${priorityClass[issue.priority]}`}>{issue.priority}</span>
            </div>
            <div className="cxo-issue-title">{issue.title}</div>
            <div className="cxo-issue-meta">
              <span><i className="fas fa-bolt" /> {issue.impact}</span>
              <span><i className="fas fa-user" /> {issue.team}</span>
            </div>
            <div className="cxo-issue-meta">
              <span><i className="fas fa-robot" /> {issue.agentLine}</span>
              <span><i className="fas fa-clock" /> {issue.eta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Week-over-Week Highlights ─── */
function WoWCard() {
  return (
    <div className="cxo-widget-card">
      <div className="cxo-widget-header">
        <div className="cxo-widget-title"><i className="fas fa-chart-line" /> Week-over-Week Highlights</div>
        <span className="cxo-widget-date">{weekOverWeek.dateRange}</span>
      </div>
      <div className="cxo-wow-section">
        <div className="cxo-wow-header improvements"><i className="fas fa-arrow-up" /> IMPROVEMENTS</div>
        {weekOverWeek.improvements.map((item, i) => (
          <div key={i} className="cxo-wow-item improvements">{item}</div>
        ))}
      </div>
      <div className="cxo-wow-section">
        <div className="cxo-wow-header attention"><i className="fas fa-exclamation-triangle" /> ATTENTION REQUIRED</div>
        {weekOverWeek.attention.map((item, i) => (
          <div key={i} className="cxo-wow-item attention">{item}</div>
        ))}
      </div>
      <div className="cxo-wow-section">
        <div className="cxo-wow-header metrics"><i className="fas fa-bullseye" /> KEY METRICS MOVEMENT</div>
        {weekOverWeek.keyMetrics.map((item, i) => (
          <div key={i} className="cxo-wow-item metrics">{item}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Production by Segment ─── */
function ProductionCard() {
  const maxVal = Math.max(...productionData.segments.map(s => s.value));
  return (
    <div className="cxo-widget-card">
      <div className="cxo-widget-header">
        <div className="cxo-widget-title"><i className="fas fa-chart-bar" /> Client Engagements by Practice</div>
        <span className="cxo-widget-date">Total: {productionData.total}</span>
      </div>
      <div className="cxo-production-chart">
        {productionData.segments.map((seg, i) => (
          <div key={i} className="cxo-prod-row" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="cxo-prod-label">{seg.label}</span>
            <div className="cxo-prod-bar-track">
              <div className="cxo-prod-bar-fill" style={{ width: `${(seg.value / maxVal) * 100}%`, background: seg.color }} />
            </div>
            <span className="cxo-prod-value">{seg.value}</span>
            <span className="cxo-prod-pct">({seg.percent}%)</span>
          </div>
        ))}
      </div>
      <div className="cxo-prod-legend">
        {productionData.segments.map((seg, i) => (
          <div key={i} className="cxo-legend-item">
            <span className="cxo-legend-color" style={{ background: seg.color }} />
            <span>{seg.label} ({seg.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AI Agent Foundry Status ─── */
function AgentStatusCard() {
  const totalActive = aiAgentStatus.reduce((a, b) => a + b.active, 0);
  const totalResolved = aiAgentStatus.reduce((a, b) => a + b.resolved, 0);
  return (
    <div className="cxo-widget-card">
      <div className="cxo-widget-header">
        <div className="cxo-widget-title"><i className="fas fa-robot" /> AI Agent Foundry — Active Agents</div>
        <span className="cxo-agent-summary">{totalActive} Active &middot; {totalResolved} Resolved</span>
      </div>
      <div className="cxo-agent-list">
        {aiAgentStatus.map((agent, i) => (
          <div key={i} className="cxo-agent-item" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="cxo-agent-icon"><i className={agent.icon} /></div>
            <span className="cxo-agent-name">{agent.name}</span>
            <div className="cxo-agent-stats">
              <div className="cxo-agent-stat">
                <div className="cxo-agent-stat-value accent">{agent.active}</div>
                <div className="cxo-agent-stat-label">Active</div>
              </div>
              <div className="cxo-agent-stat">
                <div className="cxo-agent-stat-value green">{agent.resolved}</div>
                <div className="cxo-agent-stat-label">Resolved</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================================================================
   MAIN COMPONENT
   =========================================================================== */
export default function CXOCommandCenter() {
  const now = useLiveClock();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="cxo-page">
      {/* ── Page Header ── */}
      <div className="cxo-page-header">
        <div>
          <h1 className="cxo-page-title">
            <i className="fas fa-chart-line" style={{ color: '#006734' }} />
            Infosys IT Command Center
          </h1>
          <p className="cxo-page-subtitle">
            Real-time global IT systems health &amp; performance monitoring &bull; Last updated: <span className="cxo-live-pulse">Live</span> ({timeStr})
          </p>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="cxo-kpi-row">
        {cxoKPIs.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* ── Main 2-column layout ── */}
      <div className="cxo-main-grid">
        {/* Left – Global Operations + Category Health */}
        <div className="cxo-main-left">
          <RegionalTableSection />
          <CategoryHealthSection />
        </div>

        {/* Right – Issues & WoW */}
        <div className="cxo-main-right">
          <TopIssuesCard />
          <WoWCard />
        </div>
      </div>

      {/* ── Bottom 2-column: Production + Agents ── */}
      <div className="cxo-bottom-grid">
        <ProductionCard />
        <AgentStatusCard />
      </div>
    </div>
  );
}
