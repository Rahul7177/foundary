export const devopsCoworkerConfig = {
  title: 'DevOps Coworker Agent',
  runId: 'DEVOPS_CW_20260127_01',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#CHG587341',
    issueType: 'Vulnerability Remediation - CI-SERVER-001',
    affectedSystem: 'Windows Server 2022 (Production) - 3 CVEs detected',
    triggeredBy: 'DevOps Coworker Chat Request'
  },
  relatedIncidents: [
    { id: 'CHG587341', label: 'Change Request' },
    { id: 'CVE-2024-21762', label: 'Critical - FortiOS SSL-VPN' },
    { id: 'CVE-2024-1709', label: 'High - ScreenConnect Auth Bypass' }
  ],
  tools: [
    'Vulnerability Agent',
    'Knowledge Agent',
    'CMDB Agent',
    'ServiceNow Agent'
  ]
};

export const devopsCoworkerSteps = [
  {
    title: 'Trigger Received - Chat Request',
    description: 'User requests vulnerability remediation plan for CI-SERVER-001',
    details: [
      { icon: 'fas fa-comment', text: 'User: Show me the remediation plan for vulnerability on CI-SERVER-001' },
      { icon: 'fas fa-robot', text: 'DevOps Coworker multi-agent system activated' },
      { icon: 'fas fa-server', text: 'Target Configuration Item: CI-SERVER-001' },
      { icon: 'fas fa-sitemap', text: 'Routing to: Vulnerability Agent, CMDB Agent, Knowledge Agent' }
    ]
  },
  {
    title: 'CMDB Agent - CI Details Retrieval',
    description: 'Retrieving configuration item details from CMDB',
    details: [
      { icon: 'fas fa-database', text: 'CMDB Agent: Querying CI-SERVER-001...' },
      { icon: 'fas fa-server', text: 'OS: Windows Server 2022' },
      { icon: 'fas fa-shield-alt', text: 'Environment: Production' },
      { icon: 'fas fa-check-circle', text: 'CMDB Agent: Completed' }
    ]
  },
  {
    title: 'Vulnerability Agent - CVE Identification',
    description: 'Scanning CI for known vulnerabilities and CVSS scoring',
    details: [
      { icon: 'fas fa-search', text: 'Vulnerability Agent: Scanning CI-SERVER-001...' },
      { icon: 'fas fa-exclamation-circle', text: 'CRITICAL: CVE-2024-21762 - FortiOS SSL-VPN Out-of-bounds Write (CVSS 9.6)' },
      { icon: 'fas fa-exclamation-triangle', text: 'HIGH: CVE-2024-1709 - ScreenConnect Authentication Bypass (CVSS 8.4)' },
      { icon: 'fas fa-info-circle', text: 'MEDIUM: CVE-2024-0057 - .NET Security Feature Bypass (CVSS 6.5)' },
      { icon: 'fas fa-bug', text: 'CVE-2024-21762 exploited in the wild - immediate action required' },
      { icon: 'fas fa-check-circle', text: 'Vulnerability Agent: Completed - 3 vulnerabilities identified' }
    ]
  },
  {
    title: 'Knowledge Agent - KB Article Reference',
    description: 'Matching CVEs to proven remediation knowledge base articles',
    details: [
      { icon: 'fas fa-book', text: 'Knowledge Agent: Referencing KB articles...' },
      { icon: 'fas fa-file-alt', text: 'KB0012847: FortiOS SSL-VPN Vulnerability Remediation (47 successful applications)' },
      { icon: 'fas fa-file-alt', text: 'KB0013102: ScreenConnect Security Patching Guide (32 successful applications)' },
      { icon: 'fas fa-file-alt', text: 'KB0011456: .NET Framework Security Updates (89 successful applications)' },
      { icon: 'fas fa-check-circle', text: 'Knowledge Agent: Completed - 3 KB articles matched' }
    ]
  },
  {
    title: 'Remediation Plan Generated',
    description: '6-step remediation plan formulated from KB articles and best practices',
    details: [
      { icon: 'fas fa-clipboard-list', text: 'Step 1: Pre-Remediation Backup - Create system snapshot and verify integrity' },
      { icon: 'fas fa-download', text: 'Step 2: FortiOS Upgrade to version 7.4.3 or later (CVE-2024-21762)' },
      { icon: 'fas fa-shield-alt', text: 'Step 3: ScreenConnect Patch - Apply security patch 23.9.8 (CVE-2024-1709)' },
      { icon: 'fas fa-code', text: 'Step 4: .NET Update - Install security update KB5034275 (CVE-2024-0057)' },
      { icon: 'fas fa-vial', text: 'Step 5: Run vulnerability scan to confirm remediation success' },
      { icon: 'fas fa-edit', text: 'Step 6: Update CMDB with remediation details and patch levels' }
    ]
  },
  {
    title: 'ServiceNow Agent - Change Request Creation',
    description: 'Creating change request in ServiceNow with full implementation plan',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow Agent: Creating change request...' },
      { icon: 'fas fa-check-circle', text: 'Change Request CHG587341 created successfully' },
      { icon: 'fas fa-tag', text: 'Type: Normal Change | Priority: High | Category: Security Remediation' },
      { icon: 'fas fa-shield-alt', text: 'Risk Level: Medium' },
      { icon: 'fas fa-calendar', text: 'Implementation Window: Jan 27, 2026, 02:00-06:00 UTC' },
      { icon: 'fas fa-file-alt', text: 'Implementation Plan: 6-step remediation attached' }
    ]
  },
  {
    title: 'Approval Workflow Initiated',
    description: 'Change request routed through CAB, Security Team, and Change Manager approvals',
    details: [
      { icon: 'fas fa-users', text: 'CAB Review: Pending' },
      { icon: 'fas fa-user-shield', text: 'Security Team Approval: Pending' },
      { icon: 'fas fa-user-tie', text: 'Change Manager: Pending' },
      { icon: 'fas fa-clock', text: 'Approval target: Before implementation window Jan 27, 2026' },
      { icon: 'fas fa-check-circle', text: 'All approval workflows triggered successfully' }
    ]
  },
  {
    title: 'Orchestration Complete',
    description: 'All agents completed successfully with ServiceNow tracking',
    details: [
      { icon: 'fas fa-check-double', text: 'Vulnerability Agent: Completed' },
      { icon: 'fas fa-check-double', text: 'Knowledge Agent: Completed' },
      { icon: 'fas fa-check-double', text: 'CMDB Agent: Completed' },
      { icon: 'fas fa-check-double', text: 'ServiceNow Agent: Completed' },
      { icon: 'fas fa-link', text: 'ServiceNow tracking: CHG587341' },
      { icon: 'fas fa-flag-checkered', text: 'DevOps Coworker orchestration complete - ready for follow-up actions' }
    ]
  }
];
