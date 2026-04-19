/**
 * Triage Agent Data Configuration
 * Tickets are loaded from external JSON at runtime via fetch.
 * This file provides config constants and helper functions.
 */

// Metrics card configuration
export const metricsConfig = [
  { key: 'total', label: 'Total Tickets', icon: 'fa-ticket-alt', cssClass: 'mc-total' },
  { key: 'triaged', label: 'Triaged', icon: 'fa-check-double', cssClass: 'mc-triaged' },
  { key: 'pending', label: 'Pending Triage', icon: 'fa-hourglass-half', cssClass: 'mc-pending' },
  { key: 'agent', label: 'Assigned to Agents', icon: 'fa-robot', cssClass: 'mc-agent' },
  { key: 'analyst', label: 'Assigned to Analysts', icon: 'fa-user-tie', cssClass: 'mc-analyst' },
  { key: 'auto', label: 'Auto-Resolved', icon: 'fa-magic', cssClass: 'mc-auto' },
];

// Filter tab configuration
export const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'triaged', label: 'Triaged' },
  { key: 'pending', label: 'Pending' },
];

// Decision type icon mapping
export const decisionIcons = {
  'agent-assign': 'fa-robot',
  'analyst-assign': 'fa-user-tie',
  'auto-resolve': 'fa-magic',
};

// Priority color mapping
export const priorityColors = {
  critical: '#ff6b6b',
  high: '#ffa500',
  medium: '#2196F3',
  low: '#4CAF50',
};

// Complexity color thresholds
export function getComplexityColor(score) {
  if (score >= 8) return '#ff4444';
  if (score >= 6) return '#ffa500';
  return '#4CAF50';
}

export function getComplexityLabel(score) {
  if (score >= 8) return 'HIGH';
  if (score >= 6) return 'MEDIUM';
  return 'LOW';
}



// Auto-refresh interval in milliseconds
export const REFRESH_INTERVAL = 15000;

// Ticket data URL (relative to public root)
export const TICKETS_JSON_URL = '/ticket-data/tickets.json';

// Calculate triage animation delay for a ticket
export function calculateTriageDelay(ticket) {
  const stepCount = ticket.triageSteps.reduce((a, s) => a + s.details.length, 0);
  return (stepCount * 500) + (ticket.triageSteps.length * 1200) + 2000;
}


