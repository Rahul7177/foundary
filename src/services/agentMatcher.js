/* ────────────────────────────────────────────────────────────
 *  Dynamic Agent Matcher
 *
 *  Matches a triaged ticket to the best available agent
 *  execution page by comparing ticket metadata (category,
 *  title, enrichment keywords) against agent names, tools,
 *  triggers, and descriptions from the agentsData registry.
 *
 *  Returns { agentId, agentName, route } or null.
 * ──────────────────────────────────────────────────────────── */

import { agentTableData, agentDetails } from '../data/agentsData';

function buildAgentIndex() {
  const entries = [];
  const allCategories = Object.values(agentTableData);

  for (const category of allCategories) {
    for (const agent of category) {
      // Only include agents that have an execution route
      if (!agent.internalRoute || !agent.internalRoute.startsWith('/agent-execution/')) continue;

      const agentId = agent.internalRoute.replace('/agent-execution/', '');
      const detail = agentDetails[agent.id] || {};

      // Collect all text signals for keyword matching
      const signals = [
        agent.name,
        agent.trigger || '',
        detail.description || '',
        ...(agent.tools || []),
      ].join(' ').toLowerCase();

      // Extract meaningful keywords from the agent's signals
      const keywords = extractAgentKeywords(signals, agent.name);

      entries.push({
        agentId,
        agentName: agent.name,
        route: agent.internalRoute,
        tools: agent.tools || [],
        trigger: (agent.trigger || '').toLowerCase(),
        description: (detail.description || '').toLowerCase(),
        nameLower: agent.name.toLowerCase(),
        keywords,
        signals,
      });
    }
  }

  return entries;
}

/* ── Agent-keyword extractor ──────────────────────────────── */
const AGENT_STOP_WORDS = new Set([
  'agent', 'the', 'and', 'for', 'mcp', 'service', 'monitor', 'engine',
  'with', 'from', 'that', 'this', 'will', 'into', 'using', 'based',
  'automated', 'real', 'time', 'auto', 'across',
]);

function extractAgentKeywords(text, name) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-\/]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !AGENT_STOP_WORDS.has(w));

  // Add compound terms from agent name
  const nameTerms = name.toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !AGENT_STOP_WORDS.has(w));

  return [...new Set([...nameTerms, ...words])];
}

/* ── Category-to-agent affinity map (derived from agent data) ─ */
/* ── Build a searchable agent index at module load ────────── */
const agentIndex = buildAgentIndex();

const CATEGORY_AFFINITY = {
  aveva_pi:  ['aveva', 'pi tag', 'pi data', 'historian', 'ot', 'scada', 'upstream'],
  network:   ['noc', 'network', 'switch', 'router', 'dns', 'dhcp', 'vlan', 'wifi', 'provisioning'],
  vpn:       ['noc', 'network', 'vpn', 'remote access'],
  security:  ['cybersec', 'security', 'threat', 'soc', 'grc', 'alert', 'phishing', 'malware'],
  database:  ['oracle', 'dba', 'database', 'tablespace', 'sql'],
  sap:       ['sap', 'idoc', 'mdg', 'master data', 'invoice', 'reconciliation', 'basis'],
  hardware:  ['infra', 'fault', 'server', 'backup', 'file server', 'disk', 'hardware'],
  email:     ['noc', 'report', 'general'],
  software:  ['devops', 'pipeline', 'azure', 'deployment', 'o2c'],
  general:   [],
};

/* ══════════════════════════════════════════════════════════════
 *  MAIN MATCHER
 *
 *  @param {Object}  ticket   – { id, title, priority, enrichment[], agent }
 *  @param {string}  category – detected category from triage engine
 *  @returns {{ agentId, agentName, route } | null}
 * ══════════════════════════════════════════════════════════════ */
export function matchAgent(ticket, category) {
  if (!ticket || agentIndex.length === 0) return null;

  const titleLower = (ticket.title || '').toLowerCase();
  const enrichmentText = (ticket.enrichment || []).join(' ').toLowerCase();
  const combined = titleLower + ' ' + enrichmentText;

  // Extract ticket keywords
  const ticketWords = combined
    .replace(/[^a-z0-9\s\-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // Get affinity terms for the category
  const affinityTerms = CATEGORY_AFFINITY[category] || [];

  const scored = agentIndex.map(agent => {
    let score = 0;

    // 1. Category affinity — check if agent signals contain category affinity terms
    for (const term of affinityTerms) {
      if (agent.signals.includes(term)) {
        score += 5;
      }
    }

    // 2. Ticket keyword matches against agent keywords
    for (const tw of ticketWords) {
      for (const ak of agent.keywords) {
        if (tw === ak) { score += 3; break; }
        if (tw.length >= 4 && ak.length >= 4 && (tw.includes(ak) || ak.includes(tw))) {
          score += 2; break;
        }
      }
    }

    // 3. Direct title-to-name substring match (strong signal)
    const nameWords = agent.nameLower.split(/\s+/).filter(w => w.length > 2 && !AGENT_STOP_WORDS.has(w));
    for (const nw of nameWords) {
      if (titleLower.includes(nw)) score += 4;
    }

    // 4. Trigger type match
    if (agent.trigger && combined.includes(agent.trigger)) score += 3;

    // 5. Tool mention in ticket
    for (const tool of agent.tools) {
      const toolBase = tool.toLowerCase().replace(' mcp', '').trim();
      if (toolBase.length > 3 && combined.includes(toolBase)) score += 2;
    }

    return { ...agent, score };
  });

  // Sort by score descending, pick the best
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best || best.score < 3) return null;

  return {
    agentId: best.agentId,
    agentName: best.agentName,
    route: best.route,
    score: best.score,
  };
}

/** Return the full agent index for debugging */
export function getAgentIndex() {
  return agentIndex;
}
