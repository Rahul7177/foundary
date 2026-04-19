export const cybersecSocConfig = {
  title: 'CyberSec SOC Agent',
  runId: 'SEC-PHI-2026-001234',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#SEC-PHI-2026-001234',
    issueType: 'Phishing Detection & Analysis',
    affectedSystem: 'Email Security Gateway - 15 users impacted',
    triggeredBy: 'Email Security Gateway Alert'
  },
  relatedIncidents: [
    { id: 'SEC-PHI-2026-001234', label: 'Phishing Campaign' }
  ],
  tools: [
    'Active Directory MCP',
    'Exchange MCP',
    'Threat Intel DB MCP',
    'Sandbox MCP',
    'Splunk MCP',
    'Case Manager MCP'
  ]
};

export const cybersecSocSteps = [
  {
    title: 'Identify Impacted Users & Assets',
    description: 'Review user and device entities to determine incident impact',
    details: [
      { icon: 'fas fa-plug', text: 'MCP: active_directory_mcp.connect()' },
      { icon: 'fas fa-search', text: 'Querying user database for recent phishing alerts' },
      { icon: 'fas fa-users', text: 'Identified 15 users who received suspicious email' },
      { icon: 'fas fa-laptop', text: 'Mapping users to workstations and mobile devices' },
      { icon: 'fas fa-server', text: 'Found 18 assets potentially affected (15 workstations, 3 mobile)' },
      { icon: 'fas fa-check-circle', text: 'Asset inventory documented for incident tracking' }
    ]
  },
  {
    title: 'Email Forensics & Header Analysis',
    description: 'Extract sender info, message body, and source IP from email headers',
    details: [
      { icon: 'fas fa-envelope-open', text: 'MCP: exchange_mcp.extract_email_data()' },
      { icon: 'fas fa-exclamation-triangle', text: 'Sender identified: invoices-dept@phish.ru' },
      { icon: 'fas fa-user', text: 'Primary recipient: john.doe@conocophillips.com' },
      { icon: 'fas fa-code', text: 'Parsing SMTP headers and routing information' },
      { icon: 'fas fa-map-marker-alt', text: 'Originating IP: 185.220.101.47 (Russian Federation)' },
      { icon: 'fas fa-link', text: 'Email body contains 3 suspicious URLs' },
      { icon: 'fas fa-inbox', text: 'Found 47 additional emails from same sender (campaign started 02/10)' },
      { icon: 'fas fa-check-circle', text: 'Email forensics complete' }
    ]
  },
  {
    title: 'Threat Intelligence Analysis',
    description: 'Analyze URLs found in email against threat intelligence databases',
    details: [
      { icon: 'fas fa-link', text: 'MCP: threat_intel_db_mcp.analyze_urls()' },
      { icon: 'fas fa-shield-alt', text: 'Querying VirusTotal and AlienVault OTX' },
      { icon: 'fas fa-exclamation-triangle', text: 'URL 1: hxxps://phish.ru/invoice - MALICIOUS (Score: 9/10)' },
      { icon: 'fas fa-exclamation-triangle', text: 'URL 2: hxxps://bit.ly/3xK9mP2 - SUSPICIOUS (Redirects to C2 server)' },
      { icon: 'fas fa-ban', text: 'Domain reputation: Known phishing infrastructure' },
      { icon: 'fas fa-check-circle', text: 'Threat intelligence analysis complete' }
    ]
  },
  {
    title: 'Sandbox Detonation & Analysis',
    description: 'Detonate suspicious files in sandbox to identify malicious behavior',
    details: [
      { icon: 'fas fa-vial', text: 'MCP: sandbox_mcp.submit_email()' },
      { icon: 'fas fa-flask', text: 'Detonating attachments in isolated Cuckoo environment' },
      { icon: 'fas fa-exclamation-circle', text: 'Detected credential harvesting page' },
      { icon: 'fas fa-bug', text: 'JavaScript attempts to steal browser cookies' },
      { icon: 'fas fa-file-alt', text: 'Sandbox report generated - HIGH SEVERITY' },
      { icon: 'fas fa-check-circle', text: 'Sandbox analysis complete' }
    ]
  },
  {
    title: 'User Compromise Assessment',
    description: 'Determine if users clicked malicious links or were compromised',
    details: [
      { icon: 'fas fa-search', text: 'MCP: splunk_mcp.query_user_activity()' },
      { icon: 'fas fa-chart-line', text: 'Analyzing proxy logs for URL access patterns' },
      { icon: 'fas fa-exclamation-triangle', text: '3 users clicked malicious link' },
      { icon: 'fas fa-key', text: '1 user entered credentials on phishing page' },
      { icon: 'fas fa-lock', text: 'Flagging affected accounts for password reset' },
      { icon: 'fas fa-mouse-pointer', text: 'User clicked link at 09:47 AM, outbound connection to 185.220.101.47' },
      { icon: 'fas fa-map-marker-alt', text: 'Account shows anomalous login from new location' },
      { icon: 'fas fa-check-circle', text: 'User compromise assessment complete' }
    ]
  },
  {
    title: 'Phishing Campaign Identification',
    description: 'Analyzing email patterns to identify coordinated phishing campaign',
    details: [
      { icon: 'fas fa-project-diagram', text: 'MCP: case_manager_mcp.analyze_campaign()' },
      { icon: 'fas fa-network-wired', text: 'Identified coordinated phishing campaign' },
      { icon: 'fas fa-bullseye', text: 'Campaign targets: Finance & Accounting departments' },
      { icon: 'fas fa-industry', text: 'Similar campaigns detected at 4 other energy companies' },
      { icon: 'fas fa-share-alt', text: 'IOCs shared with industry ISAC' },
      { icon: 'fas fa-check-circle', text: 'Campaign identification complete' }
    ]
  },
  {
    title: 'Evidence Collection & Preservation',
    description: 'Attach original email, analysis reports, and evidence to case manager',
    details: [
      { icon: 'fas fa-briefcase', text: 'MCP: case_manager_mcp.preserve_evidence()' },
      { icon: 'fas fa-paperclip', text: 'Attaching original email (.eml format)' },
      { icon: 'fas fa-file-csv', text: 'Exporting affected user list to CSV' },
      { icon: 'fas fa-file-pdf', text: 'Uploading sandbox analysis report (PDF)' },
      { icon: 'fas fa-check-circle', text: 'Evidence chain documented for forensics' }
    ]
  },
  {
    title: 'Final Validation & Escalation',
    description: 'Final sandbox validation and escalation to incident response team',
    details: [
      { icon: 'fas fa-vial', text: 'MCP: sandbox_mcp.final_validation()' },
      { icon: 'fas fa-redo', text: 'Re-detonating all suspicious artifacts' },
      { icon: 'fas fa-bug', text: 'Confirmed: Credential harvesting + browser exploit' },
      { icon: 'fas fa-virus', text: 'Malware family identified: FormBook variant' },
      { icon: 'fas fa-exclamation-circle', text: 'Final threat assessment: CRITICAL SEVERITY' },
      { icon: 'fas fa-flag', text: 'Flagging compromised user for additional security training' },
      { icon: 'fas fa-check-circle', text: 'SOC analysis complete - Escalating to IR team' }
    ]
  }
];
