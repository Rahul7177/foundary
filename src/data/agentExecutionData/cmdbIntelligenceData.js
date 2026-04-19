// =============================================================================
// CMDB Intelligence Agent — CMDB & Asset Management
// Domain: CMDB & Asset Management | UC3: CMDB Intelligence & Accuracy
// Automates the To-Be process: Auto-Discovery → Device Registration →
//   Switch Discovery → Monitoring Onboard → Graph Mapping → Continuous Sync
// =============================================================================

export const cmdbIntelligenceConfig = {
  title: "CMDB Intelligence & Accuracy Agent",
  runId: "RUN-CMDBI-20260314-0204",
  startedAt: "2026-03-14 02:04:11 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "CMDB-2026-00391",
    issueType: "CI Discrepancy Detected — New VMs Unregistered in CMDB",
    affectedSystem: "Hybrid Cloud Infrastructure (VMware + Azure + On-Prem)",
    triggeredBy: "VMware Inventory Scan → CMDB Intelligence Agent",
  },
  relatedIncidents: [
    { id: "CMDB-VMW-40122", label: "VMware — 14 unregistered VMs in PROD cluster" },
    { id: "CMDB-NET-18834", label: "Network Discovery — 6 unregistered switches" },
    { id: "CMDB-REL-29901", label: "CMDB — 31% relationship accuracy gap detected" },
    { id: "CMDB-ZBX-55012", label: "Zabbix — 9 CIs missing from monitoring coverage" },
  ],
  tools: [
    "VMware MCP",
    "ServiceNow MCP",
    "Neo4j Graph DB MCP",
    "Zabbix MCP",
    "Network Discovery APIs",
  ],
  knowledgeSources: [
    "ServiceNow CMDB Schema & Relationship Rules",
    "CI Classification Taxonomy",
    "Neo4j Topology Graph Store",
    "Zabbix Host Group Templates",
  ],
  agents: [
    "Inventory Agent",
    "Device Inventory Agent",
    "Switch Discovery Agent",
    "Zabbix Onboarding Agent",
    "Neo4j Inventory Migration Agent",
    "ServiceNow Agent",
  ],
};

