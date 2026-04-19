// =============================================================================
// ExxonMobil AI Agent Foundry - Operations Manager Data
// =============================================================================

export const opsTabConfig = [
  { id: 'ops', label: 'OPs', icon: 'fas fa-tachometer-alt' },
  { id: 'slas', label: 'SLAs', icon: 'fas fa-clock' },
  { id: 'incidents', label: 'Incidents', icon: 'fas fa-exclamation-triangle' },
  { id: 'requests', label: 'Requests', icon: 'fas fa-ticket-alt' },
  { id: 'problems', label: 'Problems', icon: 'fas fa-bug' },
  { id: 'leadership', label: 'Leadership', icon: 'fas fa-users-cog' },
];

export const dashboardControls = {
  timePeriods: ['Daily', 'Weekly', 'Monthly'],
  defaultPeriod: 'Daily',
};

// ===================== OPs Tab =====================
export const opsKPIs = {
  row1: [
    { title: 'Tickets Worked On', value: 46, trend: '12 by agents', icon: 'fas fa-ticket-alt', cardClass: '' },
    { title: 'Incidents', value: 32, trend: '8 agent-resolved', icon: 'fas fa-exclamation-circle', cardClass: '' },
    { title: 'Changes', value: 7, trend: '3 agent-assisted', icon: 'fas fa-exchange-alt', cardClass: '' },
    { title: 'Problems', value: 10, trend: '4 linked to agents', icon: 'fas fa-bug', cardClass: '' },
    { title: 'Requests', value: 45, trend: '15 auto-fulfilled', icon: 'fas fa-tasks', cardClass: '' },
  ],
  row2: [
    { title: 'Agent Resolved', value: '63%', trend: '8% increase vs last week', icon: 'fas fa-robot', cardClass: 'agent' },
    { title: 'Agent Accuracy', value: '94.2%', trend: 'Correct first resolution', icon: 'fas fa-bullseye', cardClass: 'success' },
    { title: 'Agent Avg Time', value: '12m', trend: 'vs 2.4h human avg', icon: 'fas fa-clock', cardClass: 'success' },
    { title: 'Manual Overrides', value: '8%', trend: '3% decrease vs last week', icon: 'fas fa-hand-paper', cardClass: '' },
    { title: 'CSAT (Agent)', value: '4.6', trend: 'vs 4.2 human average', icon: 'fas fa-star', cardClass: '' },
  ],
  row3: [
    { title: 'Agent Active Now', value: 7, trend: '7 running agents', icon: 'fas fa-robot', cardClass: 'agent' },
    { title: 'Workload Balanced', value: '92%', trend: 'Optimal distribution', icon: 'fas fa-balance-scale', cardClass: 'success' },
    { title: 'SLA Compliance', value: '96.8%', trend: '1.2% increase (up)', icon: 'fas fa-check-circle', cardClass: 'success' },
    { title: 'MTTR', value: '1h 32m', trend: '28m improvement (up)', icon: 'fas fa-stopwatch', cardClass: '' },
    { title: 'Backlog Items', value: 23, trend: 'Decreased 15% (down)', icon: 'fas fa-layer-group', cardClass: 'warning' },
  ],
};

export const opsChartData = {
  ticketTrend: {
    labels: ['Dec 01', 'Dec 08', 'Dec 15', 'Dec 22', 'Dec 29'],
    datasets: [
      { label: 'Change', color: '#8b5cf6', data: [3, 5, 5, 5, 10] },
      { label: 'Incident', color: '#0ea5e9', data: [22, 22, 31, 37, 43] },
      { label: 'Request', color: '#f97316', data: [12, 10, 8, 25, 33] },
    ],
  },
  incidentsResolved: {
    labels: ['Dec 01', 'Dec 08', 'Dec 15', 'Dec 22', 'Dec 29'],
    datasets: [
      { label: 'Agent', color: '#8b5cf6', data: [28, 37, 42, 31, 44] },
      { label: 'Human', color: '#ef4444', data: [15, 9, 14, 37, 45] },
    ],
  },
  heatmap: {
    headers: ['Priority', 'In Progress', 'On Hold', 'Agent WIP'],
    rows: [
      ['P3 - Medium', 1, 3, 5],
      ['P4 - Low', 7, 28, 12],
    ],
  },
  onHoldReasons: [
    { reason: 'Awaiting Vendor', value: 17 },
    { reason: 'Awaiting Caller', value: 13 },
    { reason: 'Awaiting Change', value: 1 },
    { reason: 'Agent Processing', value: 8 },
  ],
  serviceRequests: {
    labels: ['Dec 01', 'Dec 08', 'Dec 15', 'Dec 22', 'Dec 29'],
    datasets: [
      { label: 'Created', color: '#0ea5e9', data: [28, 45, 38, 36, 18] },
      { label: 'Closed', color: '#22c55e', data: [32, 48, 42, 27, 38] },
    ],
  },
  topApps: [
    { app: 'Icertis CLMS', change: 7, incident: 45, request: 3, total: 55 },
    { app: 'Blackline', change: 0, incident: 41, request: 1, total: 42 },
    { app: 'WPCS', change: 0, incident: 13, request: 13, total: 26 },
    { app: 'SimpleStart', change: 0, incident: 13, request: 0, total: 13 },
    { app: 'ECaaS', change: 0, incident: 10, request: 0, total: 10 },
  ],
};

