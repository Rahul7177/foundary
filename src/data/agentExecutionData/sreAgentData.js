// =============================================================================
// SRE Agent — SRE & Reliability Engineering
// Domain: SRE & Reliability Engineering | UC4: Distributed SRE & Major Incident Management
// Automates the To-Be process: Auto-Detection ? War Room Creation ? Unified Triage ?
//   Auto-Communications ? Guided Resolution ? Auto-PIR
// =============================================================================

export const sreAgentConfig = {
  title: "Distributed SRE & Major Incident Management Agent",
  runId: "RUN-SREAGT-20260315-0347",
  startedAt: "2026-03-15 03:47:22 UTC",
  priority: "P1 - Critical",
  trigger: {
    ticket: "MIM-2026-00128",
    issueType: "Major Incident — P1 Pattern Detected Across Production Services",
    affectedSystem: "Production Kubernetes Cluster + API Gateway + Payment Services",
    triggeredBy: "Correlated Alert Storm ? SRE Agent Auto-Declaration",
  },
  relatedIncidents: [
    { id: "MIM-SNW-10128", label: "ServiceNow — Major Incident auto-declared (P1)" },
    { id: "MIM-ES-88231", label: "Elasticsearch — 500 errors spiking across api-gateway" },
    { id: "MIM-K8S-40019", label: "Kubernetes — CrashLoopBackOff on payment-pod-07..12" },
    { id: "MIM-DD-61290", label: "Datadog — SLO breach: availability < 99.5% for 8 min" },
  ],
  tools: [
    "ServiceNow MCP",
    "Teams MCP",
    "SMTP MCP",
    "Elasticsearch MCP",
    "Kubernetes MCP",
  ],
  knowledgeSources: [
    "SRE Runbook Repository",
    "Post-Incident Review (PIR) Templates",
    "On-Call Rotation & SME Directory",
    "Service Dependency & SLO Registry",
  ],
  agents: [
    "SRE Agent",
    "Major Incident Manager Agent",
    "War Room Coordinator Agent",
    "Triage & RCA Agent",
    "PIR Report Generator Agent",
    "Communication Agent",
  ],
};

