export const nocAgentConfig = {
  title: 'NOC Workbench Agent',
  runId: 'NOC_RUN_2026012609_30',
  startedAt: 'Just now',
  priority: 'critical',
  trigger: {
    ticket: '#INC0099830',
    issueType: 'Network Device Down',
    affectedSystem: 'CORE-SW-01 (Cisco Nexus 9300)',
    triggeredBy: 'Logic Monitor Alert'
  },
  relatedIncidents: [
    { id: 'INC0099830', label: 'Core Switch Offline' }
  ],
  tools: [
    'ServiceNow MCP',
    'CMDB MCP',
    'Network CLI MCP',
    'Device Logs MCP',
    'Playbook Engine',
    'Teams Notification MCP'
  ]
};

export const nocAgentSteps = [
  {
    title: 'Alert Detection & Ticket Creation',
    description: 'Logic Monitor alert received and incident auto-created',
    details: [
      { icon: 'fas fa-bell', text: 'Logic Monitor Alert: Core switch CORE-SW-01 detected offline' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow incident INC0099830 auto-created' },
      { icon: 'fas fa-user-check', text: 'Ticket acknowledged and assigned to NOC Workbench Agent' },
      { icon: 'fas fa-exclamation-triangle', text: 'Priority escalated to P1 - Critical' },
      { icon: 'fas fa-check-circle', text: 'Polling Agent handoff complete' }
    ]
  },
  {
    title: 'Issue Analysis & Triage',
    description: 'Understanding issue context and initiating triage workflow',
    details: [
      { icon: 'fas fa-clipboard-list', text: 'MCP: servicenow_mcp.analyze_ticket(INC0099830)' },
      { icon: 'fas fa-tags', text: 'Issue Type: Network Device Down' },
      { icon: 'fas fa-exclamation-circle', text: 'Impact Assessment: High - Core Infrastructure' },
      { icon: 'fas fa-project-diagram', text: 'Triage workflow for switch troubleshooting initiated' },
      { icon: 'fas fa-check-circle', text: 'Ticket Analyst Agent analysis complete' }
    ]
  },
  {
    title: 'CI Discovery & Inventory',
    description: 'Retrieving configuration item data from CMDB',
    details: [
      { icon: 'fas fa-search', text: 'MCP: cmdb_mcp.get_configuration_item(CORE-SW-01)' },
      { icon: 'fas fa-server', text: 'CI Name: CORE-SW-01' },
      { icon: 'fas fa-microchip', text: 'Model: Cisco Nexus 9300' },
      { icon: 'fas fa-map-marker-alt', text: 'Location: Houston Data Center - Rack A12' },
      { icon: 'fas fa-cubes', text: 'Function Class: Core Network Switch' },
      { icon: 'fas fa-sitemap', text: 'Dependencies: 47 downstream devices, 3 upstream links' },
      { icon: 'fas fa-check-circle', text: 'Discovery Agent CI retrieval complete' }
    ]
  },
  {
    title: 'Connectivity Diagnostics',
    description: 'Running connectivity tests to affected device',
    details: [
      { icon: 'fas fa-plug', text: 'MCP: network_cli_mcp.run_diagnostics(10.0.1.1)' },
      { icon: 'fas fa-times-circle', text: 'Ping test to 10.0.1.1: FAILED (100% packet loss)' },
      { icon: 'fas fa-times-circle', text: 'SNMP poll attempt: No response' },
      { icon: 'fas fa-times-circle', text: 'SSH connection attempt: Connection refused' },
      { icon: 'fas fa-exclamation-triangle', text: 'Device confirmed completely unreachable' },
      { icon: 'fas fa-check-circle', text: 'Connectivity Agent diagnostics complete' }
    ]
  },
  {
    title: 'Traffic & Upstream Analysis',
    description: 'Analyzing upstream device and traffic patterns',
    details: [
      { icon: 'fas fa-chart-line', text: 'MCP: network_cli_mcp.ssh_connect(CORE-SW-02)' },
      { icon: 'fas fa-terminal', text: 'Connected to upstream switch CORE-SW-02' },
      { icon: 'fas fa-list', text: 'Checking CDP neighbor table...' },
      { icon: 'fas fa-exclamation-triangle', text: 'CORE-SW-01 missing from CDP neighbors - link down detected' },
      { icon: 'fas fa-check-circle', text: 'Traffic Monitoring Agent analysis complete' }
    ]
  },
  {
    title: 'Device Log Analysis',
    description: 'Analyzing interface logs from CDP neighbor device',
    details: [
      { icon: 'fas fa-file-alt', text: 'MCP: device_logs_mcp.get_interface_logs(CORE-SW-02, Gi1/0/1)' },
      { icon: 'fas fa-times-circle', text: 'Interface Gi1/0/1 status: down/down' },
      { icon: 'fas fa-clock', text: 'Last state change: 09:41:58 AM' },
      { icon: 'fas fa-exclamation-triangle', text: 'Log: LINK-3-UPDOWN: Interface GigabitEthernet1/0/1, changed state to down' },
      { icon: 'fas fa-bolt', text: 'Possible cause: Power supply failure or physical disconnect' },
      { icon: 'fas fa-check-circle', text: 'Log Analyzer Agent analysis complete' }
    ]
  },
  {
    title: 'Remediation Playbook Execution',
    description: 'Executing automated recovery playbook and escalation',
    details: [
      { icon: 'fas fa-play-circle', text: 'MCP: playbook_engine.execute(SW-RECOVERY-001)' },
      { icon: 'fas fa-times-circle', text: 'Remote power cycle attempt: Not supported' },
      { icon: 'fas fa-times-circle', text: 'SNMP reset attempt: Device unreachable' },
      { icon: 'fas fa-exclamation-triangle', text: 'Automated recovery FAILED - Physical intervention required' },
      { icon: 'fas fa-user-clock', text: 'Escalating to SRE team for physical inspection' },
      { icon: 'fas fa-tools', text: 'Field engineer dispatched to Houston DC Rack A12' },
      { icon: 'fas fa-exchange-alt', text: 'Root cause: Power supply failure' },
      { icon: 'fas fa-check-circle', text: 'Action taken: Switch replaced with spare unit by SRE' }
    ]
  },
  {
    title: 'Health Validation & Closure',
    description: 'Validating service restoration and closing incident',
    details: [
      { icon: 'fas fa-check-double', text: 'MCP: network_cli_mcp.health_check(10.0.1.1)' },
      { icon: 'fas fa-check', text: 'Ping test to 10.0.1.1: SUCCESS (0% packet loss)' },
      { icon: 'fas fa-check', text: 'SNMP status: Operational' },
      { icon: 'fas fa-check', text: 'All interfaces: Up/Up' },
      { icon: 'fas fa-sitemap', text: 'Downstream devices: 47/47 reconnected' },
      { icon: 'fas fa-ticket-alt', text: 'ServiceNow ticket INC0099830 updated and closed' },
      { icon: 'fas fa-stopwatch', text: 'MTTR: 16 minutes' },
      { icon: 'fas fa-check-circle', text: 'Incident resolved successfully' }
    ]
  }
];
