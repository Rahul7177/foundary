// =============================================================================
// Infosys AI Agent Foundry - Portfolio & ROI Data
// =============================================================================

export const portfolioMetrics = [
  {
    id: "total-hours",
    value: 5284,
    unit: "hrs",
    label: "Total Hours",
    change: 18,
    icon: "fa-clock",
    format: "number",
  },
  {
    id: "total-tokens",
    value: 1124000,
    unit: "",
    label: "Tokens",
    change: 22,
    icon: "fa-coins",
    format: "compact",
  },
  {
    id: "incidents-proactive",
    value: 2148,
    unit: "",
    label: "Incidents (Proactive)",
    change: 31,
    icon: "fa-shield-alt",
    format: "number",
  },
  {
    id: "incidents-reactive",
    value: 987,
    unit: "",
    label: "Incidents (Reactive)",
    change: 14,
    icon: "fa-bolt",
    format: "number",
  },
  {
    id: "preventive-actions",
    value: 4621,
    unit: "",
    label: "Preventive Actions",
    change: 27,
    icon: "fa-shield-check",
    format: "number",
  },
  {
    id: "tickets-resolved",
    value: 4109,
    unit: "",
    label: "Tickets Resolved",
    change: 21,
    icon: "fa-ticket-alt",
    format: "number",
  },
  {
    id: "chatbot-sessions",
    value: 7843,
    unit: "",
    label: "Chatbot Sessions",
    change: 28,
    icon: "fa-comments",
    format: "number",
  },
];

export const portfolioCategories = [
  { key: "business", label: "Business.AI" },
  { key: "operations", label: "Operations.AI" },
  { key: "engineering", label: "Engineering.AI" },
];

export const portfolioTimePeriods = [
  { key: "year", label: "This Year" },
  { key: "month", label: "This Month" },
  { key: "week", label: "This Week" },
];

export const portfolioViewModes = [
  { key: "list", label: "List View" },
  { key: "card", label: "Card View" },
];

export const portfolioTableColumns = [
  { key: "category", label: "Agent Sub Categories", sortable: true },
  { key: "totalHours", label: "Total Hours", sortable: true },
  { key: "totalTokens", label: "Total Tokens", sortable: true },
  { key: "proactive", label: "Incidents (Proactive)", sortable: true },
  { key: "reactive", label: "Incidents (Reactive)", sortable: true },
  { key: "preventive", label: "Preventive Actions", sortable: true },
  { key: "tickets", label: "Tickets Resolved", sortable: true },
  { key: "chatbot", label: "Chatbot Sessions", sortable: true },
];

