export const cybersecGrcConfig = {
  title: 'CyberSec GRC Policy Agent',
  runId: 'GRC_RUN_20260126_67',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#SR0045621',
    issueType: 'Policy Maintenance',
    affectedSystem: 'GRC Policy Repository - POL-2026-00542',
    triggeredBy: 'Policy Change Notification'
  },
  relatedIncidents: [
    { id: 'POL-2026-00542', label: 'GRC Policy Update' },
    { id: 'SR0045621', label: 'Service Request' }
  ],
  tools: [
    'Policy Repository MCP',
    'ServiceNow MCP',
    'Document AI MCP',
    'Compliance Engine MCP',
    'Standards MCP',
    'Workflow MCP'
  ]
};

export const cybersecGrcSteps = [
  {
    title: 'Monitor Policy Changes',
    description: 'Policy agent triggers maintenance for updated GRC policies',
    details: [
      { icon: 'fas fa-plug', text: 'MCP: policy_repository_mcp.connect()' },
      { icon: 'fas fa-bell', text: 'Monitoring policy change notifications' },
      { icon: 'fas fa-flag', text: 'Policy POL-2026-00542 flagged for maintenance' },
      { icon: 'fas fa-check-circle', text: 'Triggering policy maintenance workflow' }
    ]
  },
  {
    title: 'Service Request Created',
    description: 'Create service request in ServiceNow for policy change tracking',
    details: [
      { icon: 'fas fa-network-wired', text: 'MCP: servicenow_mcp.connect()' },
      { icon: 'fas fa-ticket-alt', text: 'Creating service request for policy tracking' },
      { icon: 'fas fa-info-circle', text: 'Adding policy change context and metadata' },
      { icon: 'fas fa-check-circle', text: 'Service Request SR0045621 created successfully' }
    ]
  },
  {
    title: 'Document Classification',
    description: 'AI Agent downloads policy document, identifies control areas and aligns with standards',
    details: [
      { icon: 'fas fa-download', text: 'MCP: document_ai_mcp.download_policy()' },
      { icon: 'fas fa-file-alt', text: 'Analyzing document structure and content' },
      { icon: 'fas fa-shield-alt', text: 'Identifying control areas: ISO 27001, NIST CSF' },
      { icon: 'fas fa-check-circle', text: 'Aligning with compliance standards' }
    ]
  },
  {
    title: 'Data Extraction & Compliance Check',
    description: 'Validate past policy records, AI flags non-compliance and suggests fixes',
    details: [
      { icon: 'fas fa-history', text: 'MCP: compliance_engine_mcp.validate_past_versions()' },
      { icon: 'fas fa-database', text: 'Extracting policy data and control requirements' },
      { icon: 'fas fa-tasks', text: 'Running compliance checks against standards' },
      { icon: 'fas fa-exclamation-triangle', text: 'Non-compliance detected: Missing encryption requirements' }
    ]
  },
  {
    title: 'Finding & Recommendations',
    description: 'AI adds recommended content for continuous compliance',
    details: [
      { icon: 'fas fa-lightbulb', text: 'MCP: standards_mcp.generate_recommendations()' },
      { icon: 'fas fa-lock', text: 'Adding encryption protocol requirements' },
      { icon: 'fas fa-chart-line', text: 'Inserting continuous compliance monitoring steps' },
      { icon: 'fas fa-check-circle', text: 'Updated policy content prepared for review' }
    ]
  },
  {
    title: 'Human Approval Obtained',
    description: 'Approve and verify updated policy findings, authorize publication',
    details: [
      { icon: 'fas fa-envelope', text: 'Notifying policy reviewer' },
      { icon: 'fas fa-user-clock', text: 'Awaiting manual approval for policy updates' },
      { icon: 'fas fa-check-circle', text: 'Approval received from compliance.officer@conocophillips.com' }
    ]
  },
  {
    title: 'Updated Policy Published',
    description: 'Publish new policy version to repository',
    details: [
      { icon: 'fas fa-cog', text: 'MCP: policy_repository_mcp.prepare_publication()' },
      { icon: 'fas fa-cloud-upload-alt', text: 'Updating policy repository with version 2.1' },
      { icon: 'fas fa-users', text: 'Notifying stakeholders of policy update' },
      { icon: 'fas fa-check-circle', text: 'Policy POL-2026-00542 v2.1 published successfully' }
    ]
  }
];
