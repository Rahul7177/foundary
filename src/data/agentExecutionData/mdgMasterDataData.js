export const mdgMasterDataConfig = {
  title: 'SAP MDG Master Data Agent',
  runId: 'MDG_RUN_2025122210_45',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#CR-MDG-2025-004521',
    issueType: 'Business Partner Banking Data Update',
    affectedSystem: 'SAP MDG / S/4HANA - Treasury Services',
    triggeredBy: 'SAP MDG Workflow'
  },
  relatedIncidents: [
    { id: 'INC0099824', label: 'ServiceNow Incident' },
    { id: 'CR-MDG-2025-004521', label: 'MDG Change Request' }
  ],
  tools: [
    'SAP MDG MCP',
    'SAP S/4HANA MCP',
    'ServiceNow MCP',
    'Bank Registry API',
    'Approval Workflow MCP'
  ]
};

export const mdgMasterDataSteps = [
  {
    title: 'CR Case Received',
    description: 'Change Request received from SAP MDG for Business Partner banking data update',
    details: [
      { icon: 'fas fa-file-alt', text: 'Change Request CR#MDG-2025-004521 received from SAP MDG' },
      { icon: 'fas fa-user', text: 'Stakeholder: Treasury Services - ConocoPhillips' },
      { icon: 'fas fa-database', text: 'Data Type: Business Partner Banking Data (IBAN, SWIFT, Account)' },
      { icon: 'fas fa-clock', text: 'Request submitted: Dec 22, 2025 10:45 AM' },
      { icon: 'fas fa-link', text: 'ServiceNow incident #INC0099824 created for tracking' }
    ]
  },
  {
    title: 'MDG Data Validation',
    description: 'Executing business rules and data quality validation checks',
    details: [
      { icon: 'fas fa-check-circle', text: 'Business Rule Check: Tax number format - PASS' },
      { icon: 'fas fa-check-circle', text: 'Business Rule Check: Country code validation - PASS' },
      { icon: 'fas fa-check-circle', text: 'Business Rule Check: Bank key format - PASS' },
      { icon: 'fas fa-times-circle', text: 'Data Quality Check: IBAN checksum validation - FAILED' },
      { icon: 'fas fa-exclamation-triangle', text: 'Exception: IBAN_CHECKSUM_INVALID - Position 12-13 transposition error' }
    ]
  },
  {
    title: 'Exception Flagged - Agentic AI Triggered',
    description: 'Validation failed. Orchestration Agent coordinating autonomous resolution',
    details: [
      { icon: 'fas fa-flag', text: 'Exception flagged: MDG_VALIDATION_FAILED' },
      { icon: 'fas fa-robot', text: 'Orchestration Agent activated for autonomous resolution' },
      { icon: 'fas fa-project-diagram', text: 'Agentic AI pipeline initialized with 4 sub-agents' },
      { icon: 'fas fa-cogs', text: 'Sub-agents: Smart RCA > Autonomous Resolution > Intelligent Execution' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow #INC0099824 updated: Status = Agent Processing' }
    ]
  },
  {
    title: 'Smart Root Cause Analysis',
    description: 'Analyzing case logs and identifying root cause using AI pattern matching',
    details: [
      { icon: 'fas fa-search', text: 'Smart RCA Engine analyzing case logs and historical patterns...' },
      { icon: 'fas fa-history', text: 'Pattern match: 47 similar IBAN errors resolved in past 90 days' },
      { icon: 'fas fa-brain', text: 'AI Analysis: Manual data entry error - digit transposition at positions 12-13' },
      { icon: 'fas fa-chart-pie', text: 'Root cause confidence: 94% (based on pattern analysis)' },
      { icon: 'fas fa-lightbulb', text: 'Recommended fix: Swap characters at IBAN positions 12-13 and revalidate' }
    ]
  },
  {
    title: 'Autonomous Resolution Planning',
    description: 'Preparing smart resolution plan - collating missing data using history and patterns',
    details: [
      { icon: 'fas fa-lightbulb', text: 'Autonomous Resolution Agent preparing smart resolution plan' },
      { icon: 'fas fa-database', text: 'Querying vendor master records for historical IBAN data' },
      { icon: 'fas fa-university', text: 'Bank Registry API: Validating corrected IBAN against external registry' },
      { icon: 'fas fa-check-double', text: 'Corrected IBAN: DE89 3704 0044 0532 0130 00 (validated)' },
      { icon: 'fas fa-clipboard-list', text: 'Resolution plan prepared: Update IBAN in CR and re-trigger validation' }
    ]
  },
  {
    title: 'Intelligent Execution',
    description: 'Executing fix and updating required details in Change Request via SAP MDG MCP',
    details: [
      { icon: 'fas fa-play', text: 'Intelligent Execution Agent executing fix in SAP MDG' },
      { icon: 'fas fa-edit', text: 'SAP MDG MCP: Updating IBAN field in CR#MDG-2025-004521' },
      { icon: 'fas fa-sync', text: 'Re-triggering MDG data validation with corrected data...' },
      { icon: 'fas fa-check-circle', text: 'Validation Result: ALL CHECKS PASSED' },
      { icon: 'fas fa-clipboard-check', text: 'Change Request data quality verified successfully' }
    ]
  },
  {
    title: 'Complexity Assessment & Approval Routing',
    description: 'Evaluating complexity score and routing to approvers if required',
    details: [
      { icon: 'fas fa-calculator', text: '5-factor complexity scoring initiated for approval routing' },
      { icon: 'fas fa-chart-line', text: 'Risk Assessment: 3/10 (data correction only, no schema change)' },
      { icon: 'fas fa-tachometer-alt', text: 'Complexity score: 4.2/10 = LOW. Threshold: 7/10' },
      { icon: 'fas fa-robot', text: 'Auto-approval triggered: Complexity below threshold' },
      { icon: 'fas fa-user-check', text: 'Approval status: AUTO-APPROVED (no human intervention required)' }
    ]
  },
  {
    title: 'Master Data Update & CR Closure',
    description: 'Pushing corrected data to SAP S/4HANA and closing Change Request',
    details: [
      { icon: 'fas fa-cloud-upload-alt', text: 'SAP S/4HANA MCP: Pushing corrected Business Partner data' },
      { icon: 'fas fa-database', text: 'Master Data updated in SAP S/4HANA production system' },
      { icon: 'fas fa-check-circle', text: 'CR#MDG-2025-004521 closed: Status = Completed' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow #INC0099824 resolved with auto-generated notes' },
      { icon: 'fas fa-bell', text: 'Stakeholder notification sent to Treasury Services team' }
    ]
  }
];
