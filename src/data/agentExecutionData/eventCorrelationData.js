// =============================================================================
// Event Correlation Agent — AIOps Centralized Alert Correlation
// Domain: AIOps & Event Management | UC1: Centralized Alert Correlation
// Automates the To-Be process: Ingest ? Suppress ? Correlate ? Deduplicate ?
//   Create Enriched Incident ? Notify Stakeholders ? Auto-Remediation ? Closure
// =============================================================================

export const eventCorrelationConfig = {
  title: "AIOps Event Correlation Agent",
  runId: "RUN-EVTCORR-20260314-0042",
  startedAt: "2026-03-14 00:42:18 UTC",
  priority: "P1 - Critical",
  trigger: {
    ticket: "ALR-2026-08741",
    issueType: "Multi-Tool Alert Storm — Cross-Platform Correlation",
    affectedSystem: "Production Kubernetes Cluster (us-east-1)",
    triggeredBy: "Datadog Alert Webhook ? Event Correlation Agent",
  },
  relatedIncidents: [
    { id: "ALR-DD-99281", label: "Datadog — CPU spike on k8s-node-07" },
    { id: "ALR-SPK-44102", label: "Splunk — Error rate anomaly in payment-svc" },
    { id: "ALR-APD-77839", label: "AppDynamics — Response time degradation" },
    { id: "ALR-OPS-12093", label: "OpsRamp — Disk I/O threshold breach" },
  ],
  tools: [
    "Datadog MCP",
    "Splunk MCP",
    "AppDynamics MCP",
    "OpsRamp MCP",
    "ServiceNow MCP",
    "ClickHouse MCP",
  ],
  knowledgeSources: [
    "Topology & Service Dependency Graph",
    "Historical Incident Patterns DB",
    "Runbook Repository",
    "SLA Policy Definitions",
  ],
  agents: [
    "Event Correlation Agent",
    "Alarm Suppression Agent",
    "Incident Deduplication Agent",
    "ServiceNow Agent",
    "Communication Agent",
  ],
};

