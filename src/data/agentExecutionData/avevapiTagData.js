export const avevapiTagConfig = {
  title: 'AVEVA PI Tag Creation Agent',
  runId: 'PI_TAG_20251222_13',
  startedAt: '2 minutes ago',
  priority: 'medium',
  trigger: {
    ticket: '#INC0010013',
    issueType: 'PI Tag Creation Request',
    affectedSystem: 'AVEVA PI / Data Historian - Equipment FT-4501A',
    triggeredBy: 'Business User Portal (John Martinez)'
  },
  relatedIncidents: [
    { id: 'INC0010013', label: 'PI Tag Request' }
  ],
  tools: [
    'ServiceNow MCP',
    'AVEVA PI MCP',
    'PI Data Archive',
    'Knowledge Bases',
    'Automation Scripts'
  ]
};

export const avevapiTagSteps = [
  {
    title: 'ServiceNow Agent - Request Intake',
    description: 'Receiving new PI Tag creation request from Business User portal',
    details: [
      { icon: 'fas fa-inbox', text: 'ServiceNow MCP: Receiving new PI Tag creation request...' },
      { icon: 'fas fa-user', text: 'Requestor: John Martinez (Operations Department)' },
      { icon: 'fas fa-cog', text: 'Equipment: FT-4501A - Flow Transmitter' },
      { icon: 'fas fa-map-marker-alt', text: 'Location: Processing Unit 45, Field Installation' },
      { icon: 'fas fa-check-circle', text: 'Service Request INC0010013 logged successfully' }
    ]
  },
  {
    title: 'Orchestration Agent - Plan Actions',
    description: 'Planning actions, validating results, and checking for missing information',
    details: [
      { icon: 'fas fa-brain', text: 'LLM Integration: Analyzing request via OpenAI GPT-4...' },
      { icon: 'fas fa-project-diagram', text: 'Planning tag creation workflow and validation steps...' },
      { icon: 'fas fa-search', text: 'Checking for missing or incomplete information...' },
      { icon: 'fas fa-check', text: 'End user information: Complete' },
      { icon: 'fas fa-check', text: 'I&C Team specifications: Complete' },
      { icon: 'fas fa-clipboard-list', text: 'Workflow plan ready: Validate > Approve > Create > Verify' }
    ]
  },
  {
    title: 'Validation Agent - Standards Compliance',
    description: 'Validating inputs against PI naming standards and configuration rules',
    details: [
      { icon: 'fas fa-ruler', text: 'Validating against PI naming standards...' },
      { icon: 'fas fa-check', text: 'Tag Name Format: PU45.FT4501A.PV - VALID' },
      { icon: 'fas fa-check', text: 'Point Type: Float32 - VALID' },
      { icon: 'fas fa-check', text: 'Engineering Units: GPM (Gallons Per Minute) - VALID' },
      { icon: 'fas fa-check', text: 'Point Class: FlowRate - VALID' },
      { icon: 'fas fa-check', text: 'Span Range: 0-1000 - Within acceptable limits' },
      { icon: 'fas fa-check-double', text: 'All validation checks passed!' }
    ]
  },
  {
    title: 'Complexity Assessment & Approval Routing',
    description: 'Assessing request complexity and determining approval requirements',
    details: [
      { icon: 'fas fa-calculator', text: 'Smart RCA Engine: Calculating complexity score...' },
      { icon: 'fas fa-plus', text: 'Factor: New equipment type (+2 points)' },
      { icon: 'fas fa-plus', text: 'Factor: Custom scaling required (+2 points)' },
      { icon: 'fas fa-plus', text: 'Factor: Multiple dependent tags (+2 points)' },
      { icon: 'fas fa-plus', text: 'Factor: Critical process area (+2 points)' },
      { icon: 'fas fa-exclamation-triangle', text: 'COMPLEXITY SCORE: 8/10 (HIGH)' },
      { icon: 'fas fa-user-shield', text: 'Threshold exceeded (>=7) - Business SME approval required' }
    ]
  },
  {
    title: 'Approval Agent - Business SME Review',
    description: 'Routing to Business SME for tag creation approval (Complexity >= 7)',
    details: [
      { icon: 'fas fa-route', text: 'Routing request to Business SME for approval...' },
      { icon: 'fas fa-envelope', text: 'Notification sent to: Lisa Chen (Process Engineering SME)' },
      { icon: 'fas fa-file-alt', text: 'Approval package: Tag config, validation results, complexity assessment' },
      { icon: 'fas fa-clock', text: 'Waiting for Business SME approval...' },
      { icon: 'fas fa-check-circle', text: 'APPROVED by Lisa Chen - Business SME' }
    ]
  },
  {
    title: 'Tag Creation Agent - PI System Integration',
    description: 'Creating PI Tag on AVEVA PI System using AVEVA PI MCP',
    details: [
      { icon: 'fas fa-plug', text: 'AVEVA PI MCP: Connecting to PI System...' },
      { icon: 'fas fa-database', text: 'PI Data Archive: Creating point in database...' },
      { icon: 'fas fa-tag', text: 'Tag PU45.FT4501A.PV created successfully' },
      { icon: 'fas fa-cog', text: 'Configuring compression parameters (0.5%)...' },
      { icon: 'fas fa-shield-alt', text: 'Security: Applied access control from template' },
      { icon: 'fas fa-check-circle', text: 'PI Tag fully configured and active' }
    ]
  },
  {
    title: 'Completion Agent - Tag Validation',
    description: 'Validating tag creation and verifying data flow from field device',
    details: [
      { icon: 'fas fa-satellite-dish', text: 'Verifying data flow from field device FT-4501A...' },
      { icon: 'fas fa-wave-square', text: 'Signal detected: 450.25 GPM (live value)' },
      { icon: 'fas fa-check', text: 'Data archiving: Active' },
      { icon: 'fas fa-check', text: 'Compression working: Active' },
      { icon: 'fas fa-chart-line', text: 'Historical trend: 5 minutes of data archived' },
      { icon: 'fas fa-check-double', text: 'Tag validation complete - all systems operational' }
    ]
  },
  {
    title: 'Resolution & User Notification',
    description: 'Closing service request and sending resolution notification to Business User',
    details: [
      { icon: 'fas fa-file-signature', text: 'ServiceNow: Updating INC0010013 with resolution details...' },
      { icon: 'fas fa-check-circle', text: 'Status: Resolved' },
      { icon: 'fas fa-link', text: 'PI Vision URL: Added to work notes' },
      { icon: 'fas fa-envelope', text: 'Email notification sent to John Martinez' },
      { icon: 'fas fa-bell', text: 'Teams notification sent to I&C Team channel' },
      { icon: 'fas fa-flag-checkered', text: 'Service Request INC0010013 CLOSED' }
    ]
  }
];
