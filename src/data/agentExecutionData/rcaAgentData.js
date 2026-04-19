// =============================================================================
// Root Cause Analysis Agent — AIOps & Event Management
// Domain: AIOps & Event Management | UC6: Root Cause Analysis for Transient Alerts
// Automates the To-Be process: Noise Suppression → Deduplication → AI-Driven RCA →
//   Evidence Package → Resolution Recommendation → Preventive Action
// =============================================================================

export const rcaAgentConfig = {
  title: "Root Cause Analysis Agent for Transient Alerts",
  runId: "RUN-RCAAGT-20260315-0831",
  startedAt: "2026-03-15 08:31:55 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "INC-2026-09914",
    issueType: "Transient Alert Storm — Repetitive Alerts with Unclear Root Cause",
    affectedSystem: "API Gateway Cluster + Downstream Microservices",
    triggeredBy: "Datadog Alert Storm (62 alerts) → RCA Agent Auto-Trigger",
  },
  relatedIncidents: [
    { id: "INC-2026-09914", label: "ServiceNow — Parent incident (noise-collapsed)" },
    { id: "ALR-DD-77201", label: "Datadog — 62 transient alerts across api-gateway" },
    { id: "ALR-SPK-38840", label: "Splunk — Repeated error pattern in order-svc logs" },
    { id: "PRB-2026-00041", label: "ServiceNow Problem — Recurring pattern, permanent fix required" },
  ],
  tools: [
    "Datadog MCP",
    "Splunk MCP",
    "ServiceNow MCP",
    "Enterprise RCA MCP",
  ],
  knowledgeSources: [
    "Historical Incident & RCA Knowledge Base",
    "Service Topology & Dependency Graph",
    "Known Error Database (KEDB)",
    "KB Article Repository",
  ],
  agents: [
    "Alarm Suppression Agent",
    "Incident Deduplication Agent",
    "Triage & RCA Agent",
    "Network RCA Agent",
    "ServiceNow Agent",
  ],
};

