export const cybersecAlertConfig = {
  title: 'CyberSec Alert Review Agent',
  runId: 'CYBERSEC_RUN_2025122211_45',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#SPL-2025-088472',
    issueType: 'Azure Job Failure  False Positive Detection',
    affectedSystem: 'Azure DevOps Pipeline / Veeam Backup',
    triggeredBy: 'Splunk SIEM Alert'
  },
  relatedIncidents: [
    { id: 'INC0099826', label: 'ServiceNow Incident' },
    { id: 'SPL-2025-088469', label: 'Related Alert (resolved)' },
    { id: 'SPL-2025-088465', label: 'Related Alert (resolved)' }
  ],
  tools: [
    'Splunk API',
    'ServiceNow MCP',
    'PowerShell MCP',
    'Veeam One / VBR',
    'Azure DevOps API',
    'Verification Scripts'
  ]
};

export const cybersecAlertSteps = [
  {
    title: 'Monitor Azure Job Failure  Splunk Alert',
    description: 'Splunk SIEM detected Azure backup pipeline failure and finding related incidents',
    details: [
      { icon: 'fas fa-bell', text: 'Splunk SIEM Alert received: SPL-2025-088472' },
      { icon: 'fas fa-exclamation-triangle', text: 'Alert Type: Azure Pipeline Backup Job Failure' },
      { icon: 'fas fa-server', text: 'Affected System: Azure DevOps Pipeline  Veeam Backup' },
      { icon: 'fas fa-search', text: 'Finding related incidents from past 24 hours...' },
      { icon: 'fas fa-link', text: 'Found 2 related alerts: SPL-2025-088469, SPL-2025-088465 (both resolved)' }
    ]
  },
  {
    title: 'ServiceNow Agent  Incident Creation',
    description: 'Creating incident ticket and linking to Splunk alert for tracking',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow MCP: Creating security incident...' },
      { icon: 'fas fa-check-circle', text: 'Incident #INC0099826 created successfully' },
      { icon: 'fas fa-link', text: 'Linked to Splunk Alert SPL-2025-088472' },
      { icon: 'fas fa-tags', text: 'Category: Cyber Security | Priority: Critical | Assignment: SOC Team' },
      { icon: 'fas fa-history', text: 'Similar incidents resolved via pipeline restart (85% success rate)' }
    ]
  },
  {
    title: 'Triaging  Integration & Job Log Analysis',
    description: 'Checking integration and job logs to identify root cause',
    details: [
      { icon: 'fas fa-brain', text: 'LLM Integration: Analyzing alert context with OpenAI GPT-4...' },
      { icon: 'fas fa-file-alt', text: 'Fetching Azure DevOps pipeline execution logs...' },
      { icon: 'fas fa-search', text: 'Analyzing Veeam VBR job history and status...' },
      { icon: 'fas fa-exclamation-circle', text: 'Root Cause Identified: Azure Pipeline Failed  Job timeout' },
      { icon: 'fas fa-clipboard-list', text: 'Action plan: 1) Validate connectivity 2) Check file formats 3) Verify scripts 4) Restart if needed' }
    ]
  },
  {
    title: 'SOC Agentic AI  Multi-Point Validation',
    description: 'Checking connectivity, file format issues, missing user input, and custom scripts',
    details: [
      { icon: 'fas fa-shield-alt', text: 'SOC Agentic AI initiating multi-point security validation...' },
      { icon: 'fas fa-network-wired', text: 'Check 1: Connectivity to Azure DevOps  PASS' },
      { icon: 'fas fa-file-code', text: 'Check 2: File Format Issues  PASS (No corruption detected)' },
      { icon: 'fas fa-user-slash', text: 'Check 3: Missing User Input  PASS (All credentials valid)' },
      { icon: 'fas fa-code', text: 'Check 4: Custom Scripts/Business Logic  WARNING (Script timeout)' },
      { icon: 'fas fa-lightbulb', text: 'Analysis: Transient failure  pipeline hung due to resource contention' }
    ]
  },
  {
    title: 'SOP Validation Agent  Verdict Report',
    description: 'Validating against SOPs and generating alert verdict report',
    details: [
      { icon: 'fas fa-clipboard-check', text: 'SOP Validation Agent generating verdict report...' },
      { icon: 'fas fa-check-double', text: 'SOP Check: Pipeline restart procedure matches KB0089234' },
      { icon: 'fas fa-chart-pie', text: 'False Positive Confidence: 92% (based on pattern analysis)' },
      { icon: 'fas fa-file-alt', text: 'Root Cause: Azure Pipeline Failure  Job Failure (transient)' },
      { icon: 'fas fa-thumbs-up', text: 'VERDICT: FALSE POSITIVE  Safe to restart pipeline' },
      { icon: 'fas fa-user-check', text: 'Recommendation: Proceed with automated restart after engineer approval' }
    ]
  },
  {
    title: 'Support Engineer In Loop  Approval',
    description: 'Routing to Support Engineer for pipeline restart approval',
    details: [
      { icon: 'fas fa-user-tie', text: 'Routing to Support Engineer for pipeline restart approval...' },
      { icon: 'fas fa-file-signature', text: 'Approval Request: Restart Azure Backup Pipeline' },
      { icon: 'fas fa-shield-alt', text: 'Risk Assessment: LOW (false positive confirmed, no security threat)' },
      { icon: 'fas fa-clock', text: 'Waiting for approval... (Auto-timeout: 5 minutes)' },
      { icon: 'fas fa-check-circle', text: 'APPROVED by Support Engineer (John Smith) at 11:52 AM' }
    ]
  },
  {
    title: 'Service Restart & Incident Resolution',
    description: 'Restarting Azure pipeline, validating backup job status, and closing incident',
    details: [
      { icon: 'fas fa-sync-alt', text: 'PowerShell MCP: Initiating Azure pipeline restart...' },
      { icon: 'fas fa-terminal', text: 'Executing: az pipelines run --name "Backup-Pipeline" --branch main' },
      { icon: 'fas fa-server', text: 'Veeam VBR: Triggering backup job validation...' },
      { icon: 'fas fa-check-circle', text: 'Azure Pipeline restarted successfully' },
      { icon: 'fas fa-cloud-upload-alt', text: 'Backup Job Status: Running  Completed' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow #INC0099826 resolved with auto-generated notes' },
      { icon: 'fas fa-bell', text: 'Resolution notification sent to SOC Team and IT Operations' }
    ]
  }
];
