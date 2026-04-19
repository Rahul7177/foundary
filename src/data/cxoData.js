// =============================================================================
// Infosys AI Agent Foundry - CXO IT Command Center Data
// All locations reflect Infosys global office and delivery sites
// =============================================================================

export const cxoKPIs = [
  { id: 'enterprise-apps', label: 'Enterprise Apps Health', value: '99.1%', sublabel: '\u2713 Healthy', icon: 'fas fa-server', cardClass: 'green', statusClass: 'green' },
  { id: 'infrastructure', label: 'Global Infra Health', value: '99.8%', sublabel: '\u2713 Optimal', icon: 'fas fa-network-wired', cardClass: 'green', statusClass: 'green' },
  { id: 'alerts', label: 'Active IT Alerts', value: '5', sublabel: '\u2713 Normal', icon: 'fas fa-bell', cardClass: 'green', statusClass: 'green' },
  { id: 'requests', label: 'Service Requests', value: '278', sublabel: '\u26A0 Queued', icon: 'fas fa-ticket-alt', cardClass: 'amber', statusClass: 'amber' },
  { id: 'incidents', label: 'Incidents Today', value: '24', sublabel: '\u2713 Normal', icon: 'fas fa-exclamation-triangle', cardClass: 'green', statusClass: 'green' },
  { id: 'kpis-impacted', label: 'Business KPIs Impacted', value: '2', sublabel: '\u26A0 Monitor', icon: 'fas fa-chart-line', cardClass: 'amber', statusClass: 'amber' },
];

