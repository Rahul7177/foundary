export const cabAssistConfig = {
  title: 'CAB Assist Agent',
  runId: 'CAB_RUN_2026012610_43',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#CAB-WEEKLY-2026-W04',
    issueType: 'CAB Validation Review',
    affectedSystem: 'Change Advisory Board - AB_NAFTA',
    triggeredBy: 'Scheduled Weekly Scan'
  },
  relatedIncidents: [
    { id: 'CH60868366', label: 'Risk Validation Failed' },
    { id: 'CH69552779', label: 'Risk + Impact Failed' },
    { id: 'CH69552867', label: 'Risk + Impact Failed' }
  ],
  tools: [
    'ServiceNow MCP',
    'Change Management MCP',
    'AI Validation Engine',
    'Risk Assessment MCP',
    'Document AI MCP'
  ]
};

export const cabAssistSteps = [
  {
    title: 'Fetch Change Requests',
    description: 'Retrieving pending change requests from ServiceNow for CAB review',
    details: [
      { icon: 'fas fa-cloud-download-alt', text: 'MCP: servicenow_mcp.fetch_change_requests(group=AB_NAFTA)' },
      { icon: 'fas fa-filter', text: 'Filter: Date=This Week, Group=AB_NAFTA, Status=Pending Review' },
      { icon: 'fas fa-database', text: '43 change requests retrieved from ServiceNow' },
      { icon: 'fas fa-tags', text: 'Groups: AB_NAFTA, Royal_Board, LCAB, I CAB' },
      { icon: 'fas fa-check-circle', text: 'All CR metadata loaded successfully' }
    ]
  },
  {
    title: 'Presence & Assignee Validation',
    description: 'Verifying CR owner presence in CAB meeting and assignee details',
    details: [
      { icon: 'fas fa-user-check', text: 'MCP: change_mgmt_mcp.validate_presence(cr_list)' },
      { icon: 'fas fa-users', text: 'Checking assignee participation records...' },
      { icon: 'fas fa-check', text: 'CH60868366 (AB_NAFTA): Presence validated - PASS' },
      { icon: 'fas fa-check', text: 'CH69554818 (AB_NAFTA): Presence validated - PASS' },
      { icon: 'fas fa-check', text: 'CH69553965 (roval_Board): Presence validated - PASS' },
      { icon: 'fas fa-chart-bar', text: 'Result: 43/43 CRs passed presence validation' },
      { icon: 'fas fa-check-circle', text: 'Presence validation complete' }
    ]
  },
  {
    title: 'Short Description Analysis',
    description: 'AI-powered validation of CR short descriptions for completeness',
    details: [
      { icon: 'fas fa-align-left', text: 'MCP: ai_validation.analyze_descriptions(cr_list)' },
      { icon: 'fas fa-brain', text: 'NLP engine analyzing short description quality...' },
      { icon: 'fas fa-exclamation-triangle', text: 'CH60868366: Needs Review - Missing geolocation reference (e.g., [US-TX])' },
      { icon: 'fas fa-exclamation-triangle', text: 'CH69554818: Needs Review - Ambiguous scope description' },
      { icon: 'fas fa-exclamation-triangle', text: 'CH69554136: Needs Review - Missing system identifier' },
      { icon: 'fas fa-exclamation-triangle', text: 'CH69553489: Needs Review - No environment specified' },
      { icon: 'fas fa-chart-bar', text: 'Result: 38 PASS, 5 NEEDS REVIEW, 0 FAIL' },
      { icon: 'fas fa-check-circle', text: 'Short description analysis complete' }
    ]
  },
  {
    title: 'Risk Assessment Validation',
    description: 'Cross-referencing declared risk levels against AI risk analysis',
    details: [
      { icon: 'fas fa-exclamation-triangle', text: 'MCP: risk_assessment_mcp.validate_risk(cr_list)' },
      { icon: 'fas fa-brain', text: 'Analyzing historical change data and dependency maps...' },
      { icon: 'fas fa-times-circle', text: 'CH60868366: FAIL - Labeled Low Risk but touches Tier-1 app' },
      { icon: 'fas fa-times-circle', text: 'CH69554818: FAIL - 3 failed deployments for similar changes in 6 months' },
      { icon: 'fas fa-times-circle', text: 'CH69552779: FAIL - Medium Risk on critical payment processing system' },
      { icon: 'fas fa-times-circle', text: 'CH69554136: FAIL - No rollback window defined for production change' },
      { icon: 'fas fa-times-circle', text: 'CH69552867: FAIL - Risk labeled Low but affects 15K daily transactions' },
      { icon: 'fas fa-chart-bar', text: 'Result: 38 PASS, 5 FAIL - Risk misclassification detected' },
      { icon: 'fas fa-check-circle', text: 'Risk validation complete' }
    ]
  },
  {
    title: 'Impact Assessment Validation',
    description: 'Validating impact statements against blast radius analysis',
    details: [
      { icon: 'fas fa-bullseye', text: 'MCP: ai_validation.validate_impact(cr_list)' },
      { icon: 'fas fa-sitemap', text: 'Running blast radius analysis on affected systems...' },
      { icon: 'fas fa-times-circle', text: 'CH69553965: FAIL - States minimal impact but affects core routing' },
      { icon: 'fas fa-times-circle', text: 'CH69552779: FAIL - No customer communication plan for 15K+ users' },
      { icon: 'fas fa-times-circle', text: 'CH69359281: FAIL - Missing blast radius analysis' },
      { icon: 'fas fa-times-circle', text: 'CH69552867: FAIL - Inadequate impact scope documentation' },
      { icon: 'fas fa-chart-bar', text: 'Result: 39 PASS, 4 FAIL - Impact understatement detected' },
      { icon: 'fas fa-check-circle', text: 'Impact validation complete' }
    ]
  },
  {
    title: 'Implementation & Backout Plan Review',
    description: 'Validating implementation plans and backout procedures',
    details: [
      { icon: 'fas fa-tasks', text: 'MCP: ai_validation.review_plans(cr_list)' },
      { icon: 'fas fa-clipboard-check', text: 'Implementation plan review: Checking step-by-step procedures...' },
      { icon: 'fas fa-undo', text: 'Backout plan review: Verifying rollback procedures...' },
      { icon: 'fas fa-check', text: 'Implementation plans: 43/43 PASS' },
      { icon: 'fas fa-check', text: 'Backout plans: 43/43 PASS' },
      { icon: 'fas fa-check-circle', text: 'All implementation and backout plans validated' }
    ]
  },
  {
    title: 'Generate Validation Report',
    description: 'Compiling final validation results and recommendations',
    details: [
      { icon: 'fas fa-file-alt', text: 'Compiling comprehensive validation report...' },
      { icon: 'fas fa-chart-pie', text: 'Overall: 43 CRs analyzed across 7 validation dimensions' },
      { icon: 'fas fa-check', text: 'Clean Pass: 35 CRs (81%) - All checks passed' },
      { icon: 'fas fa-exclamation-triangle', text: 'Needs Review: 5 CRs - Short description improvements needed' },
      { icon: 'fas fa-times-circle', text: 'Failed: 8 CRs (19%) - Risk/Impact validation failures' },
      { icon: 'fas fa-robot', text: 'AI Recommendation: 5 CRs should be REJECTED pending revisions' },
      { icon: 'fas fa-paper-plane', text: 'Report published to CAB dashboard with CR Assistant chat enabled' },
      { icon: 'fas fa-check-circle', text: 'CAB validation workflow complete' }
    ]
  }
];