// ===================== SLAs Tab =====================
export const slaData = {
  agentKPIs: [
    { title: 'Agent SLA Met', value: '98.2%', trend: 'vs 89% human', cardClass: 'agent' },
    { title: 'Avg Response Time', value: '4m', trend: 'Agent first response', cardClass: 'success' },
    { title: 'SLA At Risk', value: '12', trend: '8 with agent assist', cardClass: '' },
    { title: 'SLA Breached', value: '2', trend: 'Both human-handled', cardClass: 'alert' },
  ],
  complianceKPIs: [
    { title: 'INC SLA Compliance', value: '94.2%', trend: '2.1% vs last week', cardClass: 'success' },
    { title: 'SR SLA Compliance', value: '91.8%', trend: '3.5% vs last week', cardClass: 'success' },
    { title: 'Active Breached', value: '29', trend: 'Incidents past SLA', cardClass: 'warning' },
    { title: 'At Risk (75-100%)', value: '10', trend: 'Approaching breach', cardClass: '' },
  ],
  breachedByPriority: [
    { priority: 'P1 - Critical', count: 1 },
    { priority: 'P2 - High', count: 3 },
    { priority: 'P3 - Medium', count: 5 },
    { priority: 'P4 - Low', count: 8 },
  ],
  breachedByCI: [
    { ci: 'SAP ECC', count: 4, category: 'Integration' },
    { ci: 'Icertis CLMS', count: 3, category: 'Config Issue' },
    { ci: 'AVEVA PI', count: 2, category: 'Data Sync' },
    { ci: 'Logistics Cargo', count: 2, category: 'Perf Degradation' },
    { ci: 'Maximo EAM', count: 2, category: 'Access Issue' },
    { ci: 'Primavera P6', count: 1, category: 'Login Failure' },
    { ci: 'ServiceNow', count: 1, category: 'Workflow Error' },
    { ci: 'Salesforce CRM', count: 1, category: 'API Timeout' },
  ],
  slaTrackingTable: [
    { number: 'INC0421523', desc: 'PSM Client Launcher not working', handler: 'Human', sla: '4,048%', slaClass: 'red', priority: 'P3', state: 'On Hold' },
    { number: 'INC0424813', desc: 'Primavera P6 - Cannot login', handler: 'Agent', sla: '2,311%', slaClass: 'red', priority: 'P4', state: 'In Progress' },
    { number: 'INC0489811', desc: 'Issue connection to PI dataLink', handler: 'Agent', sla: '61.5%', slaClass: 'orange', priority: 'P4', state: 'On Hold' },
    { number: 'INC0490198', desc: 'Unable to upload monthly report in ECAS', handler: 'Human', sla: '56.1%', slaClass: 'orange', priority: 'P4', state: 'On Hold' },
    { number: 'INC0490378', desc: 'PA - LCR access Issue', handler: 'Agent', sla: '35.2%', slaClass: 'green', priority: 'P4', state: 'In Progress' },
    { number: 'INC0490512', desc: 'SAP ECC - IDOC processing delay', handler: 'Agent', sla: '189%', slaClass: 'red', priority: 'P2', state: 'In Progress' },
    { number: 'INC0490623', desc: 'Maximo EAM - Work order sync failed', handler: 'Human', sla: '78.3%', slaClass: 'orange', priority: 'P3', state: 'On Hold' },
    { number: 'INC0490734', desc: 'AVEVA PI - Tag data not updating', handler: 'Agent', sla: '42.1%', slaClass: 'green', priority: 'P3', state: 'In Progress' },
  ],
};

