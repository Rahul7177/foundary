import { useParams, useLocation } from 'react-router-dom';
import AgentExecution from '../components/agent/AgentExecution';

/* ─── Registry: maps agentId → lazy-imported data ─── */
import { fileServerBackupConfig, fileServerBackupSteps } from '../data/agentExecutionData/fileServerBackupData';
import { infraFaultResolverConfig, infraFaultResolverSteps } from '../data/agentExecutionData/infraFaultResolverData';
import { o2cFaultResolverConfig, o2cFaultResolverSteps } from '../data/agentExecutionData/o2cFaultResolverData';
import { oracleDbaAgentConfig, oracleDbaAgentSteps } from '../data/agentExecutionData/oracleDbaAgentData';
import { nocAgentConfig, nocAgentSteps } from '../data/agentExecutionData/nocAgentData';
import { cabAssistConfig, cabAssistSteps } from '../data/agentExecutionData/cabAssistData';
import { ethicsComplianceConfig, ethicsComplianceSteps } from '../data/agentExecutionData/ethicsComplianceData';
import { dataPrivacyConfig, dataPrivacySteps } from '../data/agentExecutionData/dataPrivacyData';
import { cybersecTriageConfig, cybersecTriageSteps } from '../data/agentExecutionData/cybersecTriageData';
import { cybersecGrcConfig, cybersecGrcSteps } from '../data/agentExecutionData/cybersecGrcData';
import { cybersecSocConfig, cybersecSocSteps } from '../data/agentExecutionData/cybersecSocData';
import { cybersecAlertConfig, cybersecAlertSteps } from '../data/agentExecutionData/cybersecAlertData';
import { reportResolverConfig, reportResolverSteps } from '../data/agentExecutionData/reportResolverData';
import { idocResolverConfig, idocResolverSteps } from '../data/agentExecutionData/idocResolverData';
import { mdgMasterDataConfig, mdgMasterDataSteps } from '../data/agentExecutionData/mdgMasterDataData';
import { invoiceReconciliationConfig, invoiceReconciliationSteps } from '../data/agentExecutionData/invoiceReconciliationData';
import { avevapiTagConfig, avevapiTagSteps } from '../data/agentExecutionData/avevapiTagData';
import { azurePipelineConfig, azurePipelineSteps } from '../data/agentExecutionData/azurePipelineData';
import { devopsCoworkerConfig, devopsCoworkerSteps } from '../data/agentExecutionData/devopsCoworkerData';
import { ipayChatConfig, ipayChatSteps } from '../data/agentExecutionData/ipayChatData';
import { flowBuilderConfig, flowBuilderSteps } from '../data/agentExecutionData/flowBuilderData';
import { eventCorrelationConfig, eventCorrelationSteps } from '../data/agentExecutionData/eventCorrelationData';
import { healthCheckConfig, healthCheckSteps } from '../data/agentExecutionData/healthCheckData';
import { cmdbIntelligenceConfig, cmdbIntelligenceSteps } from '../data/agentExecutionData/cmdbIntelligenceData';
import { sreAgentConfig, sreAgentSteps } from '../data/agentExecutionData/sreAgentData';
import { accessMgmtConfig, accessMgmtSteps } from '../data/agentExecutionData/accessMgmtData';
import { rcaAgentConfig, rcaAgentSteps } from '../data/agentExecutionData/rcaAgentData';
import { miBeepperConfig, miBeepperSteps } from '../data/agentExecutionData/miBeepperData';
import { categorizationSummaryConfig, categorizationSummarySteps } from '../data/agentExecutionData/categorizationSummaryData';
import { orchestrationAgentConfig, orchestrationAgentSteps } from '../data/agentExecutionData/orchestrationAgentData';
import { ticketAssistantConfig, ticketAssistantSteps } from '../data/agentExecutionData/ticketAssistantData';
import { patchOrchestrationConfig, patchOrchestrationSteps } from '../data/agentExecutionData/patchOrchestrationData';
import { networkProvisioningAgentConfig, networkProvisioningAgentSteps } from '../data/agentExecutionData/networkProvisioningAgentData';
import { selfHealingAgentConfig, selfHealingAgentSteps } from '../data/agentExecutionData/selfHealingAgentData';

