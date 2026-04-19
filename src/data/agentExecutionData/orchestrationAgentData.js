// =============================================================================
// Orchestration Agent — Automation & Orchestration
// Domain: Automation & Orchestration | UC9: Unified Automation Orchestration
// Automates the To-Be process: Incident Trigger → Pipeline Selection →
//   Plan Generation → Approval Management → Step Execution → Validation Check
//   → Failure Handling → Completion & Audit
// =============================================================================

export const orchestrationAgentConfig = {
  title: "Orchestration Agent — Unified Automation Orchestration",
  runId: "RUN-ORC-20260315-1005",
  startedAt: "2026-03-15 10:05:17 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "INC-20260315-01142",
    issueType: "Infrastructure Incident — Disk utilization critical on app server cluster (>92%)",
    affectedSystem: "APP-CLUSTER-PROD-07 (Node.js API Gateway) — 3 of 6 nodes affected",
    triggeredBy: "ServiceNow MCP: INC-01142 auto-routed from Categorization & Summary Agent",
  },
  relatedIncidents: [
    { id: "INC-2026-01142", label: "ServiceNow — Primary incident (disk utilization critical on APP-CLUSTER-PROD-07)" },
    { id: "INC-2026-00989", label: "Similar incident — Log rotation failure caused disk exhaustion (resolved 5 days ago)" },
    { id: "CHG-2026-00387", label: "Recent change — Log verbosity increased for debug session (2 days ago)" },
    { id: "KB-0047831", label: "KB Runbook — Disk cleanup and log rotation procedure for API Gateway cluster" },
  ],
  tools: [
    "ServiceNow MCP",
    "Ansible MCP",
    "Salt MCP",
    "Runbook APIs",
    "VmWare MCP",
  ],
  knowledgeSources: [
    "Automation Runbook Library & Execution Playbooks",
    "Change Risk Assessment Matrix & Approval Thresholds",
    "Infrastructure Dependency & Service Topology Map",
    "Past Execution Audit Trails & Resolution Patterns",
    "Rollback Procedures & State Snapshot Repository",
  ],
  agents: [
    "Orchestration Agent",
    "Workflow Router Agent",
    "Resolution Planner Agent",
    "Resolution Executor Agent",
    "Planner Agent",
    "ServiceNow Agent",
  ],
};

