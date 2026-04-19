// =============================================================================
// ExxonMobil AI Agent Foundry - Dashboard Data Configuration
// Widget data, ticket data, calendar events, KB stats
// =============================================================================

export const dashboardWidgets = {
  openTickets: {
    total: 2695,
    categories: [
      { label: "Inquiry/Help", percent: 45, color: "#ef4444" },
      { label: "Software", percent: 20, color: "#f97316" },
      { label: "SAP", percent: 15, color: "#8b5cf6" },
      { label: "Security", percent: 10, color: "#a855f7" },
      { label: "Cancellation", percent: 6, color: "#14b8a6" },
      { label: "Others", percent: 4, color: "#0ea5e9" },
    ],
    trend: "5% increase in Inquiry type vs last month",
  },
  myOpenTickets: {
    count: 4,
    criticalCount: 1,
    criticalLabel: "1 Critical",
    timeToComplete: "~4 hrs 30 min",
    criticalTicket: {
      id: "INC0088376",
      title: "Application slowed...",
      progress: 25,
    },
  },
  mttr: {
    thisMonth: "1h 32min",
    lastMonth: "2h 15min",
    annualAvg: "1h 45min",
    teamAvg: "3h 20min",
  },
  kbContributions: {
    newSops: 1,
    total: 5,
    recent: {
      id: "KB-2025-12-18",
      title: "Disk Space Remediation Procedure for Production Servers",
    },
  },
};