const agentRegistry = {
  'file-server-backup-agent': {
    config: fileServerBackupConfig,
    steps: fileServerBackupSteps,
  },
  'infra-fault-resolver': {
    config: infraFaultResolverConfig,
    steps: infraFaultResolverSteps,
  },
  'o2c-fault-resolver': {
    config: o2cFaultResolverConfig,
    steps: o2cFaultResolverSteps,
  },
  'oracle-dba-agent': {
    config: oracleDbaAgentConfig,
    steps: oracleDbaAgentSteps,
  },
  'noc-agent': {
    config: nocAgentConfig,
    steps: nocAgentSteps,
  },
  'cab-assist': {
    config: cabAssistConfig,
    steps: cabAssistSteps,
  },
  'ethics-compliance-agent': {
    config: ethicsComplianceConfig,
    steps: ethicsComplianceSteps,
  },
  'data-privacy-agent': {
    config: dataPrivacyConfig,
    steps: dataPrivacySteps,
  },
  'cybersec-triage-agent': {
    config: cybersecTriageConfig,
    steps: cybersecTriageSteps,
  },
  'cybersec-grc-agent': {
    config: cybersecGrcConfig,
    steps: cybersecGrcSteps,
  },
  'cybersec-soc-agent': {
    config: cybersecSocConfig,
    steps: cybersecSocSteps,
  },
  'cybersec-alert-agent': {
    config: cybersecAlertConfig,
    steps: cybersecAlertSteps,
  },
  'report-resolver': {
    config: reportResolverConfig,
    steps: reportResolverSteps,
  },
  'idoc-resolver-agent': {
    config: idocResolverConfig,
    steps: idocResolverSteps,
  },
  'mdg-master-data-agent': {
    config: mdgMasterDataConfig,
    steps: mdgMasterDataSteps,
  },
  'invoice-reconciliation-agent': {
    config: invoiceReconciliationConfig,
    steps: invoiceReconciliationSteps,
  },
  'aveva-pi-tag-agent': {
    config: avevapiTagConfig,
    steps: avevapiTagSteps,
  },
  'azure-pipeline-agent': {
    config: azurePipelineConfig,
    steps: azurePipelineSteps,
  },
  'devops-coworker': {
    config: devopsCoworkerConfig,
    steps: devopsCoworkerSteps,
  },
  'ipay-chat': {
    config: ipayChatConfig,
    steps: ipayChatSteps,
  },
  'upstream-apps-resolver': {
    config: flowBuilderConfig,
    steps: flowBuilderSteps,
  },
  'event-correlation-agent': {
    config: eventCorrelationConfig,
    steps: eventCorrelationSteps,
  },
  'health-check-agent': {
    config: healthCheckConfig,
    steps: healthCheckSteps,
  },
  'cmdb-intelligence-agent': {
    config: cmdbIntelligenceConfig,
    steps: cmdbIntelligenceSteps,
  },
  'sre-agent': {
    config: sreAgentConfig,
    steps: sreAgentSteps,
  },
  'access-mgmt-agent': {
    config: accessMgmtConfig,
    steps: accessMgmtSteps,
  },
  'rca-agent': {
    config: rcaAgentConfig,
    steps: rcaAgentSteps,
  },
  'mi-beeper-agent': {
    config: miBeepperConfig,
    steps: miBeepperSteps,
  },
  'categorization-summary-agent': {
    config: categorizationSummaryConfig,
    steps: categorizationSummarySteps,
  },
  'orchestration-agent': {
    config: orchestrationAgentConfig,
    steps: orchestrationAgentSteps,
  },
  'ticket-assistant-agent': {
    config: ticketAssistantConfig,
    steps: ticketAssistantSteps,
  },
  'patch-orchestration-agent': {
    config: patchOrchestrationConfig,
    steps: patchOrchestrationSteps,
  },
  'network-provisioning-agent': {
    config: networkProvisioningAgentConfig,
    steps: networkProvisioningAgentSteps,
  },
  'self-healing-agent': {
    config: selfHealingAgentConfig,
    steps: selfHealingAgentSteps,
  },
  // ── Add new agents here as they are built ──
};

export default function AgentExecutionPage() {
  const { agentId } = useParams();
  const location = useLocation();
  const agent = agentRegistry[agentId];

  if (!agent) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa' }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', color: '#e6001f', marginBottom: '1rem', display: 'block' }} />
        <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>Agent Not Found</h2>
        <p>No execution page available for agent <strong>{agentId}</strong>.</p>
      </div>
    );
  }

  /* ── Merge triage ticket data into the config when arriving from triage ── */
  let mergedConfig = agent.config;
  const triageState = location.state;
  if (triageState?.fromTriage && triageState.ticket) {
    const t = triageState.ticket;
    mergedConfig = {
      ...agent.config,
      trigger: {
        ...agent.config.trigger,
        ticket: t.id || agent.config.trigger?.ticket || 'N/A',
        issueType: t.title || agent.config.trigger?.issueType || 'N/A',
        affectedSystem: t.enrichment?.affectedCi || agent.config.trigger?.affectedSystem || 'N/A',
        triggeredBy: 'Triage Agent (auto-routed)',
      },
      priority: t.priority || agent.config.priority || 'high',
      relatedIncidents: [
        { id: t.id || 'N/A', label: t.title || 'Triaged Incident' },
        ...(agent.config.relatedIncidents || []),
      ],
    };
  }

  return <AgentExecution agentConfig={mergedConfig} steps={agent.steps} />;
}
