// =============================================================================
// Access Management Agent — Access & Identity Management
// Domain: Access & Identity Management | UC5: Automated Access Management
// Automates the To-Be process: Auto-Validation ? Auto-Approval ? Auto-Provisioning ?
//   Auth Verification ? Ticket Update ? Audit Trail
// =============================================================================

export const accessMgmtConfig = {
  title: "Automated Access Management Agent",
  runId: "RUN-ACCMGT-20260315-0512",
  startedAt: "2026-03-15 05:12:38 UTC",
  priority: "P3 - Medium",
  trigger: {
    ticket: "RITM-2026-04821",
    issueType: "Access Request — Standard Role Provisioning (Keycloak + Active Directory)",
    affectedSystem: "Identity Platform (Keycloak) + Active Directory (CORP domain)",
    triggeredBy: "ServiceNow Catalog Request ? Access Management Agent",
  },
  relatedIncidents: [
    { id: "RITM-2026-04821", label: "ServiceNow — Access request for j.doe@infosys.com" },
    { id: "ACC-AD-30112", label: "Active Directory — Group membership change: EXX-APP-PROD-RW" },
    { id: "ACC-KC-18804", label: "Keycloak — Role assignment: payment-svc-operator" },
    { id: "ACC-CIS-55021", label: "CIS Auth Check — Credential validation on target systems" },
  ],
  tools: [
    "ServiceNow MCP",
    "Keycloak MCP",
    "Active Directory MCP",
  ],
  knowledgeSources: [
    "RBAC Policy & Role Definitions",
    "Segregation of Duties (SOD) Rules",
    "Access Risk & Compliance Matrix",
    "CIS Authentication Benchmark Controls",
  ],
  agents: [
    "Access Management Agent",
    "Keycloak Agent",
    "CIS Authentication Check Agent",
    "ServiceNow Agent",
  ],
};

