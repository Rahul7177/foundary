export const networkProvisioningConfig = {
  title: 'Branch Site Commissioning Agent',
  runId: 'BRANCH-COMM-2026-0142',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#BRANCH-COMM-2026-0142',
    issueType: 'Network Provisioning',
    affectedSystem: 'HOU-BR-042 (Regional Office, 150 users)',
    triggeredBy: 'ServiceNow RITM'
  },
  relatedIncidents: [
    { id: 'BRANCH-COMM-2026-0142', label: 'Branch Site Commissioning' }
  ],
  tools: [
    'ServiceNow MCP',
    'Ansible Config MCP',
    'AI Validation MCP',
    'Ansible Tower MCP',
    'Network CLI MCP'
  ]
};

export const networkProvisioningSteps = [
  {
    title: 'Fetch ServiceNow Details',
    description: 'Retrieving branch commissioning template and configuration parameters',
    details: [
      { icon: 'fas fa-cloud-download-alt', text: 'MCP: servicenow_mcp.fetch_template_data()' },
      { icon: 'fas fa-plug', text: 'Connecting to ServiceNow instance: snow-prod.infosys.com' },
      { icon: 'fas fa-file-alt', text: 'Template ID: BRANCH-COMM-2026-0142 retrieved' },
      { icon: 'fas fa-globe', text: 'Country Code: US | Branch Code: HOU-BR-042' },
      { icon: 'fas fa-sitemap', text: 'Branch Type: Regional Office | Users: 150' },
      { icon: 'fas fa-network-wired', text: 'Router IP: 10.142.0.1 | Switch IP: 10.142.0.2 | Transit: 172.16.50.1' },
      { icon: 'fas fa-th-list', text: 'Subnets: 10.142.0.0/24, 10.142.1.0/24, 10.142.2.0/24' },
      { icon: 'fas fa-check-circle', text: 'All parameters validated successfully' }
    ]
  },
  {
    title: 'Generate Ansible Configuration',
    description: 'Generating Cisco IOS router and switch configurations via Ansible playbook',
    details: [
      { icon: 'fas fa-cogs', text: 'MCP: ansible_mcp.generate_ios_config(params)' },
      { icon: 'fas fa-file-code', text: 'Loading playbook template: cisco_ios_branch_config.yml' },
      { icon: 'fas fa-terminal', text: 'Router config: hostname HOU-BR-042-RTR01, WAN/LAN interfaces' },
      { icon: 'fas fa-terminal', text: 'Switch config: hostname HOU-BR-042-SW01, VLANs 10/20/99' },
      { icon: 'fas fa-terminal', text: 'Static routing: 0.0.0.0/0 via 172.16.50.254' },
      { icon: 'fas fa-file-alt', text: 'Configuration generated: 127 lines (router + switch)' },
      { icon: 'fas fa-check-circle', text: 'Syntax check: PASSED' }
    ]
  },
  {
    title: 'AI Configuration Validation',
    description: 'Running AI-powered validation engine to verify configuration accuracy',
    details: [
      { icon: 'fas fa-robot', text: 'MCP: validation_mcp.validate_configuration(config)' },
      { icon: 'fas fa-brain', text: 'Model loaded: NetworkConfigValidator-v3.2' },
      { icon: 'fas fa-check', text: 'IP address format validation: PASS' },
      { icon: 'fas fa-check', text: 'VLAN configuration check: PASS' },
      { icon: 'fas fa-check', text: 'Routing table verification: PASS' },
      { icon: 'fas fa-check', text: 'Security policy compliance: PASS' },
      { icon: 'fas fa-chart-bar', text: 'Validation Summary: 24/24 checks passed, 0 failures, 0 warnings' },
      { icon: 'fas fa-check-circle', text: 'Configuration accuracy: 100% - APPROVED FOR DEPLOYMENT' }
    ]
  },
  {
    title: 'Key-Value Mapping',
    description: 'Mapping ServiceNow parameters to Ansible Tower work items',
    details: [
      { icon: 'fas fa-project-diagram', text: 'Mapping configuration parameters to work items...' },
      { icon: 'fas fa-key', text: 'country_code: US -> WI-001' },
      { icon: 'fas fa-key', text: 'branch_code: HOU-BR-042 -> WI-002' },
      { icon: 'fas fa-key', text: 'router_ip: 10.142.0.1 -> WI-005' },
      { icon: 'fas fa-key', text: 'switch_ip: 10.142.0.2 -> WI-006' },
      { icon: 'fas fa-key', text: 'transit_ip: 172.16.50.1 -> WI-007' },
      { icon: 'fas fa-key', text: 'Subnets: 3 items mapped -> WI-008/009/010' },
      { icon: 'fas fa-check-circle', text: '10 work items created and mapped' }
    ]
  },
  {
    title: 'Push via Ansible Tower',
    description: 'Deploying configuration to branch network devices',
    details: [
      { icon: 'fas fa-cloud-upload-alt', text: 'MCP: ansible_tower_mcp.push_configuration()' },
      { icon: 'fas fa-plug', text: 'Connected: tower.infosys.com' },
      { icon: 'fas fa-play', text: 'Job template initiated: Branch_Commissioning_v2 (Job ID: 42891)' },
      { icon: 'fas fa-server', text: 'HOU-BR-042-RTR01: SSH connected -> Config applied -> Verified' },
      { icon: 'fas fa-network-wired', text: 'HOU-BR-042-SW01: SSH connected -> Config applied -> Verified' },
      { icon: 'fas fa-check-circle', text: 'All configurations pushed and verified. Job 42891 completed' }
    ]
  },
  {
    title: 'Generate Execution Logs',
    description: 'Compiling audit trail and execution summary',
    details: [
      { icon: 'fas fa-file-alt', text: 'Compiling execution log from all workflow steps...' },
      { icon: 'fas fa-list', text: 'ServiceNow data fetch: SUCCESS (3s)' },
      { icon: 'fas fa-list', text: 'Ansible config generation: SUCCESS (7s)' },
      { icon: 'fas fa-list', text: 'AI validation: SUCCESS, 100% accuracy (10s)' },
      { icon: 'fas fa-list', text: 'Key-value mapping: 10 items created (3s)' },
      { icon: 'fas fa-list', text: 'Ansible Tower push: 2 devices configured (17s)' },
      { icon: 'fas fa-chart-pie', text: 'Total Duration: 58 seconds | Devices: 2 | Status: DEPLOYMENT SUCCESSFUL' },
      { icon: 'fas fa-check-circle', text: 'Execution logs generated and archived' }
    ]
  }
];
