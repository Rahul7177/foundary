/* ----------------------------------------------------------------
 *  Agent & Analyst Roster for dynamic assignment routing
 * ---------------------------------------------------------------- */

export const agentRoster = [
  // AI Agents (handle complexity <= 7)
  { id: 'agent-1', name: 'NOC Workbench Agent', type: 'agent', status: 'available', specialties: ['network', 'infrastructure', 'monitoring', 'vpn'], maxComplexity: 7, icon: 'fa-network-wired', color: '#2196F3' },
  { id: 'agent-2', name: 'Application Support Agent', type: 'agent', status: 'available', specialties: ['software', 'application', 'deployment'], maxComplexity: 7, icon: 'fa-code', color: '#4CAF50' },
  { id: 'agent-3', name: 'Infra Fault Resolver Agent', type: 'agent', status: 'available', specialties: ['hardware', 'infrastructure', 'server'], maxComplexity: 7, icon: 'fa-server', color: '#FF9800' },
  { id: 'agent-4', name: 'Oracle DBA Agent', type: 'agent', status: 'available', specialties: ['database', 'oracle', 'sql'], maxComplexity: 7, icon: 'fa-database', color: '#9C27B0' },
  { id: 'agent-5', name: 'CyberSec Alert Agent', type: 'agent', status: 'available', specialties: ['security', 'cybersecurity', 'threat'], maxComplexity: 6, icon: 'fa-shield-alt', color: '#f44336' },
  { id: 'agent-6', name: 'PI Tag Creation Agent', type: 'agent', status: 'available', specialties: ['aveva_pi', 'pi tag', 'ot', 'aveva'], maxComplexity: 7, icon: 'fa-microchip', color: '#00BCD4' },
  { id: 'agent-7', name: 'AI Triage Agent', type: 'agent', status: 'available', specialties: ['general', 'inquiry', 'request', 'default', 'email'], maxComplexity: 5, icon: 'fa-bolt', color: '#e6001f' },

  // Human Analysts (handle complexity > 7 - human-in-loop)
  { id: 'analyst-1', name: 'Bhupinder Chawla', role: 'OT Lead', type: 'analyst', status: 'available', specialties: ['aveva_pi', 'ot', 'pi tag', 'critical'], icon: 'fa-user-tie', color: '#FF5722' },
  { id: 'analyst-2', name: 'Sarah Mitchell', role: 'Network Architect', type: 'analyst', status: 'available', specialties: ['network', 'vpn', 'firewall', 'infrastructure'], icon: 'fa-user-tie', color: '#3F51B5' },
  { id: 'analyst-3', name: 'James Rodriguez', role: 'Security Analyst', type: 'analyst', status: 'available', specialties: ['security', 'cybersecurity', 'compliance'], icon: 'fa-user-tie', color: '#E91E63' },
  { id: 'analyst-4', name: 'Priya Sharma', role: 'SAP Basis Lead', type: 'analyst', status: 'available', specialties: ['sap', 'erp', 'basis'], icon: 'fa-user-tie', color: '#009688' },
  { id: 'analyst-5', name: 'David Chen', role: 'DBA Lead', type: 'analyst', status: 'available', specialties: ['database', 'oracle', 'sql'], icon: 'fa-user-tie', color: '#795548' },
  { id: 'analyst-6', name: 'Emma Wilson', role: 'IT Service Manager', type: 'analyst', status: 'available', specialties: ['general', 'escalation', 'default', 'email', 'software'], icon: 'fa-user-tie', color: '#607D8B' },
];