export const rcaAgentSteps = [
  {
    title: "Step 1: Alert Ingestion",
    description:
      "Transient alerts ingested from monitoring tools via MCP adapters. All raw alert payloads normalized into a unified schema for downstream noise filtering and correlation.",
    details: [
      { icon: "fas fa-satellite-dish", text: "Datadog MCP: Ingesting 62 transient alerts fired in last 10-minute window" },
      { icon: "fas fa-search", text: "Splunk MCP: Pulling correlated log events for affected services" },
      { icon: "fas fa-database", text: "Enterprise RCA MCP: Loading alert metadata — source, severity, CI, timestamp" },
      { icon: "fas fa-code-branch", text: "Normalizing 62 alerts into unified schema — 7 unique alert types identified" },
      { icon: "fas fa-history", text: "Historical lookup: Same alert pattern seen 4 times in last 30 days" },
      { icon: "fas fa-check-circle", text: "Alert ingestion complete — 62 raw alerts queued for noise filtering" },
    ],
  },
  {
    title: "Step 2: Noise Filtering",
    description:
      "Alarm Suppression Agent identifies and suppresses transient and flapping alerts. Persistent patterns are separated from one-time noise using ML-based heuristics.",
    details: [
      { icon: "fas fa-filter", text: "Alarm Suppression Agent: Classifying 62 alerts by persistence and recurrence" },
      { icon: "fas fa-wave-square", text: "Filtering 38 true transient alerts — auto-cleared within 90-second window" },
      { icon: "fas fa-bell-slash", text: "Suppressing 9 flapping alerts — threshold crossed and recovered 3+ times" },
      { icon: "fas fa-flag", text: "Flagging 15 persistent alerts — recurring pattern, require RCA investigation" },
      { icon: "fas fa-chart-pie", text: "Noise reduction: 47 alerts suppressed → 15 persistent signals remain (76% reduction)" },
      { icon: "fas fa-check-circle", text: "Noise filtering complete — 15 high-signal alerts forwarded to deduplication" },
    ],
  },
  {
    title: "Step 3: Deduplication",
    description:
      "Incident Deduplication Agent collapses duplicate alerts firing from the same root event into a single parent incident, preventing ticket sprawl.",
    details: [
      { icon: "fas fa-clone", text: "Incident Deduplication Agent: Clustering 15 persistent alerts by origin CI and pattern" },
      { icon: "fas fa-compress-arrows-alt", text: "Cluster analysis: 15 alerts grouped into 2 distinct root event clusters" },
      { icon: "fas fa-link", text: "Cluster-1 (11 alerts): api-gateway 5xx errors — collapsed to parent INC-2026-09914" },
      { icon: "fas fa-link", text: "Cluster-2 (4 alerts): order-svc DB timeout — linked as child to INC-2026-09914" },
      { icon: "fas fa-ban", text: "10 duplicate ticket creation requests suppressed — single parent maintained" },
      { icon: "fas fa-check-circle", text: "Deduplication complete — 15 alerts consolidated into 1 parent incident" },
    ],
  },
  {
    title: "Step 4: Triage",
    description:
      "Triage Agent classifies incident severity and assigns to the correct resolver group based on CI ownership, impact scope, and SLO exposure.",
    details: [
      { icon: "fas fa-sort-amount-up", text: "Triage Agent: Assessing severity — api-gateway SLO at 99.1% (SLO: 99.9%)" },
      { icon: "fas fa-sitemap", text: "Impact scope: api-gateway → order-svc → inventory-svc — 3 services affected" },
      { icon: "fas fa-users-cog", text: "CI ownership lookup: api-gateway owned by Platform-SRE-L2 team" },
      { icon: "fas fa-tag", text: "Classification: P2 — High, Category: Platform > API > Stability" },
      { icon: "fas fa-route", text: "Assignment routed to Platform-SRE-L2 with enriched context package" },
      { icon: "fas fa-check-circle", text: "Triage complete — INC-2026-09914 classified P2 and assigned correctly" },
    ],
  },
  {
    title: "Step 5: Log Correlation",
    description:
      "RCA Agent correlates Splunk logs, Datadog metrics, and network telemetry within the incident time window to build a complete evidence timeline.",
    details: [
      { icon: "fas fa-search", text: "Splunk MCP: Querying order-svc error logs — 1,204 log lines in T-15min window" },
      { icon: "fas fa-chart-line", text: "Datadog MCP: Pulling api-gateway p99 latency, error rate, throughput metrics" },
      { icon: "fas fa-network-wired", text: "Enterprise RCA MCP: Fetching network telemetry — packet loss on vlan-prod-42" },
      { icon: "fas fa-clock", text: "Timeline reconstruction: First anomaly at T-12min (DB timeout) propagating upstream" },
      { icon: "fas fa-code-branch", text: "Change correlation: No deployments in last 6 hours — change not the cause" },
      { icon: "fas fa-check-circle", text: "Log correlation complete — evidence timeline built across 3 data sources" },
    ],
  },
  {
    title: "Step 6: Root Cause Identification",
    description:
      "ML-driven temporal and topological analysis identifies root cause with confidence score. Triage & RCA Agent cross-references against KEDB and historical patterns.",
    details: [
      { icon: "fas fa-brain", text: "Triage & RCA Agent: Running temporal correlation engine on evidence timeline" },
      { icon: "fas fa-project-diagram", text: "Topological analysis: DB timeout → connection pool exhaustion → API timeout cascade" },
      { icon: "fas fa-database", text: "Root cause identified: order-svc DB connection pool leak (max 50, all 50 active)" },
      { icon: "fas fa-book", text: "KEDB match found: Known error KE-2025-0331 — same pattern resolved in Nov 2025" },
      { icon: "fas fa-percentage", text: "Confidence score: 91% — high confidence RCA posted to resolver team" },
      { icon: "fas fa-check-circle", text: "Root cause confirmed: DB connection leak in order-svc — recurring known pattern" },
    ],
  },
  {
    title: "Step 7: Resolution Recommendation",
    description:
      "Agent suggests fix based on KB articles and similar past incident resolutions. Matching runbook and KB article surfaced from the knowledge base.",
    details: [
      { icon: "fas fa-book-open", text: "Searching KB for pattern: order-svc connection pool leak" },
      { icon: "fas fa-file-alt", text: "KB match: KB0012441 — Restart order-svc with connection pool flush parameter" },
      { icon: "fas fa-history", text: "Past resolution: INC-2025-07718 (Nov 2025) — same fix applied, resolved in 18 min" },
      { icon: "fas fa-list-ol", text: "Recommended steps: 1) Flush pool 2) Restart order-svc 3) Monitor DB connections for 15 min" },
      { icon: "fas fa-paper-plane", text: "Resolution recommendation posted to SRE resolver team with full evidence package" },
      { icon: "fas fa-check-circle", text: "Resolution applied — order-svc healthy, api-gateway error rate normalized" },
    ],
  },
  {
    title: "Step 8: Problem Record",
    description:
      "Recurring pattern detected — ServiceNow Agent auto-creates a Problem record for permanent fix investigation, preventing future recurrence of the same alert storm.",
    details: [
      { icon: "fas fa-redo", text: "Recurrence check: This pattern has triggered 4 incidents in 30 days — threshold exceeded" },
      { icon: "fas fa-file-medical-alt", text: "ServiceNow MCP: Auto-creating Problem record PRB-2026-00041 for permanent fix" },
      { icon: "fas fa-link", text: "Linking 4 related incidents (INC-09914, INC-09201, INC-08844, INC-08290) to PRB-00041" },
      { icon: "fas fa-user-cog", text: "Problem assigned to order-svc engineering team for root fix (connection pool config)" },
      { icon: "fas fa-stopwatch", text: "MTTR: 22 minutes (vs. 2-6 hour manual baseline — 88% improvement)" },
      { icon: "fas fa-flag-checkered", text: "RCA Agent run complete — incident resolved, problem record created for permanent fix" },
    ],
  },
];
