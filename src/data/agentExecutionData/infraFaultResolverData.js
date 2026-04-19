export const infraFaultResolverConfig = {
  title: 'Network VLAN Configuration Agent',
  runId: 'VLAN_RUN_2026012515_47',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#RITM0012847',
    issueType: 'VLAN Configuration',
    affectedSystem: 'RCK-SW-CORE-01 / GigabitEthernet1/1/7',
    triggeredBy: 'ServiceNow Request'
  },
  relatedIncidents: [
    { id: 'RITM0012847', label: 'VLAN Configuration Request' }
  ],
  tools: [
    'ServiceNow MCP',
    'CMDB MCP',
    'Network CLI MCP',
    'Policy Database MCP',
    'Network Config MCP'
  ]
};

export const infraFaultResolverSteps = [
  {
    title: 'Ticket Information Analyst',
    description: 'Scanning and triaging incoming ServiceNow ticket to identify network-related request',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Analyzing ServiceNow ticket RITM0012847...' },
      { icon: 'fas fa-plug', text: 'MCP Tool: snow_get_ticket() -> Retrieving ticket details' },
      { icon: 'fas fa-file-alt', text: 'Ticket RITM0012847 received: "Set VLAN on RCK switch port 1/1/7 for Finance"' },
      { icon: 'fas fa-user', text: 'Requester: John Mitchell (Finance Department)' },
      { icon: 'fas fa-search', text: 'Classification: Network Configuration Request (98% confidence)' },
      { icon: 'fas fa-check-circle', text: 'Ticket triage complete: 1 network-related request identified' }
    ]
  },
  {
    title: 'Network Discovery Agent',
    description: 'Translating natural language request into structured JSON format for downstream processing',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Converting natural language to structured format...' },
      { icon: 'fas fa-database', text: 'Knowledge Store: Loading vlan_request_patterns.json (47 patterns)' },
      { icon: 'fas fa-database', text: 'Knowledge Store: Loading switch_naming_conventions.json (12 formats)' },
      { icon: 'fas fa-code', text: 'Structured Output: { switch: "RCK-SW-CORE-01", interface: "Gi1/1/7", vlan: null }' },
      { icon: 'fas fa-exclamation-triangle', text: 'Note: VLAN ID not specified in original request - flagged for validation' }
    ]
  },
  {
    title: 'Input Validation Agent',
    description: 'Validating all required parameters are present for VLAN configuration',
    details: [
      { icon: 'fas fa-shield-alt', text: 'Validating required parameters per SOP NET-VLAN-001...' },
      { icon: 'fas fa-check', text: 'switch_name: RCK-SW-CORE-01 VALID' },
      { icon: 'fas fa-check', text: 'interface: GigabitEthernet1/1/7 VALID' },
      { icon: 'fas fa-times', text: 'vlan_id: MISSING - REQUIRED' },
      { icon: 'fas fa-check', text: 'port_type: access VALID' },
      { icon: 'fas fa-comment-dots', text: 'User prompted for missing VLAN number via chat interface...' },
      { icon: 'fas fa-keyboard', text: 'User input received: VLAN 200' },
      { icon: 'fas fa-sync', text: 'Re-validating with complete parameters...' },
      { icon: 'fas fa-check-circle', text: 'All validation checks PASSED' }
    ]
  },
  {
    title: 'Switch Configuration Agent',
    description: 'Validating switch inventory and confirming operational status in data center',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: cmdb_query_device("RCK-SW-CORE-01") -> Querying CMDB...' },
      { icon: 'fas fa-plug', text: 'MCP Tool: cmdb_get_device_status() -> Checking operational status...' },
      { icon: 'fas fa-server', text: 'Device: RCK-SW-CORE-01 (Cisco Nexus 9336C-FX2)' },
      { icon: 'fas fa-map-marker-alt', text: 'Location: Houston DC1 - Rack A15' },
      { icon: 'fas fa-heartbeat', text: 'Status: OPERATIONAL (Last ping: 2ms)' },
      { icon: 'fas fa-microchip', text: 'Firmware: NX-OS 10.2(3)' },
      { icon: 'fas fa-check-circle', text: 'Switch inventory verification PASSED' }
    ]
  },
  {
    title: 'Network Command Specialist',
    description: 'Executing CLI commands to capture current interface and VLAN configuration state',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: cli_execute_command() -> Connecting to RCK-SW-CORE-01...' },
      { icon: 'fas fa-terminal', text: 'Executing: show interface GigabitEthernet1/1/7' },
      { icon: 'fas fa-terminal', text: 'Executing: show vlan brief' },
      { icon: 'fas fa-terminal', text: 'Executing: show running-config interface Gi1/1/7' },
      { icon: 'fas fa-file-code', text: 'CLI Output: Interface is UP/UP, currently in VLAN 1 (default)' },
      { icon: 'fas fa-list', text: 'VLAN 200 (Finance) exists and is active on switch' },
      { icon: 'fas fa-check-circle', text: 'Pre-change state captured successfully' }
    ]
  },
  {
    title: 'Network Policy Compliance Agent',
    description: 'Enforcing organizational VLAN policies and security standards',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: policy_get_vlan_rules() -> Loading VLAN policies...' },
      { icon: 'fas fa-book', text: 'SOP Reference: NET-SEC-2024 - Corporate VLAN Standards' },
      { icon: 'fas fa-list-ol', text: 'Policy Check: VLAN Range 200-250 = Server/Application VLANs' },
      { icon: 'fas fa-check', text: 'VLAN 200 is within authorized range' },
      { icon: 'fas fa-check', text: 'Finance department authorized for VLAN 200' },
      { icon: 'fas fa-check', text: 'No conflicting reservations found' },
      { icon: 'fas fa-check', text: 'Change window approved (Business Hours)' },
      { icon: 'fas fa-shield-alt', text: 'Compliance Status: AUTHORIZED' }
    ]
  },
  {
    title: 'VLAN Configuration Analyzer',
    description: 'Capturing pre-change VLAN snapshot for audit trail and rollback capability',
    details: [
      { icon: 'fas fa-camera', text: 'Creating pre-change configuration snapshot...' },
      { icon: 'fas fa-save', text: 'Snapshot ID: SNAP-2026-0125-154533' },
      { icon: 'fas fa-code-branch', text: 'Current Interface State: VLAN 1 (default)' },
      { icon: 'fas fa-network-wired', text: 'Target VLAN 200 Status: Active, 0 ports assigned' },
      { icon: 'fas fa-history', text: 'Rollback capability: Enabled' },
      { icon: 'fas fa-check-circle', text: 'Pre-change baseline captured for audit' }
    ]
  },
  {
    title: 'Interface Configuration Specialist',
    description: 'Applying VLAN configuration to target interface and saving changes',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Generating NX-OS configuration commands...' },
      { icon: 'fas fa-plug', text: 'MCP Tool: config_apply_interface() -> Applying changes...' },
      { icon: 'fas fa-terminal', text: 'config terminal -> interface GigabitEthernet1/1/7' },
      { icon: 'fas fa-terminal', text: 'switchport mode access' },
      { icon: 'fas fa-terminal', text: 'switchport access vlan 200' },
      { icon: 'fas fa-terminal', text: 'description Finance-WS-JM001' },
      { icon: 'fas fa-terminal', text: 'copy running-config startup-config' },
      { icon: 'fas fa-sync', text: 'Verifying configuration change...' },
      { icon: 'fas fa-check-circle', text: 'Configuration applied and saved successfully' }
    ]
  },
  {
    title: 'Network Operations Executive Reporter',
    description: 'Generating executive summary and updating ServiceNow with work notes',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Generating executive summary...' },
      { icon: 'fas fa-plug', text: 'MCP Tool: snow_add_work_notes() -> Updating ServiceNow...' },
      { icon: 'fas fa-plug', text: 'MCP Tool: snow_resolve_ticket() -> Closing ticket...' },
      { icon: 'fas fa-file-alt', text: 'Work notes added with technical summary and resolution details' },
      { icon: 'fas fa-chart-pie', text: 'Executive Summary: Risk=Low, Capacity=OK, Compliance=PASS' },
      { icon: 'fas fa-clock', text: 'Resolution Time: 2 min 47 sec (vs 2+ hours manual)' },
      { icon: 'fas fa-robot', text: 'Human Intervention: None required' },
      { icon: 'fas fa-bell', text: 'Stakeholder notification sent to Finance team' },
      { icon: 'fas fa-check-circle', text: 'Ticket RITM0012847 RESOLVED' }
    ]
  }
];
