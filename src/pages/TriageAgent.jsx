import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  metricsConfig,
  filterTabs,
  decisionIcons,
  priorityColors,
  getComplexityColor,
  getComplexityLabel,
  REFRESH_INTERVAL,
  TICKETS_JSON_URL,
} from '../data/triageData';
import { executeTriage, TRIAGE_STEPS, createInitialSteps, getDebugTrace } from '../services/triageEngine';
import '../styles/triage-agent.css';

/* 
   Sub-components
    */

/* ── Debug Trace Panel ──────────────────────────────────── */
function TriageDebugPanel({ trace, triageResults, onClose }) {
  const hasBackend = triageResults?._apiAvailable;
  const hasRCA = !!triageResults?._rca;
  const backendResult = triageResults?._backendResult;
  const errors = (trace || []).filter(e => e.status === 'error' || e.step === 'error');

  if (!trace || trace.length === 0) {
    return (
      <div className="debug-panel">
        <div className="debug-panel-header">
          <h3><i className="fas fa-bug" /> Debug Trace</h3>
          <button className="debug-close-btn" onClick={onClose}><i className="fas fa-times" /></button>
        </div>
        <div className="debug-panel-body">
          <div className="debug-empty">
            <i className="fas fa-terminal" />
            <span>No trace data — run a triage first</span>
          </div>
        </div>
      </div>
    );
  }

  // Group trace entries by step
  const grouped = {};
  trace.forEach((entry) => {
    const key = entry.step;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  });

  const stepIcons = {
    api_health: 'fa-heartbeat',
    api_call: 'fa-satellite-dish',
    category: 'fa-sitemap',
    kb_search: 'fa-search',
    complexity: 'fa-tachometer-alt',
    assignment: 'fa-gavel',
    executor: 'fa-bolt',
    search_queries: 'fa-magic',
    snow_kb: 'fa-snowflake',
    snow_resolved: 'fa-history',
    local_knowledge: 'fa-folder-open',
    local_tickets: 'fa-archive',
    knowledge_summary: 'fa-layer-group',
    llm_prompt: 'fa-file-code',
    llm_call: 'fa-brain',
    llm_response: 'fa-robot',
    llm_citation: 'fa-quote-left',
    llm_result: 'fa-magic',
    snow_update: 'fa-cloud-upload-alt',
    error: 'fa-exclamation-triangle',
    backend: 'fa-server',
  };

  const stepLabels = {
    api_health: 'API Health Check',
    api_call: 'Backend Agent Call',
    category: 'Category Detection',
    kb_search: 'KB Search (Client)',
    complexity: 'Complexity Calculation',
    assignment: 'Assignment Decision',
    executor: 'Triage Executor',
    search_queries: 'LLM Search Query Generation',
    snow_kb: 'SNOW KB Articles (API)',
    snow_resolved: 'SNOW Resolved Incidents (API)',
    local_knowledge: 'Local Knowledge Docs',
    local_tickets: 'Local Ticket History',
    knowledge_summary: 'Knowledge Context Assembly',
    llm_prompt: 'LLM Prompt (System + User)',
    llm_call: 'LLM Call (Copilot CLI)',
    llm_response: 'LLM Response (Raw)',
    llm_citation: 'LLM Citations',
    llm_result: 'AI RCA Result',
    snow_update: 'SNOW Incident Update',
    error: 'Errors',
    backend: 'Backend Agent',
  };

  const stepColors = {
    api_health: '#26a69a',
    api_call: '#42a5f5',
    category: '#4fc3f7',
    kb_search: '#81c784',
    complexity: '#ffb74d',
    assignment: '#ce93d8',
    executor: '#e6001f',
    search_queries: '#7c4dff',
    snow_kb: '#29b6f6',
    snow_resolved: '#66bb6a',
    local_knowledge: '#8d6e63',
    local_tickets: '#78909c',
    knowledge_summary: '#26c6da',
    llm_prompt: '#ffa726',
    llm_call: '#ff7043',
    llm_response: '#ab47bc',
    llm_citation: '#9575cd',
    llm_result: '#ab47bc',
    snow_update: '#5c6bc0',
    error: '#ef5350',
    backend: '#546e7a',
  };

  // Ordered step display
  const stepOrder = [
    'executor', 'api_health', 'api_call',
    'category', 'kb_search',
    'search_queries',
    'snow_kb', 'snow_resolved', 'local_knowledge', 'local_tickets',
    'knowledge_summary',
    'llm_prompt', 'llm_call', 'llm_response', 'llm_citation', 'llm_result',
    'complexity', 'assignment',
    'snow_update', 'error', 'backend',
  ];

  const orderedGroups = stepOrder
    .filter(s => grouped[s])
    .map(s => [s, grouped[s]]);
  // Add any remaining groups not in the order
  Object.keys(grouped).forEach(s => {
    if (!stepOrder.includes(s)) orderedGroups.push([s, grouped[s]]);
  });

  return (
    <div className="debug-panel">
      <div className="debug-panel-header">
        <h3><i className="fas fa-bug" /> Debug Trace</h3>
        <span className="debug-count">{trace.length} entries</span>
        <button className="debug-close-btn" onClick={onClose}><i className="fas fa-times" /></button>
      </div>
      <div className="debug-panel-body">
        {/* ── Status Banner ─────────────────────────────── */}
        <div className={`debug-banner ${hasBackend ? 'connected' : 'disconnected'}`}>
          <i className={`fas ${hasBackend ? 'fa-plug' : 'fa-unlink'}`} />
          <span>
            {hasBackend
              ? `Python Agent Connected${hasRCA ? ' — AI RCA Available' : ''}`
              : 'Backend Offline — Client-side engine only'}
          </span>
          {hasBackend && backendResult?.model && (
            <span className="debug-model-badge">{backendResult.model}</span>
          )}
        </div>

        {/* ── Error Summary ─────────────────────────────── */}
        {errors.length > 0 && (
          <div className="debug-error-summary">
            <div className="debug-error-title">
              <i className="fas fa-exclamation-triangle" /> {errors.length} Error{errors.length !== 1 ? 's' : ''} Detected
            </div>
            {errors.map((err, i) => (
              <div key={i} className="debug-error-item">
                <span className="debug-error-step">{stepLabels[err.step] || err.step}</span>
                <span className="debug-error-msg">{err.label}</span>
                {err.data?.error && <pre className="debug-error-detail">{err.data.error}</pre>}
              </div>
            ))}
          </div>
        )}

        {/* ── AI RCA Summary (if available) ─────────────── */}
        {hasRCA && triageResults._rca && (
          <div className="debug-rca-summary">
            <div className="debug-rca-title">
              <i className="fas fa-brain" /> AI Root Cause Analysis
            </div>
            <div className="debug-rca-field">
              <label>Root Cause</label>
              <span>{triageResults._rca.root_cause || 'N/A'}</span>
            </div>
            <div className="debug-rca-field">
              <label>Confidence</label>
              <span className="debug-rca-confidence">
                {typeof triageResults._rca.confidence === 'number'
                  ? `${Math.round(triageResults._rca.confidence * 100)}%`
                  : triageResults._rca.confidence || 'N/A'}
              </span>
            </div>
            {triageResults._rca.recommended_actions?.length > 0 && (
              <div className="debug-rca-field">
                <label>Actions</label>
                <ul className="debug-rca-actions">
                  {triageResults._rca.recommended_actions.slice(0, 4).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {triageResults._rca.citations?.length > 0 && (
              <div className="debug-rca-field">
                <label>Citations</label>
                <ul className="debug-rca-actions">
                  {triageResults._rca.citations.map((c, i) => (
                    <li key={i}>[{c.source_type}] {c.source_id}: {c.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── SNOW Update Status ────────────────────────── */}
        {triageResults && (
          <div className={`debug-banner ${triageResults._snowUpdated ? 'connected' : 'disconnected'}`} style={{ marginTop: 6 }}>
            <i className={`fas ${triageResults._snowUpdated ? 'fa-cloud-upload-alt' : 'fa-cloud'}`} />
            <span>
              {triageResults._snowUpdated
                ? `ServiceNow ${triageResults._ticket?.id || ''} work notes updated via MCP → snow_client`
                : 'ServiceNow work notes not updated (no sys_id or API unavailable)'}
            </span>
          </div>
        )}

        {/* ── Trace Groups ──────────────────────────────── */}
        {orderedGroups.map(([step, entries]) => (
          <div key={step} className="debug-step-group">
            <div className="debug-step-header" style={{ borderLeftColor: stepColors[step] || '#666' }}>
              <i className={`fas ${stepIcons[step] || 'fa-code'}`} style={{ color: stepColors[step] || '#666' }} />
              <span>{stepLabels[step] || step}</span>
              <span className="debug-step-count">{entries.length}</span>
            </div>
            {entries.map((entry, idx) => (
              <div key={idx} className={`debug-trace-entry ${entry.status === 'error' ? 'error' : ''}`}>
                <div className="debug-trace-head">
                  <span className="debug-trace-ts">{entry.ts}</span>
                  <span className="debug-trace-label">{entry.label}</span>
                  {entry.duration_ms && (
                    <span className="debug-trace-duration">{Math.round(entry.duration_ms)}ms</span>
                  )}
                </div>
                {entry.data && (
                  <details className="debug-trace-details">
                    <summary style={{ cursor: 'pointer', fontSize: '0.75rem', color: '#888', padding: '2px 0' }}>
                      <i className="fas fa-chevron-right" style={{ fontSize: '0.6rem', marginRight: 4 }} />
                      Show data ({Object.keys(entry.data).length} fields)
                    </summary>
                    <pre className="debug-trace-data">{JSON.stringify(entry.data, null, 2)}</pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsGrid({ metrics }) {
  return (
    <div className="metrics-grid">
      {metricsConfig.map((m) => (
        <div key={m.key} className={`metric-card ${m.cssClass}`}>
          <div className="metric-icon"><i className={`fas ${m.icon}`} /></div>
          <div className="metric-value">{metrics[m.key]}</div>
          <div className="metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function TicketCard({ ticket, index, isActive, isTriaged, onClick }) {
  return (
    <div
      className={`ticket-card ${isActive ? 'active' : ''} ${isTriaged ? 'triaged' : 'pending'}`}
      onClick={() => onClick(index)}
    >
      <div className="ticket-card-top">
        <span className="tc-id">{ticket.id}</span>
        <span className={`tc-priority ${ticket.priority}`}>{ticket.priority}</span>
      </div>
      <div className="tc-title">{ticket.title}</div>
      <div className="tc-meta">
        <span><i className="fas fa-robot" /> {ticket.agent}</span>
        <span><i className="fas fa-clock" /> {ticket.started}</span>
      </div>
      {isTriaged && (
        <div className={`tc-assignment ${ticket.assignment}`}>
          <i className={`fas ${decisionIcons[ticket.decisionType] || 'fa-robot'}`} /> {ticket.assignTo}
        </div>
      )}
    </div>
  );
}

/*  Dynamic Triage Step — icon & color per step type  */
function DynamicTriageStep({ step, stepIndex }) {
  const stepDef = TRIAGE_STEPS[stepIndex] || TRIAGE_STEPS[0];
  const isActive    = step.status === 'active';
  const isCompleted = step.status === 'completed';
  const isPending   = step.status === 'pending';

  return (
    <div className={`triage-step dynamic-step visible ${step.status}`}>
      <div className="ts-header">
        <div
          className={`ts-icon-dynamic ${step.status}`}
          style={{ '--step-color': step.iconColor || stepDef.iconColor }}
        >
          {isActive ? (
            <div className="triage-spinner" style={{ borderTopColor: step.iconColor || stepDef.iconColor }} />
          ) : (
            <i className={`fas ${step.icon || stepDef.icon}`} />
          )}
        </div>
        <div className="ts-title">
          {step.title || stepDef.title}
          {isActive && <span className="ts-running-label">Processing...</span>}
        </div>
        <div className={`ts-status ${step.status}`}>
          {isActive ? (
            <div className="triage-spinner" />
          ) : isCompleted ? (
            <i className="fas fa-check-circle" />
          ) : null}
        </div>
      </div>
      {(isActive || isCompleted) && step.details && step.details.length > 0 && (
        <div className="ts-body">
          {step.details.map((detail, dIdx) => (
            <div key={dIdx} className={`ts-detail visible ${detail.type || ''}`}>
              <i className={`fas ${detail.icon || 'fa-chevron-right'}`} />
              <span style={{ flex: 1 }}>{detail.text || detail}</span>
              {detail.url && (
                <a href={detail.url} target="_blank" rel="noopener noreferrer" className="ts-detail-link" title={detail.urlLabel || 'Open'}>
                  <i className="fas fa-external-link-alt" /> {detail.urlLabel || 'View'}
                </a>
              )}
              {detail.badge && (
                <span className={`ts-detail-badge ${detail.badgeClass || ''}`}>{detail.badge}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/*  Dynamic Detail Panel — driven by triage engine callbacks  */
function DynamicDetailPanel({ ticket, dynamicSteps, triagePhase, triageResults, showDebugPanel, onToggleDebug, onNavigateToAgent }) {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom during live triage
  useEffect(() => {
    if (triagePhase === 'running' && scrollRef.current) {
      const timer = setTimeout(() => {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [dynamicSteps, triagePhase]);

  if (!ticket) {
    return (
      <div className="detail-panel">
        <div className="detail-panel-header">
          <h2><i className="fas fa-bolt" style={{ color: '#e6001f' }} /> Select a ticket to view triage</h2>
        </div>
        <div className="detail-scroll">
          <div className="empty-detail">
            <i className="fas fa-crosshairs" />
            <span>Click a ticket on the left to view AI triage analysis</span>
          </div>
        </div>
      </div>
    );
  }

  const isComplete = triagePhase === 'complete';
  const isError = triagePhase === 'error';
  const showKB = isComplete && triageResults;
  const showComplexity = isComplete && triageResults;
  const showDecision = isComplete && triageResults;

  const cmColor = triageResults ? getComplexityColor(triageResults.complexity) : '#666';
  const cmLabel = triageResults ? getComplexityLabel(triageResults.complexity) : '';

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <h2>
          <i className="fas fa-bolt" style={{ color: '#e6001f' }} />
          {ticket.id} — Triage Analysis
        </h2>
        {triagePhase === 'running' && (
          <div className="live-triage-badge">
            <div className="triage-spinner" /> Live Triage
          </div>
        )}
        {isComplete && (
          <div className="triage-complete-badge">
            <i className="fas fa-check-circle" /> Complete
          </div>
        )}
        {isError && (
          <div className="triage-error-badge">
            <i className="fas fa-exclamation-triangle" /> Error
          </div>
        )}
        {(isComplete || isError || triagePhase === 'running') && (
          <button
            className={`debug-toggle-btn ${showDebugPanel ? 'active' : ''}`}
            onClick={onToggleDebug}
            title="Toggle Debug Trace Panel"
          >
            <i className="fas fa-bug" />
          </button>
        )}
      </div>
      <div className="detail-scroll" ref={scrollRef}>
        {/* 1. Ticket Details */}
        <div className="detail-section">
          <div className="detail-section-title">
            <i className="fas fa-info-circle" /> Ticket Details
          </div>
          <div className="info-grid">
            <div className="info-item"><label>Ticket ID</label><span>{ticket.id}</span></div>
            <div className="info-item">
              <label>Priority</label>
              <span style={{ color: priorityColors[ticket.priority] || '#fff' }}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
            <div className="info-item"><label>Agent</label><span>{ticket.agent}</span></div>
            <div className="info-item"><label>Started</label><span>{ticket.started}</span></div>
          </div>
        </div>

        {/* 2. AI Triage Workflow — real-time dynamic steps */}
        <div className="detail-section">
          <div className="detail-section-title">
            <i className="fas fa-bolt" /> AI Triage Workflow
            {triagePhase === 'running' && <span className="workflow-live-dot" />}
          </div>
          {dynamicSteps.map((step, sIdx) => (
            <DynamicTriageStep key={sIdx} step={step} stepIndex={sIdx} />
          ))}
        </div>

        {/* 3. Error Display */}
        {isError && triageResults && triageResults.error && (
          <div className="detail-section section-reveal">
            <div className="detail-section-title" style={{ color: '#ff4444' }}>
              <i className="fas fa-exclamation-triangle" /> Triage Agent Error
            </div>
            <div className="triage-error-box">
              <div className="triage-error-icon"><i className="fas fa-times-circle" /></div>
              <div className="triage-error-message">{triageResults.errorMessage}</div>
              <div className="triage-error-hint">Please check the triage agent service connectivity and try again.</div>
            </div>
          </div>
        )}

        {/* 3. Knowledge Base Results (after triage completes) */}
        {showKB && (
          <div className="detail-section section-reveal">
            <div className="detail-section-title">
              <i className="fas fa-brain" /> Knowledge Base Results
            </div>
            {triageResults.kbArticles && triageResults.kbArticles.length > 0 ? (
              <>
                {triageResults.kbArticles.map((kb, i) => (
                  <div key={i} className="past-ticket">
                    <div className="pt-icon kb"><i className="fas fa-file-medical-alt" /></div>
                    <div className="pt-body">
                      <div className="pt-id">{kb.id}</div>
                      <div className="pt-title">
                        {kb.url && kb.url !== '#' ? (
                          <a href={kb.url} target="_blank" rel="noopener noreferrer" className="kb-link">
                            {kb.title} <i className="fas fa-external-link-alt" style={{ fontSize: 10, marginLeft: 4 }} />
                          </a>
                        ) : kb.title}
                      </div>
                      <div className="pt-match"><i className="fas fa-check-circle" /> {kb.relevance}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="ts-detail visible exception" style={{ opacity: 1 }}>
                <i className="fas fa-exclamation-triangle" />
                <span>No matching KB articles — Novel issue</span>
              </div>
            )}
            {triageResults.pastTickets && triageResults.pastTickets.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: '#aaa', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  <i className="fas fa-history" style={{ color: '#e6001f', marginRight: 6 }} /> Similar Past Tickets
                </div>
                {triageResults.pastTickets.map((pt, i) => (
                  <div key={i} className="past-ticket">
                    <div className="pt-icon"><i className="fas fa-ticket-alt" /></div>
                    <div className="pt-body">
                      <div className="pt-id">{pt.id}</div>
                      <div className="pt-title">{pt.title}</div>
                      <div className="pt-match"><i className="fas fa-check-circle" /> {pt.match}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {triageResults.sops && triageResults.sops.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: '#aaa', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  <i className="fas fa-book" style={{ color: '#9C27B0', marginRight: 6 }} /> Mapped SOPs
                </div>
                {triageResults.sops.map((s, i) => (
                  <div key={i} className="past-ticket">
                    <div className="pt-icon sop"><i className="fas fa-book" /></div>
                    <div className="pt-body">
                      <div className="pt-id">{s.id}</div>
                      <div className="pt-title">{s.title}</div>
                      <div className="pt-match"><span className="sop-link"><i className="fas fa-link" /> SOP Mapped</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Complexity Score */}
        {showComplexity && (
          <div className="detail-section section-reveal">
            <div className="detail-section-title">
              <i className="fas fa-tachometer-alt" /> Complexity Score
            </div>
            <div className="complexity-meter">
              <div className="cm-bar-wrap">
                <div className="cm-bar">
                  <div className="cm-fill" style={{ width: `${triageResults.complexity * 10}%`, background: cmColor }} />
                </div>
                <div className="cm-label">{cmLabel} complexity</div>
              </div>
              <div className="cm-score" style={{ color: cmColor }}>{triageResults.complexity}</div>
            </div>
            {triageResults.complexityFactors && (
              <div className="complexity-factors">
                {triageResults.complexityFactors.map((f, i) => (
                  <div key={i} className="complexity-factor">
                    <i className={`fas ${f.icon || 'fa-info-circle'}`} />
                    <span className="cf-name">{f.name}</span>
                    <span className="cf-value">{f.value}</span>
                    <span className={`cf-contrib ${f.contribution > 0 ? 'positive' : f.contribution < 0 ? 'negative' : ''}`}>
                      {f.contribution > 0 ? `+${f.contribution}` : f.contribution}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. Triage Decision */}
        {showDecision && (
          <div className="detail-section section-reveal">
            <div className="detail-section-title">
              <i className="fas fa-gavel" /> Triage Decision
            </div>
            <div className="decision-box">
              <div className={`decision-badge ${triageResults.decisionType}`}>
                <i className={`fas ${decisionIcons[triageResults.decisionType] || 'fa-robot'}`} />
                {triageResults.decisionLabel}
              </div>
              <div className="decision-params">
                {triageResults.decisionParams.map((p, i) => (
                  <span key={i} className="decision-param">{p}</span>
                ))}
              </div>
              {triageResults.assignment === 'analyst' && (
                <div className="human-loop-notice">
                  <i className="fas fa-user-shield" />
                  <span>Human-in-Loop: Expert review required — complexity {triageResults.complexity}/10 exceeds threshold</span>
                </div>
              )}
              {triageResults.executionRoute && (
                <div
                  className="decision-agent-link"
                  onClick={() => onNavigateToAgent && onNavigateToAgent(triageResults)}
                  title={`Open ${triageResults.executionAgentName || 'Agent'} execution page`}
                >
                  <i className="fas fa-external-link-alt" />
                  <span>Open {triageResults.executionAgentName || triageResults.assignTo}</span>
                  <i className="fas fa-chevron-right" style={{ marginLeft: 'auto', opacity: 0.6 }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 
   Main Triage Agent Page
    */

export default function TriageAgent() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [filter, setFilter] = useState('all');
  const [triagedSet, setTriagedSet] = useState(new Set());
  const [metrics, setMetrics] = useState({
    total: 0, triaged: 0, pending: 0, agent: 0, analyst: 0, auto: 0,
  });
  const [refreshState, setRefreshState] = useState({ visible: false, message: '', hasNew: false });

  // Dynamic triage engine state
  const [dynamicSteps, setDynamicSteps] = useState(createInitialSteps());
  const [triagePhase, setTriagePhase] = useState('idle');
  const [triageResults, setTriageResults] = useState(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const ticketsRef = useRef([]);
  const triagedSetRef = useRef(new Set());
  const abortRef = useRef(null);
  const triageHistoryRef = useRef({});
  const refreshTimerRef = useRef(null);

  // Keep refs in sync
  useEffect(() => { ticketsRef.current = tickets; }, [tickets]);
  useEffect(() => { triagedSetRef.current = triagedSet; }, [triagedSet]);

  // Update metrics whenever triagedSet or tickets change
  useEffect(() => {
    const total = tickets.length;
    const triaged = triagedSet.size;
    let agent = 0, analyst = 0, auto = 0;
    tickets.forEach((t) => {
      if (triagedSet.has(t.id)) {
        if (t.assignment === 'agent') agent++;
        else if (t.assignment === 'analyst') analyst++;
        else if (t.assignment === 'auto') auto++;
      }
    });
    setMetrics({ total, triaged, pending: total - triaged, agent, analyst, auto });
  }, [tickets, triagedSet]);

  // Load tickets on mount
  useEffect(() => {
    fetch(TICKETS_JSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load tickets.json');
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        // Auto-click first ticket after short delay
        setTimeout(() => handleTicketClick(0, data), 800);
      })
      .catch((err) => {
        console.error('Error loading tickets:', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh timer
  useEffect(() => {
    refreshTimerRef.current = setInterval(() => {
      autoRefresh();
    }, REFRESH_INTERVAL);
    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const showRefreshIndicator = useCallback((msg, hasNew = false) => {
    setRefreshState({ visible: true, message: msg, hasNew });
  }, []);

  const hideRefreshIndicator = useCallback(() => {
    setRefreshState((prev) => ({ ...prev, visible: false }));
  }, []);

  const autoRefresh = useCallback(() => {
    showRefreshIndicator('Checking for new tickets...');
    fetch(TICKETS_JSON_URL + '?t=' + Date.now())
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((data) => {
        const existingIds = new Set(ticketsRef.current.map((t) => t.id));
        const newIds = data.filter((t) => !existingIds.has(t.id)).map((t) => t.id);

        setTickets(data);

        if (newIds.length > 0) {
          showRefreshIndicator(
            `${newIds.length} new ticket${newIds.length > 1 ? 's' : ''} added`,
            true
          );
          setTimeout(hideRefreshIndicator, 3000);
        } else {
          showRefreshIndicator('Up to date  no new tickets');
          setTimeout(hideRefreshIndicator, 1500);
        }
      })
      .catch(() => {
        showRefreshIndicator('Refresh failed  retrying...');
        setTimeout(hideRefreshIndicator, 2000);
      });
  }, [showRefreshIndicator, hideRefreshIndicator]);

  const handleTicketClick = useCallback((idx, ticketList) => {
    const list = ticketList || ticketsRef.current;
    if (idx < 0 || idx >= list.length) return;

    // Cancel any running triage
    if (abortRef.current) abortRef.current.abort();

    setActiveIdx(idx);
    const ticket = list[idx];

    // Reset dynamic state
    setTriagePhase('idle');
    setTriageResults(null);
    setDynamicSteps(createInitialSteps());

    // If already triaged, restore from history or ticket data
    if (triagedSetRef.current.has(ticket.id)) {
      const history = triageHistoryRef.current[ticket.id];
      if (history) {
        setDynamicSteps(history.steps);
        setTriageResults(history.results);
        setTriagePhase('complete');
      } else {
        // Pre-baked ticket — convert existing data to dynamic format
        setTriagePhase('complete');
        setTriageResults({
          kbArticles: (ticket.kbArticles || []).map(kb => ({ ...kb, relevance: kb.relevance || 'Linked' })),
          pastTickets: (ticket.pastTickets || []).map(pt => ({ ...pt, match: pt.match || 'N/A' })),
          sops: ticket.sops || [],
          complexity: ticket.complexity,
          complexityFactors: null,
          assignment: ticket.assignment,
          assignTo: ticket.assignTo,
          decisionType: ticket.decisionType,
          decisionLabel: ticket.decisionLabel,
          decisionParams: ticket.decisionParams || [],
        });
        const converted = (ticket.triageSteps || []).map((s, i) => {
          const def = TRIAGE_STEPS[Math.min(i, TRIAGE_STEPS.length - 1)];
          return {
            ...def,
            title: s.title || def.title,
            status: 'completed',
            details: (s.details || []).map(d => ({ icon: 'fa-check', text: d, type: 'success' })),
          };
        });
        if (converted.length > 0) setDynamicSteps(converted);
        else setDynamicSteps(createInitialSteps().map(s => ({ ...s, status: 'completed' })));
      }
      return;
    }

    // ── Run dynamic triage engine ──────────────────────────
    setTriagePhase('running');
    const controller = new AbortController();
    abortRef.current = controller;

    const callbacks = {
      onStepStart: (stepIdx) => {
        setDynamicSteps(prev => prev.map((s, i) => i === stepIdx ? { ...s, status: 'active' } : s));
      },
      onDetail: (stepIdx, detail) => {
        setDynamicSteps(prev => prev.map((s, i) =>
          i === stepIdx ? { ...s, details: [...s.details, detail] } : s
        ));
      },
      onStepComplete: (stepIdx) => {
        setDynamicSteps(prev => prev.map((s, i) => i === stepIdx ? { ...s, status: 'completed' } : s));
      },
      onTriageComplete: (result) => {
        setTriageResults(result);
        setTriagePhase('complete');

        // Store in history for instant recall
        triageHistoryRef.current[ticket.id] = { steps: result._steps, results: result };

        // Update ticket data in state
        setTickets(prev => prev.map((t, ti) =>
          ti === idx ? {
            ...t,
            kbArticles: result.kbArticles,
            pastTickets: result.pastTickets,
            sops: result.sops,
            complexity: result.complexity,
            assignment: result.assignment,
            assignTo: result.assignTo,
            decisionType: result.decisionType,
            decisionLabel: result.decisionLabel,
            decisionParams: result.decisionParams,
          } : t
        ));

        // Mark as triaged
        setTriagedSet(prev => {
          const next = new Set(prev);
          next.add(ticket.id);
          return next;
        });
      },
    };

    executeTriage(ticket, list, callbacks, controller.signal).catch(err => {
      if (err.message === 'Cancelled') return;
      console.error('[Triage] Engine error:', err);
      // Show error state in the UI
      setTriagePhase('error');
      setTriageResults({
        error: true,
        errorMessage: `Unable to execute triage agent: ${err.message || 'Unknown error'}`,
        kbArticles: [],
        pastTickets: [],
        sops: [],
        complexity: 0,
        complexityFactors: null,
        assignment: 'unknown',
        assignTo: 'Unassigned',
        decisionType: 'error',
        decisionLabel: 'Triage Failed',
        decisionParams: ['Error during triage execution'],
      });
    });
  }, []);

  const activeTicket = activeIdx >= 0 && activeIdx < tickets.length ? tickets[activeIdx] : null;

  // Filter tickets
  const filteredTickets = tickets.map((t, i) => ({ ticket: t, originalIndex: i })).filter(({ ticket }) => {
    if (filter === 'all') return true;
    if (filter === 'triaged') return triagedSet.has(ticket.id);
    if (filter === 'pending') return !triagedSet.has(ticket.id);
    return true;
  });

  return (
    <div className="triage-page">
      {/* Refresh indicator */}
      <div className={`refresh-indicator ${refreshState.visible ? 'visible' : ''} ${refreshState.hasNew ? 'has-new' : ''}`}>
        <div className="refresh-spinner" />
        <span>{refreshState.message}</span>
      </div>

      {/* Title Bar */}
      <div className="page-title-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="back-link" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left" /> Back
          </button>
          <h1><i className="fas fa-bolt" /> AI Triage Agent</h1>
        </div>
        <div className="title-badge">
          <i className="fas fa-circle" /> Live Triage Engine Active
        </div>
      </div>

      {/* Metrics */}
      <MetricsGrid metrics={metrics} />

      {/* Main layout */}
      <div className="triage-container">
        {/* Left: Ticket List */}
        <div className="ticket-list-panel">
          <div className="ticket-list-header">
            <h3><i className="fas fa-list-ul" /> Incident Queue</h3>
            <div className="filter-tabs">
              {filterTabs.map((f) => (
                <div
                  key={f.key}
                  className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          </div>
          <div className="ticket-scroll">
            {filteredTickets.map(({ ticket, originalIndex }) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                index={originalIndex}
                isActive={activeIdx === originalIndex}
                isTriaged={triagedSet.has(ticket.id)}
                onClick={handleTicketClick}
              />
            ))}
          </div>
        </div>

        {/* Right: Dynamic Detail Panel */}
        <DynamicDetailPanel
          ticket={activeTicket}
          dynamicSteps={dynamicSteps}
          triagePhase={triagePhase}
          triageResults={triageResults}
          showDebugPanel={showDebugPanel}
          onToggleDebug={() => setShowDebugPanel(prev => !prev)}
          onNavigateToAgent={(results) => {
            if (results.executionRoute) {
              navigate(results.executionRoute, {
                state: {
                  fromTriage: true,
                  ticket: results._ticket || { id: activeTicket?.id, title: activeTicket?.title, priority: activeTicket?.priority, enrichment: activeTicket?.enrichment, agent: activeTicket?.agent, started: activeTicket?.started },
                  complexity: results.complexity,
                  kbArticles: results.kbArticles,
                },
              });
            }
          }}
        />

        {/* Debug Trace Panel (slide-out) */}
        {showDebugPanel && (
          <TriageDebugPanel
            trace={triageResults?._debugTrace || getDebugTrace()}
            triageResults={triageResults}
            onClose={() => setShowDebugPanel(false)}
          />
        )}
      </div>
    </div>
  );
}
