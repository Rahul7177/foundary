import { useMemo } from 'react';
import { calendarEvents } from '../../data/dashboardData';

const TIME_SLOTS = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const CATEGORIES = ['Notifications', 'Inbox', 'Meetings', 'Blocking', 'My Activities'];

const EVENT_TYPE_COLORS = {
  incident: '#ef4444',
  approval: '#8b5cf6',
  service: '#0ea5e9',
  'task-inc': '#06b6d4',
  'task-inc2': '#06b6d4',
  meeting: '#06b6d4',
  executive: '#06b6d4',
  'executive-st': '#8b5cf6',
  lunch: '#666',
  'task-inc-activity': '#06b6d4',
  'task-inc3': '#06b6d4',
};

export default function MyPlan() {
  const eventsByCategory = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((cat) => (map[cat] = []));
    calendarEvents.forEach((ev) => {
      if (map[ev.category]) map[ev.category].push(ev);
    });
    return map;
  }, []);

  return (
    <div className="plans-section">
      <div className="plans-header">
        <h3>My Plan</h3>
        <span className="ai-badge"><i className="fas fa-wand-magic-sparkles" style={{ marginRight: 4 }} /> AI Schedule</span>
      </div>

      <div className="calendar-view">
        <div className="calendar-header">
          <div />
          {TIME_SLOTS.map((t) => (
            <div key={t}>{t}</div>
          ))}
        </div>
        {CATEGORIES.map((cat) => (
          <div className="calendar-row" key={cat}>
            <div className="category-cell">{cat}</div>
            {TIME_SLOTS.map((_, colIdx) => {
              const ev = eventsByCategory[cat].find((e) => e.col === colIdx + 1);
              return (
                <div className="time-cell" key={colIdx}>
                  {ev && (
                    <div
                      className="calendar-event"
                      style={{ background: EVENT_TYPE_COLORS[ev.type] || '#8b5cf6' }}
                      title={ev.label}
                    >
                      {ev.label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="plans-analysis">
        <div className="analysis-icon">
          <i className="fas fa-lightbulb" />
        </div>
        <div className="analysis-content">
          <div className="analysis-title">AI Day Analysis</div>
          <p>
            Your day includes 4 critical incidents and 2 executive meetings.
            Consider delegating the P3 incident to the NOC agent to free up
            30 minutes for your strategy session preparation.
          </p>
        </div>
      </div>
    </div>
  );
}