/* Infosys Global Office Locations with coordinates */
export const globalLocations = [
  { id: 'boston',     name: 'Boston, MA (Global HQ)',        lat: 42.3601,  lng: -71.0589,  appsHealth: '99.5%', infraHealth: '99.9%', alerts: 1, incidents: 8,  status: 'green', region: 'North America', type: 'Global Headquarters' },
  { id: 'newyork',    name: 'New York, NY',                  lat: 40.7128,  lng: -74.0060,  appsHealth: '99.3%', infraHealth: '99.8%', alerts: 2, incidents: 10, status: 'green', region: 'North America', type: 'Regional HQ' },
  { id: 'chicago',    name: 'Chicago, IL',                   lat: 41.8781,  lng: -87.6298,  appsHealth: '99.0%', infraHealth: '99.6%', alerts: 0, incidents: 4,  status: 'green', region: 'North America', type: 'Consulting Office' },
  { id: 'sanfran',    name: 'San Francisco, CA',             lat: 37.7749,  lng: -122.4194, appsHealth: '98.9%', infraHealth: '99.5%', alerts: 1, incidents: 5,  status: 'green', region: 'North America', type: 'Digital Hub' },
  { id: 'dc',         name: 'Washington, DC',                lat: 38.9072,  lng: -77.0369,  appsHealth: '99.2%', infraHealth: '99.7%', alerts: 0, incidents: 3,  status: 'green', region: 'North America', type: 'Public Sector Hub' },
  { id: 'toronto',    name: 'Toronto, Canada',               lat: 43.6510,  lng: -79.3470,  appsHealth: '99.0%', infraHealth: '99.6%', alerts: 0, incidents: 2,  status: 'green', region: 'North America', type: 'Consulting Office' },
  { id: 'london',     name: 'London, UK',                    lat: 51.5074,  lng: -0.1278,   appsHealth: '99.4%', infraHealth: '99.8%', alerts: 1, incidents: 6,  status: 'green', region: 'Europe', type: 'EMEA HQ' },
  { id: 'munich',     name: 'Munich, Germany',               lat: 48.1351,  lng: 11.5820,   appsHealth: '99.1%', infraHealth: '99.7%', alerts: 0, incidents: 3,  status: 'green', region: 'Europe', type: 'European Founding Office' },
  { id: 'paris',      name: 'Paris, France',                 lat: 48.8566,  lng: 2.3522,    appsHealth: '98.8%', infraHealth: '99.5%', alerts: 1, incidents: 7,  status: 'amber', region: 'Europe', type: 'Consulting Office' },
  { id: 'frankfurt',  name: 'Frankfurt, Germany',            lat: 50.1109,  lng: 8.6821,    appsHealth: '99.0%', infraHealth: '99.6%', alerts: 0, incidents: 2,  status: 'green', region: 'Europe', type: 'Finance Hub' },
  { id: 'zurich',     name: 'Zurich, Switzerland',           lat: 47.3769,  lng: 8.5417,    appsHealth: '99.3%', infraHealth: '99.8%', alerts: 0, incidents: 1,  status: 'green', region: 'Europe', type: 'Consulting Office' },
  { id: 'amsterdam',  name: 'Amsterdam, Netherlands',        lat: 52.3676,  lng: 4.9041,    appsHealth: '99.1%', infraHealth: '99.7%', alerts: 0, incidents: 2,  status: 'green', region: 'Europe', type: 'Consulting Office' },
  { id: 'stockholm',  name: 'Stockholm, Sweden',             lat: 59.3293,  lng: 18.0686,   appsHealth: '99.2%', infraHealth: '99.7%', alerts: 0, incidents: 1,  status: 'green', region: 'Europe', type: 'Nordics Hub' },
  { id: 'madrid',     name: 'Madrid, Spain',                 lat: 40.4168,  lng: -3.7038,   appsHealth: '98.9%', infraHealth: '99.4%', alerts: 0, incidents: 3,  status: 'green', region: 'Europe', type: 'Consulting Office' },
  { id: 'milan',      name: 'Milan, Italy',                  lat: 45.4654,  lng: 9.1859,    appsHealth: '98.7%', infraHealth: '99.3%', alerts: 1, incidents: 4,  status: 'amber', region: 'Europe', type: 'Consulting Office' },
  { id: 'dubai',      name: 'Dubai, UAE',                    lat: 25.2048,  lng: 55.2708,   appsHealth: '99.2%', infraHealth: '99.7%', alerts: 0, incidents: 2,  status: 'green', region: 'Middle East & Africa', type: 'MEA HQ' },
  { id: 'riyadh',     name: 'Riyadh, Saudi Arabia',          lat: 24.6877,  lng: 46.7219,   appsHealth: '98.6%', infraHealth: '99.3%', alerts: 1, incidents: 5,  status: 'amber', region: 'Middle East & Africa', type: 'Consulting Office' },
  { id: 'nairobi',    name: 'Nairobi, Kenya',                lat: -1.2921,  lng: 36.8219,   appsHealth: '97.9%', infraHealth: '99.0%', alerts: 1, incidents: 4,  status: 'amber', region: 'Middle East & Africa', type: 'Africa HQ' },
  { id: 'joburg',     name: 'Johannesburg, South Africa',    lat: -26.2041, lng: 28.0473,   appsHealth: '98.2%', infraHealth: '99.1%', alerts: 1, incidents: 3,  status: 'green', region: 'Middle East & Africa', type: 'Consulting Office' },
  { id: 'singapore',  name: 'Singapore (APAC Hub)',          lat: 1.3521,   lng: 103.8198,  appsHealth: '99.4%', infraHealth: '99.8%', alerts: 0, incidents: 3,  status: 'green', region: 'Asia Pacific', type: 'APAC HQ' },
  { id: 'tokyo',      name: 'Tokyo, Japan',                  lat: 35.6762,  lng: 139.6503,  appsHealth: '99.3%', infraHealth: '99.7%', alerts: 0, incidents: 2,  status: 'green', region: 'Asia Pacific', type: 'Consulting Office' },
  { id: 'shanghai',   name: 'Shanghai, China',               lat: 31.2304,  lng: 121.4737,  appsHealth: '99.0%', infraHealth: '99.6%', alerts: 0, incidents: 4,  status: 'green', region: 'Asia Pacific', type: 'Greater China HQ' },
  { id: 'beijing',    name: 'Beijing, China',                lat: 39.9042,  lng: 116.4074,  appsHealth: '99.1%', infraHealth: '99.6%', alerts: 0, incidents: 3,  status: 'green', region: 'Asia Pacific', type: 'Consulting Office' },
  { id: 'bangalore',  name: 'Bengaluru, India (GDC)',        lat: 12.9716,  lng: 77.5946,   appsHealth: '98.8%', infraHealth: '99.5%', alerts: 2, incidents: 11, status: 'amber', region: 'Asia Pacific', type: 'Global Delivery Center' },
  { id: 'sydney',     name: 'Sydney, Australia',             lat: -33.8688, lng: 151.2093,  appsHealth: '99.1%', infraHeight: '99.7%', infraHealth: '99.7%', alerts: 0, incidents: 2, status: 'green', region: 'Asia Pacific', type: 'ANZ Hub' },
  { id: 'saopaulo',   name: 'São Paulo, Brazil',             lat: -23.5505, lng: -46.6333,  appsHealth: '98.5%', infraHealth: '99.3%', alerts: 1, incidents: 5,  status: 'green', region: 'Latin America', type: 'LATAM HQ' },
];

