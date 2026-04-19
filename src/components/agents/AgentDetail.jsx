import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { agentTableData, agentDetails } from '../../data/agentsData';
import ProcessingOverlay from '../common/ProcessingOverlay';

function findAgentById(id) {
  for (const category of Object.values(agentTableData)) {
    const found = category.find((a) => a.id === id);
    if (found) return found;
  }
  return null;
}

export default function AgentDetail() {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);

  const agent = useMemo(() => findAgentById(agentId), [agentId]);
  const detail = useMemo(() => agentDetails?.[agentId] || null, [agentId]);

  const handleProcessingComplete = useCallback(() => {
    setShowProcessing(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    setShowProcessing(true);
    setLoading(true);
  }, [agentId]);

  if (!agent) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2 style={{ color: '#fff' }}>Agent Not Found</h2>
        <p style={{ color: '#999' }}>The agent &quot;{agentId}&quot; does not exist.</p>
        <button className="new-agent-btn" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left" style={{ marginRight: 6 }} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <ProcessingOverlay visible={showProcessing} onComplete={handleProcessingComplete} />

      <div className="operational-dashboard" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        {/* Back Navigation */}
        <div style={{ marginBottom: 20 }}>
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left" /> Back to Dashboard
          </button>
        </div>

        {/* Agent Header */}
        <div style={{
          background: '#2d2d2d',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <div style={{
            width: 64,
            height: 64,
            background: '#e6001f',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: '#fff',
          }}>
            <i className="fas fa-robot" />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 }}>{agent.name}</h1>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: '#999' }}>
              <span><i className="fas fa-calendar" style={{ marginRight: 4 }} />{agent.date}</span>
              <span><i className="fas fa-clock" style={{ marginRight: 4 }} />{agent.time}</span>
              <span><i className="fas fa-bolt" style={{ marginRight: 4 }} />{agent.trigger}</span>
              <span className={`priority ${agent.priority}`}>
                {agent.priority.charAt(0).toUpperCase() + agent.priority.slice(1)}
              </span>
            </div>
          </div>
          <div>
            <span className={`status-dot ${agent.status}`} style={{ width: 12, height: 12 }} />
            <span style={{ color: '#fff', marginLeft: 6 }}>
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Tools */}
        <div style={{
          background: '#2d2d2d',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
        }}>
          <h3 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: 16 }}>
            <i className="fas fa-plug" style={{ marginRight: 8, color: '#8b5cf6' }} />
            Connected MCP Tools
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {agent.tools.map((tool, i) => (
              <span key={i} className="ai-badge" style={{ fontSize: 13, padding: '6px 14px' }}>
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {detail && (
          <div style={{
            background: '#2d2d2d',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: 16 }}>
              <i className="fas fa-info-circle" style={{ marginRight: 8, color: '#0ea5e9' }} />
              Agent Description
            </h3>
            <p style={{ color: '#ccc', lineHeight: 1.6, margin: 0 }}>{detail.description}</p>
          </div>
        )}

        {/* Capabilities */}
        {detail?.capabilities && (
          <div style={{
            background: '#2d2d2d',
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: 16 }}>
              <i className="fas fa-star" style={{ marginRight: 8, color: '#fbbf24' }} />
              Capabilities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
              {detail.capabilities.map((cap, i) => (
                <div key={i} style={{
                  background: '#232323',
                  borderRadius: 8,
                  padding: '10px 14px',
                  color: '#ccc',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <i className="fas fa-check-circle" style={{ color: '#4ade80' }} />
                  {cap}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {detail?.recentActivity && (
          <div style={{
            background: '#2d2d2d',
            borderRadius: 16,
            padding: 20,
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: 16 }}>
              <i className="fas fa-history" style={{ marginRight: 8, color: '#e6001f' }} />
              Recent Activity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {detail.recentActivity.map((activity, i) => (
                <div key={i} style={{
                  background: '#232323',
                  borderRadius: 8,
                  padding: '10px 14px',
                  borderLeft: '3px solid #8b5cf6',
                  color: '#ccc',
                  fontSize: 13,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{activity.action}</span>
                    <span style={{ color: '#666', fontSize: 11 }}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
