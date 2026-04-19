// =============================================================================
// MI Beeper Agent — AIOps & Event Management
// Domain: AIOps & Event Management | UC7: Smart Paging & On-Call Responder Selection
// Automates the To-Be process: Alert Ingestion → Enrichment → Priority Ranking →
//   Responder Assignment → Smart Paging → Auto-Escalation → Unified Dashboard
// =============================================================================

export const miBeepperConfig = {
  title: "MI Beeper Agent — Unified Alert Management & Smart Paging",
  runId: "RUN-MIB-20260315-0845",
  startedAt: "2026-03-15 08:45:22 UTC",
  priority: "P1 - Critical",
  trigger: {
    ticket: "ALR-20260315-001",
    issueType: "Critical Alert — Database Connection Pool Exhaustion (Multiple Tools)",
    affectedSystem: "OMG-OMS-PROD (Order Management Gateway) + OMG-BILL-PROD (Cascading)",
    triggeredBy: "Unified Ingestion: OpsRamp + PagerDuty + Datadog + SNOW Alerts",
  },
  relatedIncidents: [
    { id: "INC-2026-09915", label: "ServiceNow — Primary incident (OMG-DB connection pool)" },
    { id: "ALR-DD-77305", label: "Datadog — Database connection pool at 100%" },
    { id: "ALR-OPS-45821", label: "OpsRamp — API Gateway 503 errors (cascading)" },
    { id: "ALR-PD-09441", label: "PagerDuty — Escalation policy triggered for OMG team" },
  ],
  tools: [
    "OpsRamp MCP",
    "PagerDuty MCP",
    "Datadog MCP",
    "ServiceNow MCP",
    "On-Call Management MCP",
  ],
  knowledgeSources: [
    "Service Catalog & Ownership Matrix",
    "On-Call Schedule & Responder Skills",
    "Similar Past Incidents & Resolutions",
    "KB Runbooks & Troubleshooting Guides",
    "Escalation Policies & SLA Thresholds",
  ],
  agents: [
    "Event Correlation Agent",
    "Incident Deduplication Agent",
    "Observability Agent",
    "MI Beeper Agent",
    "Auto-Escalation Agent",
  ],
};

