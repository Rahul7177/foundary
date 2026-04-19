export const flowBuilderConfig = {
  title: "AIOps Ticket Processing Triage",
  runId: "RUN-AIOPS-20250622-0055",
  startedAt: "2025-06-22 00:55:32 UTC",
  priority: "P1 - Critical",
  trigger: "ServiceNow Incident - Automated AIOps Triage Pipeline",
  relatedIncidents: ["INC501283", "INC501290"],
  tools: [
    "SNOW Ticket Triage Agent",
    "PolyCloud Event Correlation Agent",
    "AIOps Ticket Triage Agent",
    "AIOps Ticket Resolver Assist Agent",
    "AIOps Ticket Enrichment Agent"
  ],
};

export const flowBuilderSteps = [
  {
    title: "Step 1: Ticket Intake & Initialization",
    description: "AIOps pipeline triggered by incoming ServiceNow incident. Start node initializes the triage workflow and prepares agent orchestration.",
    details: [
      { icon: "fas fa-play-circle", text: "Start node activated - AIOps Triage pipeline initialized" },
      { icon: "fas fa-ticket-alt", text: "Incoming ServiceNow incident detected for processing" },
      { icon: "fas fa-project-diagram", text: "Flow orchestration engine engaged - RWX permissions validated" },
      { icon: "fas fa-sitemap", text: "Agent pipeline: 5 AI agents staged for sequential/parallel execution" }
    ]
  },
  {
    title: "Step 2: Fetch Ticket Details",
    description: "SNOW Ticket Triage Agent retrieves complete ticket details, related CIs, error events, and change logs within the incident time range.",
    details: [
      { icon: "fas fa-download", text: "SNOW Ticket Triage Agent: Fetching ticket details from ServiceNow" },
      { icon: "fas fa-server", text: "Retrieving related Configuration Items (CIs) for affected systems" },
      { icon: "fas fa-exclamation-circle", text: "Pulling error events and change logs within incident time range" },
      { icon: "fas fa-link", text: "Identifying related tickets for impacted CIs" }
    ]
  },
  {
    title: "Step 3: Fetch Related CIs & Enrichment",
    description: "Parallel branch: SNOW Ticket Triage Agent fetches all related CIs while AIOps Enrichment Agent performs initial assessment, categorization, and routing.",
    details: [
      { icon: "fas fa-server", text: "SNOW Agent: Fetching all configuration items linked to incident" },
      { icon: "fas fa-tags", text: "AIOps Enrichment Agent: Categorizing incident type and domain" },
      { icon: "fas fa-sort-amount-up", text: "Priority assessment based on CI criticality and blast radius" },
      { icon: "fas fa-route", text: "Routing recommendation generated for assignment group" }
    ]
  },
  {
    title: "Step 4: Event Correlation & Signal Analysis",
    description: "PolyCloud Event Correlation Agent cross-correlates logs, metrics, traces, and tickets across multi-cloud infrastructure.",
    details: [
      { icon: "fas fa-chart-line", text: "PolyCloud Agent: Correlating metrics from cloud infrastructure" },
      { icon: "fas fa-file-alt", text: "Analyzing log patterns across affected services" },
      { icon: "fas fa-wave-square", text: "Trace analysis: Mapping request flow through microservices" },
      { icon: "fas fa-compress-arrows-alt", text: "Signal correlation complete - anomaly patterns identified" }
    ]
  },
  {
    title: "Step 5: Root Cause Analysis & SOP Retrieval",
    description: "AIOps Ticket Triage Agent generates root cause analysis and retrieves Standard Operating Procedures for the incident and related tickets.",
    details: [
      { icon: "fas fa-search", text: "AIOps Triage Agent: Generating root cause analysis" },
      { icon: "fas fa-brain", text: "AI-driven RCA: Correlating events, changes, and CI dependencies" },
      { icon: "fas fa-book", text: "Retrieving matching SOPs from knowledge base" },
      { icon: "fas fa-clipboard-list", text: "Resolution steps identified from historical patterns" }
    ]
  },
  {
    title: "Step 6: Human-in-the-Loop Approval",
    description: "Approval gate: Human reviewer validates RCA findings and approves or rejects the automated resolution script before execution.",
    details: [
      { icon: "fas fa-user-check", text: "Human-in-the-Loop gate activated - awaiting approval" },
      { icon: "fas fa-file-contract", text: "RCA summary and resolution plan presented for review" },
      { icon: "fas fa-check-circle", text: "Approval granted - automation script authorized for execution" },
      { icon: "fas fa-shield-alt", text: "Compliance check passed - proceeding to resolution phase" }
    ]
  },
  {
    title: "Step 7: Execute Resolution & Health Check",
    description: "AIOps Resolver Assist Agent triggers resolution scripts, executes remediation actions, and validates CI health post-resolution.",
    details: [
      { icon: "fas fa-play-circle", text: "AIOps Resolver Agent: Executing approved resolution scripts" },
      { icon: "fas fa-cogs", text: "Remediation actions applied to affected configuration items" },
      { icon: "fas fa-heartbeat", text: "Health check: Validating CI status and service recovery" },
      { icon: "fas fa-check-double", text: "All related ticket CIs confirmed healthy" }
    ]
  },
  {
    title: "Step 8: Ticket Update & Closure",
    description: "AIOps Resolver Assist Agent updates all affected tickets with resolution details, notes, and marks them as resolved. Flow terminates.",
    details: [
      { icon: "fas fa-edit", text: "Updating incident with resolution notes and RCA findings" },
      { icon: "fas fa-check-square", text: "Primary ticket marked as Resolved" },
      { icon: "fas fa-clone", text: "Related tickets updated with cross-reference resolution details" },
      { icon: "fas fa-flag-checkered", text: "AIOps Triage Pipeline complete - END node reached" }
    ]
  }
];
