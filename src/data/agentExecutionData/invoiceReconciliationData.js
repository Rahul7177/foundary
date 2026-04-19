export const invoiceReconciliationConfig = {
  title: 'Invoice Reconciliation Agent',
  runId: 'INV_REC_20251220_46',
  startedAt: '45 seconds ago',
  priority: 'medium',
  trigger: {
    ticket: '#SR0012346',
    issueType: 'Invoice Processing - 2/3 Way Matching',
    affectedSystem: 'Treasury / Accounts Payable - INV-2025-78432 (,000)',
    triggeredBy: 'O365 AP Inbox Monitor'
  },
  relatedIncidents: [
    { id: 'SR0012346', label: 'Service Request' },
    { id: 'PO-2025-45678', label: 'Purchase Order' },
    { id: 'GR-2025-89012', label: 'Goods Receipt' }
  ],
  tools: [
    'O365 MCP (Email)',
    'ServiceNow MCP',
    'SAP S4 MCP',
    'Invoice OCR Engine',
    'ML GL Coding Model'
  ]
};

export const invoiceReconciliationSteps = [
  {
    title: 'O365 MCP - Invoice Receipt Detection',
    description: 'Monitoring AP inbox for new vendor invoices',
    details: [
      { icon: 'fas fa-envelope-open', text: 'O365 MCP: Monitoring AP inbox (ap-invoices@conocophillips.com)...' },
      { icon: 'fas fa-paperclip', text: 'New email detected from vendor: Acme Industrial Supply' },
      { icon: 'fas fa-file-pdf', text: 'Attachment extracted: INV-2025-78432.pdf (Invoice)' },
      { icon: 'fas fa-robot', text: 'Invoice OCR Engine: Extracting invoice data...' },
      { icon: 'fas fa-check-circle', text: 'Invoice data extracted: Amount $425,000.00 | PO: PO-2025-45678' }
    ]
  },
  {
    title: 'ServiceNow Agent - Auto SR Creation',
    description: 'Auto-creating service request for invoice processing workflow',
    details: [
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow MCP: Auto-creating service request...' },
      { icon: 'fas fa-check-circle', text: 'Service Request SR0012346 created successfully' },
      { icon: 'fas fa-link', text: 'Linked to: Vendor Master (Acme Industrial Supply)' },
      { icon: 'fas fa-link', text: 'Linked to: PO-2025-45678 | GR-2025-89012' },
      { icon: 'fas fa-tags', text: 'Category: Treasury/AP | Priority: Medium | Auto-Process: Enabled' }
    ]
  },
  {
    title: 'Invoice Validation - Pre-validation',
    description: 'Validating invoice for missing, incorrect data or duplicate entries',
    details: [
      { icon: 'fas fa-search', text: 'Invoice Validation Agent: Pre-validating invoice data...' },
      { icon: 'fas fa-check', text: 'Invoice Number: INV-2025-78432 - Valid format' },
      { icon: 'fas fa-check', text: 'Vendor ID: ACME-001 - Active vendor' },
      { icon: 'fas fa-check', text: 'Duplicate Check: No duplicates found' },
      { icon: 'fas fa-check', text: 'Tax Calculations: Verified ($34,000.00 @ 8%)' },
      { icon: 'fas fa-check', text: 'Line Items: 5 items validated' },
      { icon: 'fas fa-check-double', text: 'All pre-validation checks passed!' }
    ]
  },
  {
    title: 'Invoice Matching - 2/3 Way Matching',
    description: 'Matching invoice with PO, Contract, GR/Service Confirmation',
    details: [
      { icon: 'fas fa-link', text: 'Invoice Matching Agent: Performing 2/3-way matching...' },
      { icon: 'fas fa-check', text: 'Invoice to PO-2025-45678: MATCH (Amount, Terms)' },
      { icon: 'fas fa-check', text: 'Invoice to GR-2025-89012: MATCH (Goods received)' },
      { icon: 'fas fa-check', text: 'Price Validation: MATCH (Within 0.5% tolerance)' },
      { icon: 'fas fa-check', text: 'Quantity Match: MATCH (5 units delivered = 5 invoiced)' },
      { icon: 'fas fa-check', text: 'Tax Calculation: MATCH (8% applied correctly)' },
      { icon: 'fas fa-check-double', text: '2/3-way matching complete - no variances detected' }
    ]
  },
  {
    title: 'Exception Resolution - Fallout Analysis',
    description: 'Analyzing matching exceptions and segregating issues for follow-up',
    details: [
      { icon: 'fas fa-search', text: 'Exception Resolution Agent: Analyzing for fallouts...' },
      { icon: 'fas fa-check', text: 'Price tolerance check: No exceptions (0.00% variance)' },
      { icon: 'fas fa-check', text: 'Quantity variance: No exceptions (0 units difference)' },
      { icon: 'fas fa-check', text: 'Service confirmation: N/A (goods-based PO)' },
      { icon: 'fas fa-check', text: 'Contract terms: Compliance verified' },
      { icon: 'fas fa-thumbs-up', text: 'No exceptions found - proceeding to GL coding' }
    ]
  },
  {
    title: 'Invoice Coding - GL Code Assignment',
    description: 'Determining GL code combination using ML model and historical patterns',
    details: [
      { icon: 'fas fa-brain', text: 'ML GL Coding Model: Analyzing historical patterns...' },
      { icon: 'fas fa-database', text: 'Fetching similar invoices from past 12 months...' },
      { icon: 'fas fa-chart-bar', text: 'Pattern match: 98.5% confidence on GL assignment' },
      { icon: 'fas fa-code', text: 'GL Account: 6100-4200-3001 (Industrial Supplies)' },
      { icon: 'fas fa-building', text: 'Cost Center: CC-OPS-045 (Operations Unit 45)' },
      { icon: 'fas fa-check-circle', text: 'GL coding complete - ready for posting' }
    ]
  },
  {
    title: 'Complexity Assessment - Auto-Approve Check',
    description: 'Evaluating complexity score and auto-approval eligibility',
    details: [
      { icon: 'fas fa-calculator', text: 'Smart RCA Engine: Calculating complexity score...' },
      { icon: 'fas fa-plus', text: 'Factor: Invoice amount < $500K (+0 points)' },
      { icon: 'fas fa-plus', text: 'Factor: Standard vendor (+1 point)' },
      { icon: 'fas fa-plus', text: 'Factor: Complete matching (+2 points)' },
      { icon: 'fas fa-plus', text: 'Factor: No exceptions (+2 points)' },
      { icon: 'fas fa-plus', text: 'Factor: Historical GL pattern (+1 point)' },
      { icon: 'fas fa-check-circle', text: 'COMPLEXITY SCORE: 6/10 (MODERATE)' },
      { icon: 'fas fa-robot', text: 'Score < 7 threshold - AUTO SELF-HEAL ENABLED' }
    ]
  },
  {
    title: 'SAP MCP - Post Invoice to S4 ERP',
    description: 'Posting invoice to SAP S4 ERP and scheduling payment',
    details: [
      { icon: 'fas fa-plug', text: 'SAP MCP: Connecting to SAP S4/HANA ERP...' },
      { icon: 'fas fa-file-invoice', text: 'Creating accounting document...' },
      { icon: 'fas fa-check', text: 'Accounting Doc: 5100012847 created' },
      { icon: 'fas fa-wallet', text: 'Vendor balance updated: +$425,000.00' },
      { icon: 'fas fa-calendar-check', text: 'Payment scheduled: Jan 19, 2026 (Net 30)' },
      { icon: 'fas fa-check-circle', text: 'Invoice successfully posted to SAP S4 ERP' }
    ]
  },
  {
    title: 'Resolution & Payment Processing',
    description: 'Closing SR and initiating payment disbursement to vendor',
    details: [
      { icon: 'fas fa-file-signature', text: 'ServiceNow: Updating SR0012346 with resolution...' },
      { icon: 'fas fa-check-circle', text: 'Status: Resolved (Auto Self-Heal)' },
      { icon: 'fas fa-credit-card', text: 'Payment Run: PR-2026-001 (Scheduled Jan 19)' },
      { icon: 'fas fa-envelope', text: 'Confirmation email sent to vendor' },
      { icon: 'fas fa-bell', text: 'Notification sent to Finance Team' },
      { icon: 'fas fa-chart-line', text: 'Efficiency gain: 25-30% faster processing' },
      { icon: 'fas fa-flag-checkered', text: 'Service Request SR0012346 CLOSED' }
    ]
  }
];
