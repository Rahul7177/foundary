// =============================================================================
// Patch Orchestration Agent — Infrastructure & Patching
// Domain: Infrastructure & Patching | UC11: Automated Patch Orchestration
// Automates the To-Be process: Patch Identification → Change Request →
//   Pre-Patch Validation → Phased Deployment → Compliance Validation →
//   Post-Patch Health → Rollback Management → Closure
// =============================================================================

export const patchOrchestrationConfig = {
  title: "Patch Orchestration Agent — Automated Patch Orchestration",
  runId: "RUN-PAT-20260315-1130",
  startedAt: "2026-03-15 11:30:00 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "CHG-20260315-00451",
    issueType: "Patch Cycle — Monthly OS security patch run: RHEL 8.x CVE-2026-1234 & CVE-2026-5678 (Critical)",
    affectedSystem: "142 Linux servers across Dev, Staging, and Prod environments (3 tiers, 6 availability zones)",
    triggeredBy: "ServiceNow Change MCP: Monthly patch window scheduled — patch cycle initiated by Resolution Planner Agent",
  },
  relatedIncidents: [
    { id: "CHG-2026-00451", label: "ServiceNow — Primary change record (Monthly OS patch cycle — RHEL 8.x CVEs)" },
    { id: "CVE-2026-1234", label: "Vendor Advisory — RHEL kernel privilege escalation vulnerability (CVSS 9.1 Critical)" },
    { id: "CVE-2026-5678", label: "Vendor Advisory — OpenSSL remote code execution vulnerability (CVSS 8.9 High)" },
    { id: "KB-0071003", label: "KB Runbook — RHEL 8.x Patch Rollback Procedure (kernel downgrade + grub reset)" },
  ],
  tools: [
    "VmWare MCP",
    "ServiceNow Change MCP",
    "Ansible MCP",
    "Salt MCP",
    "Syslog MCP",
  ],
  knowledgeSources: [
    "Vendor Security Advisory Feed (Red Hat, Microsoft, VMware)",
    "CMDB Server Inventory & Environment Classification",
    "Patch Compliance Baseline & Configuration Drift Rules",
    "Pre/Post Patch Health Check Playbook Library",
    "Rollback Procedures & Snapshot Repository",
  ],
  agents: [
    "VM Diagnostics Agent",
    "Resolution Planner Agent (Patch)",
    "Syslog Orchestrator",
    "Network Compliance Analyst",
    "ServiceNow Agent",
  ],
};

