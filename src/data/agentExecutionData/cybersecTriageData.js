export const cybersecTriageConfig = {
  title: 'CyberSec Triage Agent',
  runId: 'CYBERSEC_RUN_20260126_45',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#INC0098476',
    issueType: 'Security Alert Triage',
    affectedSystem: 'COP SIEM (Splunk) - ALERT-2026-001847',
    triggeredBy: 'Splunk SIEM Alert'
  },
  relatedIncidents: [
    { id: 'ALERT-2026-001847', label: 'Brute Force Attack' },
    { id: 'INC0098476', label: 'Security Incident' }
  ],
  tools: [
    'Splunk SIEM MCP',
    'ServiceNow MCP',
    'Log Database MCP',
    'MITRE ATT&CK MCP',
    'SOPs MCP',
    'Firewall MCP'
  ]
};

export const cybersecTriageSteps = [
  {
    title: 'Monitor Alert Detection',
    description: 'Query alert from COP SIEM and retrieve security event details',
    details: [
      { icon: 'fas fa-plug', text: 'MCP: splunk_siem_mcp.connect()' },
      { icon: 'fas fa-download', text: 'Retrieving alert data for ALERT-2026-001847' },
      { icon: 'fas fa-cogs', text: 'Parsing alert metadata and event details' },
      { icon: 'fas fa-exclamation-circle', text: 'Severity: CRITICAL - Unauthorized access attempt detected' },
      { icon: 'fas fa-check-circle', text: 'Alert loaded successfully - Monitor Agent complete' }
    ]
  },
  {
    title: 'Incident Creation',
    description: 'Create incident in ServiceNow for detected security alert',
    details: [
      { icon: 'fas fa-network-wired', text: 'MCP: servicenow_mcp.connect()' },
      { icon: 'fas fa-ticket-alt', text: 'Creating incident ticket in ServiceNow' },
      { icon: 'fas fa-info-circle', text: 'Adding alert context, severity details, and SIEM correlation ID' },
      { icon: 'fas fa-check-circle', text: 'Incident INC0098476 created successfully - ServiceNow Agent complete' }
    ]
  },
  {
    title: 'Alert Triage & Log Analysis',
    description: 'Check logs database and detection rules to identify root cause',
    details: [
      { icon: 'fas fa-database', text: 'MCP: log_db_mcp.query_related_events()' },
      { icon: 'fas fa-chart-line', text: 'Analyzing detection rules and patterns' },
      { icon: 'fas fa-project-diagram', text: 'Correlating events across time window' },
      { icon: 'fas fa-exclamation-triangle', text: 'Root cause: Unauthorized access attempt from IP 203.45.67.89' },
      { icon: 'fas fa-check-circle', text: 'Investigation Agent triage complete' }
    ]
  },
  {
    title: 'Threat Investigation',
    description: 'Validate past investigations, check MITRE dataset and threat intelligence',
    details: [
      { icon: 'fas fa-history', text: 'MCP: mitre_mcp.validate_past_investigations()' },
      { icon: 'fas fa-shield-alt', text: 'Cross-referencing MITRE ATT&CK framework' },
      { icon: 'fas fa-brain', text: 'Querying threat intelligence databases' },
      { icon: 'fas fa-crosshairs', text: 'Match found: T1110 - Brute Force Attack' },
      { icon: 'fas fa-check-circle', text: 'Investigation Agent analysis complete' }
    ]
  },
  {
    title: 'Response Planning',
    description: 'Consult Standard Operating Procedure and validate resolution steps',
    details: [
      { icon: 'fas fa-book', text: 'MCP: sops_mcp.fetch_incident_response_sop()' },
      { icon: 'fas fa-tasks', text: 'Validating remediation steps against SOP' },
      { icon: 'fas fa-robot', text: 'Preparing automated response actions' },
      { icon: 'fas fa-check-circle', text: 'SOP validation complete - Response Agent ready for execution' }
    ]
  },
  {
    title: 'Human Approval Gate',
    description: 'Seeking manual approval from firewall support engineer',
    details: [
      { icon: 'fas fa-envelope', text: 'Notifying firewall support engineer' },
      { icon: 'fas fa-user-clock', text: 'Awaiting manual approval for IP blocking action' },
      { icon: 'fas fa-user-check', text: 'Approval received from engineer@conocophillips.com' },
      { icon: 'fas fa-check-circle', text: 'Human-in-the-loop approval obtained' }
    ]
  },
  {
    title: 'RCA & Remediation',
    description: 'Block malicious IP in firewall and validate resolution',
    details: [
      { icon: 'fas fa-ban', text: 'MCP: firewall_mcp.block_ip(203.45.67.89)' },
      { icon: 'fas fa-fire', text: 'Updating firewall ACL rules across network' },
      { icon: 'fas fa-network-wired', text: 'Validating rule deployment across all network segments' },
      { icon: 'fas fa-shield-alt', text: 'Threat mitigated - IP 203.45.67.89 blocked permanently' },
      { icon: 'fas fa-ticket-alt', text: 'Incident INC0098476 updated and resolved' },
      { icon: 'fas fa-check-circle', text: 'RCA Agent remediation complete - Threat neutralized' }
    ]
  }
];