export const inboxTickets = {
  assignedToAgents: [
    { id: "INC0001001", title: "Production API Server Auto-Recovery Initiated", agent: "Self-Healing Agent", priority: "Critical", status: "In Progress", statusType: "in-progress", time: "12m ago", link: "/agent-execution/self-healing-agent", category: "Infrastructure", assignmentGroup: "SRE Platform Team" },
    { id: "INC0001002", title: "Monitoring Alert Anomaly Detected - EU Region", agent: "MI Beeper Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "25m ago", link: "/agent-execution/mi-beeper-agent", category: "Monitoring", assignmentGroup: "NOC Operations" },
    { id: "INC0001003", title: "Root Cause Analysis - CRM Platform Outage", agent: "RCA Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "40m ago", link: "/agent-execution/rca-agent", category: "Application", assignmentGroup: "CRM Support Team" },
    { id: "SR0001004", title: "New Office Network Provisioning - Singapore", agent: "Network Provisioning Agent", priority: "Medium", status: "In Progress", statusType: "in-progress", time: "1h ago", link: "/agent-execution/network-provisioning-agent", category: "Networking", assignmentGroup: "Global Network Team" },
    { id: "INC0001005", title: "SLO Breach Detected - Payments Gateway", agent: "SRE Agent", priority: "Critical", status: "In Progress", statusType: "in-progress", time: "8m ago", link: "/agent-execution/sre-agent", category: "Reliability", assignmentGroup: "Payments Platform SRE" },
    { id: "INC0001006", title: "Infrastructure Health Degradation - APAC Cluster", agent: "Health Check Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "1h ago", link: "/agent-execution/health-check-agent", category: "Infrastructure", assignmentGroup: "Cloud Ops APAC" },
    { id: "INC0001007", title: "CMDB Configuration Drift Detected - 47 CIs", agent: "CMDB Intelligence Agent", priority: "Medium", status: "In Progress", statusType: "in-progress", time: "2h ago", link: "/agent-execution/cmdb-intelligence-agent", category: "CMDB", assignmentGroup: "Asset Management" },
    { id: "INC0001008", title: "Multi-Source Event Storm - Chicago Data Center", agent: "Event Correlation Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "35m ago", link: "/agent-execution/event-correlation-agent", category: "Event Management", assignmentGroup: "NOC Operations" },
    { id: "REQ0001009", title: "Bulk Access Provisioning - New Cohort (120 Users)", agent: "Access Mgmt Agent", priority: "Medium", status: "In Progress", statusType: "in-progress", time: "2h ago", link: "/agent-execution/access-mgmt-agent", category: "Access Management", assignmentGroup: "Identity & Access Team" },
    { id: "CHG0001010", title: "Security Patch Deployment - Windows Servers (238 Hosts)", agent: "Patch Orchestration Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "3h ago", link: "/agent-execution/patch-orchestration-agent", category: "Patch Management", assignmentGroup: "Security Ops" },
    { id: "INC0001011", title: "Network Operations Alert - EMEA Hub Connectivity Loss", agent: "NOC Agent", priority: "Critical", status: "In Progress", statusType: "in-progress", time: "18m ago", link: "/agent-execution/noc-agent", category: "Network", assignmentGroup: "NOC Operations" },
    { id: "INC0001012", title: "Suspicious Auth Pattern Detected - Boston Office", agent: "Cybersec Alert Agent", priority: "High", status: "In Progress", statusType: "in-progress", time: "45m ago", link: "/agent-execution/cybersec-alert-agent", category: "Security", assignmentGroup: "Security Operations" },
    { id: "CHG0001013", title: "Q4 Infrastructure Freeze - Change Advisory Review", agent: "CAB Assist", priority: "Medium", status: "In Progress", statusType: "in-progress", time: "4h ago", link: "/agent-execution/cab-assist", category: "Change Management", assignmentGroup: "Change Advisory Board" },
  ],
  assignedToMe: [
    { id: "INC0001001", title: "Production API Server Auto-Recovery - Approval Needed", priority: "Critical", status: "Escalated to You", statusType: "escalated", time: "12m ago", link: "/agent-execution/self-healing-agent" },
    { id: "INC0001005", title: "SLO Breach - Payments Gateway Remediation Review", priority: "Critical", status: "Escalated to You", statusType: "escalated", time: "8m ago", link: "/agent-execution/sre-agent" },
    { id: "INC0001011", title: "EMEA Hub Connectivity Loss - NOC Escalation", priority: "Critical", status: "Escalated to You", statusType: "escalated", time: "18m ago", link: "/agent-execution/noc-agent" },
    { id: "INC0001012", title: "Suspicious Auth Pattern - Cybersec Investigation", priority: "High", status: "In Progress", statusType: "in-progress", time: "45m ago", link: "/agent-execution/cybersec-alert-agent" },
    { id: "INC0001008", title: "Chicago Data Center Event Storm Analysis", priority: "High", status: "In Progress", statusType: "in-progress", time: "35m ago", link: "/agent-execution/event-correlation-agent" },
    { id: "REQ0001009", title: "New Cohort - Bulk Access Provisioning Review", priority: "Medium", status: "In Progress", statusType: "in-progress", time: "2h ago", link: "/agent-execution/access-mgmt-agent" },
  ],
  myApprovals: [
    { id: "INC0001001", title: "Self-Healing Agent - Auto-Restart API Server (Prod)", risk: "Medium", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/self-healing-agent" },
    { id: "CHG0001010", title: "Patch Orchestration - Deploy CVE-2024-1234 to 238 Hosts", risk: "High", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/patch-orchestration-agent" },
    { id: "SR0001004", title: "Network Provisioning - Singapore Office VLAN Setup", risk: "Low", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/network-provisioning-agent" },
    { id: "CHG0001013", title: "CAB Assist - Q4 Production Change Freeze Exception", risk: "High", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/cab-assist" },
    { id: "INC0001003", title: "RCA Agent - CRM Platform Remediation Execute", risk: "Medium", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/rca-agent" },
    { id: "REQ0001009", title: "Access Mgmt - Bulk Provision 120 New Users", risk: "Low", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/access-mgmt-agent" },
    { id: "INC0001006", title: "Health Check Agent - APAC Cluster Auto-Scaling Fix", risk: "Medium", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/health-check-agent" },
    { id: "INC0001007", title: "CMDB Intelligence - Sync 47 Drifted Configuration Items", risk: "Low", status: "Waiting for Approval", statusType: "waiting", link: "/agent-execution/cmdb-intelligence-agent" },
  ],
};


export const calendarEvents = [
  { category: "Notifications", time: "12:00", col: 3, span: 1, label: "P1 Incident", type: "incident" },
  { category: "Inbox", time: "10:00", col: 1, span: 1, label: "Approval deletion of dev J...", type: "approval" },
  { category: "Inbox", time: "14:00", col: 5, span: 1, label: "Service Request", type: "service" },
  { category: "Inbox", time: "15:00", col: 6, span: 1, label: "Task INC-MC-DT01", type: "task-inc" },
  { category: "Inbox", time: "16:00", col: 7, span: 1, label: "Task INC-20992281-N", type: "task-inc2" },
  { category: "Meetings", time: "10:00", col: 1, span: 1, label: "P3 Incident - MC-DT01", type: "meeting" },
  { category: "Meetings", time: "15:00", col: 6, span: 1, label: "Executive status", type: "executive" },
  { category: "Blocking", time: "11:00", col: 2, span: 1, label: "Executive strategy session", type: "executive-st" },
  { category: "Blocking", time: "13:00", col: 4, span: 1, label: "Lunch", type: "lunch" },
  { category: "My Activities", time: "15:00", col: 6, span: 1, label: "Task INC-20992281-N", type: "task-inc-activity" },
  { category: "My Activities", time: "17:00", col: 8, span: 1, label: "Task INC-MC-DT01", type: "task-inc3" },
];

export const personas = [
  { value: "operational-analyst", label: "Operational Analyst", route: "/" },
  { value: "operations-manager", label: "Operations Manager", route: "/operations-manager" },
  { value: "business-user", label: "Business User", route: "/business-user" },
  { value: "cxo", label: "CXO User", route: "/cxo" },
];