export const accessMgmtSteps = [
  {
    title: "Step 1: Request Ingestion",
    description:
      "Access Management Agent picks up the new access request from the ServiceNow catalog. Extracts requester identity, target system, requested role, and justification for processing.",
    details: [
      { icon: "fas fa-inbox", text: "ServiceNow MCP: New catalog request RITM-2026-04821 detected in queue" },
      { icon: "fas fa-user", text: "Requester: j.doe@infosys.com — Senior Engineer, Platform Team" },
      { icon: "fas fa-key", text: "Requested access: EXX-APP-PROD-RW (Keycloak) + payment-svc-operator role" },
      { icon: "fas fa-clipboard", text: "Justification: Project PHOENIX-2026 — production deployment access required" },
      { icon: "fas fa-calendar-check", text: "Access duration: 90 days with auto-expiry on 2026-06-15" },
      { icon: "fas fa-check-circle", text: "Request ingested — passing to policy validation engine" },
    ],
  },
  {
    title: "Step 2: Policy Validation",
    description:
      "Validates request against RBAC policies, Segregation of Duties (SOD) rules, and compliance requirements. Checks for conflicting roles and existing access entitlements.",
    details: [
      { icon: "fas fa-shield-alt", text: "Loading RBAC policy for EXX-APP-PROD-RW — checking entitlement rules" },
      { icon: "fas fa-balance-scale", text: "SOD rules engine: Checking for conflicting role combinations" },
      { icon: "fas fa-search", text: "Active Directory MCP: Querying j.doe current group memberships (14 groups)" },
      { icon: "fas fa-times-circle", text: "SOD check: No conflicts detected — EXX-APP-PROD-RW is compatible with current roles" },
      { icon: "fas fa-check-double", text: "RBAC policy check passed: Requester's job function permits this access tier" },
      { icon: "fas fa-check-circle", text: "Policy validation complete — request compliant with all RBAC and SOD rules" },
    ],
  },
  {
    title: "Step 3: Risk Assessment",
    description:
      "Classifies request as standard (auto-approve) or high-risk (human approval needed) based on access sensitivity, requester history, and compliance risk scoring.",
    details: [
      { icon: "fas fa-tachometer-alt", text: "Risk scoring engine: Evaluating access sensitivity for EXX-APP-PROD-RW" },
      { icon: "fas fa-user-clock", text: "Requester risk profile: j.doe — 0 policy violations, 3-year tenure, clean access history" },
      { icon: "fas fa-lock", text: "Role sensitivity: PROD-RW classified as Medium risk (not Privileged Admin)" },
      { icon: "fas fa-robot", text: "Risk score: 22/100 — below auto-approve threshold of 40" },
      { icon: "fas fa-check-double", text: "Classification: Standard request — auto-approval eligible" },
      { icon: "fas fa-check-circle", text: "Risk assessment complete — proceeding to auto-provisioning (no human gate needed)" },
    ],
  },
  {
    title: "Step 4: Auto-Provisioning",
    description:
      "Keycloak Agent provisions user role, group membership, and permissions in target identity systems. Active Directory MCP adds user to the appropriate security groups.",
    details: [
      { icon: "fas fa-key", text: "Keycloak MCP: Assigning role payment-svc-operator to j.doe in realm EXXON-PROD" },
      { icon: "fas fa-layer-group", text: "Keycloak MCP: Adding j.doe to group EXX-APP-PROD — inheritance rules applied" },
      { icon: "fas fa-server", text: "Active Directory MCP: Adding j.doe to security group EXX-APP-PROD-RW in CORP domain" },
      { icon: "fas fa-calendar-alt", text: "Setting access expiry: 2026-06-15 — automated deprovisioning scheduled" },
      { icon: "fas fa-sync-alt", text: "AD replication triggered — changes propagating across all domain controllers" },
      { icon: "fas fa-check-circle", text: "Provisioning complete — j.doe has access in Keycloak and Active Directory" },
    ],
  },
  {
    title: "Step 5: Authentication Check",
    description:
      "CIS Authentication Check Agent validates provisioned credentials work correctly by performing live authentication test against target systems using CIS benchmark controls.",
    details: [
      { icon: "fas fa-vial", text: "CIS Authentication Check Agent: Initiating auth test for j.doe on Keycloak" },
      { icon: "fas fa-sign-in-alt", text: "Keycloak auth test: Token issued successfully for payment-svc-operator role" },
      { icon: "fas fa-user-check", text: "Active Directory MCP: Confirming group membership visible via LDAP query" },
      { icon: "fas fa-lock-open", text: "Resource access test: payment-svc API endpoint returns 200 with j.doe token" },
      { icon: "fas fa-shield-alt", text: "MFA enrollment verified — j.doe TOTP registered and active for PROD realm" },
      { icon: "fas fa-check-circle", text: "All authentication checks passed — access correctly provisioned and functional" },
    ],
  },
  {
    title: "Step 6: Evidence Capture",
    description:
      "Provisioning evidence and compliance artifacts attached to the ServiceNow ticket for full auditability, governance, and SOX/regulatory compliance documentation.",
    details: [
      { icon: "fas fa-file-contract", text: "Generating provisioning evidence report: role assignment, group membership, timestamps" },
      { icon: "fas fa-camera", text: "Capturing Keycloak role assignment screenshot + API response payload" },
      { icon: "fas fa-archive", text: "Archiving AD group membership diff — before and after state recorded" },
      { icon: "fas fa-fingerprint", text: "Digital signature applied to evidence package — tamper-proof audit artifact" },
      { icon: "fas fa-paperclip", text: "ServiceNow MCP: Attaching evidence bundle to RITM-2026-04821" },
      { icon: "fas fa-check-circle", text: "Evidence capture complete — SOX-compliant provisioning record created" },
    ],
  },
  {
    title: "Step 7: Notification",
    description:
      "User notified of access provisioning completion with login instructions. Manager notified for audit awareness. All communication automated with zero L1 involvement.",
    details: [
      { icon: "fas fa-envelope", text: "SMTP: Sending provisioning confirmation email to j.doe@infosys.com" },
      { icon: "fas fa-info-circle", text: "Email includes: access details, expiry date (2026-06-15), login instructions" },
      { icon: "fas fa-user-tie", text: "Manager notification sent to p.singh@infosys.com for audit awareness" },
      { icon: "fab fa-microsoft", text: "Teams MCP: Sending access ready card to j.doe in Teams" },
      { icon: "fas fa-calendar-times", text: "Auto-expiry reminder scheduled: T-7 days warning before 2026-06-15" },
      { icon: "fas fa-check-circle", text: "User and manager notified — zero L1 analyst involvement in this workflow" },
    ],
  },
  {
    title: "Step 8: Ticket Closure",
    description:
      "ServiceNow Agent closes ticket with full audit trail. MTTR captured and access lifecycle entry created for automated deprovisioning on expiry date.",
    details: [
      { icon: "fas fa-clipboard-check", text: "ServiceNow MCP: Updating RITM-2026-04821 — state: Closed Complete" },
      { icon: "fas fa-stopwatch", text: "MTTR: 8 minutes (vs. Hours-Days manual baseline — 97% improvement)" },
      { icon: "fas fa-history", text: "Access lifecycle record created — deprovisioning job queued for 2026-06-15" },
      { icon: "fas fa-chart-line", text: "Compliance metrics updated: 100% auto-provision rate for Standard requests" },
      { icon: "fas fa-archive", text: "Full audit trail committed: request ? validation ? provision ? verify ? close" },
      { icon: "fas fa-flag-checkered", text: "Access Management Agent workflow complete — RITM-2026-04821 closed" },
    ],
  },
];
