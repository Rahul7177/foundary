export const o2cFaultResolverConfig = {
  title: 'O2C Fault Resolver Agent',
  runId: 'INC-2025121214-O2C-001',
  startedAt: '2 minutes ago',
  priority: 'critical',
  trigger: {
    ticket: '#INC-2025121214',
    issueType: 'Integration Failure',
    affectedSystem: 'O2C Report Generation / SQL Connector v2.1.5',
    triggeredBy: 'Azure Monitor Alert'
  },
  relatedIncidents: [
    { id: 'INC-2025121214', label: 'O2C Report Generation Failure' }
  ],
  tools: [
    'Azure Monitor MCP',
    'Logic Apps MCP',
    'SQL MCP',
    'Service Bus MCP',
    'Key Vault MCP'
  ]
};

export const o2cFaultResolverSteps = [
  {
    title: 'Alert Detection',
    description: 'Azure Monitor alert received',
    details: [
      { icon: 'fas fa-bell', text: 'Alert Triggered: O2C_Report_Generation failed 3x' },
      { icon: 'fas fa-server', text: 'Service Impact: 247 orders, .5M at risk' },
      { icon: 'fas fa-check', text: 'Severity: CRITICAL - SLA breach in 28 min' },
      { icon: 'fas fa-gear', text: 'Classification: Integration Failure' }
    ]
  },
  {
    title: 'Diagnostic Collection',
    description: 'Gathering telemetry from Azure services',
    details: [
      { icon: 'fas fa-cloud', text: 'Azure Monitor: Fetching Logic App history...' },
      { icon: 'fas fa-database', text: 'Azure SQL: Testing connectivity...' },
      { icon: 'fas fa-bus', text: 'Service Bus: Checking queue (847 msgs)' },
      { icon: 'fas fa-cog', text: 'Logic Apps API: Retrieved error logs' },
      { icon: 'fas fa-check', text: 'Aggregated: 47 metrics from 5 services' }
    ]
  },
  {
    title: 'Root Cause Analysis',
    description: 'RCA Engine identifying failure point',
    details: [
      { icon: 'fas fa-chart-line', text: 'Pattern: 3 failures in 30-min window' },
      { icon: 'fas fa-code-branch', text: 'Correlation: Post v2.1.5 update (Dec 10)' },
      { icon: 'fas fa-bug', text: 'Root Cause: SQL Connector v2.1.5 timeout issue' },
      { icon: 'fas fa-check', text: 'Confidence: 92% - 8 evidence points' }
    ]
  },
  {
    title: 'Complexity Assessment',
    description: 'Evaluating complexity and SOP matching',
    details: [
      { icon: 'fas fa-calculator', text: 'Scoring: 5-factor assessment' },
      { icon: 'fas fa-shield-alt', text: 'Risk: 2/10 (Non-destructive rollback)' },
      { icon: 'fas fa-check', text: 'Score: 7.92/10 = MEDIUM Complexity' },
      { icon: 'fas fa-thumbs-up', text: 'Decision: Autonomous Self-Healing OK' }
    ]
  },
  {
    title: 'Self-Healing Execution',
    description: 'Rollback connector v2.1.5 to v2.1.4',
    details: [
      { icon: 'fas fa-lock', text: 'RBAC: Agent permissions verified' },
      { icon: 'fas fa-shield-alt', text: 'Backup: Config saved to Key Vault' },
      { icon: 'fas fa-download', text: 'Rollback: Downloading v2.1.4' },
      { icon: 'fas fa-sync', text: 'Update: Connector rolled back' },
      { icon: 'fas fa-check', text: 'Restart: Logic App online' }
    ]
  },
  {
    title: 'Fix Validation',
    description: 'Verifying rollback success',
    details: [
      { icon: 'fas fa-code-branch', text: 'Version: Confirmed v2.1.4 active' },
      { icon: 'fas fa-play', text: 'Test Run: Executing with failed params...' },
      { icon: 'fas fa-check-double', text: 'Success: Completed in 38.4 sec' },
      { icon: 'fas fa-database', text: 'Connectivity: All DB queries OK' },
      { icon: 'fas fa-file-export', text: 'Report: O2C_Report_20251212 generated' }
    ]
  },
  {
    title: 'Incident Closure',
    description: 'Closing incident and sending notifications',
    details: [
      { icon: 'fas fa-envelope', text: 'Engineering: Sent resolution alert' },
      { icon: 'fas fa-users', text: 'Operations: Fix completion notice' },
      { icon: 'fas fa-handshake', text: 'Finance: 247 orders resuming' },
      { icon: 'fas fa-file-alt', text: 'KB: Article created for prevention' },
      { icon: 'fas fa-tasks', text: 'ServiceNow: INC-2025121214 CLOSED' }
    ]
  },
  {
    title: 'Post-Monitoring',
    description: '24-hour surveillance enabled',
    details: [
      { icon: 'fas fa-chart-line', text: 'Tests: 3/3 runs successful' },
      { icon: 'fas fa-bus', text: 'Queue: Recovery (847 -> 612 msgs)' },
      { icon: 'fas fa-signal', text: 'Health: All services stable' },
      { icon: 'fas fa-shield-alt', text: 'Monitoring: 24-hour surveillance active' },
      { icon: 'fas fa-check-circle', text: 'RESOLVED: MTTR 12:33 min' }
    ]
  }
];