// ===================== Incidents Tab =====================
export const incidentData = {
  agentKPIs: [
    { title: 'Agent First Touch', value: '89%', trend: 'Auto-categorized', cardClass: 'agent' },
    { title: 'Agent Resolved', value: '73%', trend: '12% vs last week', cardClass: 'success' },
    { title: 'Avg Agent MTTR', value: '18m', trend: 'vs 2.4h human', cardClass: '' },
    { title: 'Agent Escalations', value: '27%', trend: 'To human review', cardClass: 'warning' },
    { title: 'Reopen Rate', value: '2.1%', trend: 'Agent vs 4.8% human', cardClass: '' },
  ],
  kpis: [
    { title: 'Total Open', value: '168', trend: 'All active incidents', cardClass: '' },
    { title: 'Created This Week', value: '56', trend: '8% decrease', cardClass: 'success' },
    { title: 'Resolved This Week', value: '89', trend: '15% increase', cardClass: 'success' },
    { title: 'Avg Time On Hold', value: '4.2d', trend: 'Waiting on customer', cardClass: 'warning' },
  ],
  byPriority: [
    { priority: 'P1 - Critical', count: 2 },
    { priority: 'P2 - High', count: 8 },
    { priority: 'P3 - Medium', count: 45 },
    { priority: 'P4 - Low', count: 113 },
  ],
  byState: [
    { state: 'New', count: 12 },
    { state: 'In Progress', count: 28 },
    { state: 'On Hold', count: 98 },
    { state: 'Pending', count: 30 },
  ],
  agentVsHumanDaily: [
    { day: 'Mon', agent: 9, human: 3, total: 12 },
    { day: 'Tue', agent: 14, human: 9, total: 23 },
    { day: 'Wed', agent: 15, human: 3, total: 18 },
    { day: 'Thu', agent: 15, human: 6, total: 21 },
    { day: 'Fri', agent: 12, human: 3, total: 15 },
    { day: 'Sat', agent: 6, human: 1, total: 7 },
    { day: 'Sun', agent: 3, human: 1, total: 4 },
  ],
  topCategories: [
    { category: 'Access Issues', agent: 31, human: 11, total: 42 },
    { category: 'Performance', agent: 21, human: 11, total: 32 },
    { category: 'Config Changes', agent: 19, human: 5, total: 24 },
    { category: 'Data Sync', agent: 10, human: 8, total: 18 },
    { category: 'Connectivity', agent: 10, human: 4, total: 14 },
  ],
};

// ===================== Requests Tab =====================
export const requestData = {
  agentKPIs: [
    { title: 'Auto-Fulfilled', value: '68%', trend: 'No human touch', cardClass: 'agent' },
    { title: 'Avg Fulfillment', value: '2.1h', trend: 'vs 18h manual', cardClass: 'success' },
    { title: 'Approval Routing', value: '94%', trend: 'Auto-routed correct', cardClass: '' },
    { title: 'CSAT Score', value: '4.7', trend: 'Agent-handled requests', cardClass: '' },
  ],
  kpis: [
    { title: 'Total Open SR', value: '234', trend: 'Active requests', cardClass: '' },
    { title: 'New This Week', value: '89', trend: 'Service requests', cardClass: '' },
    { title: 'Fulfilled This Week', value: '112', trend: '23% increase', cardClass: 'success' },
    { title: 'Pending Approval', value: '45', trend: 'Awaiting sign-off', cardClass: 'warning' },
  ],
  topCatalogItems: [
    { item: 'Access Request', value: 48 },
    { item: 'Software Install', value: 36 },
    { item: 'VPN Setup', value: 25 },
    { item: 'Password Reset', value: 20 },
    { item: 'Hardware Request', value: 15 },
  ],
  byState: [
    { state: 'Open', value: 56 },
    { state: 'Work in Progress', value: 78 },
    { state: 'Pending Approval', value: 45 },
    { state: 'Pending Fulfillment', value: 55 },
  ],
  fulfillmentTrend: [
    { week: 'Week 1', agent: 53, human: 32, total: 85 },
    { week: 'Week 2', agent: 60, human: 32, total: 92 },
    { week: 'Week 3', agent: 67, human: 31, total: 98 },
    { week: 'Week 4', agent: 81, human: 31, total: 112 },
  ],
};

