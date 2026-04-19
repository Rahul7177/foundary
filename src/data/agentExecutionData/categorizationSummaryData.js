// =============================================================================
// Categorization & Summary Agent — IT Service Management
// Domain: IT Service Management | UC8: Intelligent Ticket Categorization & Triage
// Automates the To-Be process: Ticket Ingestion → NLP Classification →
//   Priority Assessment → EASE Tagging → Smart Routing → Enrichment →
//   Auto-Route → Analytics Feed
// =============================================================================

export const categorizationSummaryConfig = {
  title: "Categorization & Summary Agent — Intelligent Ticket Categorization & Triage",
  runId: "RUN-CAT-20260315-0912",
  startedAt: "2026-03-15 09:12:04 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "INC-20260315-00847",
    issueType: "Service Request — VPN connectivity failure affecting remote workers",
    affectedSystem: "GlobalVPN-PROD (Cisco AnyConnect) + Active Directory Auth",
    triggeredBy: "ServiceNow MCP: New incident ticket ingested from L1 queue",
  },
  relatedIncidents: [
    { id: "INC-2026-00847", label: "ServiceNow — Primary ticket (VPN connectivity failure)" },
    { id: "INC-2026-00791", label: "Similar past incident — VPN RADIUS auth timeout (resolved 3 days ago)" },
    { id: "INC-2026-00612", label: "Similar past incident — AD group policy push failure (resolved 7 days ago)" },
    { id: "KB-0051247", label: "KB Article — VPN Troubleshooting Runbook for RADIUS Auth Issues" },
  ],
  tools: [
    "ServiceNow MCP",
    "Datadog MCP",
    "Splunk MCP",
    "NLP Classification Engine",
    "EASE Classifier MCP",
  ],
  knowledgeSources: [
    "ServiceNow Ticket History & Resolution Database",
    "EASE Classification Framework (Eliminate/Automate/Self-Help/Enhance)",
    "Assignment Group Workload & Skills Matrix",
    "KB Article & Runbook Repository",
    "Ticket Analytics & Pattern Database",
  ],
  agents: [
    "Triaging Agent",
    "EASE Classifier Agent",
    "EASE Recommendation Agent",
    "Ticket Analytics Agent",
    "Data Analyzer Agent",
    "ServiceNow Agent",
  ],
};