export const miBeepperSteps = [
  {
    title: "Step 1: Multi-Tool Alert Ingestion",
    description:
      "Alerts ingested simultaneously from all 4 monitoring tools via MCP adapters. Raw alert payloads normalized into unified schema for correlation and deduplication.",
    details: [
      { icon: "fas fa-satellite-dish", text: "OpsRamp MCP: Ingesting 34 alerts from infrastructure monitoring stack" },
      { icon: "fas fa-exclamation-triangle", text: "PagerDuty MCP: Receiving 12 escalation policy alerts for on-call teams" },
      { icon: "fas fa-chart-line", text: "Datadog MCP: Ingesting 28 metric-based alerts from OMG-OMS-PROD cluster" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Reading 8 manually-created incidents from incident queue" },
      { icon: "fas fa-code-branch", text: "Normalizing 82 raw alerts into unified schema — 5 unique alert types identified" },
      { icon: "fas fa-check-circle", text: "Multi-tool ingestion complete — 82 alerts queued for correlation engine" },
    ],
  },
  {
    title: "Step 2: Event Correlation",
    description:
      "Event Correlation Agent identifies related alerts from same root cause using service dependency graph. Prevents redundant paging to multiple teams.",
    details: [
      { icon: "fas fa-project-diagram", text: "Event Correlation Agent: Querying service dependency graph for OMG-OMS-PROD" },
      { icon: "fas fa-link", text: "Service topology: OMG-OMS-PROD → OMG-DB-PROD (dependency), OMG-CACHE-PROD (cache)" },
      { icon: "fas fa-compress-arrows-alt", text: "Correlation analysis: 82 alerts clustered by affected service and error signature" },
      { icon: "fas fa-code-branch", text: "Cluster-1 (47 alerts): OMG-OMS-PROD API errors — OMG team root cause" },
      { icon: "fas fa-code-branch", text: "Cluster-2 (22 alerts): OMG-DB-PROD connection timeouts — Database team root cause" },
      { icon: "fas fa-check-circle", text: "Event correlation complete — 82 alerts reduced to 2 distinct root service issues" },
    ],
  },
  {
    title: "Step 3: Incident Deduplication",
    description:
      "Incident Deduplication Agent merges duplicate alerts from same incident into single parent, eliminating ticket sprawl and preventing multiple pages.",
    details: [
      { icon: "fas fa-clone", text: "Incident Deduplication Agent: De-duplication rules loading from ServiceNow configuration" },
      { icon: "fas fa-compress", text: "De-duplication matching: OMG-OMS-PROD alerts by error signature + timestamp window" },
      { icon: "fas fa-link", text: "Merging 47 API error alerts → 1 parent incident INC-2026-09915 (P1)" },
      { icon: "fas fa-link", text: "Merging 22 DB timeout alerts → 1 parent incident INC-2026-09916 (P1)" },
      { icon: "fas fa-ban", text: "79 duplicate ticket creation requests suppressed — single parent per root cause" },
      { icon: "fas fa-check-circle", text: "De-duplication complete — 82 alerts consolidated into 2 parent incidents" },
    ],
  },
  {
    title: "Step 4: Context Enrichment",
    description:
      "Observability Agent gathers metrics, logs, traces, and business context. Adds baseline comparisons, anomaly scores, and revenue impact estimates.",
    details: [
      { icon: "fas fa-chart-line", text: "Datadog MCP: Fetching metrics — api latency p99=2850ms (baseline=45ms), error rate=23%" },
      { icon: "fas fa-search", text: "Log aggregation: 12,847 errors in last 10 min. Top error: 'Could not acquire connection from pool'" },
      { icon: "fas fa-database", text: "Database metrics: Connection pool 50/50 active, 847 queued connections waiting" },
      { icon: "fas fa-trending-down", text: "Business context: Order service volume=0 transactions, revenue impact=$12K/min" },
      { icon: "fas fa-user-injured", text: "Customer impact: 1,200+ users unable to complete orders (SLA breach in 3 minutes)" },
      { icon: "fas fa-check-circle", text: "Context enrichment complete — full operational state + business impact captured" },
    ],
  },
  {
    title: "Step 5: Priority Ranking",
    description:
      "Unified priority ranking engine scores incidents by business impact, severity, and SLA exposure. Assigns P1-P5 priority and MTTR target.",
    details: [
      { icon: "fas fa-calculator", text: "Priority algorithm: Severity=Critical + Impact=Revenue-Critical + SLA=Breach → P1" },
      { icon: "fas fa-chart-pie", text: "Business impact score: $12K/min × 1,200 users × 99% confidence of escalation = P1" },
      { icon: "fas fa-hourglass-start", text: "SLA assessment: Tier1 service SLA=5min, current elapsed=22min → BREACH IMMINENT" },
      { icon: "fas fa-flag", text: "INC-2026-09915 (API issue): Priority=P1, MTTR Target=5 min, Escalation SLA=2 min" },
      { icon: "fas fa-flag", text: "INC-2026-09916 (DB issue): Priority=P1, MTTR Target=5 min, Escalation SLA=2 min" },
      { icon: "fas fa-check-circle", text: "Priority ranking complete — both incidents flagged as Critical (P1)" },
    ],
  },
  {
    title: "Step 6: Responder Assignment & Matching",
    description:
      "Assignment engine determines primary responder via on-call schedule, expertise matrix, and availability check. Selects responder with highest success rate.",
    details: [
      { icon: "fas fa-calendar-check", text: "On-Call MCP: Querying on-call schedule for OMG-Platform-Team (INC-2026-09915)" },
      { icon: "fas fa-user-check", text: "Primary responder: Priya Sharma (OMG-L2-DBA) — on-call, 100% success rate on DB pool issues" },
      { icon: "fas fa-star", text: "Expertise match score: 0.98 (database tuning, connection management, performance optimization)" },
      { icon: "fas fa-phone", text: "Availability check: Priya NOT in another incident, SMS + Slack + App available" },
      { icon: "fas fa-user-friends", text: "Backup escalation chain: L1-Backup=Akshay Patel (L2), L2-Backup=Rajesh Kumar (Service Owner)" },
      { icon: "fas fa-check-circle", text: "Responder assignment complete — Primary: Priya Sharma, Backup chain ready" },
    ],
  },
  {
    title: "Step 7: Smart Page Generation",
    description:
      "LLM-powered page generation creates enriched alert summary with root cause hypothesis, related incident history, runbook links, and recommended quick actions.",
    details: [
      { icon: "fas fa-robot", text: "LLM prompt: Generate smart page with context (root cause, history, quick actions)" },
      { icon: "fas fa-file-alt", text: "KB lookup: Found KB0043210 'Database Connection Pool Exhaustion' with runbook" },
      { icon: "fas fa-history", text: "Historical lookup: Similar incident INC-2026-07789 resolved 2 weeks ago by Priya (18 min MTTR)" },
      { icon: "fas fa-list-check", text: "Recommended actions: 1) Check pool status 2) Increase pool to 200 3) Monitor for 15 min" },
      { icon: "fas fa-brain", text: "Confidence score: 91% — strong pattern match to known resolution (historical precedent)" },
      { icon: "fas fa-check-circle", text: "Page generation complete — smart page ready with full context + recommendations" },
    ],
  },
  {
    title: "Step 8: Multi-Channel Page Delivery",
    description:
      "Paging orchestration sends alert via multiple channels based on priority and responder contact info. Tracks delivery status and acknowledgment time.",
    details: [
      { icon: "fas fa-sms", text: "SMS sent to Priya Sharma: 'CRITICAL OMG-OMS-PROD DB pool exhausted. Check runbook link.'" },
      { icon: "fas fa-mobile-alt", text: "PagerDuty App notification: Alert with enriched context + quick action buttons" },
      { icon: "fas fa-slack", text: "Slack @priya.sharma: Channel notification with alert summary + incident link" },
      { icon: "fas fa-envelope", text: "Email sent with full incident details + runbook attachment" },
      { icon: "fas fa-clock", text: "Page delivery status: 4/4 channels delivered successfully (acknowledged: pending)" },
      { icon: "fas fa-check-circle", text: "Multi-channel delivery complete — awaiting responder acknowledgment..." },
    ],
  },
  {
    title: "Step 9: Auto-Escalation Orchestration",
    description:
      "Escalation engine monitors responder acknowledgment and progress. Auto-escalates to backup responders if SLA breach imminent (no ack in 2 min for P1).",
    details: [
      { icon: "fas fa-stopwatch", text: "Escalation timer started: T+0 = 2026-03-15 08:45:22 UTC" },
      { icon: "fas fa-alert-circle", text: "Primary responder SLA: ACK required within 2 minutes (breach at 08:47:22)" },
      { icon: "fas fa-hourglass-half", text: "T+1 min: Checking acknowledgment status... (no ACK yet, escalation in 1 min)" },
      { icon: "fas fa-hourglass-end", text: "T+2 min: No ACK threshold reached — triggering automated escalation" },
      { icon: "fas fa-bell", text: "Escalation Level 1: Paging backup responder (Akshay Patel) via SMS + App" },
      { icon: "fas fa-check-circle", text: "Auto-escalation armed — monitoring progress until resolution" },
    ],
  },
  {
    title: "Step 10: Unified Dashboard & Monitoring",
    description:
      "Observability Agent displays real-time single-pane-of-glass dashboard. Shows alert timeline, responder actions, metrics, logs, and resolution path.",
    details: [
      { icon: "fas fa-chart-line", text: "Metrics dashboard: Live graphs of api latency, error rate, connection pool status" },
      { icon: "fas fa-file-invoice", text: "Timeline view: Alert fired → Correlated → De-duped → Paged → ACK received (T+1:23)" },
      { icon: "fas fa-user-clock", text: "Responder action log: Priya Sharma → Acknowledged 08:47:00 → Investigated 08:47:30" },
      { icon: "fas fa-terminal", text: "Live log tailing: Real-time view of database connection pool recovery" },
      { icon: "fas fa-check-square", text: "Resolution status: Connection pool increasing (45→180)→Recovery in progress" },
      { icon: "fas fa-check-circle", text: "Unified dashboard live — MTTR tracking: Current 8 min (target 5 min) — on pace to resolve" },
    ],
  },
  {
    title: "Step 11: Post-Resolution & Feedback",
    description:
      "After resolution, feedback loop updates responder effectiveness matrix and incident knowledge base. Captures lessons learned for future prevention.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Resolution confirmed: Database connection pool stable at 180, api latency normalized" },
      { icon: "fas fa-check-double", text: "Incident marked RESOLVED at 08:52:15 UTC — Final MTTR: 6 min 53 sec" },
      { icon: "fas fa-user-check", text: "Responder feedback: Priya Sharma rated page quality 5/5 ('Excellent context + runbook link')" },
      { icon: "fas fa-brain", text: "Learning captured: This pattern → Increase pool size + tune idle timeout (preventive)" },
      { icon: "fas fa-database", text: "KB article updated with this resolution path for future similar incidents" },
      { icon: "fas fa-check-circle", text: "Post-resolution complete — Metrics recorded, knowledge base updated, feedback archived" },
    ],
  },
  {
    title: "Step 12: Incident Commander Engagement (Closed Loop)",
    description:
      "Final step: Incident summary published to incident commander, status page updated, problem record created for permanent fix investigation.",
    details: [
      { icon: "fas fa-file-medical-alt", text: "ServiceNow: Creating Problem record PRB-2026-00091 (recurring pattern: pool exhaustion)" },
      { icon: "fas fa-redo", text: "Recurrence check: This alert fired 6x in 30 days → permanent fix investigation required" },
      { icon: "fas fa-link", text: "Linking 6 related incidents to PRB-00091 for permanent fix (connection pool monitoring)" },
      { icon: "fas fa-bullhorn", text: "Status page update: 'Database issue resolved in 7 minutes. Investigating permanent fix.'" },
      { icon: "fas fa-users", text: "Incident summary sent to OMG platform team + incident commander for post-mortem review" },
      { icon: "fas fa-flag-checkered", text: "MI Beeper run complete — Alert → Page → Resolved in 6:53 (vs 2-3 hour baseline)" },
    ],
  },
];