// ===================== Problems Tab =====================
export const problemData = {
  agentKPIs: [
    { title: 'Auto-Detected', value: '34', trend: 'Problems from patterns', cardClass: 'agent' },
    { title: 'RCA Complete', value: '78%', trend: 'Agent-assisted', cardClass: 'success' },
    { title: 'Avg RCA Time', value: '4.2h', trend: 'vs 18h manual', cardClass: '' },
    { title: 'Known Errors', value: '156', trend: 'Auto-documented', cardClass: '' },
  ],
  kpis: [
    { title: 'Active Problems', value: '47', trend: 'Open investigations', cardClass: '' },
    { title: 'Aging > 30 Days', value: '12', trend: 'Requires attention', cardClass: 'warning' },
    { title: 'Resolved This Month', value: '23', trend: '35% increase', cardClass: 'success' },
    { title: 'Related Incidents', value: '342', trend: 'Linked to problems', cardClass: '' },
  ],
  byState: [
    { state: 'New', count: 8 },
    { state: 'Root Cause Analysis', count: 18 },
    { state: 'Fix in Progress', count: 13 },
    { state: 'Known Error', count: 8 },
  ],
  aging: [
    { range: '0-7 Days', count: 15 },
    { range: '8-14 Days', count: 10 },
    { range: '15-30 Days', count: 10 },
    { range: '> 30 Days', count: 12 },
  ],
  topCategories: [
    { category: 'Infrastructure', agent: 14, human: 8, total: 22 },
    { category: 'Application', agent: 8, human: 5, total: 13 },
    { category: 'Network', agent: 6, human: 2, total: 8 },
    { category: 'Database', agent: 3, human: 2, total: 5 },
    { category: 'Security', agent: 3, human: 0, total: 3 },
  ],
};

// ===================== Leadership Tab =====================
export const leadershipTabConfig = [
  { id: 'incident', label: 'Incident' },
  { id: 'problem', label: 'Problem' },
  { id: 'change', label: 'Change' },
  { id: 'request', label: 'Request' },
];

export const leadershipData = {
  incident: {
    kpis: [
      { title: 'Agent Resolved', value: '38', trend: 'vs 32 yesterday', cardClass: 'agent' },
      { title: 'Human Resolved', value: '14', trend: 'vs 18 yesterday', cardClass: '' },
      { title: 'Agent Resolution %', value: '73%', trend: '+5% vs last week', cardClass: 'success' },
      { title: 'Avg Agent MTTR', value: '12m', trend: '4x faster than human', cardClass: 'agent' },
      { title: 'Total Resolved', value: '52', trend: 'Agent 38 + Human 14', cardClass: '' },
    ],
    byPriority: [
      { priority: 'P1', agent: 1, human: 1, total: 2 },
      { priority: 'P2', agent: 5, human: 3, total: 8 },
      { priority: 'P3', agent: 8, human: 5, total: 13 },
      { priority: 'P4', agent: 6, human: 4, total: 10 },
    ],
    byState: [
      { state: 'New', agent: 5, human: 3, total: 8 },
      { state: 'In Progress', agent: 7, human: 4, total: 11 },
      { state: 'On Hold', agent: 4, human: 3, total: 7 },
      { state: 'Pending', agent: 4, human: 3, total: 7 },
    ],
  },
  problem: {
    kpis: [
      { title: 'Agent RCA Complete', value: '6', trend: 'vs 4 yesterday', cardClass: 'agent' },
      { title: 'Human RCA Complete', value: '3', trend: 'vs 5 yesterday', cardClass: '' },
      { title: 'Agent RCA %', value: '67%', trend: '+8% vs last week', cardClass: 'success' },
      { title: 'Avg Agent RCA Time', value: '2.1h', trend: '3x faster than human', cardClass: 'agent' },
      { title: 'Total RCA Complete', value: '9', trend: 'Agent 6 + Human 3', cardClass: '' },
    ],
  },
  change: {
    kpis: [
      { title: 'Agent Implemented', value: '8', trend: 'vs 6 yesterday', cardClass: 'agent' },
      { title: 'Human Implemented', value: '4', trend: 'vs 7 yesterday', cardClass: '' },
      { title: 'Agent Change %', value: '67%', trend: '+12% vs last week', cardClass: 'success' },
      { title: 'Avg Agent Time', value: '45m', trend: '2x faster than human', cardClass: 'agent' },
      { title: 'Total Implemented', value: '12', trend: 'Agent 8 + Human 4', cardClass: '' },
    ],
  },
  request: {
    kpis: [
      { title: 'Agent Fulfilled', value: '28', trend: 'vs 22 yesterday', cardClass: 'agent' },
      { title: 'Human Fulfilled', value: '9', trend: 'vs 14 yesterday', cardClass: '' },
      { title: 'Agent Fulfillment %', value: '76%', trend: '+9% vs last week', cardClass: 'success' },
      { title: 'Avg Agent Time', value: '8m', trend: '5x faster than human', cardClass: 'agent' },
      { title: 'Total Fulfilled', value: '37', trend: 'Agent 28 + Human 9', cardClass: '' },
    ],
  },
};