export const cmdbIntelligenceSteps = [
  {
    title: "Step 1: Infrastructure Scan",
    description:
      "Inventory Agent discovers VMs, servers, and cloud resources via VMware MCP and cloud APIs. Full scan across VMware vCenter, Azure, and on-premises data centers.",
    details: [
      { icon: "fas fa-search", text: "VMware MCP: Scanning vCenter — 312 VMs across 8 ESXi hosts discovered" },
      { icon: "fas fa-cloud", text: "Azure Resource Graph API: Enumerating 94 cloud resources (VMs, NICs, disks)" },
      { icon: "fas fa-server", text: "On-prem scan via WMI/SSH: 48 physical servers inventoried" },
      { icon: "fas fa-microchip", text: "Collecting CI attributes: hostname, IP, OS, CPU, memory, disk, owner" },
      { icon: "fas fa-layer-group", text: "Application mapping: 127 application services linked to discovered hosts" },
      { icon: "fas fa-check-circle", text: "Infrastructure scan complete — 454 CIs discovered across all layers" },
    ],
  },
  {
    title: "Step 2: Network Discovery",
    description:
      "Device Inventory Agent and Switch Discovery Agent map full network topology, register all network devices, and validate against existing CMDB records.",
    details: [
      { icon: "fas fa-network-wired", text: "Network Discovery APIs: Running SNMP sweep across 10.0.0.0/8 subnets" },
      { icon: "fas fa-sitemap", text: "Switch Discovery Agent: Mapping layer 2/3 topology — 42 switches, 18 routers" },
      { icon: "fas fa-ethernet", text: "Device Inventory Agent: Registering 60 network devices with port-level detail" },
      { icon: "fas fa-plug", text: "CDP/LLDP neighbor discovery: Building switch-to-server connection map" },
      { icon: "fas fa-exclamation-triangle", text: "6 unregistered switches flagged — not present in current CMDB" },
      { icon: "fas fa-check-circle", text: "Network topology mapped — 60 devices registered, 6 gaps identified" },
    ],
  },
  {
    title: "Step 3: CMDB Validation",
    description:
      "Cross-reference all discovered assets against ServiceNow CMDB; flag discrepancies, stale CIs, and missing relationship links for remediation.",
    details: [
      { icon: "fas fa-database", text: "ServiceNow MCP: Querying CMDB — 440 CIs currently registered" },
      { icon: "fas fa-balance-scale", text: "Cross-referencing 514 discovered assets against 440 CMDB records" },
      { icon: "fas fa-plus-circle", text: "Gap analysis: 74 new CIs discovered not in CMDB (14 VMs, 6 switches, 54 others)" },
      { icon: "fas fa-ghost", text: "Stale CI detection: 12 decommissioned assets still active in CMDB" },
      { icon: "fas fa-unlink", text: "Relationship audit: 31% of CI relationships missing (app-to-server, server-to-network)" },
      { icon: "fas fa-check-circle", text: "Validation complete — 74 new, 12 stale, 142 missing relationships identified" },
    ],
  },
  {
    title: "Step 4: Auto-Registration",
    description:
      "New CIs auto-registered in ServiceNow CMDB with correct classification, relationships, and ownership. Stale CIs retired with change ticket linkage.",
    details: [
      { icon: "fas fa-robot", text: "ServiceNow MCP: Auto-registering 74 new CIs with AI-inferred attributes" },
      { icon: "fas fa-tags", text: "CI classification engine: Assigning class, category, and business service ownership" },
      { icon: "fas fa-link", text: "Relationship builder: Creating 142 app-to-server, server-to-network CI links" },
      { icon: "fas fa-trash-alt", text: "Retiring 12 stale CIs — change ticket CHG-2026-04412 raised and auto-approved" },
      { icon: "fas fa-user-tag", text: "Ownership assignment: 74 CIs mapped to owning teams via Azure AD sync" },
      { icon: "fas fa-check-circle", text: "Auto-registration complete — CMDB now at 514 active CIs, 97% accuracy" },
    ],
  },
  {
    title: "Step 5: Graph Topology Build",
    description:
      "Neo4j Inventory Migration Agent maps all CI relationships as a connected graph for instant blast-radius analysis during incidents.",
    details: [
      { icon: "fas fa-project-diagram", text: "Neo4j Graph DB MCP: Ingesting 514 CIs as graph nodes" },
      { icon: "fas fa-bezier-curve", text: "Creating 1,847 relationship edges (depends-on, hosted-on, connects-to)" },
      { icon: "fas fa-sitemap", text: "Building service dependency chains: 127 app services → server → network path" },
      { icon: "fas fa-radiation", text: "Blast-radius index pre-computed: Average impact scope = 4.2 downstream CIs" },
      { icon: "fas fa-search-plus", text: "Graph query validated: Incident on PROD-DB-01 impacts 18 downstream services" },
      { icon: "fas fa-check-circle", text: "Topology graph complete — Neo4j store has 514 nodes, 1,847 relationships" },
    ],
  },
  {
    title: "Step 6: Monitoring Alignment",
    description:
      "Zabbix Onboarding Agent ensures every CI is monitored from day of discovery. All 74 new CIs onboarded into Zabbix with appropriate host group templates.",
    details: [
      { icon: "fas fa-eye", text: "Zabbix MCP: Checking monitoring coverage for all 514 active CIs" },
      { icon: "fas fa-exclamation-circle", text: "Coverage gap: 9 existing CIs + 74 new CIs missing Zabbix monitoring" },
      { icon: "fas fa-tools", text: "Zabbix Onboarding Agent: Auto-provisioning 83 hosts in Zabbix" },
      { icon: "fas fa-layer-group", text: "Applying host group templates: Linux (41), Windows (28), Network (14)" },
      { icon: "fas fa-bell", text: "Alert thresholds configured per CI classification and SLA tier" },
      { icon: "fas fa-check-circle", text: "Monitoring alignment complete — 514/514 CIs covered (100% observability)" },
    ],
  },
  {
    title: "Step 7: Continuous Reconciliation",
    description:
      "Scheduled and event-driven reconciliation keeps CMDB accuracy above 95%. Triggers on VM provisioning events, change tickets, and daily drift detection.",
    details: [
      { icon: "fas fa-sync-alt", text: "Reconciliation engine: Scheduling daily scan at 02:00 UTC for drift detection" },
      { icon: "fas fa-bolt", text: "Event-driven trigger: Listening to VMware provisioning events via webhook" },
      { icon: "fas fa-calendar-check", text: "Change-aware sync: CMDB updates triggered on CHG ticket approval" },
      { icon: "fas fa-chart-line", text: "CMDB accuracy metric: Current score 97.2% (target: >95%)" },
      { icon: "fas fa-history", text: "Audit trail: All 74 creations + 12 retirements logged with full changelog" },
      { icon: "fas fa-check-circle", text: "Continuous reconciliation active — CMDB accuracy maintained in real-time" },
    ],
  },
  {
    title: "Step 8: Impact Analysis Ready",
    description:
      "Graph-based topology enables instant blast-radius analysis during incidents. CMDB now serves as a real-time source of truth for all incident triage.",
    details: [
      { icon: "fas fa-radiation", text: "Blast-radius API: /cmdb/impact/{ci_id} returns full downstream chain in <100ms" },
      { icon: "fas fa-project-diagram", text: "Neo4j traversal test: payment-svc impact chain resolved in 48ms" },
      { icon: "fas fa-shield-alt", text: "CMDB accuracy: 97.2% (up from 62% baseline — 35% improvement)" },
      { icon: "fas fa-tachometer-alt", text: "MTTR impact: Incident triage time reduced from Days-Weeks to real-time" },
      { icon: "fas fa-archive", text: "Full audit trail committed to ServiceNow — change record CHG-2026-04412 closed" },
      { icon: "fas fa-flag-checkered", text: "CMDB Intelligence Agent run complete — real-time accuracy maintained" },
    ],
  },
];
