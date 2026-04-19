import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  portfolioMetrics,
  portfolioCategories,
  portfolioTimePeriods,
  portfolioViewModes,
  portfolioTableColumns,
  portfolioSummaryData,
} from '../data/portfolioData';
import '../styles/portfolio.css';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/* ═══════════════════════════════════════════════════════════════════
   Utility: format numbers
   ═══════════════════════════════════════════════════════════════════ */
function fmt(val, format) {
  if (format === 'compact') {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`;
  }
  return val.toLocaleString();
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: AnimatedNumber — counts up on mount
   ═══════════════════════════════════════════════════════════════════ */
function AnimatedNumber({ target, duration = 1200, format = 'number' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return <>{fmt(display, format)}</>;
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: MiniSparkline SVG
   ═══════════════════════════════════════════════════════════════════ */
function MiniSparkline({ seed = 0, color = '#006734' }) {
  const points = useMemo(() => {
    const pts = [];
    let y = 20 + (seed * 7) % 10;
    for (let i = 0; i <= 8; i++) {
      y = Math.max(4, Math.min(28, y + ((seed * (i + 1) * 37) % 13) - 6));
      pts.push(`${i * 12.5},${32 - y}`);
    }
    return pts.join(' ');
  }, [seed]);

  return (
    <div className="pf-metric-sparkline">
      <svg viewBox="0 0 100 32" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: MetricCard
   ═══════════════════════════════════════════════════════════════════ */
function MetricCard({ metric, index, highlight }) {
  return (
    <div className={`pf-metric-card${highlight ? ' pf-highlight' : ''}`}>
      <i className={`fas ${metric.icon} pf-metric-icon-corner`} />
      <div className="pf-metric-value">
        <AnimatedNumber target={metric.value} format={metric.format} />
      </div>
      {metric.unit && <div className="pf-metric-unit">{metric.unit}</div>}
      <div className="pf-metric-label">{metric.label}</div>
      <div className="pf-metric-change">
        <i className="fas fa-arrow-up" style={{ fontSize: '0.65rem' }} />
        {metric.change}% yoy
      </div>
      <MiniSparkline seed={index + metric.value} color={highlight ? '#fff' : '#006734'} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: CellBar — mini inline bar chart
   ═══════════════════════════════════════════════════════════════════ */
function CellBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="pf-cell-bar-wrap">
      <span className="pf-num">{value.toLocaleString()}</span>
      <div className="pf-cell-bar">
        <div className="pf-cell-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: ExpandableRow — parent + child rows
   ═══════════════════════════════════════════════════════════════════ */
function ExpandableRow({ row, maxValues, isExpanded, onToggle }) {
  return (
    <>
      <tr
        className={`pf-parent-row${isExpanded ? ' pf-expanded' : ''}`}
        onClick={onToggle}
      >
        <td>
          <button className={`pf-expand-btn${isExpanded ? ' expanded' : ''}`}>
            <i className="fas fa-chevron-right" />
          </button>
        </td>
        <td className="pf-num-highlight">{row.category}</td>
        <td><CellBar value={row.totalHours} max={maxValues.totalHours} /></td>
        <td className="pf-num">{row.totalTokens.toLocaleString()}</td>
        <td className="pf-num">{row.proactive.toLocaleString()}</td>
        <td className="pf-num">{row.reactive.toLocaleString()}</td>
        <td className="pf-num">{row.preventive.toLocaleString()}</td>
        <td className="pf-num">{row.tickets.toLocaleString()}</td>
        <td className="pf-num">{row.chatbot.toLocaleString()}</td>
      </tr>
      {isExpanded &&
        row.children.map((child, ci) => (
          <tr key={ci} className="pf-child-row" style={{ animationDelay: `${ci * 0.05}s` }}>
            <td></td>
            <td>
              <span className="pf-child-dot" />
              <span className="pf-child-name">{child.name}</span>
            </td>
            <td className="pf-num">{child.totalHours.toLocaleString()}</td>
            <td className="pf-num">{child.totalTokens.toLocaleString()}</td>
            <td className="pf-num">{child.proactive.toLocaleString()}</td>
            <td className="pf-num">{child.reactive.toLocaleString()}</td>
            <td className="pf-num">{child.preventive.toLocaleString()}</td>
            <td className="pf-num">{child.tickets.toLocaleString()}</td>
            <td className="pf-num">{child.chatbot.toLocaleString()}</td>
          </tr>
        ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main: PortfolioROI
   ═══════════════════════════════════════════════════════════════════ */
export default function PortfolioROI() {
  const [category, setCategory] = useState('business');
  const [timePeriod, setTimePeriod] = useState('year');
  const [viewMode, setViewMode] = useState('list');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  /* — sorted data — */
  const sortedData = useMemo(() => {
    const base = [...portfolioSummaryData];
    if (!sortKey) return base;
    return base.sort((a, b) => {
      const aV = a[sortKey];
      const bV = b[sortKey];
      if (typeof aV === 'number') return sortDir === 'asc' ? aV - bV : bV - aV;
      return sortDir === 'asc'
        ? String(aV).localeCompare(String(bV))
        : String(bV).localeCompare(String(aV));
    });
  }, [sortKey, sortDir]);

  /* — paginated — */
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const pagedData = useMemo(
    () => sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [sortedData, currentPage, pageSize]
  );

  /* — max values for cell bars — */
  const maxValues = useMemo(() => {
    const keys = ['totalHours', 'totalTokens', 'proactive', 'reactive', 'preventive', 'tickets', 'chatbot'];
    const maxes = {};
    keys.forEach((k) => {
      maxes[k] = Math.max(...portfolioSummaryData.map((r) => r[k]));
    });
    return maxes;
  }, []);

  const toggleRow = useCallback((id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSort = useCallback(
    (key) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
      setCurrentPage(1);
    },
    [sortKey]
  );

  const handlePageSizeChange = useCallback((e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  /* — page buttons — */
  const pageButtons = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }, [totalPages]);

  /* — computed totals for display — */
  const totals = useMemo(
    () => ({
      entries: portfolioSummaryData.length,
      fromIdx: (currentPage - 1) * pageSize + 1,
      toIdx: Math.min(currentPage * pageSize, portfolioSummaryData.length),
    }),
    [currentPage, pageSize]
  );

  return (
    <div className="pf-page">
      {/* Breadcrumb */}
      <div className="pf-breadcrumb">
        <div className="pf-breadcrumb-left">
          <i className="fas fa-chevron-right" />
          <span>Categories:</span>
          <span className="pf-crumb-tag">Analytics</span>
          <span>ROI</span>
        </div>
        <div className="pf-breadcrumb-right">
          <i className="fas fa-chart-pie" />
          Portfolio Manager View
        </div>
      </div>

      {/* Section Title */}
      <div className="pf-section-title">
        <span className="pf-live-dot" />
        Overview Of This Month
      </div>

      {/* Metrics Grid */}
      <div className="pf-metrics-grid">
        {portfolioMetrics.map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i} highlight={i === 0} />
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="pf-summary-section">
        <div className="pf-summary-header">
          <div>
            <div className="pf-section-title" style={{ marginBottom: 2 }}>
              Portfolio Summary
            </div>
          </div>
          <div className="pf-controls">
            {/* Category filter */}
            <select
              className="pf-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {portfolioCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Time period */}
            <select
              className="pf-select"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              {portfolioTimePeriods.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* View mode */}
            <select
              className="pf-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              {portfolioViewModes.map((v) => (
                <option key={v.key} value={v.key}>
                  {v.label}
                </option>
              ))}
            </select>

            <button className="pf-apply-btn">Apply</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="pf-table-wrap">
          <table className="pf-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}></th>
                {portfolioTableColumns.map((col) => (
                  <th
                    key={col.key}
                    className={`${col.sortable ? 'sortable' : ''}${sortKey === col.key ? ' sorted' : ''}`}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    {col.label}
                    {col.sortable && (
                      <span className="pf-sort-icon">
                        <i
                          className={`fas ${
                            sortKey === col.key
                              ? sortDir === 'asc'
                                ? 'fa-sort-up'
                                : 'fa-sort-down'
                              : 'fa-sort'
                          }`}
                        />
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody key={`${currentPage}-${sortKey}-${sortDir}`}>
              {pagedData.map((row) => (
                <ExpandableRow
                  key={row.id}
                  row={row}
                  maxValues={maxValues}
                  isExpanded={expandedRows.has(row.id)}
                  onToggle={() => toggleRow(row.id)}
                />
              ))}
              {pagedData.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: 40, color: '#555' }}>
                    <i className="fas fa-chart-pie" style={{ fontSize: '2rem', marginBottom: 8, display: 'block' }} />
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer: pagination + page size */}
        <div className="pf-table-footer">
          <div className="pf-table-footer-left">
            Showing {totals.fromIdx}–{totals.toIdx} of {totals.entries} entries
          </div>
          <div className="pf-table-footer-right">
            <span className="pf-page-size-label">Rows per page</span>
            <select className="pf-select" value={pageSize} onChange={handlePageSizeChange}>
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div className="pf-pagination">
              <button className="pf-page-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage(1)}>‹‹</button>
              <button className="pf-page-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>‹</button>
              {pageButtons.map((p) => (
                <button key={p} className={`pf-page-btn${p === currentPage ? ' active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
              ))}
              <button className="pf-page-btn" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>›</button>
              <button className="pf-page-btn" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(totalPages)}>››</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
