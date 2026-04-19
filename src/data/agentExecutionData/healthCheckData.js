// =============================================================================
// Health Check Agent — Infrastructure & Observability
// Domain: Infrastructure & Observability | UC2: Automated System Health Monitoring
// Automates the To-Be process: Continuous Monitoring ? Threshold Detection ?
//   App Health Check ? Auto-Incident ? Auto-Remediation ? Dashboard & Reporting
// =============================================================================

export const healthCheckConfig = {
  title: "Automated System Health Monitoring Agent",
  runId: "RUN-HLTHCHK-20260314-0118",
  startedAt: "2026-03-14 01:18:44 UTC",
  priority: "P2 - High",
  trigger: {
    ticket: "HLT-2026-05392",
    issueType: "Scheduled Health Check — Anomaly Detected on PROD-APP-12",
    affectedSystem: "Production App Server Cluster (PROD-APP-10..14)",
    triggeredBy: "Prometheus Alert Rule ? Health Check Agent",
  },
  relatedIncidents: [
    { id: "HLT-PROM-28401", label: "Prometheus — CPU 94% on PROD-APP-12" },
    { id: "HLT-DD-61038", label: "Datadog — Disk I/O latency spike PROD-APP-12" },
    { id: "HLT-VMW-19220", label: "VMware — Memory balloon driver active on VM-0412" },
    { id: "HLT-ACT-77103", label: "Actuator — /health DOWN on payment-svc:8080" },
  ],
  tools: [
    "Prometheus MCP",
    "Datadog MCP",
    "VMware MCP",
    "System Monitor MCP",
    "ServiceNow MCP",
  ],
  knowledgeSources: [
    "Server Baseline Metrics DB",
    "Application Health Thresholds",
    "Remediation Runbook Repository",
    "CMDB Asset Inventory",
  ],
  agents: [
    "System Monitor Agent",
    "CPU Health Check Agent",
    "Disk Health Check Agent",
    "Memory Health Check Agent",
    "Java Actuator Health Monitor",
    "ServiceNow Agent",
  ],
};

