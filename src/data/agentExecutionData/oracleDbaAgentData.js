export const oracleDbaAgentConfig = {
  title: 'Oracle DBA Diagnostics Agent',
  runId: 'ORA_DBA_2026012509_33',
  startedAt: 'Just now',
  priority: 'high',
  trigger: {
    ticket: '#DIAG-20260125',
    issueType: 'Performance Analysis',
    affectedSystem: 'PRODDB01 / Instance orcl1',
    triggeredBy: 'DBA Query Request'
  },
  relatedIncidents: [
    { id: 'DIAG-20260125', label: 'Oracle Performance Diagnostics' }
  ],
  tools: [
    'Oracle Database MCP',
    'AWR Reports MCP',
    'ASH Analytics MCP',
    'ADDM Advisor MCP',
    'SQL Tuning MCP'
  ]
};

export const oracleDbaAgentSteps = [
  {
    title: 'Query Enhancement Agent',
    description: 'Refining user query for technical clarity and establishing diagnostic context',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Analyzing user query for technical enhancement...' },
      { icon: 'fas fa-comment-alt', text: 'User Query: "Identify SQL statements with high IO wait times"' },
      { icon: 'fas fa-cogs', text: 'Enhancing query with Oracle-specific context...' },
      { icon: 'fas fa-file-code', text: 'Enhanced: "Identify SQL statements with high IO wait times from ASH/AWR in PRODDB01"' },
      { icon: 'fas fa-tags', text: 'Keywords identified: IO_WAIT, db_file_sequential_read, direct_path_read' },
      { icon: 'fas fa-check-circle', text: 'Query enhancement complete' }
    ]
  },
  {
    title: 'Time Extraction Agent',
    description: 'Identifying precise diagnostic time window from query context',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Extracting time parameters from query context...' },
      { icon: 'fas fa-calendar-alt', text: 'Analyzing temporal references in query...' },
      { icon: 'fas fa-clock', text: 'Time Window Detected: Last 3 hours' },
      { icon: 'fas fa-play', text: 'Start Time: 2026-01-25 06:00:00' },
      { icon: 'fas fa-stop', text: 'End Time: 2026-01-25 09:00:00' },
      { icon: 'fas fa-check-circle', text: 'Diagnostic time window established' }
    ]
  },
  {
    title: 'Snapshot Extraction Agent',
    description: 'Querying DBA_HIST_SNAPSHOT for AWR snapshot IDs in time range',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: awr_get_snapshots() -> Querying DBA_HIST_SNAPSHOT...' },
      { icon: 'fas fa-database', text: 'Database ID (DBID): 1847293654' },
      { icon: 'fas fa-server', text: 'Instance Number: 1' },
      { icon: 'fas fa-camera', text: 'Begin Snapshot ID: 45913' },
      { icon: 'fas fa-camera', text: 'End Snapshot ID: 45916' },
      { icon: 'fas fa-list-ol', text: 'Total Snapshots in Range: 3 (hourly intervals)' },
      { icon: 'fas fa-check-circle', text: 'Snapshot mapping complete' }
    ]
  },
  {
    title: 'ASH Data Collector Agent',
    description: 'Extracting wait chain analysis from Active Session History',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: ash_extract_wait_chains() -> Analyzing active session history...' },
      { icon: 'fas fa-database', text: 'Querying V$ACTIVE_SESSION_HISTORY and DBA_HIST_ACTIVE_SESS_HISTORY...' },
      { icon: 'fas fa-exclamation-triangle', text: 'Top Wait Event: db file sequential read (42% of wait time)' },
      { icon: 'fas fa-exclamation-triangle', text: 'Blocking Session Detected: SID 1847 blocking 23 sessions' },
      { icon: 'fas fa-code', text: 'Top SQL ID: 8fk2n7c9h3m1p (Execution Count: 47,892)' },
      { icon: 'fas fa-code', text: 'Top SQL ID: 3jx9m4k2p7s8q (IO Wait: 892ms avg)' },
      { icon: 'fas fa-chart-bar', text: 'Wait Chain Depth: Max 4 levels detected' },
      { icon: 'fas fa-check-circle', text: 'ASH data collection complete' }
    ]
  },
  {
    title: 'ADDM Report Collector Agent',
    description: 'Running DBMS_ADDM.ANALYZE_DB for automated diagnostic report',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: addm_generate_report() -> Running DBMS_ADDM.ANALYZE_DB...' },
      { icon: 'fas fa-stethoscope', text: 'ADDM Task ID: ADDM_TASK_45913_45916' },
      { icon: 'fas fa-file-medical-alt', text: 'Generating diagnostic report...' },
      { icon: 'fas fa-exclamation-circle', text: 'ADDM Finding: SQL consuming 67% of DB Time identified' },
      { icon: 'fas fa-exclamation-circle', text: 'ADDM Finding: PGA memory advisory - increase recommended' },
      { icon: 'fas fa-info-circle', text: 'ADDM Finding: I/O subsystem showing latency spikes' },
      { icon: 'fas fa-lightbulb', text: 'ADDM Recommendations: 4 findings with actionable items' },
      { icon: 'fas fa-check-circle', text: 'ADDM report extraction complete' }
    ]
  },
  {
    title: 'AWR Performance Collector Agent',
    description: 'Running custom IO analysis scripts against AWR data',
    details: [
      { icon: 'fas fa-plug', text: 'MCP Tool: awr_extract_sql_stats() -> Running custom IO analysis scripts...' },
      { icon: 'fas fa-database', text: 'Querying DBA_HIST_SQLSTAT for high IO wait SQLs...' },
      { icon: 'fas fa-terminal', text: 'Executing: AWR_IO_WAIT_ANALYSIS.sql' },
      { icon: 'fas fa-code', text: 'SQL ID 8fk2n7c9h3m1p: 892ms avg IO wait, 12.4M buffer gets' },
      { icon: 'fas fa-code', text: 'SQL ID 3jx9m4k2p7s8q: 567ms avg IO wait, 8.2M buffer gets' },
      { icon: 'fas fa-code', text: 'SQL ID 7pk4m9n2s5h3j: 445ms avg IO wait, full table scan detected' },
      { icon: 'fas fa-chart-area', text: 'AWR Performance Stats: DB Time=1,234 sec, CPU Time=456 sec' },
      { icon: 'fas fa-check-circle', text: 'AWR performance data collected' }
    ]
  },
  {
    title: 'Findings Analyzer Agent',
    description: 'Correlating findings from ASH/AWR/ADDM diagnostic sources',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Correlating findings from ASH/AWR/ADDM...' },
      { icon: 'fas fa-search-plus', text: 'Cross-referencing diagnostic data sources...' },
      { icon: 'fas fa-times-circle', text: 'CRITICAL: Missing index on ORDERS.CUSTOMER_ID causing full table scans' },
      { icon: 'fas fa-exclamation-triangle', text: 'HIGH: SQL ID 8fk2n7c9h3m1p using deprecated hint /*+ RULE */' },
      { icon: 'fas fa-exclamation-triangle', text: 'HIGH: PGA aggregate target undersized (current: 2GB, recommended: 4GB)' },
      { icon: 'fas fa-info-circle', text: 'MEDIUM: Statistics stale on 3 partitions of TRANSACTIONS table' },
      { icon: 'fas fa-info-circle', text: 'LOW: Parallel query slaves under-utilized (avg DOP: 2, max: 8)' },
      { icon: 'fas fa-check-circle', text: 'Findings analysis complete: 5 issues identified' }
    ]
  },
  {
    title: 'Recommendations Generator Agent',
    description: 'Generating actionable recommendations with impact assessment',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Generating actionable recommendations...' },
      { icon: 'fas fa-lightbulb', text: 'Rec 1: Create index ORDERS_CUST_IDX on ORDERS(CUSTOMER_ID)' },
      { icon: 'fas fa-tags', text: '   Impact: HIGH | Complexity: LOW | Timing: Online' },
      { icon: 'fas fa-lightbulb', text: 'Rec 2: Rewrite SQL ID 8fk2n7c9h3m1p to remove RULE hint' },
      { icon: 'fas fa-tags', text: '   Impact: HIGH | Complexity: MEDIUM | Timing: Change Window' },
      { icon: 'fas fa-lightbulb', text: 'Rec 3: Increase PGA_AGGREGATE_TARGET to 4GB' },
      { icon: 'fas fa-tags', text: '   Impact: MEDIUM | Complexity: LOW | Rollback: ALTER SYSTEM' },
      { icon: 'fas fa-lightbulb', text: 'Rec 4: Gather statistics on TRANSACTIONS partitions' },
      { icon: 'fas fa-tags', text: '   Impact: MEDIUM | Complexity: LOW | Script: DBMS_STATS' },
      { icon: 'fas fa-check-circle', text: 'Recommendations generated: 4 actionable items' }
    ]
  },
  {
    title: 'Insights Visualizer Agent',
    description: 'Creating visual summary of diagnostics and sending report',
    details: [
      { icon: 'fas fa-microchip', text: 'LLM Call: GPT-4o -> Creating visual summary of diagnostics...' },
      { icon: 'fas fa-chart-pie', text: 'Risk Distribution: Critical (1), High (2), Medium (1), Low (1)' },
      { icon: 'fas fa-project-diagram', text: 'Contributing Factors: Missing Index (45%), Stale Stats (25%), PGA (20%), Other (10%)' },
      { icon: 'fas fa-tachometer-alt', text: 'System Impact: DB Time reduced by estimated 67% post-remediation' },
      { icon: 'fas fa-clock', text: 'Estimated Resolution Time: 2-4 hours for all recommendations' },
      { icon: 'fas fa-file-export', text: 'Generating PDF report for DBA team...' },
      { icon: 'fas fa-bell', text: 'Notification sent to DBA team with diagnostic summary' },
      { icon: 'fas fa-check-circle', text: 'Insights visualization complete' }
    ]
  }
];
