export const ethicsComplianceConfig = {
  title: 'Ethics & Compliance Agent',
  runId: 'EC_RUN_2026012610_06',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#EC-SCAN-2026-W04',
    issueType: 'Ethics & Compliance Monitoring',
    affectedSystem: 'EthicsPoint / E&C Register / Ariba',
    triggeredBy: 'Scheduled Weekly Scan'
  },
  relatedIncidents: [
    { id: 'EC-2026-0142', label: 'Bulk Upload Access (Warning)' },
    { id: 'EC-2026-0143', label: 'Duplicate Profile (Warning)' },
    { id: 'EC-2026-0139', label: 'FCPA Screening Gap (Warning)' },
    { id: 'EC-2026-0135', label: 'Conflict of Interest (Pending)' }
  ],
  tools: [
    'ServiceNow MCP',
    'Azure SQL MCP',
    'Workday MCP',
    'Ariba MCP',
    'Document AI MCP',
    'Compliance Engine'
  ]
};

export const ethicsComplianceSteps = [
  {
    title: 'Initialize Compliance Scan',
    description: 'Connecting to ethics and compliance data sources for weekly monitoring',
    details: [
      { icon: 'fas fa-satellite-dish', text: 'MCP: compliance_engine.initialize_weekly_scan()' },
      { icon: 'fas fa-database', text: 'Connected to E&C Register, Azure SQL, Workday, Ariba' },
      { icon: 'fas fa-calendar-check', text: 'Scan Period: This Week (01/20/2026 - 01/26/2026)' },
      { icon: 'fas fa-layer-group', text: 'Categories: Gift & Entertainment, User Mgmt, Anti-Corruption, Financial, Workplace Ethics, Environmental' },
      { icon: 'fas fa-file-alt', text: '1,068 records queued for analysis' },
      { icon: 'fas fa-check-circle', text: 'All data sources connected successfully' }
    ]
  },
  {
    title: 'Gift & Entertainment Monitoring',
    description: 'Analyzing E&C Register entries for policy violations',
    details: [
      { icon: 'fas fa-gift', text: 'MCP: azure_sql_mcp.query_ec_register(category=gift_entertainment)' },
      { icon: 'fas fa-exclamation-triangle', text: 'EC-2026-0142: User attempting bulk upload of hosting records' },
      { icon: 'fas fa-search', text: 'Root Cause: User missing bulk upload access role in Azure SQL' },
      { icon: 'fas fa-user-shield', text: 'Decision: Notify E&C Support for approval (Human in Loop)' },
      { icon: 'fas fa-database', text: 'Pending: Add user role in Azure SQL once approved' },
      { icon: 'fas fa-check-circle', text: 'Case flagged as WARNING - High Risk' }
    ]
  },
  {
    title: 'User Profile Integrity Check',
    description: 'Detecting duplicate profiles and access control violations',
    details: [
      { icon: 'fas fa-users-cog', text: 'MCP: workday_mcp.sync_check(databricks_report)' },
      { icon: 'fas fa-exclamation-triangle', text: 'EC-2026-0143: Duplicate profile detected in E&C system' },
      { icon: 'fas fa-exchange-alt', text: 'Root Cause: Workday sync created duplicate during BU transfer' },
      { icon: 'fas fa-shield-alt', text: 'Impact: Audit trail inconsistency, access control risk' },
      { icon: 'fas fa-robot', text: 'Decision: IF Duplicate -> Email integration team | IF No Duplicate -> Soft delete' },
      { icon: 'fas fa-check-circle', text: 'Case flagged as WARNING - High Risk' }
    ]
  },
  {
    title: 'Anti-Corruption & FCPA Screening',
    description: 'Verifying third-party due diligence and vendor screening compliance',
    details: [
      { icon: 'fas fa-balance-scale', text: 'MCP: ariba_mcp.verify_vendor_screening(new_vendors)' },
      { icon: 'fas fa-exclamation-triangle', text: 'EC-2026-0139: Vendor onboarded without complete FCPA documentation' },
      { icon: 'fas fa-dollar-sign', text: 'Contract Value: .2M - Missing beneficial ownership verification' },
      { icon: 'fas fa-fast-forward', text: 'Root Cause: Expedited approval bypassed standard screening' },
      { icon: 'fas fa-file-medical', text: 'Action: Request missing documents from vendor' },
      { icon: 'fas fa-check-circle', text: 'Case flagged as WARNING - Medium Risk' }
    ]
  },
  {
    title: 'Financial Controls & SOX Validation',
    description: 'Validating SOX Section 404 internal controls for Q4 financial close',
    details: [
      { icon: 'fas fa-file-invoice-dollar', text: 'MCP: compliance_engine.validate_sox_controls(Q4)' },
      { icon: 'fas fa-check', text: 'EC-2026-0137: All 47/47 Q4 financial close controls PASSED' },
      { icon: 'fas fa-clipboard-check', text: 'Automated control testing: 100% pass rate' },
      { icon: 'fas fa-archive', text: 'Complete audit trail archived in compliance repository' },
      { icon: 'fas fa-check-circle', text: 'SOX compliance: COMPLIANT - Low Risk' }
    ]
  },
  {
    title: 'Workplace Ethics & Conflict of Interest',
    description: 'Processing employee disclosures and conflict of interest cases',
    details: [
      { icon: 'fas fa-user-tie', text: 'MCP: compliance_engine.process_disclosures()' },
      { icon: 'fas fa-exclamation-triangle', text: 'EC-2026-0135: Employee disclosed 8% equity stake in vendor TechSupply Inc.' },
      { icon: 'fas fa-file-contract', text: '3 active contracts affected, totaling  annually' },
      { icon: 'fas fa-gavel', text: 'Decision: Material conflict detected - Require recusal from vendor decisions' },
      { icon: 'fas fa-paper-plane', text: 'Conflict assessment report generated for Ethics Board' },
      { icon: 'fas fa-check-circle', text: 'Case flagged as PENDING - Medium Risk' }
    ]
  },
  {
    title: 'Environmental Compliance Validation',
    description: 'Verifying EPA emissions reporting and permit compliance',
    details: [
      { icon: 'fas fa-leaf', text: 'MCP: compliance_engine.validate_emissions(Q4)' },
      { icon: 'fas fa-check', text: 'EC-2026-0133: Q4 emissions report submitted on time' },
      { icon: 'fas fa-chart-bar', text: 'Emissions: 12,450 metric tons CO2e (Permit: 15,000)' },
      { icon: 'fas fa-percentage', text: 'Variance: 17% below permitted threshold' },
      { icon: 'fas fa-archive', text: 'EPA submission documentation archived' },
      { icon: 'fas fa-check-circle', text: 'Environmental compliance: COMPLIANT - Low Risk' }
    ]
  },
  {
    title: 'Generate Compliance Dashboard',
    description: 'Compiling results across all compliance categories',
    details: [
      { icon: 'fas fa-chart-pie', text: 'Compiling weekly compliance monitoring report...' },
      { icon: 'fas fa-check', text: 'Compliant Cases: 847 (up 12% from last month)' },
      { icon: 'fas fa-exclamation-triangle', text: 'Warnings Issued: 156 (down 8% from last month)' },
      { icon: 'fas fa-times-circle', text: 'Violations Detected: 23 (down 15% from last month)' },
      { icon: 'fas fa-clock', text: 'Pending Review: 42 cases (Avg resolution: 2.3 days)' },
      { icon: 'fas fa-chart-line', text: 'Trend: Data privacy violations decreased 23% this quarter' },
      { icon: 'fas fa-paper-plane', text: 'Dashboard published with case details and agent workflows' },
      { icon: 'fas fa-check-circle', text: 'Ethics & Compliance monitoring cycle complete' }
    ]
  }
];
