// =============================================================================
// Network Provisioning Agent — Network Operations
// Domain: Network Operations | UC12: Zero-Touch Network Provisioning
// Automates the To-Be process: Request Pickup → Device Discovery →
//   Config Template → Day-1 Baseline → NSO Deployment → VLAN Validation →
//   Connectivity Test → Closure
// =============================================================================

export const networkProvisioningAgentConfig = {
  title: "Network Provisioning Agent — Zero-Touch Network Provisioning",
  runId: "RUN-NET-20260315-1215",
  startedAt: "2026-03-15 12:15:44 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "CHG-20260315-00489",
    issueType: "Network Provisioning — New VLAN 410 (Finance DMZ) on 6 Cisco Catalyst 9300 access switches in Houston-DC01",
    affectedSystem: "HOU-DC01-ACC-SW-01 through 06 (Cisco Catalyst 9300 stack) — Finance DMZ network segment",
    triggeredBy: "ServiceNow MCP: CHG-00489 approved and routed to Network Provisioning Agent for zero-touch execution",
  },
  relatedIncidents: [
    { id: "CHG-2026-00489", label: "ServiceNow — Primary change record (VLAN 410 Finance DMZ provisioning on 6 access switches)" },
    { id: "CHG-2026-00371", label: "Similar past change — VLAN 405 provisioning (HR network) on same switch stack — completed successfully" },
    { id: "KB-0083021", label: "KB Standard — Cisco Catalyst 9300 VLAN provisioning design standard and template" },
    { id: "STD-NET-0014", label: "Network Design Standard — Finance DMZ VLAN requirements: 802.1Q trunk, STP PortFast, DHCP relay" },
  ],
  tools: [
    "Cisco NSO MCP",
    "Resource Inventory MCP",
    "Config Generation MCP",
    "ServiceNow MCP",
    "Network APIs",
  ],
  knowledgeSources: [
    "Network Design Standards & Config Template Library",
    "Cisco NSO Device Inventory & Config Repository",
    "VLAN Assignment & IP Address Management (IPAM)",
    "CIS Network Security Baseline (L2 switch hardening)",
    "Change History & Past VLAN Provisioning Records",
  ],
  agents: [
    "Cisco NSO Config Agent",
    "Cisco NSO Onboarding Agent",
    "Cisco NSO Day-1 Config Agent",
    "CIS Network Engineer Agent",
    "VLAN Validator Agent",
    "ServiceNow Agent",
  ],
};

