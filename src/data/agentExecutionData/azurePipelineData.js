export const azurePipelineConfig = {
  title: 'Azure Pipeline Monitoring Agent',
  runId: 'PIPELINE_RUN_2025122212_05',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#INC0099827',
    issueType: 'Azure Pipeline Job Failure (ETL-DataSync)',
    affectedSystem: 'Application Data Flow - AZ-PIPE-2025-00847',
    triggeredBy: 'SRE Monitoring Agent'
  },
  relatedIncidents: [
    { id: 'INC0099827', label: 'Pipeline Failure' },
    { id: 'INC0099815', label: 'Related (resolved via restart)' },
    { id: 'DEP-2025-00234', label: 'Recent Deployment' }
  ],
  tools: [
    'Azure DevOps API',
    'ServiceNow MCP',
    'PowerShell MCP',
    'Veeam One / VBR',
    'Server & Veeam Scripts',
    'Verification Scripts'
  ]
};

export const azurePipelineSteps = [
  {
    title: 'Monitor Azure Job Failure - SRE Alert',
    description: 'SRE Monitoring Agent detected Azure pipeline job failure',
    details: [
      { icon: 'fas fa-bell', text: 'SRE Monitoring Agent detected pipeline failure' },
      { icon: 'fas fa-exclamation-triangle', text: 'Pipeline: AZ-PIPE-2025-00847 | Job: ETL-DataSync-Production' },
      { icon: 'fas fa-server', text: 'Impact: Application data flow disrupted' },
      { icon: 'fas fa-search', text: 'Finding related incidents from past 24 hours...' },
      { icon: 'fas fa-link', text: 'Found 1 related incident: INC0099815 (resolved via restart)' }
    ]
  },
  {
    title: 'ServiceNow Agent - Incident Creation',
    description: 'Creating incident ticket and linking to pipeline failure',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow MCP: Creating incident for pipeline failure...' },
      { icon: 'fas fa-check-circle', text: 'Incident #INC0099827 created successfully' },
      { icon: 'fas fa-link', text: 'Linked to recent deployment: DEP-2025-00234' },
      { icon: 'fas fa-tags', text: 'Category: ADM | Priority: Critical | Assignment: Pipeline Team' },
      { icon: 'fas fa-history', text: 'Similar incidents resolved 90% via pipeline restart' }
    ]
  },
  {
    title: 'Integration/Job Log Parser - Root Cause Analysis',
    description: 'Parsing integration and job logs to identify root cause',
    details: [
      { icon: 'fas fa-brain', text: 'LLM Integration: Analyzing job logs with OpenAI GPT-4...' },
      { icon: 'fas fa-file-alt', text: 'Fetching Azure DevOps pipeline execution logs...' },
      { icon: 'fas fa-search', text: 'Parsing error traces and stack dumps...' },
      { icon: 'fas fa-exclamation-circle', text: 'Root Cause: Deployment failure - container image pull timeout' },
      { icon: 'fas fa-clipboard-list', text: 'Plan: Validate all checkpoints > Confirm SOP > Restart with fix' }
    ]
  },
  {
    title: 'Application Validation - Multi-Point Check',
    description: 'Comprehensive validation: File format, User input, Scripts, Integration, Deployment, Timeout, Dependencies',
    details: [
      { icon: 'fas fa-file-code', text: 'Check 1: File Format Issues - PASS' },
      { icon: 'fas fa-user-edit', text: 'Check 2: Missing User Input - PASS' },
      { icon: 'fas fa-code', text: 'Check 3: Custom Scripts/Business Logic - PASS' },
      { icon: 'fas fa-plug', text: 'Check 4: Integration Issues - PASS' },
      { icon: 'fas fa-rocket', text: 'Check 5: Deployment Failures - FAIL (Container image pull failed)' },
      { icon: 'fas fa-clock', text: 'Check 6: Timeout Issues - WARNING (Network latency detected)' },
      { icon: 'fas fa-cubes', text: 'Check 7: Missing Dependencies - PASS' }
    ]
  },
  {
    title: 'SOP Validation - Root Cause Confirmation',
    description: 'Validating root cause against SOPs and confirming remediation steps',
    details: [
      { icon: 'fas fa-clipboard-check', text: 'SOP Validation Agent confirming root cause...' },
      { icon: 'fas fa-check-double', text: 'SOP Match: KB0089456 - Container Image Pull Failure Resolution' },
      { icon: 'fas fa-file-alt', text: 'Root Cause Confirmed: Deployment failure due to registry timeout' },
      { icon: 'fas fa-wrench', text: 'Recommended Fix: Clear cache, retry image pull, restart pipeline' },
      { icon: 'fas fa-user-check', text: 'Requires: Support Engineer approval for pipeline restart' }
    ]
  },
  {
    title: 'Support Engineer In Loop - Approval',
    description: 'Routing to Support Engineer for pipeline restart approval',
    details: [
      { icon: 'fas fa-user-tie', text: 'Routing to Support Engineer for pipeline restart approval...' },
      { icon: 'fas fa-file-signature', text: 'Approval Request: Fix issue and restart Azure Pipeline' },
      { icon: 'fas fa-shield-alt', text: 'Risk Assessment: MEDIUM (deployment fix required)' },
      { icon: 'fas fa-clock', text: 'Waiting for approval... (Auto-escalation: 10 minutes)' },
      { icon: 'fas fa-check-circle', text: 'APPROVED by Support Engineer (Sarah Johnson) at 12:15 PM' }
    ]
  },
  {
    title: 'Service Restart & Incident Resolution',
    description: 'Restarting Azure pipeline, validating data flow, and closing incident',
    details: [
      { icon: 'fas fa-trash-alt', text: 'PowerShell MCP: Clearing container registry cache...' },
      { icon: 'fas fa-sync-alt', text: 'Retrying container image pull from registry...' },
      { icon: 'fas fa-check-circle', text: 'Container image pulled successfully' },
      { icon: 'fas fa-play-circle', text: 'Azure Pipeline: Restarting ETL-DataSync-Production job...' },
      { icon: 'fas fa-database', text: 'Data Flow Status: Restored - Active' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow #INC0099827 resolved with auto-generated notes' },
      { icon: 'fas fa-bell', text: 'Resolution notification sent to Data Engineering team' }
    ]
  }
];
