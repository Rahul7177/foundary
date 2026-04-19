export const reportResolverConfig = {
  title: 'Report Orchestration Agent',
  runId: 'RPT_ORCH_20260215_22',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#INC0099822',
    issueType: 'Power BI Pipeline Failure',
    affectedSystem: 'Power BI Gateway - 125 users, 18 critical reports',
    triggeredBy: 'Report Monitor Alert'
  },
  relatedIncidents: [
    { id: 'INC0099822', label: 'Pipeline Failure' }
  ],
  tools: [
    'ServiceNow MCP',
    'Log Parser MCP',
    'Power BI Gateway API',
    'Azure Key Vault',
    'Report Monitor'
  ]
};

export const reportResolverSteps = [
  {
    title: 'Alert Detection',
    description: 'Report Monitor detected pipeline failure',
    details: [
      { icon: 'fas fa-bell', text: 'Alert Triggered: Power BI pipeline failed 3x in 30 min' },
      { icon: 'fas fa-chart-line', text: 'Affected Reports: 18 critical business reports' },
      { icon: 'fas fa-users', text: 'User Impact: 125 users awaiting reports' },
      { icon: 'fas fa-clock', text: 'Severity: CRITICAL - SLA breach in 42 min' }
    ]
  },
  {
    title: 'Incident Creation',
    description: 'ServiceNow Agent creating incident ticket',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'Incident Created: INC0099822 - Critical priority' },
      { icon: 'fas fa-tag', text: 'Category: Reporting Infrastructure' },
      { icon: 'fas fa-robot', text: 'Assigned To: Report Orchestration Agent' },
      { icon: 'fas fa-check', text: 'Status: Auto-assigned to AI agent' }
    ]
  },
  {
    title: 'Log Analysis',
    description: 'Log Parser analyzing error patterns',
    details: [
      { icon: 'fas fa-file-alt', text: 'Log Source: Power BI Gateway service logs' },
      { icon: 'fas fa-search', text: 'Pattern Found: Authentication failure (401 errors)' },
      { icon: 'fas fa-key', text: 'Root Cause: Credential mismatch detected' },
      { icon: 'fas fa-check', text: 'Confidence: 95% - consistent error pattern' }
    ]
  },
  {
    title: 'SOP Validation',
    description: 'Validating remediation strategy against SOPs',
    details: [
      { icon: 'fas fa-calculator', text: 'Complexity Score: 7.5/10 (MEDIUM)' },
      { icon: 'fas fa-shield-alt', text: 'Risk Assessment: 3/10 (Low risk)' },
      { icon: 'fas fa-book', text: 'SOP Match: Gateway service restart procedure' },
      { icon: 'fas fa-exclamation-triangle', text: 'Decision: Human approval required (complexity >= 7)' }
    ]
  },
  {
    title: 'Service Restart',
    description: 'Executing gateway service restart with credential refresh',
    details: [
      { icon: 'fas fa-key', text: 'Credential Refresh: Fetching latest from vault' },
      { icon: 'fas fa-stop-circle', text: 'Service Stop: Gracefully stopping gateway' },
      { icon: 'fas fa-sync', text: 'Config Update: Applying refreshed credentials' },
      { icon: 'fas fa-play-circle', text: 'Service Start: Gateway service restarted' },
      { icon: 'fas fa-check', text: 'Health Check: Service healthy' }
    ]
  },
  {
    title: 'Resolution Validation',
    description: 'Validating fix effectiveness with test runs',
    details: [
      { icon: 'fas fa-vial', text: 'Test Run: Executing sample report generation' },
      { icon: 'fas fa-check-double', text: 'Success: Report generated successfully' },
      { icon: 'fas fa-database', text: 'Data Pipeline: All jobs resumed' },
      { icon: 'fas fa-chart-bar', text: 'Validation: 100% success rate' }
    ]
  },
  {
    title: 'Incident Closure',
    description: 'Completing resolution workflow and notifications',
    details: [
      { icon: 'fas fa-envelope', text: 'Notifications: 125 users notified of resolution' },
      { icon: 'fas fa-book-open', text: 'Documentation: KB article created' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow: INC0099822 CLOSED' },
      { icon: 'fas fa-check-circle', text: 'RESOLVED - MTTR: 8 minutes 15 seconds' }
    ]
  }
];