export const categorizationSummarySteps = [
  {
    title: "Step 1: Ticket Ingestion",
    description:
      "New incident/service request ingested from ServiceNow queue via MCP adapter. Full ticket payload captured including description, caller details, urgency flag, and any attachments.",
    details: [
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Polling incident queue — INC-20260315-00847 detected in L1 queue" },
      { icon: "fas fa-user", text: "Caller: John Martinez (IT Operations, Houston) | Urgency: High | Impact: 47 remote workers affected" },
      { icon: "fas fa-file-alt", text: "Description: 'VPN connection failing since 08:30 AM. Error: RADIUS authentication timeout. Team cannot work remotely.'" },
      { icon: "fas fa-paperclip", text: "Attachments: 2 screenshots of error, 1 log file — extracted and prepared for analysis" },
      { icon: "fas fa-clock", text: "Ticket age: 12 minutes in queue — no assignment, no category set, no priority assigned" },
      { icon: "fas fa-check-circle", text: "Ticket ingestion complete — raw payload normalized and queued for NLP classification" },
    ],
  },
  {
    title: "Step 2: NLP Classification",
    description:
      "Triaging Agent analyzes ticket description using NLP to determine category and subcategory. Model trained on 200K+ historical tickets for high-accuracy classification.",
    details: [
      { icon: "fas fa-brain", text: "Triaging Agent: Tokenizing description — extracting keywords: VPN, RADIUS, authentication, timeout, remote" },
      { icon: "fas fa-search", text: "NLP model inference: Category=Network, Subcategory=VPN/Remote-Access, Confidence=97.3%" },
      { icon: "fas fa-tags", text: "Entity extraction: Affected system=GlobalVPN-PROD, Technology=Cisco AnyConnect, Protocol=RADIUS" },
      { icon: "fas fa-history", text: "Historical pattern match: 847 similar tickets in past 12 months — Category=Network confirmed" },
      { icon: "fas fa-check-double", text: "Classification validated against ServiceNow taxonomy — exact match to Network → VPN → Auth" },
      { icon: "fas fa-check-circle", text: "NLP classification complete — Category: Network | Subcategory: VPN/Remote-Access (97.3% confidence)" },
    ],
  },
  {
    title: "Step 3: Priority Assessment",
    description:
      "AI priority model assesses impact, urgency, and business criticality to assign consistent data-driven priority — eliminating analyst judgment variability across shifts.",
    details: [
      { icon: "fas fa-calculator", text: "Priority model inputs: Impact=Multiple users (47), Urgency=High, Business criticality=Remote work enablement" },
      { icon: "fas fa-users", text: "Impact scoring: 47 users blocked × Business-critical=Remote-Work × Time-of-day=Business-hours → High" },
      { icon: "fas fa-chart-line", text: "Urgency assessment: VPN outage → direct productivity loss, no workaround available → Urgency=High" },
      { icon: "fas fa-calendar-check", text: "SLA mapping: High-Impact + High-Urgency → Priority 2 (Response: 1hr, Resolution: 4hr SLA)" },
      { icon: "fas fa-stopwatch", text: "SLA clock started: 09:12:04 UTC — P2 response deadline: 10:12:04 UTC (60 min)" },
      { icon: "fas fa-check-circle", text: "Priority assessment complete — Priority: P2 High | SLA: 4-hour resolution target set" },
    ],
  },
  {
    title: "Step 4: EASE Classification",
    description:
      "EASE Classifier Agent tags the ticket type as Eliminate, Automate, Self-Help, or Enhance — enabling systematic toil reduction and process improvement tracking across all tickets.",
    details: [
      { icon: "fas fa-robot", text: "EASE Classifier Agent: Analyzing ticket pattern against EASE framework taxonomy" },
      { icon: "fas fa-bolt", text: "Automate check: VPN RADIUS auth failures — recurring pattern (6x this week) → Automation candidate" },
      { icon: "fas fa-user-graduate", text: "Self-Help check: KB article exists (KB-0051247 — VPN Troubleshooting Guide) → Self-Help viable" },
      { icon: "fas fa-cogs", text: "EASE tag assigned: AUTOMATE — RADIUS auto-restart script available; Self-Help fallback for users" },
      { icon: "fas fa-chart-bar", text: "Toil score: 47 users × 12 min manual routing + 30 min misrouting risk → 12.5 hours toil if not automated" },
      { icon: "fas fa-check-circle", text: "EASE classification complete — Tag: AUTOMATE | Self-Help KB available | Toil reduction flagged" },
    ],
  },
  {
    title: "Step 5: Assignment Group Smart Routing",
    description:
      "Smart routing engine determines the correct resolver group based on classification, current workload, and team skill matrix — eliminating misrouting and re-routing delays.",
    details: [
      { icon: "fas fa-sitemap", text: "Routing engine: Querying assignment group matrix for Category=Network, Subcategory=VPN/Remote-Access" },
      { icon: "fas fa-users-cog", text: "Candidate groups: Network-L2-VPN (primary), Network-L2-Security (secondary), IT-Infra-L3 (escalation)" },
      { icon: "fas fa-balance-scale", text: "Workload check: Network-L2-VPN has 3 open P2 tickets (avg 41% capacity) — within threshold" },
      { icon: "fas fa-star", text: "Skill match: Network-L2-VPN has Cisco AnyConnect + RADIUS expertise — perfect skill alignment" },
      { icon: "fas fa-route", text: "Routing decision: Assigned to Network-L2-VPN | Owner: Ravi Menon (VPN specialist, on-shift)" },
      { icon: "fas fa-check-circle", text: "Smart routing complete — Zero misrouting risk | Assigned: Network-L2-VPN | Owner: Ravi Menon" },
    ],
  },
  {
    title: "Step 6: Context Enrichment",
    description:
      "Ticket enriched with related CI data from CMDB, similar resolved incidents, relevant KB articles, Datadog metrics for affected system, and recent change records.",
    details: [
      { icon: "fas fa-database", text: "CMDB lookup: GlobalVPN-PROD CI data — Cisco ASA 5585-X, Location=Houston-DC01, Owner=Network-Ops" },
      { icon: "fas fa-chart-line", text: "Datadog MCP: Fetching VPN server metrics — Active sessions=847, Auth failures=234/min (abnormal)" },
      { icon: "fas fa-history", text: "Similar incident lookup: INC-2026-00791 (resolved 3 days ago) — same error, fix: RADIUS server restart" },
      { icon: "fas fa-book", text: "KB article linked: KB-0051247 'VPN RADIUS Auth Timeout — Restart RADIUS service on 10.1.2.15'" },
      { icon: "fas fa-wrench", text: "Recent change check: CHG-2026-00341 (VPN config update 2 days ago) — potential correlation flagged" },
      { icon: "fas fa-check-circle", text: "Enrichment complete — CMDB data, metrics, 2 similar incidents, KB runbook, change record attached" },
    ],
  },
  {
    title: "Step 7: Auto-Route with Enriched Context",
    description:
      "Enriched ticket automatically routed to the correct resolver with full context pre-populated — resolver receives everything needed to diagnose and resolve without investigation delay.",
    details: [
      { icon: "fas fa-paper-plane", text: "ServiceNow MCP: Updating ticket INC-20260315-00847 with classification, priority, assignment, enrichment" },
      { icon: "fas fa-tag", text: "Fields auto-populated: Category=Network, Subcategory=VPN/Remote-Access, Priority=P2, Group=Network-L2-VPN" },
      { icon: "fas fa-bell", text: "Ravi Menon notified via ServiceNow + Teams + Email: 'INC-00847: VPN RADIUS issue — KB-0051247 attached'" },
      { icon: "fas fa-file-medical-alt", text: "Ticket notes: 'AI Analysis: RADIUS auth failure pattern matches INC-00791. Recommended fix: RADIUS restart'" },
      { icon: "fas fa-shield-alt", text: "Audit trail: All AI decisions logged with confidence scores and data sources for compliance" },
      { icon: "fas fa-check-circle", text: "Auto-route complete — Ticket fully enriched and assigned in 48 seconds (vs 1-2 hours manual)" },
    ],
  },
  {
    title: "Step 8: Analytics Feed & Continuous Improvement",
    description:
      "Ticket Analytics Agent captures classification data, routing outcomes, and resolution patterns. EASE Recommendation Agent identifies automation candidates to progressively reduce ticket toil.",
    details: [
      { icon: "fas fa-chart-pie", text: "Ticket Analytics Agent: Recording classification metadata for trend analysis pipeline" },
      { icon: "fas fa-trending-up", text: "Pattern detected: VPN RADIUS auth failures — 23 tickets in 30 days, 6 this week → spike detected" },
      { icon: "fas fa-lightbulb", text: "EASE Recommendation Agent: 'Create auto-remediation script — RADIUS auto-restart saves 23 tickets/month'" },
      { icon: "fas fa-robot", text: "Automation opportunity: EASE tag=AUTOMATE confirmed — Scripted RADIUS health check + auto-restart viable" },
      { icon: "fas fa-database", text: "Data Analyzer Agent: Updating classification model with this ticket data, improving future accuracy" },
      { icon: "fas fa-check-circle", text: "Analytics feed complete — Trend flagged, automation opportunity recorded, model updated" },
    ],
  },
  {
    title: "Step 9: Summary Report Generation",
    description:
      "Categorization & Summary Agent generates structured incident summary with classification decisions, enrichment context, routing rationale, and recommended actions for the resolver.",
    details: [
      { icon: "fas fa-file-invoice", text: "Generating AI summary: Classification decisions, priority rationale, enrichment sources, routing logic" },
      { icon: "fas fa-list-check", text: "Recommended actions: 1) Restart RADIUS on 10.1.2.15 2) Check CHG-2026-00341 impact 3) Monitor auth rate" },
      { icon: "fas fa-users", text: "Stakeholder summary: '47 users impacted. P2 VPN issue auto-routed to Network-L2-VPN. ETA: 4hr SLA.'" },
      { icon: "fas fa-chart-bar", text: "Ticket metrics: Classification time=48s, Routing accuracy=100%, EASE=AUTOMATE, Toil savings=12.5hrs" },
      { icon: "fas fa-shield-alt", text: "Compliance report: Full AI decision audit trail logged — SOX/GDPR compliant decision record created" },
      { icon: "fas fa-flag-checkered", text: "Agent run complete — INC-00847 classified, prioritized, routed, enriched in <5 min (vs 1-2 hrs manual)" },
    ],
  },
];
