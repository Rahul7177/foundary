export const fileServerBackupConfig = {
  title: 'File Server Backup Agent',
  runId: 'RUN_174836726544B_2',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#INC0099823',
    issueType: 'Backup Service Failure',
    affectedSystem: 'VEEAM-01 / File Servers FS01, FS02',
    triggeredBy: 'ServiceNow Webhook'
  },
  relatedIncidents: [
    { id: 'INC0099823', label: 'Backup Service Failure' },
    { id: 'INC0099821', label: 'O2C Report Failure' },
    { id: 'INC0099822', label: 'Report Generation Failure' },
    { id: 'INC0098765', label: 'Database Performance' }
  ],
  tools: [
    'ServiceNow MCP',
    'PowerShell MCP',
    'OpenAI GPT-4',
    'Veeam REST API',
    'Network Scanner'
  ]
};

export const fileServerBackupSteps = [
  {
    title: 'Initiation',
    description: 'Agent execution started for ServiceNow incident #INC0099823',
    details: [
      { icon: 'fas fa-play-circle', text: 'Agent execution started for ServiceNow incident #INC0099823' },
      { icon: 'fas fa-cogs', text: 'Initializing execution environment and loading agent configuration' },
      { icon: 'fas fa-link', text: 'Successfully connected to ServiceNow API and loaded incident context' }
    ]
  },
  {
    title: 'Planning',
    description: 'LLM Integration: Analyzing incident context with OpenAI GPT-4',
    details: [
      { icon: 'fas fa-brain', text: 'LLM Integration: Analyzing incident context with OpenAI GPT-4' },
      { icon: 'fas fa-search', text: "Identified key issue: 'VEEAM-01 backup service hung/stopped state'" },
      { icon: 'fas fa-clipboard-list', text: 'Planning resolution strategy: Backup infrastructure validation approach' },
      { icon: 'fas fa-tools', text: 'Selecting diagnostic approach and validation tools' }
    ]
  },
  {
    title: 'Infrastructure Validation',
    description: 'Validating backup server connectivity and service status',
    details: [
      { icon: 'fas fa-server', text: 'Backup server validation: VEEAM-01 connectivity verified' },
      { icon: 'fas fa-shield-alt', text: 'Firewall validation: Port 9392 accessibility confirmed' },
      { icon: 'fas fa-network-wired', text: 'Network connectivity: File servers FS01, FS02 reachable' },
      { icon: 'fas fa-exclamation-triangle', text: 'Service status check: Veeam Agent service detected in hung state' }
    ]
  },
  {
    title: 'Complexity Assessment',
    description: '5-factor complexity scoring completed. Risk: 2/10 (non-destructive rollback)',
    details: [
      { icon: 'fas fa-calculator', text: '5-factor complexity scoring initiated for autonomous remediation' },
      { icon: 'fas fa-chart-line', text: 'Risk Assessment: 2/10 (non-destructive rollback available)' },
      { icon: 'fas fa-tachometer-alt', text: 'Complexity score: 5.8/10 = LOW. Threshold: 7/10' },
      { icon: 'fas fa-robot', text: 'Auto-approval triggered: Complexity below threshold - proceeding with self-healing' },
      { icon: 'fas fa-check-double', text: 'Autonomous remediation authorized. No human intervention required.' }
    ]
  },
  {
    title: 'Self-Healing Execution',
    description: 'Autonomous remediation: Veeam services restarted via PowerShell MCP',
    details: [
      { icon: 'fas fa-robot', text: 'Initiating autonomous remediation sequence...' },
      { icon: 'fas fa-sync-alt', text: 'PowerShell MCP: Restarting VeeamDeploymentService' },
      { icon: 'fas fa-sync-alt', text: 'PowerShell MCP: Restarting VeeamBackupSvc' },
      { icon: 'fas fa-sync-alt', text: 'PowerShell MCP: Restarting VeeamCatalogSvc' },
      { icon: 'fas fa-heartbeat', text: 'Health check: All Veeam services responding normally' },
      { icon: 'fas fa-check-circle', text: 'Self-healing completed: All services running successfully' }
    ]
  },
  {
    title: 'Validation & Closure',
    description: 'Backup job resumed and ServiceNow ticket updated',
    details: [
      { icon: 'fas fa-cloud-upload-alt', text: 'Backup job validation: FS01_Daily_Backup resumed successfully' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow update: Incident #INC0099823 marked as resolved' },
      { icon: 'fas fa-clipboard-check', text: 'Resolution documented: Root cause and remediation steps recorded' },
      { icon: 'fas fa-bell', text: 'Notifications sent: Stakeholders informed of successful resolution' }
    ]
  }
];
