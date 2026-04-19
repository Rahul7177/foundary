// =============================================================================
// Self-Healing Agent -- SRE & Reliability Engineering
// Domain: IT Operations | UC13: Self-Healing Infrastructure
// To-Be Process: Anomaly Detection -> Impact Prediction -> Auto-Plan ->
//   Auto-Execute -> Verification -> Self-Improving
// Based on Topaz Fabric Self-Healing Agent architecture
// MTTR: < 10 Minutes (vs 1-4 Hours manual)
// =============================================================================

export const selfHealingAgentConfig = {
  title: "Self-Healing Agent -- SRE: Proactive Auto-Remediation",
  runId: "RUN-SRE-20260315-0947",
  startedAt: "2026-03-15 09:47:12 UTC",
  priority: "P1 - Critical",
  trigger: {
    ticket: "INC-20260315-00712",
    issueType: "Proactive Anomaly Detection -- Kubernetes Pod Memory Saturation (Infosys AI Platform)",
    affectedSystem: "infosys-ai-prod cluster / namespace: ai-inference / pods: gamma-llm-01 through 04 -- Memory at 91%, CPU spike 88%",
    triggeredBy: "Proactive Monitoring Agent: Datadog anomaly alert triggered at threshold breach prediction (before user impact) -- auto-routed to Self-Healing Agent",
  },
  relatedIncidents: [
    { id: "INC-2026-00712", label: "ServiceNow -- Active incident: Infosys AI Platform pod memory saturation, ai-inference namespace" },
    { id: "INC-2026-00689", label: "Prior event -- Same pod group exhausted 14 days ago; resolved by manual scale-up; pattern match confirmed" },
    { id: "KB-0094321", label: "KB Article -- Kubernetes pod memory saturation: known pattern, resolution = scale replicas + memory limit tuning" },
    { id: "KB-0094005", label: "KB Article -- Infosys AI model serving: baseline resource profile and auto-scaling thresholds" },
    { id: "SRE-RUNBOOK-K8S-004", label: "SRE Runbook -- Kubernetes pod OOMKill prevention: recommended remediation playbook" },
  ],
  tools: [
    "Datadog MCP",
    "Prometheus MCP",
    "Kubernetes MCP",
    "Ansible MCP",
    "Salt MCP",
    "ClickHouse MCP",
    "ServiceNow MCP",
  ],
  agents: [
    "Proactive Monitoring Agent",
    "SRE Kubernetes Agent",
    "App Status Agent",
    "Database Health Agent",
    "Resolution Planner Agent",
    "Resolution Executor Agent",
  ],
  knowledgeSources: [
    "SRE Runbook Library (Kubernetes remediation patterns)",
    "Infosys AI Platform Resource Baselines & Thresholds",
    "Historical Incident KB -- Known anomaly-resolution patterns",
    "Kubernetes Cluster State & CMDB (ClickHouse)",
    "Datadog / Prometheus Metrics History (14-day window)",
    "ServiceNow Incident & Change Records",
  ],
};