export const networkProvisioningAgentSteps = [
  {
    title: "Step 1: Request Pickup & Requirements Ingestion",
    description:
      "ServiceNow Agent ingests the approved network provisioning change request with all design requirements — VLAN ID, subnet, scope of devices, trunk requirements, and security standards — eliminating the information-gathering phase from engineer workflow.",
    details: [
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Ingesting CHG-2026-00489 — VLAN 410 (Finance DMZ), Subnet 10.41.0.0/24, Priority=P2" },
      { icon: "fas fa-network-wired", text: "Requirements parsed: VLAN ID=410, Name=Finance-DMZ, Subnet=10.41.0.0/24, Gateway=10.41.0.1" },
      { icon: "fas fa-server", text: "Target scope: 6 Cisco Catalyst 9300 switches (HOU-DC01-ACC-SW-01 to 06) — Finance floor access layer" },
      { icon: "fas fa-shield-alt", text: "Security requirements: 802.1Q trunk to core, STP PortFast on access ports, DHCP relay to 10.1.1.50, VACL applied" },
      { icon: "fas fa-book", text: "Design standard loaded: STD-NET-0014 (Finance DMZ VLAN requirements) + KB-0083021 (Catalyst 9300 template)" },
      { icon: "fas fa-check-circle", text: "Request ingestion complete — all requirements parsed, design standards loaded, execution queued" },
    ],
  },
  {
    title: "Step 2: Device Discovery & Readiness Validation",
    description:
      "CIS Network Engineer Agent validates target device inventory in Cisco NSO, confirms reachability, current running-config state, and readiness for config push — catching pre-existing issues before any change is applied.",
    details: [
      { icon: "fas fa-search", text: "CIS Network Engineer Agent: Querying Resource Inventory MCP for HOU-DC01-ACC-SW-01 through 06" },
      { icon: "fas fa-database", text: "CMDB validation: All 6 switches registered in Cisco NSO inventory — last sync 14 minutes ago, state=in-sync" },
      { icon: "fas fa-network-wired", text: "Reachability check: All 6 devices reachable via NSO NETCONF — 0 connectivity failures" },
      { icon: "fas fa-clipboard-check", text: "Pre-change state captured: Running config snapshot taken on all 6 switches (rollback baseline)" },
      { icon: "fas fa-exclamation-triangle", text: "Pre-check finding: VLAN 410 does not exist on any switch (clean slate) — no conflicts detected" },
      { icon: "fas fa-check-circle", text: "Device discovery complete — 6/6 devices reachable, pre-change snapshots captured, no conflicts found" },
    ],
  },
  {
    title: "Step 3: Standardized Config Template Generation",
    description:
      "Cisco NSO Config Agent auto-generates standardized configuration templates from design standards — producing consistent, validated config for all 6 switches with zero manual CLI authoring or per-engineer variation.",
    details: [
      { icon: "fas fa-code", text: "Cisco NSO Config Agent: Loading design template TMPL-CATALYST-VLAN-ACCESS from Config Generation MCP" },
      { icon: "fas fa-fill-drip", text: "Template variables injected: vlan_id=410, vlan_name=Finance-DMZ, subnet=10.41.0.0/24, dhcp_relay=10.1.1.50" },
      { icon: "fas fa-file-code", text: "Generated config preview: 'vlan 410 / name Finance-DMZ / interface range GigabitEthernet1/0/1-24 / switchport access vlan 410'" },
      { icon: "fas fa-shield-alt", text: "CIS hardening applied: VACL for Finance-DMZ, storm-control, port-security, BPDU-guard — all from standard" },
      { icon: "fas fa-copy", text: "Config validated: 6 identical device configs generated (no per-engineer variation) — all pass syntax validation" },
      { icon: "fas fa-check-circle", text: "Config template generation complete — 6 standardized, validated configs ready for Day-1 baseline + deployment" },
    ],
  },
  {
    title: "Step 4: Day-1 Baseline Configuration",
    description:
      "Cisco NSO Day-1 Config Agent applies baseline hardening configuration to each switch before VLAN provisioning — ensuring all devices meet CIS L2 security baseline standards as part of the zero-touch provisioning workflow.",
    details: [
      { icon: "fas fa-shield-alt", text: "Cisco NSO Day-1 Config Agent: Checking CIS L2 baseline compliance on all 6 Catalyst 9300 switches" },
      { icon: "fas fa-check-double", text: "Baseline check: SSH v2, HTTPS management, AAA/TACACS+, no Telnet — all 6 switches compliant" },
      { icon: "fas fa-wrench", text: "Baseline gap found: SW-04 missing 'ip dhcp snooping' global config — Day-1 agent applying fix via NSO" },
      { icon: "fas fa-lock", text: "VACL baseline: Finance-DMZ VACL (deny inter-VLAN by default, permit to gateway only) applied as Day-1 policy" },
      { icon: "fas fa-clipboard-check", text: "Baseline compliance confirmed: All 6 switches now at CIS L2 compliant state before VLAN provisioning" },
      { icon: "fas fa-check-circle", text: "Day-1 baseline complete — 6/6 switches CIS-compliant, 1 gap auto-remediated, VACL policy applied" },
    ],
  },
  {
    title: "Step 5: Zero-Touch NSO Config Deployment",
    description:
      "Config pushed to all 6 target devices simultaneously via Cisco NSO MCP — zero manual CLI access required. NSO's transactional model ensures all-or-nothing deployment: either all devices succeed or the entire transaction rolls back.",
    details: [
      { icon: "fas fa-upload", text: "Cisco NSO MCP: Initiating transactional config push for VLAN 410 to 6 Catalyst 9300 switches" },
      { icon: "fas fa-bolt", text: "NSO transaction: All 6 device configs committed in single atomic transaction (all-or-nothing guarantee)" },
      { icon: "fas fa-terminal", text: "Deployed: vlan 410, name Finance-DMZ, interface range configs, trunk allowance on uplink ports — all 6 switches" },
      { icon: "fas fa-sync", text: "NSO post-deploy sync: Running vs intended config comparison — 6/6 switches in-sync with desired state" },
      { icon: "fas fa-check-double", text: "Zero CLI access used: 100% of config applied via NSO NETCONF — no manual SSH sessions required" },
      { icon: "fas fa-check-circle", text: "NSO deployment complete — VLAN 410 provisioned on 6 switches via zero-touch transaction in 47 seconds" },
    ],
  },
  {
    title: "Step 6: VLAN Validation & Config Consistency Check",
    description:
      "VLAN Validator Agent executes comprehensive VLAN configuration verification across all 6 switches — checking VLAN existence, trunk membership, STP state, and config consistency to ensure the provisioning is operationally correct.",
    details: [
      { icon: "fas fa-search-plus", text: "VLAN Validator Agent: Running VLAN validation playbook against all 6 Catalyst 9300 switches via NSO" },
      { icon: "fas fa-list-check", text: "VLAN existence check: 'show vlan id 410' — VLAN 410 active on all 6 switches ✓" },
      { icon: "fas fa-stream", text: "Trunk validation: VLAN 410 in allowed list on uplink trunks to core — all 6 switches ✓" },
      { icon: "fas fa-sitemap", text: "STP check: VLAN 410 STP state=forwarding on all access ports, PortFast enabled, BPDU-guard active ✓" },
      { icon: "fas fa-clone", text: "Config consistency: All 6 switches have identical VLAN 410 config — zero per-device variation ✓" },
      { icon: "fas fa-check-circle", text: "VLAN validation complete — 6/6 switches pass all checks: VLAN active, trunked, STP correct, config consistent" },
    ],
  },
  {
    title: "Step 7: End-to-End Connectivity Test",
    description:
      "Switch Connectivity Agent validates the complete end-to-end network path for VLAN 410 — confirming L2 reachability, DHCP relay functionality, inter-VLAN routing to gateway, and VACL enforcement before ticket closure.",
    details: [
      { icon: "fas fa-network-wired", text: "Switch Connectivity Agent: Running end-to-end path validation for VLAN 410 Finance-DMZ segment" },
      { icon: "fas fa-project-diagram", text: "L2 path trace: HOU-DC01-ACC-SW-01 → HOU-DC01-DIST-SW-01 → HOU-DC01-CORE-01 — VLAN 410 forwarding ✓" },
      { icon: "fas fa-dhcp", text: "DHCP relay test: Test DHCP discover on VLAN 410 — relay forwarding to 10.1.1.50, OFFER received ✓" },
      { icon: "fas fa-route", text: "Gateway reachability: Ping 10.41.0.1 (Finance-DMZ gateway) from VLAN 410 SVI — 0% packet loss ✓" },
      { icon: "fas fa-shield-alt", text: "VACL enforcement: Verified Finance-DMZ cannot reach other VLANs — security policy enforced ✓" },
      { icon: "fas fa-check-circle", text: "Connectivity validation complete — end-to-end path verified: L2 ✓, DHCP ✓, gateway ✓, VACL ✓" },
    ],
  },
  {
    title: "Step 8: Change Closure, CMDB Update & Audit Trail",
    description:
      "ServiceNow ticket closed with full config evidence and before/after state captured. CMDB auto-updated with new VLAN 410 network state across all 6 devices — eliminating incomplete manual documentation and ensuring asset accuracy.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Provisioning confirmed: VLAN 410 Finance-DMZ live and validated on 6 Catalyst 9300 switches in Houston-DC01" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Updating CHG-2026-00489 — Status=Closed, Implementation=Successful, evidence attached" },
      { icon: "fas fa-database", text: "CMDB auto-update: Resource Inventory MCP updating all 6 switch CIs with VLAN 410 network state" },
      { icon: "fas fa-clipboard-list", text: "Audit trail: Before/after config diff, NSO transaction log, VLAN validation output, connectivity test results" },
      { icon: "fas fa-chart-bar", text: "Provisioning metrics: Total time=1hr 47min (vs Days manual), 0 CLI sessions, 0 config inconsistencies" },
      { icon: "fas fa-flag-checkered", text: "Network Provisioning Agent run complete — VLAN 410 provisioned in < 2hr (vs Days manual baseline) ✓" },
    ],
  },
];