export const orchestrationAgentSteps = [
  {
    title: "Step 1: Incident Trigger & Context Intake",
    description:
      "Orchestration Agent receives the classified and enriched incident from ServiceNow via MCP. Full context is loaded including affected CIs, classification, priority, and enrichment data from the Categorization Agent.",
    details: [
      { icon: "fas fa-satellite-dish", text: "ServiceNow MCP: Receiving INC-2026-01142 — Category=Infrastructure, Subcategory=Disk/Storage, Priority=P2" },
      { icon: "fas fa-server", text: "Affected systems: APP-CLUSTER-PROD-07, Nodes: app-07a (94%), app-07b (92%), app-07c (93%) disk usage" },
      { icon: "fas fa-file-alt", text: "Enrichment context loaded: KB-0047831 (log rotation runbook), CHG-00387 (debug logging increased 2 days ago)" },
      { icon: "fas fa-project-diagram", text: "Service topology: APP-CLUSTER-PROD-07 → API-GATEWAY-PROD → OMG-OMS-PROD (downstream dependency)" },
      { icon: "fas fa-exclamation-triangle", text: "Risk assessment: Disk full on any node → pod evictions → API gateway unavailability → P1 escalation risk" },
      { icon: "fas fa-check-circle", text: "Incident context fully loaded — Orchestration Agent ready to select automation pipeline" },
    ],
  },
  {
    title: "Step 2: Automation Pipeline Selection",
    description:
      "Workflow Router Agent analyzes incident type, affected systems, and available automation pipelines to select the optimal end-to-end remediation workflow — replacing disconnected scripts with a coherent pipeline.",
    details: [
      { icon: "fas fa-code-branch", text: "Workflow Router Agent: Querying automation pipeline catalog for incident type=Disk/Storage, system=Linux" },
      { icon: "fas fa-list-check", text: "Candidate pipelines: (1) Disk-Cleanup-Standard, (2) Log-Rotation-Emergency, (3) Disk-Expand-Volume" },
      { icon: "fas fa-brain", text: "Pipeline scoring: Disk-Cleanup + Log-Rotation match KB-0047831 pattern (CHG linked to log verbosity)" },
      { icon: "fas fa-bolt", text: "Selected pipeline: PIPELINE-DISK-CLEANUP-LOG-ROTATION (non-destructive, validated for API Gateway nodes)" },
      { icon: "fas fa-shield-alt", text: "Pipeline risk level: Medium (file deletion involved) — requires approval gate before execution" },
      { icon: "fas fa-check-circle", text: "Pipeline selection complete — PIPELINE-DISK-CLEANUP-LOG-ROTATION selected, approval gate required" },
    ],
  },
  {
    title: "Step 3: Resolution Plan Generation",
    description:
      "Resolution Planner Agent generates a step-by-step execution plan with dependency ordering, rollback checkpoints, and estimated impact for each action — providing full transparency before any execution.",
    details: [
      { icon: "fas fa-tasks", text: "Resolution Planner Agent: Generating execution plan for 3-node disk cleanup across APP-CLUSTER-PROD-07" },
      { icon: "fas fa-list-ol", text: "Plan step 1: Identify log files >7 days old in /var/log/app/ on each node (read-only, no risk)" },
      { icon: "fas fa-list-ol", text: "Plan step 2: Archive logs to backup mount /mnt/log-archive/ (reversible, low risk)" },
      { icon: "fas fa-list-ol", text: "Plan step 3: Delete archived files older than 30 days (destructive, medium risk — approval required)" },
      { icon: "fas fa-list-ol", text: "Plan step 4: Restart log rotation service + validate disk usage drops below 75% threshold" },
      { icon: "fas fa-check-circle", text: "Plan generated — 4-step execution plan with dependency graph and rollback points defined" },
    ],
  },
  {
    title: "Step 4: Approval Gate Management",
    description:
      "Planner Agent evaluates plan risk score against approval thresholds. Medium-risk steps (file deletion) require human-in-the-loop approval via ServiceNow Change Advisory workflow before execution proceeds.",
    details: [
      { icon: "fas fa-balance-scale", text: "Risk evaluation: Plan risk score=Medium (step 3 is destructive file deletion on production nodes)" },
      { icon: "fas fa-user-shield", text: "Approval threshold: Risk=Medium → auto-approval for steps 1-2, human approval required for step 3" },
      { icon: "fas fa-paper-plane", text: "ServiceNow MCP: Creating mini-CAB record MINI-CAB-2026-00091 — auto-routed to on-call change manager" },
      { icon: "fas fa-bell", text: "Notification sent: Ravi Kumar (Change Manager) via ServiceNow + Teams + Email with plan details" },
      { icon: "fas fa-check", text: "Approval received: MINI-CAB-00091 approved by Ravi Kumar at 10:08:51 UTC (2m 34s wait)" },
      { icon: "fas fa-check-circle", text: "Approval gate cleared — all 4 plan steps authorized, execution pipeline unlocked" },
    ],
  },
  {
    title: "Step 5: Step-by-Step Execution via Ansible/Salt",
    description:
      "Resolution Executor Agent executes each plan step sequentially via Ansible MCP and Salt MCP with real-time monitoring. Each step is tracked with before/after state capture for audit and rollback purposes.",
    details: [
      { icon: "fas fa-play-circle", text: "Resolution Executor Agent: Initiating Ansible playbook DISK-CLEANUP-LOG-ROTATION on app-07a, app-07b, app-07c" },
      { icon: "fas fa-terminal", text: "Step 1 executing: find /var/log/app/ -mtime +7 -name '*.log' — Found 4.7 GB eligible on 3 nodes" },
      { icon: "fas fa-archive", text: "Step 2 executing: cp /var/log/app/*.log /mnt/log-archive/ — 4.7 GB archived successfully" },
      { icon: "fas fa-trash-alt", text: "Step 3 executing: rm /mnt/log-archive/*30days* — 3.2 GB deleted (pre-delete snapshot captured)" },
      { icon: "fas fa-sync", text: "Step 4 executing: systemctl restart logrotate — service restarted, new rotation schedule applied" },
      { icon: "fas fa-check-circle", text: "All 4 steps executed — disk usage: app-07a=47%, app-07b=51%, app-07c=49% (all below 75% threshold)" },
    ],
  },
  {
    title: "Step 6: Post-Step Validation Checks",
    description:
      "After each execution step, Orchestration Agent validates success criteria before allowing the pipeline to proceed. Failed validation triggers automatic rollback rather than continuing with an incomplete fix.",
    details: [
      { icon: "fas fa-search-plus", text: "Validation framework: Checking each step against predefined success criteria and health thresholds" },
      { icon: "fas fa-hdd", text: "Disk usage validation: app-07a=47% ✓, app-07b=51% ✓, app-07c=49% ✓ (all below 75% threshold)" },
      { icon: "fas fa-heartbeat", text: "Node health validation: All 3 nodes responding to health check API — no pod evictions detected" },
      { icon: "fas fa-chart-line", text: "Service validation: API Gateway latency p99=42ms (baseline=45ms) — no degradation from cleanup" },
      { icon: "fas fa-shield-alt", text: "Log rotation validation: New rotation schedule active, logrotate.conf updated, cron job confirmed" },
      { icon: "fas fa-check-circle", text: "All validation checks passed — pipeline execution confirmed successful across all 3 nodes" },
    ],
  },
  {
    title: "Step 7: Failure Handling & Rollback Readiness",
    description:
      "Throughout execution, failure handling monitors for step failures. State snapshots enable precise rollback. Any failure captures full execution state and escalates to human operator with context — no silent failures.",
    details: [
      { icon: "fas fa-camera", text: "State snapshot: Pre-execution disk state captured for app-07a, 07b, 07c (rollback point established)" },
      { icon: "fas fa-shield-alt", text: "Failure monitoring: No step failures detected during this execution — all steps completed within timeout" },
      { icon: "fas fa-undo", text: "Rollback readiness: Archived logs retained in /mnt/log-archive/ for 7 days — fully reversible if needed" },
      { icon: "fas fa-exclamation-circle", text: "Escalation policy: Step failure → capture state → notify L3 Engineer + attach full execution log" },
      { icon: "fas fa-route", text: "Partial fix prevention: Pipeline halts on any failed step — no half-executed state left on target systems" },
      { icon: "fas fa-check-circle", text: "Failure handling complete — execution completed without failures, rollback artifacts retained" },
    ],
  },
  {
    title: "Step 8: Completion & Unified Audit Trail",
    description:
      "Full execution evidence captured in ServiceNow — every automated and manual step logged with timestamps, operator decisions, execution outputs, and validation results. Complete and compliant audit trail for SOX/ITGC.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Resolution confirmed: All 3 nodes disk usage < 75%, API Gateway healthy, no downstream impact" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: Updating INC-2026-01142 — Status=Resolved, Resolution=Automated disk cleanup + log rotation" },
      { icon: "fas fa-clipboard-list", text: "Audit trail written: 8 execution steps, 4 Ansible tasks, 12 validation checks, 1 approval — all timestamped" },
      { icon: "fas fa-file-invoice", text: "Evidence package: Execution logs, before/after disk metrics, approval record, Ansible output attached to ticket" },
      { icon: "fas fa-lightbulb", text: "Preventive action: Disable debug logging from CHG-00387 (linked recommendation to change manager)" },
      { icon: "fas fa-flag-checkered", text: "Orchestration Agent run complete — Resolution: 18 min (vs 2-4 hr manual baseline) | MTTR < 30 min ✓" },
    ],
  },
];