export const selfHealingAgentSteps = [
  {
    title: "Step 1: Proactive Anomaly Detection",
    description:
      "Proactive Monitoring Agent continuously analyses real-time metrics from Datadog, Prometheus, and ClickHouse. Anomaly detected in Infosys AI Platform before threshold breach and before any user impact -- the key To-Be differentiator from reactive firefighting.",
    details: [
      { icon: "fas fa-chart-line", text: "Datadog MCP: Anomaly alert fired -- gamma-llm pods memory at 91.2% (threshold=85%) -- trending to OOMKill in ~18 min" },
      { icon: "fas fa-fire", text: "Prometheus MCP: CPU spike confirmed at 88.4% across 4 pods -- correlated with memory saturation pattern" },
      { icon: "fas fa-database", text: "ClickHouse MCP: Historical metric query -- same anomaly signature detected on 2026-03-01 (prior incident KB-0094321 match)" },
      { icon: "fas fa-brain", text: "AI anomaly classifier: Pattern classified as 'pod-memory-saturation-llm-inference' -- severity=CRITICAL, confidence=97.3%" },
      { icon: "fas fa-bolt", text: "Early detection confirmed: Anomaly caught 18 minutes before projected OOMKill -- zero user impact at detection time" },
      { icon: "fas fa-check-circle", text: "Anomaly detection complete -- incident record created in ServiceNow (INC-00712), Self-Healing Agent orchestration triggered" },
    ],
  },
  {
    title: "Step 2: Business Impact Prediction",
    description:
      "AI model predicts business impact and severity of the detected anomaly before any remediation. Infosys AI Platform serves 1,840+ active client engagements -- unmitigated pod failure would cause direct consultant productivity impact and client SLA risk.",
    details: [
      { icon: "fas fa-calculator", text: "Impact model: Infosys AI Platform -- 1,840 active engagements dependent on inference service; avg 340 active API sessions" },
      { icon: "fas fa-exclamation-triangle", text: "Projected impact if unmitigated: OOMKill in ~18 min -> pod restart -> 3-7 min outage -> ~340 consultants blocked" },
      { icon: "fas fa-dollar-sign", text: "Business risk: Gamma AI downtime during APAC peak window -- estimated 6.8 consulting hours at risk across Singapore & Tokyo" },
      { icon: "fas fa-shield-alt", text: "SLA check: Infosys AI Platform uptime SLA = 99.5% (current month 99.6%) -- unmitigated failure risks SLA breach" },
      { icon: "fas fa-tachometer-alt", text: "Severity score: CRITICAL (9.1/10) -- immediate automated remediation approved by impact threshold rules" },
      { icon: "fas fa-check-circle", text: "Impact prediction complete -- remediation urgency = HIGH, auto-approval gate cleared for low-risk scale operation" },
    ],
  },
  {
    title: "Step 3: Pattern Matching & Resolution Planning",
    description:
      "Resolution Planner Agent matches the classified anomaly against known remediation patterns from the SRE knowledge base. Prior incident (INC-00689, 14 days ago) provides exact resolution template -- enabling plan generation in seconds vs hours of manual diagnosis.",
    details: [
      { icon: "fas fa-search", text: "Resolution Planner Agent: Querying SRE Runbook Library -- searching for 'pod-memory-saturation-llm-inference' pattern" },
      { icon: "fas fa-book", text: "KB match found: KB-0094321 (confidence 97.3%) -- Resolution = scale replicas 4->8, increase memory limit 8Gi->16Gi, enable HPA" },
      { icon: "fas fa-history", text: "Historical match: INC-2026-00689 (14 days ago) -- identical signature, manual scale-up resolved in 47 min -- auto plan baseline" },
      { icon: "fas fa-list-ol", text: "Runbook loaded: SRE-RUNBOOK-K8S-004 -- Kubernetes pod OOMKill prevention: scale + memory tuning + HPA enablement steps" },
      { icon: "fas fa-tasks", text: "Remediation plan generated: 3-step plan (scale replicas, tune resources, enable HPA) with rollback strategy at each step" },
      { icon: "fas fa-check-circle", text: "Pattern matching complete -- resolution plan matched from KB in 4.2 seconds (vs 25-40 min manual diagnosis)" },
    ],
  },
  {
    title: "Step 4: Approval Gate (Human-in-the-Loop Check)",
    description:
      "For high-risk changes, human-in-the-loop approval is requested. For this low-risk horizontal scale operation, the approval gate auto-passes per configured thresholds. The approval gate ensures full control while maximising automation for safe operations.",
    details: [
      { icon: "fas fa-balance-scale", text: "Approval Gate Agent: Evaluating change risk -- operation=scale replicas + memory limit adjustment, risk score=2.1/10 (LOW)" },
      { icon: "fas fa-robot", text: "Auto-approval rule match: Scale operations on non-production-critical pods with prior KB validation -- auto-approved per policy" },
      { icon: "fas fa-lock-open", text: "ServiceNow MCP: Auto-approval logged to INC-00712 -- 'Auto-approved: low-risk scale operation, KB-0094321 pattern match'" },
      { icon: "fas fa-user-check", text: "SRE on-call notified via Datadog: 'Self-Healing Agent executing auto-remediation for gamma-llm pods -- monitoring in progress'" },
      { icon: "fas fa-clipboard-check", text: "Approval audit trail created: decision reason, risk score, KB reference, approver=AutoPolicy-SRE-K8S -- full accountability" },
      { icon: "fas fa-check-circle", text: "Approval gate cleared -- auto-approved in 1.8 seconds, SRE notified, audit trail recorded, execution phase initiated" },
    ],
  },
  {
    title: "Step 5: Auto-Execution via Kubernetes & Ansible MCP",
    description:
      "Resolution Executor Agent executes the remediation plan via Kubernetes MCP and Ansible MCP -- zero manual CLI access. Atomic execution with rollback capability at every step. Target: scale gamma-llm replicas 4->8, tune memory limits, enable Horizontal Pod Autoscaler.",
    details: [
      { icon: "fas fa-rocket", text: "Resolution Executor Agent: Initiating execution plan -- Step 1: kubectl scale deployment gamma-llm --replicas=8 via Kubernetes MCP" },
      { icon: "fas fa-cubes", text: "Kubernetes MCP: Scale command executed -- gamma-llm deployment scaled from 4 to 8 replicas -- new pods scheduling: 4 pods starting" },
      { icon: "fas fa-memory", text: "Kubernetes MCP: Memory limit patched -- gamma-llm container resources.limits.memory updated 8Gi->16Gi, requests.memory 4Gi->8Gi" },
      { icon: "fas fa-sync-alt", text: "Ansible MCP: HPA manifest applied -- HorizontalPodAutoscaler created for gamma-llm: minReplicas=4, maxReplicas=16, targetCPU=70%" },
      { icon: "fas fa-chart-line", text: "Execution monitoring: Pod memory dropping -- 91.2% -> 74.3% -> 61.8% as new replicas absorb load distribution" },
      { icon: "fas fa-check-circle", text: "Auto-execution complete -- 8/8 pods running, memory at 61.8% (well below 85% threshold), HPA active, 0 manual CLI sessions used" },
    ],
  },
  {
    title: "Step 6: Post-Remediation Health Verification",
    description:
      "App Status Agent and SRE Kubernetes Agent execute automated post-remediation health checks -- verifying memory normalisation, pod stability, API response times, and no regression across the Infosys AI Platform. Full health confirmation before incident closure.",
    details: [
      { icon: "fas fa-stethoscope", text: "App Status Agent: Running health check suite for Infosys AI Platform -- 8 pods, inference API, response time, error rate" },
      { icon: "fas fa-heartbeat", text: "Kubernetes MCP: Pod health verified -- 8/8 pods Running, 0 Pending, 0 CrashLoopBackOff -- all containers ready=true" },
      { icon: "fas fa-tachometer-alt", text: "Datadog MCP: Memory metrics confirmed -- all pods at 58-64% memory utilisation, CPU normalised to 42% avg -- healthy range" },
      { icon: "fas fa-network-wired", text: "API health check: Infosys AI Platform inference endpoint responding in 82ms avg (baseline 78ms) -- within SLA, no degradation" },
      { icon: "fas fa-shield-alt", text: "Regression check: No other namespaces impacted, no pod evictions triggered, no network disruptions -- clean remediation" },
      { icon: "fas fa-check-circle", text: "Health verification complete -- Infosys AI Platform fully healthy: memory normal, pods stable, API responsive, no regression" },
    ],
  },
  {
    title: "Step 7: ServiceNow Incident Closure & Audit Trail",
    description:
      "ServiceNow incident INC-00712 auto-closed with full before/after evidence, remediation timeline, and metrics. CMDB updated with new pod resource configuration. Complete audit trail ensures compliance and replaces manual documentation entirely.",
    details: [
      { icon: "fas fa-flag-checkered", text: "Remediation confirmed: Infosys AI Platform pod memory saturation resolved -- 0 user impact, MTTR = 8 min 22 sec" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow MCP: INC-20260315-00712 updated -- State=Resolved, Resolution=Auto-remediated by Self-Healing Agent, evidence attached" },
      { icon: "fas fa-clipboard-list", text: "Audit trail attached: Anomaly metrics, impact prediction, KB match, approval log, execution commands, health check results" },
      { icon: "fas fa-database", text: "CMDB auto-update: ClickHouse MCP updating Infosys AI Platform deployment CI -- new replica count=8, memory=16Gi, HPA policy=active" },
      { icon: "fas fa-chart-bar", text: "Performance metrics: MTTR=8min22sec (vs 1-4hr manual), 0 CLI sessions, 0 user impact, SLA maintained at 99.6%" },
      { icon: "fas fa-check-circle", text: "Incident closed -- full audit trail committed, CMDB current, SRE on-call notified of successful auto-remediation via Datadog" },
    ],
  },
  {
    title: "Step 8: Knowledge Base Update & Self-Improvement Loop",
    description:
      "Successful remediation pattern stored back into the SRE knowledge base -- the self-improving feedback loop that makes every future incident faster to resolve. Infosys AI Platform memory saturation pattern updated with latest execution evidence and HPA configuration as permanent fix.",
    details: [
      { icon: "fas fa-brain", text: "Self-Improvement Agent: Extracting successful remediation pattern from this run -- anomaly signature + resolution steps + metrics" },
      { icon: "fas fa-book-open", text: "KB-0094321 updated: Added HPA enablement as permanent fix step (not in original KB) -- future recurrences will auto-enable HPA" },
      { icon: "fas fa-plus-circle", text: "New pattern added to KB: 'gamma-llm-inference-autoscale' -- threshold=85%, action=scale+HPA, confidence=99.1% after 2 confirmed resolutions" },
      { icon: "fas fa-cogs", text: "HPA configuration published to Config Library: HPA manifest for gamma-llm class workloads available for all future deployments" },
      { icon: "fas fa-graduation-cap", text: "Self-healing learning loop: Infosys AI Platform memory saturation pattern now auto-resolves in <10 min -- no manual intervention required ever" },
      { icon: "fas fa-check-circle", text: "Knowledge update complete -- Self-Healing Agent fully self-improved, future occurrences will remediate faster with higher confidence" },
    ],
  },
];