export const healthCheckSteps = [
  {
    title: "Step 1: Metric Collection",
    description:
      "System Monitor Agent collects CPU, Memory, Disk, and Network metrics from Prometheus and Datadog across all monitored servers in the production cluster.",
    details: [
      { icon: "fas fa-microchip", text: "Prometheus MCP: Polling CPU utilization across 42 production servers" },
      { icon: "fas fa-memory", text: "Prometheus MCP: Collecting memory usage — heap, RSS, swap for all nodes" },
      { icon: "fas fa-hdd", text: "Datadog MCP: Fetching disk I/O, capacity, and inode metrics" },
      { icon: "fas fa-network-wired", text: "System Monitor MCP: Gathering network throughput, packet loss, latency" },
      { icon: "fas fa-server", text: "VMware MCP: Querying hypervisor-level resource allocation for 18 VMs" },
      { icon: "fas fa-check-circle", text: "Metric collection complete — 42 servers, 210 metrics ingested" },
    ],
  },
  {
    title: "Step 2: Baseline Analysis",
    description:
      "AI-driven baseline comparison detects anomalies beyond normal operating thresholds. ML model uses 30-day rolling averages to identify deviations.",
    details: [
      { icon: "fas fa-chart-line", text: "Loading 30-day baseline profiles for all 42 servers" },
      { icon: "fas fa-brain", text: "ML anomaly detection: Comparing current metrics against learned baselines" },
      { icon: "fas fa-exclamation-triangle", text: "Anomaly detected: PROD-APP-12 CPU at 94% (baseline: 35-45%)" },
      { icon: "fas fa-exclamation-triangle", text: "Anomaly detected: PROD-APP-12 disk I/O latency 4x above baseline" },
      { icon: "fas fa-thermometer-full", text: "PROD-APP-12 memory at 87% — approaching critical threshold (90%)" },
      { icon: "fas fa-crosshairs", text: "3 anomalies flagged on PROD-APP-12 — escalating to health check agents" },
    ],
  },
  {
    title: "Step 3: Health Check Execution",
    description:
      "Individual health check agents (CPU, Disk, Memory) run focused diagnostics on flagged resources to identify root cause of anomalies.",
    details: [
      { icon: "fas fa-microchip", text: "CPU Health Check Agent: Top processes — java (72%), node (14%), postgres (6%)" },
      { icon: "fas fa-hdd", text: "Disk Health Check Agent: /var/log at 91% capacity — log rotation stalled" },
      { icon: "fas fa-memory", text: "Memory Health Check Agent: JVM heap at 3.8GB/4GB — GC thrashing detected" },
      { icon: "fas fa-terminal", text: "Running diagnostic commands: vmstat, iostat, top, df -h on PROD-APP-12" },
      { icon: "fas fa-search", text: "Root cause: Runaway Java process (PID 28401) with memory leak in payment-svc" },
      { icon: "fas fa-check-circle", text: "Health check diagnostics complete — 3 issues identified, evidence collected" },
    ],
  },
  {
    title: "Step 4: Application Monitoring",
    description:
      "Java Actuator Health Monitor validates application-layer health via Spring Boot /actuator endpoints for all services on the affected server.",
    details: [
      { icon: "fas fa-heartbeat", text: "Java Actuator Health Monitor: Checking /actuator/health on payment-svc:8080" },
      { icon: "fas fa-times-circle", text: "payment-svc /health status: DOWN — database connection pool exhausted" },
      { icon: "fas fa-database", text: "/actuator/metrics: Active DB connections 50/50 (pool saturated)" },
      { icon: "fas fa-wave-square", text: "/actuator/threaddump: 12 threads BLOCKED on DB connection acquire" },
      { icon: "fas fa-check-circle", text: "order-svc, inventory-svc, auth-svc — all reporting UP on PROD-APP-12" },
      { icon: "fas fa-flag", text: "Application health summary: 1 service DOWN, 3 services healthy" },
    ],
  },
  {
    title: "Step 5: Incident Creation",
    description:
      "ServiceNow Agent auto-creates incident with health check evidence and diagnostics attached. Replaces manual ticket creation with full context.",
    details: [
      { icon: "fas fa-file-medical", text: "ServiceNow MCP: Creating incident INC-2026-05392 with health diagnostics" },
      { icon: "fas fa-paperclip", text: "Attaching evidence: CPU/memory/disk reports, Actuator health dumps" },
      { icon: "fas fa-bullseye", text: "Root cause: payment-svc memory leak ? DB connection pool exhaustion" },
      { icon: "fas fa-tags", text: "Auto-categorized: Infrastructure > Server > Resource Exhaustion (P2)" },
      { icon: "fas fa-user-cog", text: "Assignment group: SRE-AppSupport-L2 (auto-routed based on CI ownership)" },
      { icon: "fas fa-check-circle", text: "Incident INC-2026-05392 created with complete diagnostic package" },
    ],
  },
  {
    title: "Step 6: Auto-Remediation",
    description:
      "For known patterns (high CPU, disk full), executes automated runbook remediation. Runbook RB-SRV-MEM-003 matched for JVM memory leak pattern.",
    details: [
      { icon: "fas fa-book-open", text: "Searching runbook repository for pattern: jvm-memory-leak-db-pool" },
      { icon: "fas fa-check-double", text: "Match found: RB-SRV-MEM-003 — Restart JVM + clear stale DB connections" },
      { icon: "fas fa-broom", text: "Executing: Log rotation on /var/log (freed 12GB disk space)" },
      { icon: "fas fa-redo", text: "Restarting payment-svc JVM with optimized heap settings (-Xmx6g)" },
      { icon: "fas fa-database", text: "Resetting DB connection pool — stale connections cleared, pool size increased to 80" },
      { icon: "fas fa-check-circle", text: "Auto-remediation complete — all 3 issues resolved on PROD-APP-12" },
    ],
  },
  {
    title: "Step 7: Notification",
    description:
      "Communication Agent alerts on-call team and updates the real-time health dashboard with remediation results and current server status.",
    details: [
      { icon: "fas fa-users", text: "Communication Agent: Identifying on-call engineer — SRE Team Bravo" },
      { icon: "fab fa-microsoft", text: "Teams notification sent to #infra-health channel with remediation summary" },
      { icon: "fas fa-envelope", text: "Email digest dispatched to infrastructure-leads@infosys.com" },
      { icon: "fas fa-chart-bar", text: "Health dashboard updated — PROD-APP-12 status: GREEN (all metrics normal)" },
      { icon: "fas fa-check-circle", text: "All stakeholders notified — no manual intervention required" },
    ],
  },
  {
    title: "Step 8: Continuous Loop",
    description:
      "Monitoring continues in real-time, replacing scheduled manual health checks. Agent confirms all metrics are within baseline and resumes polling cycle.",
    details: [
      { icon: "fas fa-heartbeat", text: "Post-remediation health check: PROD-APP-12 CPU 28%, Memory 52%, Disk 64%" },
      { icon: "fas fa-tachometer-alt", text: "payment-svc /actuator/health: UP — response time p99 = 145ms (normal)" },
      { icon: "fas fa-stopwatch", text: "MTTR: 11 minutes (vs. 2-4 hour manual baseline — 92% improvement)" },
      { icon: "fas fa-shield-alt", text: "SLA compliance verified: P2 resolved within 60-minute target" },
      { icon: "fas fa-sync-alt", text: "Resuming continuous monitoring cycle — next poll in 60 seconds" },
      { icon: "fas fa-flag-checkered", text: "Health Check Agent cycle complete — incident closed, monitoring active" },
    ],
  },
];