export const regionalTable = [
  { region: 'Boston, MA (Global HQ)',       appsHealth: '99.5%', infraHealth: '99.9%', alerts: 1,  incidents: 8,  status: 'green', statusLabel: 'Healthy' },
  { region: 'New York, NY',                 appsHealth: '99.3%', infraHealth: '99.8%', alerts: 2,  incidents: 10, status: 'green', statusLabel: 'Healthy' },
  { region: 'London, UK (EMEA HQ)',         appsHealth: '99.4%', infraHealth: '99.8%', alerts: 1,  incidents: 6,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Singapore (APAC HQ)',          appsHealth: '99.4%', infraHealth: '99.8%', alerts: 0,  incidents: 3,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Dubai, UAE (MEA HQ)',          appsHealth: '99.2%', infraHealth: '99.7%', alerts: 0,  incidents: 2,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Bengaluru, India (GDC)',       appsHealth: '98.8%', infraHealth: '99.5%', alerts: 2,  incidents: 11, status: 'amber', statusLabel: 'Monitor' },
  { region: 'Munich, Germany',             appsHealth: '99.1%', infraHealth: '99.7%', alerts: 0,  incidents: 3,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Paris, France',               appsHealth: '98.8%', infraHealth: '99.5%', alerts: 1,  incidents: 7,  status: 'amber', statusLabel: 'Monitor' },
  { region: 'São Paulo, Brazil (LATAM)',    appsHealth: '98.5%', infraHealth: '99.3%', alerts: 1,  incidents: 5,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Tokyo, Japan',                appsHealth: '99.3%', infraHealth: '99.7%', alerts: 0,  incidents: 2,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Nairobi, Kenya (Africa HQ)',  appsHealth: '97.9%', infraHealth: '99.0%', alerts: 1,  incidents: 4,  status: 'amber', statusLabel: 'Monitor' },
  { region: 'San Francisco, CA',           appsHealth: '98.9%', infraHealth: '99.5%', alerts: 1,  incidents: 5,  status: 'green', statusLabel: 'Healthy' },
  { region: 'Washington, DC',             appsHealth: '99.2%', infraHealth: '99.7%', alerts: 0,  incidents: 3,  status: 'green', statusLabel: 'Healthy' },
];

export const categoryHealth = [
  { id: 'consulting-delivery', name: 'Consulting Delivery Platforms', status: 'green', statusLabel: 'Healthy',  icon: 'fas fa-briefcase',   color: '#4CAF50' },
  { id: 'digital-analytics',   name: 'Digital & Analytics',           status: 'green', statusLabel: 'Healthy',  icon: 'fas fa-chart-bar',   color: '#4CAF50' },
  { id: 'finance-billing',     name: 'Finance, Billing & ERP',        status: 'amber', statusLabel: 'Monitor',  icon: 'fas fa-file-invoice-dollar', color: '#FF9800' },
  { id: 'hr-talent',           name: 'HR, Talent & People Systems',   status: 'green', statusLabel: 'Healthy',  icon: 'fas fa-users',       color: '#4CAF50' },
  { id: 'cybersecurity',       name: 'Cybersecurity & Compliance',    status: 'green', statusLabel: 'Healthy',  icon: 'fas fa-shield-alt',  color: '#4CAF50' },
  { id: 'it-operations',       name: 'IT Operations & Infrastructure',status: 'amber', statusLabel: 'Monitor',  icon: 'fas fa-server',      color: '#FF9800' },
];

export const categoryDetails = {
  'consulting-delivery': {
    icon: 'fa-briefcase',
    metrics: [
      { label: 'Client Portal Uptime', value: '99.8%', status: 'green', trend: 'up' },
      { label: 'Knowledge Mgmt',       value: '99.2%', status: 'green', trend: 'up' },
      { label: 'Collaboration Tools',  value: '99.5%', status: 'green', trend: 'up' },
      { label: 'Active Projects',      value: '1,840', status: 'green', trend: 'stable' },
    ],
    kpis: [
      { name: 'Infosys Client Portal Availability', value: '99.8%', target: '\u226599.5%', status: 'green', trend: '\u2191 +0.2%' },
      { name: 'Knowledge Management System',    value: '99.2%', target: '\u226599%',   status: 'green', trend: '\u2191 +0.3%' },
      { name: 'MS Teams / Collaboration',       value: '99.5%', target: '\u226599%',   status: 'green', trend: '\u2192 Stable' },
      { name: 'Active Client Engagements',      value: '1,840', target: 'N/A',         status: 'green', trend: '\u2191 +48 MoM' },
      { name: 'Proposals Submitted (Mth)',      value: '342',   target: '>300',        status: 'green', trend: '\u2191 +12%' },
    ],
  },
  'digital-analytics': {
    icon: 'fa-chart-bar',
    metrics: [
      { label: 'Gamma Platform',   value: '99.6%', status: 'green', trend: 'up' },
      { label: 'Snowflake Health', value: '99.4%', status: 'green', trend: 'up' },
      { label: 'Databricks Jobs',  value: '97.8%', status: 'amber', trend: 'stable' },
      { label: 'AI Model Latency', value: '82ms',  status: 'green', trend: 'up' },
    ],
    kpis: [
      { name: 'Infosys AI Platform',      value: '99.6%', target: '\u226599.5%', status: 'green', trend: '\u2191 +0.1%' },
      { name: 'Snowflake Data Platform',    value: '99.4%', target: '\u226599%',   status: 'green', trend: '\u2192 Stable' },
      { name: 'Databricks Job Success',     value: '97.8%', target: '\u226598%',   status: 'amber', trend: '\u2193 -0.4%' },
      { name: 'AI Inference Latency (avg)', value: '82ms',  target: '<100ms',      status: 'green', trend: '\u2193 Improved' },
      { name: 'Data Lake Freshness',        value: '99.1%', target: '\u226599%',   status: 'green', trend: '\u2192 Stable' },
    ],
  },
  'finance-billing': {
    icon: 'fa-file-invoice-dollar',
    metrics: [
      { label: 'SAP S/4 Uptime',    value: '99.5%', status: 'green', trend: 'up' },
      { label: 'Invoice SLA',       value: '93.1%', status: 'amber', trend: 'stable' },
      { label: 'Billing Backlog',   value: '214',   status: 'amber', trend: 'down' },
      { label: 'AP/AR Sync',        value: '99.2%', status: 'green', trend: 'up' },
    ],
    kpis: [
      { name: 'SAP S/4 HANA Availability', value: '99.5%', target: '\u226599.5%', status: 'green', trend: '\u2192 Stable' },
      { name: 'Client Invoice SLA',        value: '93.1%', target: '\u226595%',   status: 'amber', trend: '\u2193 -0.9%' },
      { name: 'Billing Processing Backlog',value: '214',   target: '<150',        status: 'amber', trend: '\u2191 Queued' },
      { name: 'AP/AR Reconciliation',      value: '99.2%', target: '100%',        status: 'green', trend: '\u2192 Stable' },
      { name: 'Payment Run Success',       value: '99.8%', target: '100%',        status: 'green', trend: '\u2192 Stable' },
    ],
  },
  'hr-talent': {
    icon: 'fa-users',
    metrics: [
      { label: 'Workday Uptime',    value: '99.7%', status: 'green', trend: 'up' },
      { label: 'Onboarding SLA',    value: '96.2%', status: 'green', trend: 'up' },
      { label: 'Learning Mgmt',     value: '99.1%', status: 'green', trend: 'stable' },
      { label: 'Performance Cycle', value: '98.5%', status: 'green', trend: 'up' },
    ],
    kpis: [
      { name: 'Workday HCM Availability',      value: '99.7%', target: '\u226599.5%', status: 'green', trend: '\u2192 Stable' },
      { name: 'New Hire Onboarding SLA',       value: '96.2%', target: '\u226595%',   status: 'green', trend: '\u2191 +1.0%' },
      { name: 'Learning Management System',    value: '99.1%', target: '\u226599%',   status: 'green', trend: '\u2192 Stable' },
      { name: 'Performance Review Completion', value: '98.5%', target: '\u226597%',   status: 'green', trend: '\u2191 +0.5%' },
      { name: 'Talent Acquisition Cycle',      value: '18 days', target: '<21 days', status: 'green', trend: '\u2193 Improved' },
    ],
  },
  'cybersecurity': {
    icon: 'fa-shield-alt',
    metrics: [
      { label: 'SOC Response',     value: '9min',  status: 'green', trend: 'up' },
      { label: 'Threat Coverage',  value: '99.5%', status: 'green', trend: 'up' },
      { label: 'SSO / Okta',       value: '99.9%', status: 'green', trend: 'up' },
      { label: 'Open Security Inc',value: '2',     status: 'green', trend: 'stable' },
    ],
    kpis: [
      { name: 'SOC Mean Detection Time',   value: '9min',  target: '<15min', status: 'green', trend: '\u2193 Improved' },
      { name: 'CrowdStrike Coverage',      value: '99.5%', target: '\u226599%', status: 'green', trend: '\u2191 +0.3%' },
      { name: 'Okta / Zero Trust SSO',     value: '99.9%', target: '\u226599.9%', status: 'green', trend: '\u2192 Stable' },
      { name: 'Zscaler Internet Access',   value: '99.8%', target: '\u226599.5%', status: 'green', trend: '\u2192 Stable' },
      { name: 'Vulnerability Patch Rate',  value: '97.2%', target: '\u226597%',   status: 'green', trend: '\u2191 +0.8%' },
    ],
  },
  'it-operations': {
    icon: 'fa-server',
    metrics: [
      { label: 'Data Center Uptime', value: '99.99%', status: 'green', trend: 'up' },
      { label: 'Network Latency',    value: '14ms',   status: 'green', trend: 'up' },
      { label: 'Cloud Spend (Mth)',  value: '$3.2M',  status: 'amber', trend: 'stable' },
      { label: 'ServiceNow Health',  value: '98.6%',  status: 'amber', trend: 'stable' },
    ],
    kpis: [
      { name: 'Global Data Center Uptime',  value: '99.99%', target: '\u226599.99%', status: 'green', trend: '\u2192 Stable' },
      { name: 'Avg Network Latency',        value: '14ms',   target: '<20ms',        status: 'green', trend: '\u2193 Improved' },
      { name: 'Cloud Spend vs Budget',      value: '108%',   target: '<105%',        status: 'amber', trend: '\u2191 Over budget' },
      { name: 'ServiceNow Availability',    value: '98.6%',  target: '\u226599%',    status: 'amber', trend: '\u2193 Degraded' },
      { name: 'CMDB Accuracy',             value: '96.8%',  target: '\u226597%',    status: 'amber', trend: '\u2192 Monitor' },
    ],
  },
};

export const topIssues = [
  { id: 'INC0201145', title: 'ServiceNow Slow Response \u2013 Global Ticket Portal', priority: 'P1', impact: 'Delayed ticketing in 18 offices globally', team: 'IT Ops \u2013 Boston / London', agentLine: 'MI Beeper alerted; RCA Agent investigating', eta: 'Est. 2 hrs' },
  { id: 'INC0201143', title: 'SAP Billing Backlog \u2013 Client Invoice Processing', priority: 'P1', impact: '214 client invoices pending clearance', team: 'Finance IT \u2013 Frankfurt', agentLine: 'Invoice Reconciliation Agent engaged', eta: 'Est. 3 hrs' },
  { id: 'INC0201139', title: 'Databricks Job Failures \u2013 Infosys AI Analytics', priority: 'P2', impact: '3 AI model pipelines impacted', team: 'Digital & Analytics \u2013 Singapore', agentLine: 'RCA Agent: root cause identified (memory limits)', eta: 'Est. 4 hrs' },
  { id: 'INC0201136', title: 'Azure AD Sync Delay \u2013 EMEA Offices', priority: 'P2', impact: 'Consultant login delays in Paris & Milan', team: 'Cybersec \u2013 London SOC', agentLine: 'Access Mgmt Agent auto-remediation in progress', eta: 'Est. 1.5 hrs' },
  { id: 'SR0038842',  title: 'Cloud Cost Overrun \u2013 AWS APAC Region', priority: 'P3', impact: 'Monthly spend 8% over budget threshold', team: 'FinOps \u2013 Singapore', agentLine: 'Event Correlation Agent flagged; FinOps notified', eta: 'Complexity: 5/10' },
  { id: 'INC0201132', title: 'CMDB Stale Records \u2013 Bengaluru GDC', priority: 'P3', impact: 'Asset inaccuracies causing ITSM routing errors', team: 'CMDB Team \u2013 Bengaluru', agentLine: 'CMDB Intelligence Agent reconciling records', eta: 'Complexity: 6/10' },
];

export const weekOverWeek = {
  dateRange: 'Mar 9\u201315, 2026',
  improvements: [
    'ServiceNow MTTR improved by 22% \u2014 Boston & London SOC automation initiatives',
    'Client invoice SLA trending up from 91.8% \u2192 93.1% after SAP tuning in Frankfurt',
    'Cybersecurity vulnerability patch rate increased from 96.4% \u2192 97.2% globally',
    'Bengaluru GDC network latency reduced from 22ms \u2192 14ms post SD-WAN upgrade',
    'Infosys AI Platform uptime reached 99.6% \u2014 all-time high since launch',
  ],
  attention: [
    'Cloud spend (AWS APAC) running 8% over monthly budget \u2014 Needs FinOps review',
    'ServiceNow degradation (98.6%) in EU region \u2014 DB optimization in progress',
    'Billing backlog of 214 invoices pending at Frankfurt \u2014 threshold is 150',
  ],
  keyMetrics: [
    'Enterprise Apps Health: 98.8% \u2192 99.1% (+0.3%) across 26 global offices',
    'Active IT Alerts: 9 \u2192 5 (-44%) \u2014 MI Beeper early-warning driving proactive closure',
    'Incident Volume WoW: 31 \u2192 24 (-23%) \u2014 agent-driven auto-resolution improving',
  ],
};

export const productionData = {
  total: '1,840 Active Engagements',
  segments: [
    { label: 'Strategy & Transactions',  value: 498, percent: 27, color: '#006734' },
    { label: 'Technology & Digital',     value: 460, percent: 25, color: '#00955A' },
    { label: 'Operations',               value: 386, percent: 21, color: '#33AA77' },
    { label: 'People & Org',             value: 276, percent: 15, color: '#66BF99' },
    { label: 'Financial Institutions',   value: 165, percent: 9,  color: '#99D4BB' },
    { label: 'Infosys X (Ventures)',         value: 55,  percent: 3,  color: '#CCE9DD' },
  ],
};

export const aiAgentStatus = [
  { name: 'MI Beeper Agent',              active: 2, resolved: 41,  icon: 'fas fa-bell' },
  { name: 'RCA Agent',                    active: 1, resolved: 88,  icon: 'fas fa-search-plus' },
  { name: 'Invoice Reconciliation Agent', active: 2, resolved: 134, icon: 'fas fa-file-invoice-dollar' },
  { name: 'Cybersec Alert Agent',         active: 0, resolved: '260+', icon: 'fas fa-shield-alt' },
  { name: 'CMDB Intelligence Agent',      active: 1, resolved: 52,  icon: 'fas fa-database' },
  { name: 'Access Mgmt Agent',            active: 1, resolved: 77,  icon: 'fas fa-user-lock' },
  { name: 'Event Correlation Agent',      active: 1, resolved: 65,  icon: 'fas fa-project-diagram' },
  { name: 'SRE Agent',                    active: 0, resolved: 93,  icon: 'fas fa-heartbeat' },
  { name: 'Health Check Agent',           active: 0, resolved: 119, icon: 'fas fa-stethoscope' },
  { name: 'Patch Orchestration Agent',    active: 0, resolved: 47,  icon: 'fas fa-sync-alt' },
  { name: 'NOC Agent',                    active: 1, resolved: 38,  icon: 'fas fa-network-wired' },
  { name: 'DevOps Co-worker Agent',       active: 0, resolved: 61,  icon: 'fas fa-code-branch' },
];