export const eventCorrelationSteps = [
  {
    title: "Step 1: Event Ingestion",
    description:
      "Event Correlation Agent ingests real-time alerts from Datadog, Splunk, AppDynamics, and OpsRamp via MCP adapters. All raw events are normalized into a unified schema and stored in ClickHouse for analysis.",
    details: [
      { icon: "fas fa-satellite-dish", text: "Datadog MCP: Ingesting 47 active alerts from Datadog monitors" },
      { icon: "fas fa-search", text: "Splunk MCP: Pulling 23 correlated search results from Splunk indexes" },
      { icon: "fas fa-tachometer-alt", text: "AppDynamics MCP: Fetching 18 health-rule violations and slow transactions" },
      { icon: "fas fa-server", text: "OpsRamp MCP: Receiving 12 infrastructure alerts from OpsRamp" },
      { icon: "fas fa-database", text: "ClickHouse MCP: Normalizing 100 raw events into unified alert schema" },
      { icon: "fas fa-check-circle", text: "Event ingestion complete — 100 alerts captured across 4 monitoring tools" },
    ],
  },
  {
    title: "Step 2: Noise Suppression",
    description:
      "Alarm Suppression Agent filters transient alerts, flapping alarms, and maintenance-window noise. ML-based heuristics reduce alert volume by 60–80%, surfacing only actionable signals.",
    details: [
      { icon: "fas fa-filter", text: "Alarm Suppression Agent: Analyzing 100 ingested alerts for noise patterns" },
      { icon: "fas fa-wave-square", text: "Filtering 34 transient/flapping alerts (auto-clear within 2 min window)" },
      { icon: "fas fa-calendar-times", text: "Suppressing 12 alerts matching active maintenance window MW-2026-041" },
      { icon: "fas fa-bell-slash", text: "Deduplicating 8 repeated alerts from same source within suppression window" },
      { icon: "fas fa-chart-pie", text: "Noise reduction: 54 alerts suppressed ? 46 actionable alerts remain (54% reduction)" },
      { icon: "fas fa-check-circle", text: "Suppression complete — forwarding 46 high-confidence alerts to correlation engine" },
    ],
  },
  {
    title: "Step 3: Cross-Tool Correlation",
    description:
      "ML model correlates events across all tools using temporal proximity, topology, and service dependency graph. Identifies parent event and blast radius across the infrastructure.",
    details: [
      { icon: "fas fa-project-diagram", text: "Loading service dependency graph — 342 nodes, 891 edges mapped" },
      { icon: "fas fa-clock", text: "Temporal correlation: Grouping events within ±5 min sliding window" },
      { icon: "fas fa-sitemap", text: "Topology analysis: Mapping alerts to 7 affected services in dependency chain" },
      { icon: "fas fa-brain", text: "ML correlation engine: Identified root cause — k8s-node-07 memory pressure" },
      { icon: "fas fa-compress-arrows-alt", text: "46 alerts correlated into 3 distinct event clusters" },
      { icon: "fas fa-crosshairs", text: "Parent event identified: Node memory exhaustion cascading to payment-svc" },
    ],
  },
  {
    title: "Step 4: Deduplication",
    description:
      "Incident Deduplication Agent identifies duplicate alerts already linked to open incidents and creates parent-child incident links to prevent ticket sprawl.",
    details: [
      { icon: "fas fa-clone", text: "Incident Deduplication Agent: Scanning 3 event clusters against open incidents" },
      { icon: "fas fa-link", text: "Matched cluster-1 to existing INC-2026-08290 (node resource alarm)" },
      { icon: "fas fa-layer-group", text: "Creating parent-child links: 14 child alerts ? 1 parent incident" },
      { icon: "fas fa-ban", text: "Suppressed 2 duplicate incident creation requests for cluster-1" },
      { icon: "fas fa-plus-circle", text: "2 new unique event clusters require new incident creation" },
      { icon: "fas fa-check-circle", text: "Deduplication complete — 2 new incidents to create, 1 existing enriched" },
    ],
  },
  {
    title: "Step 5: Create Enriched Incident",
    description:
      "ServiceNow Agent auto-creates incidents with correlated evidence from all monitoring tools, probable root cause, blast radius analysis, and recommended resolution path.",
    details: [
      { icon: "fas fa-file-medical", text: "ServiceNow MCP: Creating enriched incident INC-2026-08741" },
      { icon: "fas fa-paperclip", text: "Attaching correlated evidence: 46 alerts, 3 clusters, topology map" },
      { icon: "fas fa-bullseye", text: "Root cause: k8s-node-07 memory exhaustion ? payment-svc cascade failure" },
      { icon: "fas fa-radiation", text: "Blast radius: 7 services affected across 3 availability zones" },
      { icon: "fas fa-tags", text: "Auto-categorized: Infrastructure > Kubernetes > Memory Pressure (P1)" },
      { icon: "fas fa-check-circle", text: "Incident INC-2026-08741 created with full correlation evidence attached" },
    ],
  },
  {
    title: "Step 6: Notify Stakeholders",
    description:
      "Communication Agent sends enriched alert summary to on-call resolver team via Microsoft Teams and Email with actionable context and one-click acknowledgment.",
    details: [
      { icon: "fas fa-users", text: "Communication Agent: Identifying on-call resolver — SRE Team Alpha" },
      { icon: "fab fa-microsoft", text: "Sending Teams notification to #sre-incidents channel with summary card" },
      { icon: "fas fa-envelope", text: "Email alert dispatched to on-call engineer: j.smith@infosys.com" },
      { icon: "fas fa-mobile-alt", text: "PagerDuty escalation triggered — P1 SLA clock started (30 min)" },
      { icon: "fas fa-check-circle", text: "All stakeholders notified — acknowledgment received within 2 minutes" },
    ],
  },
  {
    title: "Step 7: Auto-Remediation Check",
    description:
      "Orchestration Agent checks if a known remediation runbook exists for the identified pattern. If match found, triggers automated remediation; otherwise routes to correct L2 resolver.",
    details: [
      { icon: "fas fa-book-open", text: "Searching runbook repository for pattern: kubernetes-memory-pressure" },
      { icon: "fas fa-check-double", text: "Match found: RB-K8S-MEM-001 — Auto-scale node pool & restart pods" },
      { icon: "fas fa-cogs", text: "Executing remediation: kubectl scale nodepool --replicas +2" },
      { icon: "fas fa-redo", text: "Rolling restart of payment-svc pods in affected nodes" },
      { icon: "fas fa-heartbeat", text: "Health check: payment-svc response time normalized (p99 < 200ms)" },
      { icon: "fas fa-check-circle", text: "Auto-remediation successful — all services healthy" },
    ],
  },
  {
    title: "Step 8: Resolution & Closure",
    description:
      "Incident resolved (auto or manual) and ServiceNow ticket closed with full audit trail. MTTR captured and SLA compliance verified.",
    details: [
      { icon: "fas fa-clipboard-check", text: "ServiceNow MCP: Updating INC-2026-08741 with resolution details" },
      { icon: "fas fa-stopwatch", text: "MTTR: 18 minutes (vs. 3–6 hour manual baseline — 90% improvement)" },
      { icon: "fas fa-shield-alt", text: "SLA compliance verified: P1 resolved within 30-minute target" },
      { icon: "fas fa-chart-line", text: "Post-incident metrics logged to ClickHouse for trend analysis" },
      { icon: "fas fa-archive", text: "Full audit trail stored: ingestion ? correlation ? remediation ? closure" },
      { icon: "fas fa-flag-checkered", text: "Event Correlation Agent pipeline complete — incident closed" },
    ],
  },
];
