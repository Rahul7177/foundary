export const idocResolverConfig = {
  title: 'SAP IDoc Resolver Agent',
  runId: 'IDOC_RUN_2025122211_15',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#INC0099825',
    issueType: 'IDoc Processing Failure (INVOIC02)',
    affectedSystem: 'GEP P2P to SAP ERP (S4H-100) - IDoc #4500012847',
    triggeredBy: 'SAP IDoc Monitor (SM58/BD87)'
  },
  relatedIncidents: [
    { id: 'INC0099825', label: 'IDoc Failure' },
    { id: 'INC0099812', label: 'Related IDoc Failure' },
    { id: 'INC0099809', label: 'Related IDoc Failure' },
    { id: 'INC0099805', label: 'Related IDoc Failure' }
  ],
  tools: [
    'SAP IDoc MCP',
    'ServiceNow MCP',
    'Middleware API',
    'SAP RFC Connector',
    'DB Scripts',
    'Verification Scripts'
  ]
};

export const idocResolverSteps = [
  {
    title: 'SAP IDoc Monitoring - Failure Detection',
    description: 'Monitoring SAP IDoc queue and detecting processing failures',
    details: [
      { icon: 'fas fa-eye', text: 'SAP IDoc Monitor scanning transaction SM58/BD87 for failed IDocs...' },
      { icon: 'fas fa-exclamation-triangle', text: 'IDoc failure detected: #4500012847 (Type: INVOIC02)' },
      { icon: 'fas fa-file-alt', text: 'IDoc Status: 51 (Application document not posted)' },
      { icon: 'fas fa-search', text: 'Error: Vendor 1000847 not found in company code 1000' },
      { icon: 'fas fa-link', text: 'Finding related incidents - 3 similar IDoc failures in past 24 hours' }
    ]
  },
  {
    title: 'ServiceNow Agent - Incident Creation',
    description: 'Creating incident ticket and finding related incidents',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow MCP: Creating incident for IDoc failure...' },
      { icon: 'fas fa-check-circle', text: 'Incident #INC0099825 created successfully' },
      { icon: 'fas fa-link', text: 'Linked to related incidents: INC0099812, INC0099809, INC0099805' },
      { icon: 'fas fa-tags', text: 'Category: ERP Integration | Priority: High | Assignment: AI Agent' },
      { icon: 'fas fa-clock', text: 'SLA Timer started: Target resolution < 30 minutes (MTTR optimization)' }
    ]
  },
  {
    title: 'Orchestration Agent - Root Cause Analysis',
    description: 'Planning actions, analyzing root cause - identifying missing prerequisites',
    details: [
      { icon: 'fas fa-brain', text: 'LLM Integration: Analyzing IDoc error context with OpenAI GPT-4...' },
      { icon: 'fas fa-project-diagram', text: 'Orchestration Agent planning diagnostic actions...' },
      { icon: 'fas fa-search', text: 'Root Cause Identified: Missing prerequisite - Vendor master record' },
      { icon: 'fas fa-database', text: 'Vendor 1000847 exists in GEP P2P but not replicated to SAP' },
      { icon: 'fas fa-clipboard-list', text: 'Action plan: 1) Check middleware 2) Validate data 3) Create/sync vendor 4) Reprocess' }
    ]
  },
  {
    title: 'Middleware Agent - Connectivity Check',
    description: 'Checking middleware connectivity between source and SAP systems',
    details: [
      { icon: 'fas fa-network-wired', text: 'Middleware Agent checking GEP P2P-SAP connectivity...' },
      { icon: 'fas fa-plug', text: 'RFC Connection GEP_RFC: Status = Active' },
      { icon: 'fas fa-exchange-alt', text: 'Message Queue SM58: No pending tRFC entries' },
      { icon: 'fas fa-sync', text: 'Integration adapter status: Running (last sync 5 min ago)' },
      { icon: 'fas fa-exclamation-circle', text: 'Issue found: Vendor master sync job failed at 10:30 AM' },
      { icon: 'fas fa-wrench', text: 'Remediation: Triggering manual vendor sync from GEP P2P...' }
    ]
  },
  {
    title: 'SAP Validator Agent - IDoc Error Analysis',
    description: 'Validating IDoc processing and analyzing detailed IDoc errors',
    details: [
      { icon: 'fas fa-file-code', text: 'SAP Validator Agent parsing IDoc segments...' },
      { icon: 'fas fa-check', text: 'Control Record (EDI_DC40): Valid structure' },
      { icon: 'fas fa-check', text: 'Header Segment (E1EDK01): Invoice data valid' },
      { icon: 'fas fa-times', text: 'Partner Segment (E1EDKA1): Vendor 1000847 not in LFA1' },
      { icon: 'fas fa-database', text: 'DB Script: Vendor record created from GEP P2P master data' },
      { icon: 'fas fa-check-double', text: 'Verification: Vendor 1000847 now exists in SAP' }
    ]
  },
  {
    title: 'Complexity Assessment & Approval',
    description: 'Evaluating complexity and routing for approval if needed',
    details: [
      { icon: 'fas fa-calculator', text: '5-factor complexity scoring for IDoc reprocessing...' },
      { icon: 'fas fa-chart-line', text: 'Risk Assessment: 3/10 (standard IDoc reprocess, no financial impact)' },
      { icon: 'fas fa-tachometer-alt', text: 'Complexity score: 5.5/10 = MEDIUM. Threshold: 7/10' },
      { icon: 'fas fa-robot', text: 'Auto-approval triggered: Complexity below threshold' },
      { icon: 'fas fa-user-check', text: 'Approval status: AUTO-APPROVED for IDoc reprocessing' }
    ]
  },
  {
    title: 'IDoc Reprocess & Incident Resolution',
    description: 'Reprocessing IDoc with corrected data and closing incident',
    details: [
      { icon: 'fas fa-sync-alt', text: 'SAP IDoc MCP: Triggering IDoc reprocessing via BD87...' },
      { icon: 'fas fa-cog', text: 'IDoc #4500012847 reprocessed with corrected vendor reference' },
      { icon: 'fas fa-check-circle', text: 'IDoc Status changed: 51 to 53 (Application document posted)' },
      { icon: 'fas fa-file-invoice', text: 'Invoice document #5100024789 created successfully' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow #INC0099825 resolved with auto-generated notes' },
      { icon: 'fas fa-bell', text: 'Notification sent to Finance & Accounts Payable team' },
      { icon: 'fas fa-chart-bar', text: 'MTTR: 18 minutes (Target: < 30 mins)' }
    ]
  }
];
