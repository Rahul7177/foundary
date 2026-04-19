// =============================================================================
// ExxonMobil AI Agent Foundry - Business User Data
// =============================================================================

export const businessUserSections = [
  { id: 'my-agents', label: 'My Agents', icon: 'fas fa-robot' },
  { id: 'my-reports', label: 'My Reports', icon: 'fas fa-file-alt' },
  { id: 'my-team', label: 'My Team', icon: 'fas fa-users' },
  { id: 'my-plan', label: 'My Plan', icon: 'fas fa-calendar-alt' },
];

export const agentSwimLanes = [
  {
    category: 'Business AI',
    icon: 'fas fa-briefcase',
    color: '#3b82f6',
    agents: [
      { name: 'Payables Agent', icon: 'fas fa-file-invoice-dollar', description: 'Automates invoice processing, verification, and payment workflows. Reduces DPO and improves supplier satisfaction.', stats: [{ label: 'Accuracy', value: '98%' }, { label: 'Tasks/Day', value: '247' }, { label: 'Avg Time', value: '15m' }], link: '/agents/invoice-reconciliation-agent' },
      { name: 'Order Management Agent', icon: 'fas fa-shopping-cart', description: 'Streamlines order processing, tracking, and fulfillment. Provides real-time order status updates.', stats: [{ label: 'Accuracy', value: '95%' }, { label: 'Tasks/Day', value: '342' }, { label: 'Avg Time', value: '8m' }], link: null },
      { name: 'Contract Intelligence Agent', icon: 'fas fa-file-contract', description: 'Analyzes contracts, extracts key terms, and monitors compliance. Automates contract lifecycle management.', stats: [{ label: 'Accuracy', value: '92%' }, { label: 'Tasks/Day', value: '48' }, { label: 'Avg Time', value: '25m' }], link: null },
      { name: 'Budget Planning Agent', icon: 'fas fa-calculator', description: 'Assists in budget planning, forecasting, and variance analysis. Provides data-driven financial insights.', stats: [{ label: 'Accuracy', value: '89%' }, { label: 'Tasks/Day', value: '156' }, { label: 'Avg Time', value: '18m' }], link: null },
    ],
  },
  {
    category: 'Operations AI',
    icon: 'fas fa-cogs',
    color: '#22c55e',
    agents: [
      { name: 'O2C Fault Resolver', icon: 'fas fa-tools', description: 'Autonomous remediation for Order-to-Cash issues. Detects, diagnoses, and resolves system faults automatically.', stats: [{ label: 'Success Rate', value: '96%' }, { label: 'Issues/Day', value: '89' }, { label: 'MTTR', value: '12m' }], link: '/agents/o2c-fault-resolver' },
      { name: 'Report Generation Agent', icon: 'fas fa-chart-bar', description: 'Automates Power BI report generation and distribution. Monitors pipeline health and resolves failures.', stats: [{ label: 'Uptime', value: '94%' }, { label: 'Reports/Day', value: '125' }, { label: 'Avg Fix', value: '8m' }], link: '/agents/report-resolver' },
      { name: 'Incident Manager Agent', icon: 'fas fa-exclamation-triangle', description: 'Manages ServiceNow incidents end-to-end. Automates triage, routing, and resolution tracking.', stats: [{ label: 'Auto-Resolve', value: '92%' }, { label: 'Incidents/Day', value: '214' }, { label: 'Avg Time', value: '15m' }], link: '/agents/incident-details' },
    ],
  },
  {
    category: 'SDLC AI',
    icon: 'fas fa-code',
    color: '#8b5cf6',
    agents: [
      { name: 'Requirements Genie', icon: 'fas fa-file-alt', description: 'Generates user stories from BRDs. Automates Agile backlog creation and Azure DevOps integration.', stats: [{ label: 'Accuracy', value: '88%' }, { label: 'Stories/Day', value: '45' }, { label: 'Avg Time', value: '22m' }], link: null },
      { name: 'Test Automation Agent', icon: 'fas fa-vial', description: 'Generates automated test cases from requirements. Integrates with Selenium and Cypress frameworks.', stats: [{ label: 'Coverage', value: '91%' }, { label: 'Tests/Day', value: '156' }, { label: 'Avg Time', value: '18m' }], link: null },
      { name: 'Architecture Generator', icon: 'fas fa-project-diagram', description: 'Creates architecture diagrams from descriptions. Supports C4 model, UML, and cloud architectures.', stats: [{ label: 'Accuracy', value: '86%' }, { label: 'Diagrams/Day', value: '32' }, { label: 'Avg Time', value: '28m' }], link: null },
    ],
  },
  {
    category: 'Data AI',
    icon: 'fas fa-database',
    color: '#f97316',
    agents: [
      { name: 'Data Pipeline Builder', icon: 'fas fa-database', description: 'Automates ETL pipeline creation. Generates code for Azure Data Factory and Databricks workflows.', stats: [{ label: 'Accuracy', value: '94%' }, { label: 'Pipelines/Day', value: '67' }, { label: 'Avg Time', value: '35m' }], link: null },
      { name: 'GIS Map Agent', icon: 'fas fa-map-marked-alt', description: 'Creates interactive geographic visualizations. Processes spatial data and generates map-based insights.', stats: [{ label: 'Accuracy', value: '90%' }, { label: 'Maps/Day', value: '43' }, { label: 'Avg Time', value: '20m' }], link: null },
      { name: 'Data Quality Agent', icon: 'fas fa-check-circle', description: 'Monitors data quality metrics. Detects anomalies, duplicates, and validates data integrity automatically.', stats: [{ label: 'Detection', value: '97%' }, { label: 'Checks/Day', value: '289' }, { label: 'Avg Time', value: '5m' }], link: null },
    ],
  },
];
