export const dataPrivacyConfig = {
  title: 'Data Privacy Agent',
  runId: 'DP_RUN_2026012610_07',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#DP-SCAN-2026-W04',
    issueType: 'Data Privacy Monitoring',
    affectedSystem: 'OneTrust / SharePoint / SAP / Azure Blob',
    triggeredBy: 'Continuous Privacy Monitoring'
  },
  relatedIncidents: [
    { id: 'DP-2026-0849', label: 'OneTrust Contract Issue' },
    { id: 'DP-2026-0847', label: 'SharePoint PII Exposure' },
    { id: 'DP-2026-0846', label: 'SAP Excessive Access' },
    { id: 'DP-2026-0845', label: 'Azure Blob Encryption Gap' }
  ],
  tools: [
    'Ariba MCP',
    'OneTrust MCP',
    'ServiceNow MCP',
    'SharePoint MCP',
    'Azure Info Protection',
    'SAP Access MCP'
  ]
};

export const dataPrivacySteps = [
  {
    title: 'OneTrust Contract Assessment',
    description: 'Resolving missing vendor contract in privacy assessment tool',
    details: [
      { icon: 'fas fa-search', text: 'MCP: servicenow_mcp.parse_incident(DP-2026-0849)' },
      { icon: 'fas fa-brain', text: 'AI Classification: Privacy Assessment - Missing Vendor Contract' },
      { icon: 'fas fa-shopping-cart', text: 'MCP: ariba_mcp.fetch_contract(CNT-2026-00847)' },
      { icon: 'fas fa-file-contract', text: 'Contract found: Vendor ABC Inc. - Data Processing Agreement' },
      { icon: 'fas fa-check', text: 'Status: Published | Hierarchy: Master Agreement | Security: Tier 2' },
      { icon: 'fas fa-shield-alt', text: 'MCP: onetrust_mcp.insert_inventory(Vendor ABC Inc.)' },
      { icon: 'fas fa-link', text: 'Contract linked to assessment: ASM-2026-00124' },
      { icon: 'fas fa-check-circle', text: 'Incident resolved - Total time: 2m 18s' }
    ]
  },
  {
    title: 'OneTrust Legal Entity Integration',
    description: 'Resolving missing legal entity in privacy assessment tool',
    details: [
      { icon: 'fas fa-search', text: 'MCP: servicenow_mcp.parse_incident(DP-2026-0848)' },
      { icon: 'fas fa-brain', text: 'AI Classification: Privacy Assessment - Missing Legal Entity' },
      { icon: 'fas fa-clock', text: 'Assessment age: Over 1 month pending - Priority elevated' },
      { icon: 'fas fa-building', text: 'MCP: gems_mcp.fetch_entity(LE-Infosys-UK-001)' },
      { icon: 'fas fa-check', text: 'Legal Entity found: Infosys UK Limited' },
      { icon: 'fas fa-shield-alt', text: 'MCP: onetrust_mcp.sync_legal_entity(LE-UK-001)' },
      { icon: 'fas fa-check-circle', text: 'Entity synced to OneTrust successfully' }
    ]
  },
  {
    title: 'SharePoint PII Exposure Response',
    description: 'Detecting and remediating unencrypted SSN exposure in SharePoint',
    details: [
      { icon: 'fas fa-exclamation-triangle', text: 'ALERT: DP-2026-0847 - Potential PII breach detected' },
      { icon: 'fas fa-search', text: 'Scanning file: Customer_Master_List.xlsx' },
      { icon: 'fas fa-exclamation-circle', text: 'Detected 2,847 SSN patterns in unencrypted format' },
      { icon: 'fas fa-users', text: 'File accessible to 156 users + 3 partner organizations' },
      { icon: 'fas fa-lock', text: 'MCP: sharepoint_mcp.restrict_access(Data Protection Team only)' },
      { icon: 'fas fa-tag', text: 'MCP: azure_aip.apply_label(Highly Confidential - PII)' },
      { icon: 'fas fa-key', text: 'Encryption applied to sensitive columns' },
      { icon: 'fas fa-envelope', text: 'DPO notification sent within 72-hour GDPR requirement' },
      { icon: 'fas fa-check-circle', text: 'PII exposure contained and remediated' }
    ]
  },
  {
    title: 'SAP Excessive Access Detection',
    description: 'Analyzing user access patterns in SAP for dormant privilege accounts',
    details: [
      { icon: 'fas fa-chart-bar', text: 'MCP: sap_access_mcp.analyze_access_logs(90_days)' },
      { icon: 'fas fa-exclamation-triangle', text: 'DP-2026-0846: Excessive SAP access privileges detected' },
      { icon: 'fas fa-user-clock', text: 'Pattern: 12 users have not accessed training module in 90+ days' },
      { icon: 'fas fa-user-slash', text: 'Flagging dormant privileged accounts for recertification' },
      { icon: 'fas fa-shield-alt', text: 'Recommendation: Revoke access pending manager re-approval' },
      { icon: 'fas fa-check-circle', text: 'Access review workflow initiated' }
    ]
  },
  {
    title: 'Azure Blob Encryption Audit',
    description: 'Scanning Azure storage containers for encryption compliance gaps',
    details: [
      { icon: 'fas fa-search', text: 'MCP: azure_blob_mcp.scan_containers(encryption_status)' },
      { icon: 'fas fa-exclamation-triangle', text: 'DP-2026-0845: Container employee-records-2024 - AES-256 not enabled' },
      { icon: 'fas fa-database', text: '4,521 employee records in unencrypted container' },
      { icon: 'fas fa-key', text: 'Enabling AES-256 encryption on affected containers...' },
      { icon: 'fas fa-check', text: 'Encryption applied: AES-256 with customer-managed keys' },
      { icon: 'fas fa-check-circle', text: 'Storage encryption audit complete' }
    ]
  },
  {
    title: 'Data Retention Policy Compliance',
    description: 'Verifying data retention schedules and auto-purge configurations',
    details: [
      { icon: 'fas fa-calendar-check', text: 'MCP: compliance_engine.check_retention_policies()' },
      { icon: 'fas fa-check', text: 'Auto-purge: 2,341 records scheduled for deletion (policy-compliant)' },
      { icon: 'fas fa-trash-alt', text: 'Retention violations: 0 - All within defined retention windows' },
      { icon: 'fas fa-archive', text: 'Archive verification: All expired data flagged for secure deletion' },
      { icon: 'fas fa-check-circle', text: 'Data retention compliance: PASS' }
    ]
  },
  {
    title: 'External Sharing Analysis',
    description: 'Analyzing externally shared documents for sensitive data exposure',
    details: [
      { icon: 'fas fa-share-alt', text: 'MCP: sharepoint_mcp.scan_external_shares()' },
      { icon: 'fas fa-exclamation-triangle', text: 'External M&A documents shared with unverified recipients' },
      { icon: 'fas fa-file-alt', text: 'Files flagged: 3 documents containing confidential deal terms' },
      { icon: 'fas fa-user-lock', text: 'Recommendation: Restrict sharing to NDA-verified recipients only' },
      { icon: 'fas fa-check-circle', text: 'External sharing review complete' }
    ]
  },
  {
    title: 'Generate Privacy Dashboard',
    description: 'Compiling privacy monitoring results and trend analysis',
    details: [
      { icon: 'fas fa-chart-pie', text: 'Compiling weekly data privacy report...' },
      { icon: 'fas fa-check', text: 'Compliant: 1,892 records processed' },
      { icon: 'fas fa-exclamation-triangle', text: 'Warnings: 89 access anomalies flagged' },
      { icon: 'fas fa-times-circle', text: 'Potential Breaches: 3 incidents requiring immediate attention' },
      { icon: 'fas fa-clock', text: 'Pending Review: 28 cases' },
      { icon: 'fas fa-chart-line', text: 'Trend: Privacy violations decreased 23% this quarter' },
      { icon: 'fas fa-paper-plane', text: 'Dashboard published with case details and agent workflows' },
      { icon: 'fas fa-check-circle', text: 'Data Privacy monitoring cycle complete' }
    ]
  }
];
