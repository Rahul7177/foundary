import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/agentExecution.css';

/* ═══════════════════════════════════════════════════════════════════
   Reusable: DetailItem — single sub-item inside a step
   ═══════════════════════════════════════════════════════════════════ */
function DetailItem({ icon, text, state }) {
  return (
    <div className={`ae-detail-item ${state}`}>
      <i className={`${icon} ae-detail-icon`} />
      <span className="ae-detail-text">{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: StepCard — one execution step with animated sub-items
   ═══════════════════════════════════════════════════════════════════ */
function StepCard({ step, stepIndex, state, visibleDetails, activeDetailIdx }) {
  const ref = useRef(null);

  useEffect(() => {
    if (state === 'active' && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [state]);

  return (
    <div ref={ref} className={`ae-step ${state === 'active' ? 'active visible' : state === 'completed' ? 'completed visible' : state === 'pending-visible' ? 'visible' : ''}`}>
      <div className="ae-step-header">
        <div className="ae-step-num">{stepIndex + 1}</div>
        <div className="ae-step-title">{step.title}</div>
        <div className={`ae-step-indicator ${state === 'active' ? 'thinking' : state === 'completed' ? 'done' : ''}`}>
          {state === 'active' && <><div className="ae-spinner" /><span>AI Thinking...</span></>}
          {state === 'completed' && <i className="fas fa-check-circle" style={{ fontSize: '1.1rem' }} />}
        </div>
      </div>
      {step.description && <div className="ae-step-desc">{step.description}</div>}
      <div className="ae-step-details">
        {step.details.slice(0, visibleDetails).map((d, i) => (
          <DetailItem
            key={i}
            icon={d.icon}
            text={d.text}
            state={i === activeDetailIdx && state === 'active' ? 'visible active' : i < visibleDetails ? 'visible done' : ''}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: ProgressBar
   ═══════════════════════════════════════════════════════════════════ */
function ProgressBar({ percent }) {
  return (
    <div>
      <div className="ae-progress-track">
        <div className="ae-progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="ae-progress-text">{percent}% Complete</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Reusable: ToolTags — MCP tools with active highlighting
   ═══════════════════════════════════════════════════════════════════ */
function ToolTags({ tools, activeTools }) {
  return (
    <div className="ae-tools-list">
      {tools.map((t, i) => (
        <span key={i} className={`ae-tool-tag${activeTools.includes(t) ? ' active' : ''}`}>{t}</span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main: AgentExecution — the full execution page
   Props:
     agentConfig: { title, runId, startedAt, priority, trigger: {ticket, issueType, affectedSystem, triggeredBy}, relatedIncidents: [], tools: [] }
     steps: [{ title, description, details: [{icon, text}] }]
     stepDelay?: ms between steps (default 1500)
     detailDelay?: ms between details (default 600)
   ═══════════════════════════════════════════════════════════════════ */
export default function AgentExecution({ agentConfig, steps, stepDelay = 1500, detailDelay = 600 }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
  const [detailCounts, setDetailCounts] = useState({}); // stepIdx -> number of visible details
  const [activeDetailIdx, setActiveDetailIdx] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);
  const detailTimerRef = useRef(null);

  const totalSteps = steps.length;
  const progress = isComplete ? 100 : totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  /* Detect which MCP tools are "active" based on current step details */
  const activeTools = useMemo(() => {
    if (currentStep < 0 || currentStep >= totalSteps) return [];
    const step = steps[currentStep];
    const visCount = detailCounts[currentStep] || 0;
    const activeTexts = step.details.slice(0, visCount).map(d => d.text.toLowerCase());
    return (agentConfig.tools || []).filter(tool =>
      activeTexts.some(t => t.includes(tool.toLowerCase().replace(' mcp', '').split(' ')[0].toLowerCase()))
    );
  }, [currentStep, detailCounts, steps, agentConfig.tools, totalSteps]);

  /* Process details one by one for the current step */
  const processDetails = useCallback((stepIdx) => {
    const step = steps[stepIdx];
    if (!step) return;

    let idx = 0;
    const tick = () => {
      if (idx >= step.details.length) {
        // Step complete
        setActiveDetailIdx(-1);
        setTimeout(() => {
          // Move to next step
          const nextStep = stepIdx + 1;
          if (nextStep >= totalSteps) {
            setIsComplete(true);
            setCurrentStep(totalSteps); // past last
          } else {
            setCurrentStep(nextStep);
          }
        }, 800);
        return;
      }
      setActiveDetailIdx(idx);
      setDetailCounts(prev => ({ ...prev, [stepIdx]: idx + 1 }));
      idx++;
      detailTimerRef.current = setTimeout(tick, detailDelay);
    };
    // Start after "thinking" delay
    timerRef.current = setTimeout(tick, stepDelay);
  }, [steps, totalSteps, stepDelay, detailDelay]);

  /* When currentStep changes, begin processing that step's details */
  useEffect(() => {
    if (currentStep >= 0 && currentStep < totalSteps) {
      processDetails(currentStep);
    }
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(detailTimerRef.current);
    };
  }, [currentStep, processDetails, totalSteps]);

  /* Auto-start on mount */
  useEffect(() => {
    const t = setTimeout(() => setCurrentStep(0), 800);
    return () => clearTimeout(t);
  }, []);

  const getStepState = (idx) => {
    if (idx < currentStep) return 'completed';
    if (idx === currentStep && !isComplete) return 'active';
    if (idx === currentStep + 1 && !isComplete) return 'pending-visible';
    return 'hidden';
  };

  return (
    <div className="ae-page">
      <button className="ae-back" onClick={() => navigate(-1)}>
        <i className="fas fa-arrow-left" /> Back
      </button>

      <div className="ae-card">
        <div className="ae-header">
          <h1 className="ae-title">{agentConfig.title}</h1>
          <div className={`ae-status-badge ${isComplete ? 'completed' : 'processing'}`}>
            {isComplete
              ? <><i className="fas fa-check-circle" /> Task Completed</>
              : <><i className="fas fa-spinner fa-spin" /> Processing...</>}
          </div>
        </div>

        <div className="ae-layout">
          {/* ── Sidebar ── */}
          <div className="ae-sidebar">
            <div className="ae-sidebar-section">
              <h3>Run Information</h3>
              <div className="ae-detail-row">
                <span className="ae-detail-label">Run ID</span>
                <span className="ae-detail-value">{agentConfig.runId}</span>
              </div>
              <div className="ae-detail-row">
                <span className="ae-detail-label">Started</span>
                <span className="ae-detail-value">{agentConfig.startedAt || 'Just now'}</span>
              </div>
              <div className="ae-detail-row">
                <span className="ae-detail-label">Status</span>
                <span className={`ae-detail-value ${isComplete ? 'status-completed' : 'status-active'}`}>
                  {isComplete ? 'Completed' : 'Active'}
                </span>
              </div>
              <div className="ae-detail-row">
                <span className="ae-detail-label">Priority</span>
                <span className={`ae-detail-value priority-${agentConfig.priority || 'high'}`}>
                  {(agentConfig.priority || 'High').charAt(0).toUpperCase() + (agentConfig.priority || 'high').slice(1)}
                </span>
              </div>
            </div>

            {agentConfig.trigger && (
              <div className="ae-sidebar-section">
                <h3>Trigger Details</h3>
                {agentConfig.trigger.ticket && (
                  <div className="ae-detail-row">
                    <span className="ae-detail-label">Ticket</span>
                    <span className="ae-detail-value">{agentConfig.trigger.ticket}</span>
                  </div>
                )}
                {agentConfig.trigger.issueType && (
                  <div className="ae-detail-row">
                    <span className="ae-detail-label">Issue Type</span>
                    <span className="ae-detail-value">{agentConfig.trigger.issueType}</span>
                  </div>
                )}
                {agentConfig.trigger.affectedSystem && (
                  <div className="ae-detail-row">
                    <span className="ae-detail-label">Affected System</span>
                    <span className="ae-detail-value">{agentConfig.trigger.affectedSystem}</span>
                  </div>
                )}
                {agentConfig.trigger.triggeredBy && (
                  <div className="ae-detail-row">
                    <span className="ae-detail-label">Triggered By</span>
                    <span className="ae-detail-value">{agentConfig.trigger.triggeredBy}</span>
                  </div>
                )}
              </div>
            )}

            <div className="ae-sidebar-section">
              <h3>Progress</h3>
              <ProgressBar percent={progress} />
            </div>

            {agentConfig.tools && agentConfig.tools.length > 0 && (
              <div className="ae-sidebar-section">
                <h3>MCP Tools</h3>
                <ToolTags tools={agentConfig.tools} activeTools={activeTools} />
              </div>
            )}

            {agentConfig.relatedIncidents && agentConfig.relatedIncidents.length > 0 && (
              <div className="ae-sidebar-section">
                <h3>Related Incidents</h3>
                <select className="ae-incident-select" defaultValue={agentConfig.relatedIncidents[0]?.id}>
                  {agentConfig.relatedIncidents.map((inc) => (
                    <option key={inc.id} value={inc.id}>{inc.id} - {inc.label}</option>
                  ))}
                </select>
              </div>
            )}

            {agentConfig.agents && agentConfig.agents.length > 0 && (
              <div className="ae-sidebar-section">
                <h3><i className="fas fa-robot" style={{ marginRight: 6, fontSize: '0.85rem' }} />Active Agents</h3>
                <div className="ae-agents-list">
                  {agentConfig.agents.map((a, i) => (
                    <span key={i} className="ae-agent-chip">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {agentConfig.knowledgeSources && agentConfig.knowledgeSources.length > 0 && (
              <div className="ae-sidebar-section">
                <h3><i className="fas fa-book" style={{ marginRight: 6, fontSize: '0.85rem' }} />Knowledge Sources</h3>
                <div className="ae-knowledge-list">
                  {agentConfig.knowledgeSources.map((k, i) => (
                    <div key={i} className="ae-knowledge-item">
                      <i className="fas fa-database" style={{ color: '#0ea5e9', marginRight: 6, fontSize: '0.7rem' }} />
                      {k}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Timeline ── */}
          <div className="ae-timeline">
            {steps.map((step, idx) => (
              <StepCard
                key={idx}
                step={step}
                stepIndex={idx}
                state={getStepState(idx)}
                visibleDetails={detailCounts[idx] || 0}
                activeDetailIdx={getStepState(idx) === 'active' ? activeDetailIdx : -1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
