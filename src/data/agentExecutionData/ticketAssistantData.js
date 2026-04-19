// =============================================================================
// Ticket Assistant Agent — IT Service Management
// Domain: IT Service Management | UC10: AI-Powered L2/L3 Ticket Resolution
// Automates the To-Be process: Ticket Pickup → Knowledge Retrieval →
//   Similar Incident Match → SOP Extraction → Resolution Plan →
//   Guided Resolution → KB Article Creation → Pattern Analysis
// =============================================================================

export const ticketAssistantConfig = {
  title: "Ticket Assistant Agent — AI-Powered L2/L3 Ticket Resolution",
  runId: "RUN-TKT-20260315-1047",
  startedAt: "2026-03-15 10:47:33 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "INC-20260315-01389",
    issueType: "Application Incident — SAP HANA query performance degradation (>300% slower than baseline)",
    affectedSystem: "SAP-HANA-PROD-01 (Finance ERP) — Accounts Payable and GL reporting queries",
    triggeredBy: "ServiceNow MCP: INC-01389 auto-routed to L2-SAP-HANA team by Categorization & Summary Agent",
  },
  relatedIncidents: [
    { id: "INC-2026-01389", label: "ServiceNow — Primary incident (SAP HANA query performance degradation)" },
    { id: "INC-2026-00873", label: "Similar past incident — HANA column store unload caused slow queries (resolved 8 days ago)" },
    { id: "INC-2026-00541", label: "Similar past incident — Statistics server stale causing plan regression (resolved 21 days ago)" },
    { id: "KB-0062104", label: "KB Article — SAP HANA Performance Troubleshooting: Column Store, Statistics, and Plan Cache" },
  ],
  tools: [
    "ServiceNow MCP",
    "Qdrant MCP",
    "Haystack MCP",
    "ServiceNow KB",
    "Problem Management Analytics MCP",
  ],
  knowledgeSources: [
    "ServiceNow KB Article Repository (RAG-indexed via Qdrant)",
    "Standard Operating Procedures (SOPs) — SOP Extractor Agent",
    "Historical Incident & Resolution Database (200K+ tickets)",
    "Change History Log (last 30 days impact correlation)",
    "Problem Record & Known Error Database (KEDB)",
  ],
  agents: [
    "Ticket Resolution Agent",
    "Knowledge Management Agent",
    "ServiceNow KB Agent",
    "SOP Extractor Agent",
    "Similar Incident Agent",
    "Problem Management Analytics",
  ],
};