export const patchOrchestrationSteps = [
  {
    title: "Step 1: Patch Identification & Planning",
    description:
      "Resolution Planner Agent analyzes vendor security advisories and cross-references with CMDB inventory to identify all applicable patches, affected systems, and optimal phased patching schedule aligned with maintenance windows.",
    details: [
      { icon: "fas fa-shield-virus", text: "Resolution Planner Agent: Ingesting Red Hat Security Advisory RHSA-2026-0312 — 2 critical CVEs identified" },
      { icon: "fas fa-server", text: "CMDB query: 142 RHEL 8.x servers in scope — Dev=48, Staging=34, Prod=60 (6 availability zones)" },
      { icon: "fas fa-calendar-alt", text: "Patch plan: Phased rollout Dev (Sat 22:00) → Staging (Sun 02:00) → Prod (Sun 06:00) — 4hr windows each" },
      { icon: "fas fa-sort-amount-down", text: "Patch priority: CVE-2026-1234 (CVSS 9.1 kernel) + CVE-2026-5678 (CVSS 8.9 OpenSSL) — both critical tier" },
      { icon: "fas fa-sitemap", text: "Dependency analysis: Prod patch after Staging completes + health validated — no concurrent tier patching" },
      { icon: "fas fa-check-circle", text: "Patch plan generated — 3-phase plan for 142 servers, maintenance windows set, dependencies ordered" },
    ],
  },
  {
    title: "Step 2: Automated Change Request Creation",
    description:
      "ServiceNow Agent auto-creates a fully scoped change request with risk assessment, rollback plan, CI list, and maintenance window — replacing manual incomplete change records with comprehensive automated documentation.",
    details: [
      { icon: "fas fa-file-alt", text: "ServiceNow Change MCP: Auto-creating CHG-2026-00451 — scope, risk, CIs, maintenance window all populated" },
      { icon: "fas fa-list-check", text: "Change scope: 142 servers listed (full CI list from CMDB), patch IDs, CVE references attached" },
      { icon: "fas fa-balance-scale", text: "Risk assessment: Kernel patch = High risk → approvals required from Change Manager + Infrastructure Lead" },
      { icon: "fas fa-undo", text: "Rollback plan auto-attached: Linked to KB-0071003 (RHEL 8.x kernel downgrade procedure per server)" },
      { icon: "fas fa-check", text: "CAB approval received: CHG-00451 approved for Sat/Sun maintenance window by Amit Sharma (Change Manager)" },
      { icon: "fas fa-check-circle", text: "Change request created and approved — CHG-00451 open, execution authorized, audit trail started" },
    ],
  },
  {
    title: "Step 3: Pre-Patch Validation (Pre-Flight Checks)",
    description:
      "VM Diagnostics Agent runs comprehensive pre-flight health checks on all 142 target systems before any patching begins — blocking patching on unhealthy nodes to prevent compounding issues during maintenance windows.",
    details: [
      { icon: "fas fa-stethoscope", text: "VM Diagnostics Agent: Running pre-patch health playbook on all 142 RHEL servers in parallel" },
      { icon: "fas fa-hdd", text: "Disk check: /boot partition ≥ 500MB required for kernel update — 141 pass, 1 fail (app-prod-07: 312MB)" },
      { icon: "fas fa-memory", text: "Memory check: All 142 servers have <85% memory utilization — patch execution safe across full estate" },
      { icon: "fas fa-network-wired", text: "Network check: All servers reachable via Ansible controller, SSH connectivity verified, no firewall blocks" },
      { icon: "fas fa-exclamation-triangle", text: "Pre-check result: 1 server excluded (app-prod-07 — disk insufficient) — flagged for manual remediation" },
      { icon: "fas fa-check-circle", text: "Pre-patch validation complete — 141/142 servers cleared, 1 excluded, patch execution queued for 141" },
    ],
  },
  {
    title: "Step 4: Phased Patch Deployment (Dev → Staging → Prod)",
    description:
      "Patches deployed via Ansible/Salt MCP in strict phased rollout — Dev tier first, health validated before proceeding to Staging, Staging validated before Prod. Each phase runs in parallel within tier for speed.",
    details: [
      { icon: "fas fa-play-circle", text: "Phase 1 (Dev — 22:00 Sat): Ansible MCP executing patch playbook on 48 Dev servers in parallel batches of 10" },
      { icon: "fas fa-check-double", text: "Dev patch complete: 48/48 servers patched successfully — CVE-2026-1234 and CVE-2026-5678 remediated" },
      { icon: "fas fa-play-circle", text: "Phase 2 (Staging — 02:00 Sun): Dev health validated ✓ — Salt MCP executing on 34 Staging servers" },
      { icon: "fas fa-check-double", text: "Staging patch complete: 34/34 servers patched — all post-patch health checks passed, proceeding to Prod" },
      { icon: "fas fa-play-circle", text: "Phase 3 (Prod — 06:00 Sun): Staging validated ✓ — Ansible MCP executing on 59 Prod servers (app-prod-07 excluded)" },
      { icon: "fas fa-check-circle", text: "Phased deployment complete — 141/141 in-scope servers patched: Dev=48, Staging=34, Prod=59" },
    ],
  },
  {
    title: "Step 5: Compliance & Configuration Drift Validation",
    description:
      "Syslog Orchestrator and Network Compliance Analyst validate configuration consistency post-patch across all tiers — detecting any configuration drift introduced by the patch and flagging deviations for immediate remediation.",
    details: [
      { icon: "fas fa-shield-alt", text: "Syslog Orchestrator: Collecting post-patch syslogs from all 141 servers — analyzing for error patterns" },
      { icon: "fas fa-search", text: "Syslog analysis: 0 kernel panic events, 0 OOM errors, 2 systemd service restart warnings (non-critical)" },
      { icon: "fas fa-balance-scale", text: "Network Compliance Analyst: Running CIS Level 2 baseline compliance check on all patched servers" },
      { icon: "fas fa-check-double", text: "Compliance result: 139/141 servers fully compliant — 2 servers have SSH config drift (sshd_config parameter)" },
      { icon: "fas fa-wrench", text: "Auto-remediation: Salt MCP applying SSH config correction to 2 non-compliant servers — drift corrected" },
      { icon: "fas fa-check-circle", text: "Compliance validation complete — 141/141 servers compliant, 2 drift issues auto-remediated" },
    ],
  },
  {
    title: "Step 6: Post-Patch Health Validation",
    description:
      "VM Diagnostics Agent runs comprehensive post-patch health checks — verifying OS boot, services, application functionality, and performance baselines. All checks must pass before the change record can be closed.",
    details: [
      { icon: "fas fa-heartbeat", text: "VM Diagnostics Agent: Running post-patch health playbook on all 141 patched servers" },
      { icon: "fas fa-microchip", text: "Kernel validation: All 141 servers booted on new kernel (5.14.0-284.30.1.el9_2) — no boot failures" },
      { icon: "fas fa-cogs", text: "Service validation: All critical services (sshd, httpd, java, oracle) running — 0 service failures detected" },
      { icon: "fas fa-tachometer-alt", text: "Performance baseline: CPU and memory utilization within 5% of pre-patch baseline — no performance regression" },
      { icon: "fas fa-shield-virus", text: "CVE verification: Vulnerability scanner confirms CVE-2026-1234 and CVE-2026-5678 remediated on all 141 servers" },
      { icon: "fas fa-check-circle", text: "Post-patch health validation complete — 141/141 servers healthy, CVEs confirmed remediated" },
    ],
  },
  {
    title: "Step 7: Rollback Management & Failure Handling",
    description:
      "Throughout execution, automated rollback is armed at each phase gate. Any health check failure triggers immediate automated rollback to the pre-patch VM snapshot with full evidence capture — no manual rollback risk.",
    details: [
      { icon: "fas fa-camera", text: "VMware MCP: VM snapshots taken on all 141 servers pre-patch — rollback point established before execution" },
      { icon: "fas fa-shield-alt", text: "Rollback monitoring: No phase failures detected during this patch cycle — all gates passed successfully" },
      { icon: "fas fa-undo", text: "Rollback readiness: All pre-patch snapshots retained for 72 hours — instant rollback available if issues emerge" },
      { icon: "fas fa-exclamation-circle", text: "Excluded server handling: app-prod-07 flagged in ServiceNow — manual disk expansion + re-patch ticket created" },
      { icon: "fas fa-route", text: "Failure policy: Any post-patch health failure → auto-revert VM snapshot → page on-call team → evidence attached" },
      { icon: "fas fa-check-circle", text: "Rollback management complete — 0 rollbacks triggered this cycle, snapshots retained 72hr for safety window" },
    ],
  },
  {
    title: "Step 8: Change Closure & Compliance Report",
    description:
      "Change request closed with full patch evidence — execution logs, compliance scan results, CVE remediation confirmation, and audit trail all attached to CHG-00451 in ServiceNow. Compliance report generated for security and audit teams.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Patch cycle complete: 141/142 servers patched (app-prod-07 excluded — manual remediation ticket raised)" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow Change MCP: Updating CHG-2026-00451 — Status=Closed, Implementation=Successful, Evidence attached" },
      { icon: "fas fa-file-certificate", text: "Compliance report generated: CVE-2026-1234 (141/142 remediated), CVE-2026-5678 (141/142 remediated)" },
      { icon: "fas fa-clipboard-list", text: "Audit trail: 8 execution phases, 141 server patch logs, compliance scans, approval records — all captured" },
      { icon: "fas fa-chart-bar", text: "Patch metrics: Total time=4hr 12min (vs Days-Weeks manual), 99.3% success rate, 0 production incidents" },
      { icon: "fas fa-flag-checkered", text: "Patch Orchestration Agent run complete — 141 servers patched in < 4hr (vs Days-Weeks manual baseline) ✓" },
    ],
  },
];