export const sreAgentSteps = [
  {
    title: "Step 1: Major Incident Detection",
    description:
      "SRE Agent identifies P1/P2 pattern from correlated alerts across monitoring tools. Checks SLO thresholds, alert volume, impacted services, and blast radius before auto-declaring a Major Incident.",
    details: [
      { icon: "fas fa-exclamation-triangle", text: "Elasticsearch MCP: 847 error-rate anomalies detected in last 5 minutes" },
      { icon: "fas fa-layer-group", text: "Kubernetes MCP: 6 payment pods in CrashLoopBackOff — restart loop active" },
      { icon: "fas fa-chart-line", text: "SLO breach confirmed: api-gateway availability at 98.7% (SLO: 99.9%)" },
      { icon: "fas fa-brain", text: "SRE Agent: P1 pattern confirmed — 3+ correlated signals across 2 services" },
      { icon: "fas fa-radiation", text: "Blast radius assessment: 14 downstream services potentially impacted" },
      { icon: "fas fa-check-circle", text: "Major Incident auto-declared — MIM-2026-00128 escalation initiated" },
    ],
  },
  {
    title: "Step 2: Incident Declaration",
    description:
      "Major Incident Manager Agent auto-declares the MIM and creates an enriched ServiceNow major incident record with all correlated evidence, SLO impact, and initial blast radius.",
    details: [
      { icon: "fas fa-file-medical", text: "ServiceNow MCP: Creating Major Incident MIM-2026-00128 (P1 - Critical)" },
      { icon: "fas fa-paperclip", text: "Attaching correlated evidence: 847 errors, 6 pod crashes, SLO breach data" },
      { icon: "fas fa-tags", text: "Auto-categorized: Platform > Kubernetes > Pod Stability (P1 - Revenue Impact)" },
      { icon: "fas fa-stopwatch", text: "MIM clock started — P1 SLA: 1-hour resolution, 15-min update cadence" },
      { icon: "fas fa-user-shield", text: "MIM Coordinator role assigned to on-call SRE lead: a.kumar@infosys.com" },
      { icon: "fas fa-check-circle", text: "Major Incident declared — ServiceNow MIM-2026-00128 active and tracked" },
    ],
  },
  {
    title: "Step 3: War Room Setup",
    description:
      "War Room Coordinator Agent creates a Teams bridge call, auto-invites on-call SMEs from each tower (app, infra, network, security), and shares enriched incident context to all participants simultaneously.",
    details: [
      { icon: "fab fa-microsoft", text: "Teams MCP: Creating war room channel #mim-2026-00128 with bridge link" },
      { icon: "fas fa-users", text: "Identifying on-call SMEs: App (j.smith), Infra (r.patel), Network (l.chen), Security (m.jones)" },
      { icon: "fas fa-paper-plane", text: "Teams MCP: Sending war room invites to 4 SMEs + SRE lead simultaneously" },
      { icon: "fas fa-clipboard-list", text: "Enriched incident brief posted to war room: impact scope, SLO status, topology map" },
      { icon: "fas fa-mobile-alt", text: "SMTP MCP: PagerDuty escalation + SMS alerts to all on-call responders" },
      { icon: "fas fa-check-circle", text: "War room live — all 5 SMEs joined within 3 minutes of incident declaration" },
    ],
  },
  {
    title: "Step 4: Evidence Collection",
    description:
      "Triage & RCA Agent collects telemetry, logs, and metrics from Splunk, Datadog, and Elasticsearch within the incident time window for unified analysis.",
    details: [
      { icon: "fas fa-search", text: "Elasticsearch MCP: Querying error logs for api-gateway last 15 minutes" },
      { icon: "fas fa-wave-square", text: "Kubernetes MCP: Pulling pod events, crash logs, and OOMKilled signals" },
      { icon: "fas fa-chart-area", text: "Retrieving APM traces: Identifying p99 latency spike in payment-svc at T-12min" },
      { icon: "fas fa-code-branch", text: "Change correlation: Checking recent deployments — payment-svc v2.4.1 deployed T-18min" },
      { icon: "fas fa-database", text: "DB metrics: Connection pool exhaustion on payment-db (100/100 active connections)" },
      { icon: "fas fa-check-circle", text: "Evidence collection complete — 2,341 log lines, 18 metrics, 1 change event correlated" },
    ],
  },
  {
    title: "Step 5: Root Cause Analysis",
    description:
      "AI-driven temporal and topological RCA identifies probable root cause with supporting evidence. Shared with all L1-L3 teams simultaneously via war room.",
    details: [
      { icon: "fas fa-brain", text: "Triage & RCA Agent: Running temporal correlation on evidence timeline" },
      { icon: "fas fa-project-diagram", text: "Topology traversal: payment-svc v2.4.1 ? connection leak ? DB pool saturated" },
      { icon: "fas fa-bullseye", text: "Root cause confirmed: Memory leak in payment-svc v2.4.1 connection handling" },
      { icon: "fas fa-sitemap", text: "Cascade: DB pool exhaustion ? API gateway 502s ? pod OOMKill ? CrashLoop" },
      { icon: "fas fa-clipboard-check", text: "RCA brief posted to war room with confidence score: 94%" },
      { icon: "fas fa-check-circle", text: "Root cause shared with all L1-L3 teams — investigation converged in 12 minutes" },
    ],
  },
  {
    title: "Step 6: Guided Resolution",
    description:
      "SRE Agent suggests resolution steps from matching runbooks and coordinates L1-L3 execution with shared context. Monitors each action before confirming success.",
    details: [
      { icon: "fas fa-book-open", text: "Searching runbook repo for pattern: kubernetes-oom-connection-leak" },
      { icon: "fas fa-check-double", text: "Match found: RB-K8S-OOM-007 — Rollback deployment + DB pool reset" },
      { icon: "fas fa-undo", text: "L2 executes: kubectl rollout undo deployment/payment-svc (rollback to v2.4.0)" },
      { icon: "fas fa-database", text: "L2 executes: DB connection pool reset — stale connections cleared" },
      { icon: "fas fa-heartbeat", text: "Validation: payment-svc pods healthy, DB pool 12/100, API gateway 200s" },
      { icon: "fas fa-check-circle", text: "Resolution confirmed — all services healthy, SLO recovering at T+47min" },
    ],
  },
  {
    title: "Step 7: Stakeholder Updates",
    description:
      "Communication Agent sends automated cadence updates every 15 minutes via Teams and Email to all stakeholders throughout the incident lifecycle.",
    details: [
      { icon: "fas fa-clock", text: "Communication Agent: Sending T+15min update — incident active, RCA in progress" },
      { icon: "fas fa-clock", text: "T+30min update: Root cause identified, resolution underway (rollback in progress)" },
      { icon: "fab fa-microsoft", text: "Teams MCP: Status card updated in #mim-2026-00128 at each cadence" },
      { icon: "fas fa-envelope", text: "SMTP MCP: Executive summary emailed to it-leadership@infosys.com" },
      { icon: "fas fa-check-circle", text: "T+47min update: Incident resolved — all stakeholders notified automatically" },
    ],
  },
  {
    title: "Step 8: PIR Generation",
    description:
      "PIR Report Generator auto-creates a post-incident review with complete timeline, RCA, action items, and SLO impact. Replaces days of manual PIR writing.",
    details: [
      { icon: "fas fa-file-alt", text: "PIR Report Generator: Compiling incident timeline from all evidence sources" },
      { icon: "fas fa-list-ol", text: "Timeline rendered: T-18min deploy ? T-0 alerts ? T+3min war room ? T+47min resolved" },
      { icon: "fas fa-lightbulb", text: "Action items generated: Pre-prod load test, DB pool monitoring, deploy gate review" },
      { icon: "fas fa-tachometer-alt", text: "MTTR: 47 minutes (vs. 4-8 hour manual baseline — 90% improvement)" },
      { icon: "fas fa-shield-alt", text: "SLO impact logged: 12-minute breach at 98.7% availability — P1 SLA met" },
      { icon: "fas fa-flag-checkered", text: "PIR MIM-2026-00128 published to ServiceNow — incident closed with full audit trail" },
    ],
  },
];