export const ticketAssistantSteps = [
  {
    title: "Step 1: Ticket Pickup & Context Assembly",
    description:
      "Ticket Resolution Agent ingests the fully enriched ticket from ServiceNow via MCP. All context assembled from the Categorization Agent handoff — category, priority, enrichment, CI data, and caller details all pre-loaded.",
    details: [
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Ingesting INC-2026-01389 — Category=Application, Subcategory=SAP/HANA, Priority=P2" },
      { icon: "fas fa-user-hard-hat", text: "Assigned engineer: Divya Nair (L2-SAP-HANA team) — ticket context pre-loaded in Ticket Assistant panel" },
      { icon: "fas fa-server", text: "Affected CI: SAP-HANA-PROD-01 (version: HANA 2.0 SPS07) — Finance ERP, Owner=SAP-BASIS team" },
      { icon: "fas fa-file-alt", text: "Issue description: 'AP and GL report queries >300% slower since 08:00 AM. Month-end reporting deadline at 12:00 PM'" },
      { icon: "fas fa-clock", text: "SLA status: P2 High — 4hr resolution SLA, elapsed=46 min, remaining=3hr 14min — month-end pressure" },
      { icon: "fas fa-check-circle", text: "Ticket context assembled — Knowledge Management Agent initiating RAG search pipeline" },
    ],
  },
  {
    title: "Step 2: Knowledge Retrieval via RAG Search",
    description:
      "Knowledge Management Agent performs semantic RAG search across KB articles, SOPs, and past ticket resolutions using Qdrant vector database and Haystack pipeline — surfacing relevant knowledge in seconds instead of hours of manual searching.",
    details: [
      { icon: "fas fa-brain", text: "Knowledge Management Agent: Generating semantic embedding for INC-01389 description and error context" },
      { icon: "fas fa-search", text: "Qdrant MCP: Semantic vector search across 47,300 KB articles — query: 'SAP HANA query performance degradation'" },
      { icon: "fas fa-book", text: "Top KB match: KB-0062104 'SAP HANA Performance Troubleshooting' — similarity=0.94, highly relevant" },
      { icon: "fas fa-file-invoice", text: "Haystack MCP: Extracting relevant passages from KB-0062104 — column store, statistics server, plan cache sections" },
      { icon: "fas fa-layer-group", text: "Secondary KB matches: KB-0058341 (HANA memory management), KB-0061009 (HANA trace analysis) — both linked" },
      { icon: "fas fa-check-circle", text: "Knowledge retrieval complete — 3 KB articles, 7 relevant passages extracted and ranked by relevance" },
    ],
  },
  {
    title: "Step 3: Similar Incident Matching",
    description:
      "Similar Incident Agent searches historical incident database for past tickets with matching error signature, affected system, and resolution pattern. Change History Agent correlates recent changes that may have triggered the regression.",
    details: [
      { icon: "fas fa-history", text: "Similar Incident Agent: Searching 200K+ ticket corpus for SAP-HANA-PROD-01 performance incidents" },
      { icon: "fas fa-compress-arrows-alt", text: "Match found: INC-2026-00873 (8 days ago) — HANA column store unload → slow queries. MTTR=47min, same system" },
      { icon: "fas fa-compress-arrows-alt", text: "Match found: INC-2026-00541 (21 days ago) — Stale statistics server → query plan regression. MTTR=1hr 12min" },
      { icon: "fas fa-calendar-check", text: "Change History Agent: Reviewing changes on SAP-HANA-PROD-01 in last 72 hours" },
      { icon: "fas fa-wrench", text: "Change correlation: CHG-2026-00412 (yesterday) — HANA parameter tuning for memory optimization — potential trigger" },
      { icon: "fas fa-check-circle", text: "Similar incident match complete — 2 high-confidence matches, 1 correlated change identified" },
    ],
  },
  {
    title: "Step 4: SOP Extraction",
    description:
      "SOP Extractor Agent retrieves structured Standard Operating Procedures from the knowledge base relevant to SAP HANA performance issues — translating unstructured KB content into actionable step-by-step procedures.",
    details: [
      { icon: "fas fa-file-medical-alt", text: "SOP Extractor Agent: Querying SOP repository for SAP HANA performance troubleshooting procedures" },
      { icon: "fas fa-list-ol", text: "SOP retrieved: SOP-SAP-0047 'HANA Query Performance Degradation' — 12 structured diagnostic steps" },
      { icon: "fas fa-list-ol", text: "SOP retrieved: SOP-SAP-0031 'HANA Column Store Management' — 8 steps for unload/load management" },
      { icon: "fas fa-search-plus", text: "SOP cross-reference: Step 4 of SOP-SAP-0047 matches resolution path from INC-00873 — high alignment" },
      { icon: "fas fa-filter", text: "SOP Extractor: Filtering steps relevant to current symptom profile (performance + no memory alert)" },
      { icon: "fas fa-check-circle", text: "SOP extraction complete — 2 SOPs retrieved, 9 most-relevant steps prioritized for resolution plan" },
    ],
  },
  {
    title: "Step 5: AI Resolution Plan Generation",
    description:
      "Ticket Resolution Agent synthesizes KB knowledge, SOP procedures, and similar incident resolutions into a unified AI-generated resolution plan — ranked by probability of success and ordered by diagnostic-first, remediation-second approach.",
    details: [
      { icon: "fas fa-robot", text: "Ticket Resolution Agent: Synthesizing KB articles + SOP steps + similar incident resolutions into unified plan" },
      { icon: "fas fa-star", text: "Primary hypothesis (89% confidence): Column store unload event causing full table scans — matches INC-00873 pattern" },
      { icon: "fas fa-star-half-alt", text: "Secondary hypothesis (73% confidence): CHG-00412 memory parameter change altered optimizer behavior" },
      { icon: "fas fa-tasks", text: "Resolution plan: 5 steps — 1) Check column store status, 2) Check statistics server, 3) Clear plan cache, 4) Revert CHG-00412 if needed, 5) Monitor query times" },
      { icon: "fas fa-clock", text: "Estimated resolution time: 25-40 minutes (based on INC-00873 historical MTTR of 47 min, improved guidance)" },
      { icon: "fas fa-check-circle", text: "Resolution plan generated — 5-step plan with confidence scores and rollback options for each step" },
    ],
  },
  {
    title: "Step 6: Guided Resolution for Engineer",
    description:
      "Agent provides Divya Nair with step-by-step guided resolution instructions with exact commands, expected outputs, and decision branches — eliminating research time and eliminating dependency on individual engineer expertise.",
    details: [
      { icon: "fas fa-user-graduate", text: "Ticket Assistant panel: Displaying guided resolution UI for Divya Nair in ServiceNow sidebar" },
      { icon: "fas fa-terminal", text: "Step 1 guidance: 'Run: SELECT * FROM M_CS_UNLOADS WHERE TABLE_NAME LIKE \\'AP%\\' ORDER BY UNLOAD_TIME DESC LIMIT 20'" },
      { icon: "fas fa-terminal", text: "Step 2 guidance: 'Check: SELECT * FROM M_STATISTICS_STATE WHERE LAST_REFRESH_TIME < ADD_SECONDS(NOW(),-3600)'" },
      { icon: "fas fa-terminal", text: "Step 3 guidance: 'If stale: ALTER SYSTEM REFRESH STATISTICS — expected: statistics refresh triggered for all schemas'" },
      { icon: "fas fa-check-double", text: "Engineer feedback: Divya confirms — column store unloads detected on FIAR and FIGL tables. Step 1 hypothesis confirmed" },
      { icon: "fas fa-check-circle", text: "Guided resolution in progress — engineer following AI-guided steps, column store reload initiated" },
    ],
  },
  {
    title: "Step 7: Automated KB Article Creation",
    description:
      "Upon successful resolution, ServiceNow KB Agent auto-drafts a new or updated KB article capturing the root cause, diagnostic steps taken, and resolution — closing the knowledge gap and institutionalizing engineer expertise.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Resolution confirmed: HANA column store reloaded for FIAR/FIGL tables — query performance baseline restored" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: INC-2026-01389 marked Resolved — MTTR: 31 min (vs 2-8 hr baseline), SLA met ✓" },
      { icon: "fas fa-pen-fancy", text: "ServiceNow KB Agent: Auto-drafting KB article from this resolution — root cause + steps + fix captured" },
      { icon: "fas fa-file-medical-alt", text: "KB draft created: 'SAP HANA Column Store Unload Causing AP/GL Query Degradation' — linked to KB-0062104" },
      { icon: "fas fa-user-check", text: "KB article submitted for Divya Nair's review + approval before publish — 1-click approval workflow" },
      { icon: "fas fa-check-circle", text: "KB article drafted — knowledge captured in 2 minutes vs never captured in manual process" },
    ],
  },
  {
    title: "Step 8: Pattern Analysis & Problem Management",
    description:
      "Problem Management Analytics agent identifies recurring patterns across similar incidents. SAP HANA column store unloads flagged as a recurring pattern — problem record created to drive permanent preventive fix.",
    details: [
      { icon: "fas fa-chart-line", text: "Problem Management Analytics: Analyzing INC-01389 against HANA performance incident history" },
      { icon: "fas fa-sync", text: "Pattern detected: SAP-HANA-PROD-01 column store unload incidents — 4 occurrences in 30 days (recurrence pattern)" },
      { icon: "fas fa-exclamation-circle", text: "Root cause pattern: Memory pressure from CHG-series parameter changes triggering column store eviction" },
      { icon: "fas fa-file-medical-alt", text: "ServiceNow MCP: Creating Problem record PRB-2026-00104 — 'HANA column store unload recurrence on PROD-01'" },
      { icon: "fas fa-link", text: "Linking 4 related incidents to PRB-00104 — permanent fix investigation assigned to SAP-BASIS team" },
      { icon: "fas fa-flag-checkered", text: "Ticket Assistant run complete — INC resolved in 31 min, KB drafted, problem record created for permanent fix" },
    ],
  },
];
