import { useState, useEffect, useCallback } from 'react';

const STAGES = [
  'Initializing AI Agent...',
  'Connecting to MCP servers...',
  'Loading knowledge base...',
  'Running diagnostics...',
  'Generating response...',
  'Finalizing...',
];

export default function ProcessingOverlay({ visible, onComplete }) {
  const [stageIdx, setStageIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setStageIdx(0);
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [visible, onComplete]);

  useEffect(() => {
    if (!visible) return;
    const idx = Math.min(Math.floor(progress / (100 / STAGES.length)), STAGES.length - 1);
    setStageIdx(idx);
  }, [progress, visible]);

  if (!visible) return null;

  return (
    <div className="processing-overlay">
      <div className="processing-container">
        <div className="spinner-lg" />
        <div className="processing-stage">{STAGES[stageIdx]}</div>
        <div className="processing-progress">
          <div className="processing-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div style={{ color: '#999', fontSize: 12 }}>{progress}% complete</div>
      </div>
    </div>
  );
}