export const portfolioSummaryData = [
  // -- Operations.AI ----------------------------------------------------------
  {
    id: "infra-reliability",
    category: "Infrastructure & Reliability",
    totalHours: 742,
    totalTokens: 198560,
    proactive: 342,
    reactive: 128,
    preventive: 689,
    tickets: 621,
    chatbot: 1124,
    children: [
      { name: "Self-Healing Agent",  totalHours: 268, totalTokens: 71240, proactive: 124, reactive: 46, preventive: 251, tickets: 226, chatbot: 412 },
      { name: "Health Check Agent",  totalHours: 245, totalTokens: 65890, proactive: 113, reactive: 43, preventive: 224, tickets: 201, chatbot: 368 },
      { name: "SRE Agent",           totalHours: 229, totalTokens: 61430, proactive: 105, reactive: 39, preventive: 214, tickets: 194, chatbot: 344 },
    ],
  },
  {
    id: "monitoring-events",
    category: "Monitoring & Event Management",
    totalHours: 681,
    totalTokens: 172340,
    proactive: 318,
    reactive: 112,
    preventive: 587,
    tickets: 534,
    chatbot: 978,
    children: [
      { name: "MI Beeper Agent",          totalHours: 241, totalTokens: 61230, proactive: 114, reactive: 40, preventive: 210, tickets: 191, chatbot: 351 },
      { name: "Event Correlation Agent",  totalHours: 228, totalTokens: 57680, proactive: 107, reactive: 37, preventive: 197, tickets: 178, chatbot: 326 },
      { name: "NOC Agent",                totalHours: 212, totalTokens: 53430, proactive: 97,  reactive: 35, preventive: 180, tickets: 165, chatbot: 301 },
    ],
  },
  {
    id: "itsm",
    category: "IT Service Management",
    totalHours: 598,
    totalTokens: 148920,
    proactive: 267,
    reactive: 98,
    preventive: 512,
    tickets: 467,
    chatbot: 856,
    children: [
      { name: "RCA Agent",               totalHours: 218, totalTokens: 54340, proactive: 99, reactive: 36, preventive: 188, tickets: 171, chatbot: 316 },
      { name: "CMDB Intelligence Agent", totalHours: 196, totalTokens: 48920, proactive: 88, reactive: 32, preventive: 167, tickets: 152, chatbot: 278 },
      { name: "CAB Assist",              totalHours: 184, totalTokens: 45660, proactive: 80, reactive: 30, preventive: 157, tickets: 144, chatbot: 262 },
    ],
  },
  {
    id: "security-compliance",
    category: "Security & Compliance",
    totalHours: 712,
    totalTokens: 189640,
    proactive: 334,
    reactive: 119,
    preventive: 641,
    tickets: 578,
    chatbot: 1067,
    children: [
      { name: "Cybersec Alert Agent",        totalHours: 198, totalTokens: 52780, proactive: 93,  reactive: 33, preventive: 178, tickets: 161, chatbot: 298 },
      { name: "Access Mgmt Agent",           totalHours: 187, totalTokens: 49830, proactive: 88,  reactive: 31, preventive: 169, tickets: 153, chatbot: 281 },
      { name: "Patch Orchestration Agent",   totalHours: 178, totalTokens: 47410, proactive: 83,  reactive: 29, preventive: 159, tickets: 144, chatbot: 265 },
      { name: "Network Provisioning Agent",  totalHours: 149, totalTokens: 39620, proactive: 70,  reactive: 26, preventive: 135, tickets: 120, chatbot: 223 },
    ],
  },
  // -- Business.AI ------------------------------------------------------------
  {
    id: "strategy-analytics",
    category: "Strategy & Analytics",
    totalHours: 487,
    totalTokens: 108340,
    proactive: 198,
    reactive: 134,
    preventive: 412,
    tickets: 378,
    chatbot: 721,
    children: [
      { name: "Strategic Intelligence Agent", totalHours: 175, totalTokens: 38920, proactive: 72, reactive: 49, preventive: 149, tickets: 137, chatbot: 261 },
      { name: "Market Analysis Agent",        totalHours: 162, totalTokens: 36100, proactive: 66, reactive: 45, preventive: 137, tickets: 125, chatbot: 241 },
      { name: "Client Insights Agent",        totalHours: 150, totalTokens: 33320, proactive: 60, reactive: 40, preventive: 126, tickets: 116, chatbot: 219 },
    ],
  },
  {
    id: "research-intelligence",
    category: "Research & Intelligence",
    totalHours: 421,
    totalTokens: 96780,
    proactive: 167,
    reactive: 112,
    preventive: 342,
    tickets: 312,
    chatbot: 589,
    children: [
      { name: "Competitive Research Agent", totalHours: 154, totalTokens: 35450, proactive: 62, reactive: 41, preventive: 126, tickets: 115, chatbot: 218 },
      { name: "Market Trends Agent",        totalHours: 139, totalTokens: 32010, proactive: 55, reactive: 37, preventive: 112, tickets: 102, chatbot: 191 },
      { name: "Economic Analysis Agent",    totalHours: 128, totalTokens: 29320, proactive: 50, reactive: 34, preventive: 104, tickets:  95, chatbot: 180 },
    ],
  },
  {
    id: "client-enablement",
    category: "Client Enablement",
    totalHours: 356,
    totalTokens: 78450,
    proactive: 134,
    reactive: 89,
    preventive: 278,
    tickets: 254,
    chatbot: 478,
    children: [
      { name: "Proposal Generation Agent",    totalHours: 131, totalTokens: 28980, proactive: 50, reactive: 33, preventive: 103, tickets: 94, chatbot: 178 },
      { name: "Engagement Assessment Agent",  totalHours: 117, totalTokens: 25810, proactive: 44, reactive: 29, preventive:  90, tickets: 82, chatbot: 154 },
      { name: "Talent Analytics Agent",       totalHours: 108, totalTokens: 23660, proactive: 40, reactive: 27, preventive:  85, tickets: 78, chatbot: 146 },
    ],
  },
  // -- Engineering.AI ---------------------------------------------------------
  {
    id: "cloud-devops",
    category: "Cloud & DevOps",
    totalHours: 167,
    totalTokens: 78920,
    proactive: 245,
    reactive: 89,
    preventive: 578,
    tickets: 521,
    chatbot: 612,
    children: [
      { name: "Azure Pipeline Agent",         totalHours:  62, totalTokens: 29240, proactive: 91, reactive: 33, preventive: 215, tickets: 193, chatbot: 228 },
      { name: "IaC Orchestration Agent",      totalHours:  56, totalTokens: 26340, proactive: 82, reactive: 30, preventive: 193, tickets: 175, chatbot: 205 },
      { name: "DevOps Automation Agent",      totalHours:  49, totalTokens: 23340, proactive: 72, reactive: 26, preventive: 170, tickets: 153, chatbot: 179 },
    ],
  },
  {
    id: "data-analytics",
    category: "Data & Analytics",
    totalHours: 120,
    totalTokens: 52990,
    proactive: 143,
    reactive: 106,
    preventive: 384,
    tickets: 444,
    chatbot: 418,
    children: [
      { name: "Data Quality Agent",     totalHours:  44, totalTokens: 19480, proactive: 53, reactive: 39, preventive: 141, tickets: 163, chatbot: 154 },
      { name: "Reporting Agent",        totalHours:  40, totalTokens: 17620, proactive: 48, reactive: 35, preventive: 128, tickets: 148, chatbot: 139 },
      { name: "Insight Generation Agent", totalHours: 36, totalTokens: 15890, proactive: 42, reactive: 32, preventive: 115, tickets: 133, chatbot: 125 },
    ],
  },
];
