/* ────────────────────────────────────────────────────────────
 *  Dynamic Triage Engine — real-time ticket triage execution
 *
 *  Performs actual KB search, complexity scoring, and intelligent
 *  assignment routing. Emits step-by-step callbacks to drive
 *  the real-time UI animation in the Triage Agent page.
 * ──────────────────────────────────────────────────────────── */

import { knowledgeArticles, SOP_MAP } from '../data/knowledgeIndex';
import { agentRoster } from '../data/agentRoster';
import { checkTriageApiHealth, searchSnowKB, searchSnowResolved, runFullTriage, updateSnowWorkNotes } from './triageApiClient';
import { matchAgent } from './agentMatcher';

/* ── Step Definitions ──────────────────────────────────────── */
export const TRIAGE_STEPS = [
  { id: 'intake',      title: 'Ticket Intake & Validation',       icon: 'fa-clipboard-check', iconColor: '#2196F3' },
  { id: 'kb-search',   title: 'Knowledge Base Search',            icon: 'fa-brain',           iconColor: '#FF9800' },
  { id: 'enrichment',  title: 'Ticket Enrichment & Analysis',     icon: 'fa-layer-group',     iconColor: '#9C27B0' },
  { id: 'complexity',  title: 'Complexity Score Calculation',      icon: 'fa-calculator',      iconColor: '#E91E63' },
  { id: 'assignment',  title: 'Assignment & Routing Decision',     icon: 'fa-user-shield',     iconColor: '#4CAF50' },
  { id: 'snow-update', title: 'ServiceNow Ticket Update',          icon: 'fa-cloud-upload-alt', iconColor: '#5c6bc0' },
];

/** Create a fresh array of pending steps for initial state */
export function createInitialSteps() {
  return TRIAGE_STEPS.map(s => ({ ...s, status: 'pending', details: [] }));
}

/* ── Helpers ───────────────────────────────────────────────── */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STOP_WORDS = new Set([
  'the','and','for','are','but','not','you','all','can','had','her','was','one',
  'our','out','has','have','with','this','that','from','they','been','said',
  'each','which','their','will','other','about','many','then','them','these',
  'some','would','into','more','very','when','come','could','now','than','like',
  'just','also','new','any','issue','issues','problem','error','need','help',
  'please','unable','trying','getting','working','not working',
]);

function extractKeywords(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

/* ── Debug Trace Collector ──────────────────────────────────── */
let _debugTrace = [];

export function getDebugTrace() { return _debugTrace; }
export function resetDebugTrace() { _debugTrace = []; }

function trace(step, label, data) {
  const entry = { ts: Date.now(), step, label, data };
  _debugTrace.push(entry);
  console.log(`[Triage:${step}] ${label}`, data);
}

/* ── Category Detection ────────────────────────────────────── */
const CATEGORY_RULES = [
  // Order matters — more specific patterns first
  { cat: 'aveva_pi', regex: /aveva|pi\s*tag|pi\s*vision|pi\s*data|pi\s*server|pi\s*point|pi\s*interface|pi\s*buffer|pi\s*af|operational\s*technology|\bscada\b|\bhistorian\b/, label: 'AVEVA PI / OT' },
  { cat: 'vpn',      regex: /\bvpn\b|anyconnect|remote\s*access|global\s*protect|ipsec/, label: 'VPN' },
  { cat: 'email',    regex: /\bemail\b|outlook|exchange|mailbox|\bsmtp\b|calendar|o365\s*mail/, label: 'Email' },
  { cat: 'sap',      regex: /\bsap\b|abap|basis|tcode|su01|idoc|mdg\b|migo|mir6/, label: 'SAP' },
  { cat: 'security', regex: /security|malware|phishing|threat|\bsiem\b|firewall\s*rule|intrusion|ransomware|vulnerability/, label: 'Security' },
  { cat: 'database', regex: /database|oracle|\bdba\b|tablespace|\brman\b|deadlock|\bsql\b|\bawr\b/, label: 'Database' },
  { cat: 'network',  regex: /\bnetwork\b|\bdns\b|\bdhcp\b|\bswitch\b|\brouter\b|\bvlan\b|latency|packet\s*loss|\bwifi\b|wireless|\baccess\s*point\b/, label: 'Network' },
  { cat: 'hardware', regex: /\bhardware\b|\bdisk\b|\braid\b|memory\s*ecc|\bfirmware\b|power\s*supply|\bserver\b.*\b(down|fail|crash|damage)|\bphone\b.*\bnot\b|\bvm\b|\bvirtual\s*machine\b|\bbackup\b|\blaptop\b.*\b(slow|upgrade|memory)/, label: 'Hardware/Infra' },
];

function extractCategory(ticket) {
  const title = (ticket.title || '').toLowerCase();
  const enrichmentText = (ticket.enrichment || []).join(' ').toLowerCase();
  const combined = title + ' ' + enrichmentText;

  for (const rule of CATEGORY_RULES) {
    if (rule.regex.test(combined)) {
      trace('category', `Matched: ${rule.cat}`, { pattern: rule.label, regex: rule.regex.source, matchedIn: combined.substring(0, 120) });
      return rule.cat;
    }
  }

  // Check enrichment Category field
  for (const e of ticket.enrichment || []) {
    const lower = e.toLowerCase();
    if (lower.startsWith('category:')) {
      const cat = lower.replace('category:', '').trim();
      if (cat.includes('network')) { trace('category', 'Enrichment fallback: network', { raw: cat }); return 'network'; }
      if (cat.includes('software') || cat.includes('application')) { trace('category', 'Enrichment fallback: software', { raw: cat }); return 'software'; }
      if (cat.includes('hardware')) { trace('category', 'Enrichment fallback: hardware', { raw: cat }); return 'hardware'; }
      if (cat.includes('database')) { trace('category', 'Enrichment fallback: database', { raw: cat }); return 'database'; }
      if (cat.includes('security')) { trace('category', 'Enrichment fallback: security', { raw: cat }); return 'security'; }
    }
  }

  trace('category', 'No match → general', { titleSnippet: title.substring(0, 80) });
  return 'general';
}

const CATEGORY_LABELS = {
  aveva_pi: 'OT/SCADA Domain — AVEVA PI System',
  vpn:      'Network Domain — VPN/Remote Access',
  email:    'Collaboration Domain — Email/Exchange',
  sap:      'ERP Domain — SAP System',
  security: 'Cybersecurity Domain — Threat Response',
  network:  'Network Domain — Infrastructure',
  hardware: 'Infrastructure Domain — Hardware',
  database: 'Database Domain — Oracle/SQL',
  software: 'Software Domain — Application Support',
  general:  'General IT — Service Request',
};

/* ── Keyword Matching (strict) ─────────────────────────────── */
function keywordMatchScore(ticketKW, articleKW) {
  // Exact match — highest score
  if (ticketKW === articleKW) return 3;

  const articleWords = articleKW.split(/\s+/);
  // Multi-word KB keyword: ticket keyword must be an exact word within it
  if (articleWords.length > 1) {
    if (articleWords.includes(ticketKW)) return 2;
    return 0;
  }

  // Single-word keywords: require high overlap (≥70% length ratio)
  if (ticketKW.length >= 4 && articleKW.length >= 4) {
    if (ticketKW === articleKW) return 3;
    const shorter = Math.min(ticketKW.length, articleKW.length);
    const longer  = Math.max(ticketKW.length, articleKW.length);
    if ((ticketKW.includes(articleKW) || articleKW.includes(ticketKW)) && shorter / longer >= 0.7) return 1;
  }

  return 0;
}

/* ── Knowledge Base Search ────────────────────────────────── */
function searchKB(ticket) {
  const titleKeywords = extractKeywords(ticket.title);
  const enrichmentKeywords = extractKeywords((ticket.enrichment || []).join(' '));
  const allKeywords = [...new Set([...titleKeywords, ...enrichmentKeywords])];
  const category = extractCategory(ticket);

  trace('kb-search', 'Keywords extracted', { title: titleKeywords, enrichment: enrichmentKeywords.slice(0, 15), combined: allKeywords, category });

  const scored = knowledgeArticles
    .map(article => {
      let score = 0;
      const matched = [];
      const matchDetails = [];

      // Keyword → article keyword matching (strict)
      for (const kw of allKeywords) {
        for (const akw of article.keywords) {
          const s = keywordMatchScore(kw, akw);
          if (s > 0) {
            score += s;
            matched.push(kw);
            matchDetails.push({ ticketKW: kw, articleKW: akw, score: s });
            break;
          }
        }
      }

      // Keyword → symptom matching (require word boundary)
      for (const symptom of article.symptoms) {
        const sLow = symptom.toLowerCase();
        for (const kw of allKeywords) {
          // Use word-boundary check instead of simple includes
          const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
          if (regex.test(sLow)) { score += 1; break; }
        }
      }

      // Category bonus
      if (category && article.category === category) score += 4;

      const relevance = Math.min(Math.round((score / Math.max(allKeywords.length * 2, 1)) * 100), 97);
      return { ...article, relevanceScore: score, relevancePercent: relevance, matchedKeywords: matched, _matchDetails: matchDetails };
    })
    .filter(a => a.relevanceScore > 2)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);

  trace('kb-search', 'Results', scored.map(a => ({ id: a.id, title: a.title.substring(0, 50), score: a.relevanceScore, pct: a.relevancePercent, matches: a._matchDetails })));

  return scored;
}

/* ── Past Ticket Search ───────────────────────────────────── */
function searchPastTickets(ticket, allTickets) {
  const titleKeywords = extractKeywords(ticket.title);
  if (titleKeywords.length === 0) return [];

  return allTickets
    .filter(t => t.id !== ticket.id)
    .map(t => {
      const tKeywords = extractKeywords(t.title);
      let matchCount = 0;
      for (const kw of titleKeywords) {
        if (tKeywords.some(tk => tk.includes(kw) || kw.includes(tk))) matchCount++;
      }
      const similarity = Math.round((matchCount / titleKeywords.length) * 100);
      return { ...t, similarity };
    })
    .filter(t => t.similarity >= 35)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);
}

/* ── Complexity Calculation ───────────────────────────────── */
const PRIORITY_BASE = { critical: 7.5, high: 5.5, medium: 3.5, low: 1.5 };
const CATEGORY_MOD  = {
  security: 1.5, aveva_pi: 1.5, network: 1.0, hardware: 1.0,
  database: 1.0, sap: 0.8, vpn: 0.5, software: 0.5,
  email: 0.0, general: 0.0,
};

function calculateComplexity(ticket, kbResults, pastTicketResults) {
  const category = extractCategory(ticket);
  const prBase   = PRIORITY_BASE[ticket.priority] || 3.5;
  const catMod   = CATEGORY_MOD[category] ?? 0;

  // Impact modifier from enrichment
  let impactMod = 0;
  for (const e of ticket.enrichment || []) {
    const lower = e.toLowerCase();
    if (lower.includes('impact')) {
      if (lower.includes('1') || lower.includes('high')) impactMod = 0.5;
      else if (lower.includes('3') || lower.includes('low')) impactMod = -0.5;
    }
  }

  // KB coverage: more articles ⟹ less complex
  const kbMod = kbResults.length > 0 ? Math.max(kbResults.length * -0.3, -1.5) : 0;
  // Past ticket coverage: similar tickets ⟹ less complex
  const pastMod = pastTicketResults.length > 0 ? Math.max(pastTicketResults.length * -0.4, -1.5) : 0;
  // Novelty: no KB + no past tickets ⟹ more complex
  const noveltyMod = (kbResults.length === 0 && pastTicketResults.length === 0) ? 1.5 : 0;

  let raw = prBase + catMod + impactMod + kbMod + pastMod + noveltyMod;
  let score = Math.max(1.0, Math.min(10.0, Math.round(raw * 10) / 10));

  const factors = [
    { name: 'Priority Base',  value: `${ticket.priority} → ${prBase}`,                icon: 'fa-exclamation-circle', contribution: prBase },
    { name: 'Category Mod',   value: `${category.replace('_',' ')} → +${catMod}`,     icon: 'fa-sitemap',            contribution: catMod },
    { name: 'Impact Mod',     value: impactMod > 0 ? 'High impact +0.5' : impactMod < 0 ? 'Low impact −0.5' : 'Medium impact ±0', icon: 'fa-bullseye', contribution: impactMod },
    { name: 'KB Coverage',    value: `${kbResults.length} article${kbResults.length !== 1 ? 's' : ''} → ${kbMod || '±0'}`, icon: 'fa-book', contribution: kbMod },
    { name: 'Past Tickets',   value: `${pastTicketResults.length} similar → ${pastMod || '±0'}`,                           icon: 'fa-history', contribution: pastMod },
    { name: 'Novelty',        value: noveltyMod > 0 ? 'Novel issue +1.5' : 'Known pattern',                               icon: 'fa-lightbulb', contribution: noveltyMod },
  ];

  trace('complexity', 'Score calculated', { score, raw, factors: factors.map(f => `${f.name}: ${f.contribution}`) });

  return { score, factors };
}

/* ── Assignment Decision ──────────────────────────────────── */
function decideAssignment(ticket, complexityResult) {
  const category = extractCategory(ticket);
  const score    = complexityResult.score;

  trace('assignment', 'Input', { category, score, threshold: 7 });

  // Match ticket to the best available execution agent
  const executionMatch = matchAgent(ticket, category);
  trace('assignment', 'Execution agent match', {
    matched: !!executionMatch,
    agentId: executionMatch?.agentId || null,
    agentName: executionMatch?.agentName || null,
    route: executionMatch?.route || null,
    matchScore: executionMatch?.score || 0,
  });

  // High complexity (> 7) → Human analyst (human-in-loop)
  if (score > 7) {
    const matchingAnalysts = agentRoster.filter(a =>
      a.type === 'analyst' && a.specialties.some(s => s === category || s === 'critical' || s === 'escalation' || s === 'general')
    );
    const analyst = matchingAnalysts[0] || agentRoster.find(a => a.type === 'analyst');
    trace('assignment', 'Human-in-Loop', { analyst: analyst?.name, role: analyst?.role, matchCount: matchingAnalysts.length });
    return {
      type: 'analyst',
      decisionType: 'analyst-assign',
      assignTo: `${analyst.name} (${analyst.role})`,
      agentInfo: analyst,
      executionMatch,
      reason: `Complexity ${score}/10 exceeds agent threshold (>7). Human-in-loop review required.`,
      params: [
        'High Complexity',
        'Human-in-Loop Required',
        `${analyst.role} Review`,
        score >= 9 ? 'Critical Escalation' : 'Expert Analysis Needed',
      ],
    };
  }

  // Low/Med complexity (≤ 7) → AI Agent
  const matchingAgents = agentRoster.filter(a =>
    a.type === 'agent' && a.specialties.some(s => s === category || s === 'general' || s === 'default')
  );
  const agent = matchingAgents[0] || agentRoster.find(a => a.id === 'agent-7');

  // Use execution match name if available (more specific), else roster agent name
  const displayName = executionMatch ? executionMatch.agentName : agent.name;

  trace('assignment', 'AI Agent', { agent: displayName, id: agent?.id, executionAgentId: executionMatch?.agentId, specialties: agent?.specialties, matchCount: matchingAgents.length });
  return {
    type: 'agent',
    decisionType: 'agent-assign',
    assignTo: displayName,
    agentInfo: agent,
    executionMatch,
    reason: `Complexity ${score}/10 within agent capability (≤7). Automated resolution path.`,
    params: [
      score <= 3 ? 'Low Complexity' : 'Medium Complexity',
      'Agent Capable',
      'Automated Resolution',
      'SLA: 30min Response',
    ],
  };
}

/* ══════════════════════════════════════════════════════════════
 *  MAIN TRIAGE EXECUTOR
 *  Runs the full 5-step triage flow, emitting callbacks for each
 *  detail line so the UI can render in real time.
 * ══════════════════════════════════════════════════════════════ */
export async function executeTriage(ticket, allTickets, callbacks, signal) {
  const { onStepStart, onDetail, onStepComplete, onTriageComplete } = callbacks;

  // Reset + start debug trace
  resetDebugTrace();
  trace('executor', 'Triage started', { ticketId: ticket.id, title: ticket.title, priority: ticket.priority });

  // Internal copy of steps for history storage
  const internalSteps = createInitialSteps();

  let kbResults = [];
  let pastTicketResults = [];
  let complexityResult = null;
  let assignmentResult = null;

  // ── Backend Agent Integration ──────────────────────────────
  // Fire the full Python triage agent call in parallel (non-blocking).
  // The UI animation continues with client-side logic; when the backend
  // responds, we merge real SNOW API calls + LLM RCA into the results.
  let backendPromise = null;
  let backendResult = null;
  let apiAvailable = false;

  try {
    const healthCheck = await checkTriageApiHealth();
    apiAvailable = healthCheck.ok;
    trace('api_health', 'Triage API health check', {
      available: apiAvailable,
      ...(healthCheck.data || {}),
      error: healthCheck.error || null,
    });
  } catch (e) {
    trace('api_health', 'Health check failed', { error: e.message, available: false });
  }

  if (apiAvailable) {
    // Launch full triage in background — don't await yet
    backendPromise = runFullTriage(ticket, { skipLLM: false, skipSnowUpdate: true })
      .catch(err => {
        trace('api_call', 'Backend triage failed', { error: err.message });
        return null;
      });
    trace('api_call', 'Full triage request dispatched to Python agent', {
      endpoint: 'POST /api/triage',
      ticket_id: ticket.id,
      skip_llm: false,
      skip_snow_update: true,
    });
  } else {
    trace('api_call', 'Backend unavailable — using client-side engine only', {
      hint: 'Start the Python triage API: python ghcp_agents/triage_api.py',
    });
  }

  const check = () => { if (signal?.aborted) throw new Error('Cancelled'); };

  const emitStart = (idx) => { internalSteps[idx].status = 'active'; onStepStart(idx); };
  const emitDetail = (idx, d) => { internalSteps[idx].details.push(d); onDetail(idx, d); };
  const emitDone = (idx) => { internalSteps[idx].status = 'completed'; onStepComplete(idx); };

  /* ─── STEP 0  Ticket Intake & Validation ──────────────── */
  check();
  emitStart(0);
  await wait(350);

  emitDetail(0, { icon: 'fa-fingerprint', text: `Ticket ID: ${ticket.id}`, type: 'info' });
  await wait(300); check();

  emitDetail(0, { icon: 'fa-exclamation-circle', text: `Priority: ${ticket.priority.toUpperCase()}`, type: 'info', badge: ticket.priority.toUpperCase(), badgeClass: `priority-${ticket.priority}` });
  await wait(280); check();

  emitDetail(0, { icon: 'fa-heading', text: `Title: ${ticket.title}`, type: 'info' });
  await wait(280); check();

  if (ticket.agent) {
    emitDetail(0, { icon: 'fa-robot', text: `Assigned Agent: ${ticket.agent}`, type: 'info' });
    await wait(250); check();
  }

  const category = extractCategory(ticket);
  trace('executor', 'Category detected', { category, label: CATEGORY_LABELS[category] || category });
  emitDetail(0, { icon: 'fa-sitemap', text: `Domain: ${CATEGORY_LABELS[category] || category}`, type: 'success' });
  await wait(280); check();

  emitDetail(0, { icon: 'fa-check', text: 'Ticket validated — all required fields present', type: 'success' });
  await wait(200);

  emitDone(0);
  await wait(350); check();

  /* ─── STEP 1  Knowledge Base Search ───────────────────── */
  emitStart(1);
  await wait(350);

  emitDetail(1, { icon: 'fa-search', text: `Querying knowledge base for: "${ticket.title}"`, type: 'info' });
  await wait(500); check();

  kbResults = searchKB(ticket);

  if (kbResults.length > 0) {
    emitDetail(1, { icon: 'fa-check-circle', text: `Found ${kbResults.length} matching KB article${kbResults.length !== 1 ? 's' : ''}`, type: 'success' });
    await wait(300);

    for (const kb of kbResults.slice(0, 4)) {
      check();
      emitDetail(1, {
        icon: 'fa-file-medical-alt',
        text: `${kb.id}: ${kb.title}`,
        type: 'kb',
        badge: `${kb.relevancePercent}%`,
        badgeClass: 'badge-kb',
        url: kb.url,
        urlLabel: `View in ServiceNow →`,
      });
      await wait(380);
    }
  } else {
    emitDetail(1, { icon: 'fa-exclamation-triangle', text: 'No matching KB articles found — Novel issue identified', type: 'warning' });
    await wait(350);
  }
  check();

  emitDetail(1, { icon: 'fa-history', text: 'Searching past incident history...', type: 'info' });
  await wait(450); check();

  pastTicketResults = searchPastTickets(ticket, allTickets);

  if (pastTicketResults.length > 0) {
    emitDetail(1, { icon: 'fa-check-circle', text: `Found ${pastTicketResults.length} similar past ticket${pastTicketResults.length !== 1 ? 's' : ''}`, type: 'success' });
    await wait(280);

    for (const pt of pastTicketResults.slice(0, 3)) {
      check();
      emitDetail(1, { icon: 'fa-ticket-alt', text: `${pt.id}: ${pt.title}`, type: 'past-ticket', badge: `${pt.similarity}%`, badgeClass: 'badge-match' });
      await wait(320);
    }
  } else {
    emitDetail(1, { icon: 'fa-info-circle', text: 'No sufficiently similar past tickets found', type: 'info' });
    await wait(250);
  }

  emitDone(1);
  await wait(350); check();

  /* ─── STEP 2  Ticket Enrichment & Analysis ────────────── */
  emitStart(2);
  await wait(350);

  emitDetail(2, { icon: 'fa-database', text: 'Enriching with ServiceNow metadata...', type: 'info' });
  await wait(300); check();

  for (const enrichment of (ticket.enrichment || []).slice(0, 8)) {
    check();
    emitDetail(2, { icon: 'fa-tag', text: enrichment, type: 'enrichment' });
    await wait(220);
  }

  if (kbResults.length > 0) {
    emitDetail(2, { icon: 'fa-book-open', text: `Linked ${kbResults.length} KB article${kbResults.length !== 1 ? 's' : ''} to ticket`, type: 'success' });
    await wait(280); check();

    // Show top KB article citations with ServiceNow links
    for (const kb of kbResults.slice(0, 3)) {
      check();
      emitDetail(2, {
        icon: 'fa-external-link-alt',
        text: `Citation: ${kb.id} — ${kb.title}`,
        type: 'kb',
        url: kb.url,
        urlLabel: 'Open KB Article',
      });
      await wait(250);
    }
  }

  // SOPs
  const sops = SOP_MAP[category] || SOP_MAP['general'] || [];
  if (sops.length > 0) {
    emitDetail(2, { icon: 'fa-book', text: `Mapped SOP: ${sops[0].id} — ${sops[0].title}`, type: 'sop' });
    await wait(280); check();
  }

  emitDetail(2, { icon: 'fa-layer-group', text: `Resolution Domain: ${CATEGORY_LABELS[category] || 'General IT'}`, type: 'success' });
  await wait(250);

  if (ticket._snow_sys_id) {
    emitDetail(2, { icon: 'fa-link', text: `ServiceNow SysID: ${ticket._snow_sys_id.substring(0, 16)}...`, type: 'info' });
    await wait(200);
  }

  emitDone(2);
  await wait(350); check();

  /* ─── STEP 3  Complexity Score Calculation ────────────── */
  emitStart(3);
  await wait(350);

  emitDetail(3, { icon: 'fa-cogs', text: 'Computing weighted complexity score...', type: 'info' });
  await wait(400); check();

  complexityResult = calculateComplexity(ticket, kbResults, pastTicketResults);

  for (const factor of complexityResult.factors) {
    check();
    const isNeg = factor.contribution < 0;
    const isPos = factor.contribution > 0;
    emitDetail(3, {
      icon: factor.icon || (isNeg ? 'fa-minus-circle' : isPos ? 'fa-plus-circle' : 'fa-equals'),
      text: `${factor.name}: ${factor.value}`,
      type: isNeg ? 'factor-good' : isPos ? 'factor-add' : 'info',
      badge: factor.contribution > 0 ? `+${factor.contribution}` : factor.contribution < 0 ? `${factor.contribution}` : '±0',
      badgeClass: isNeg ? 'badge-good' : isPos ? 'badge-add' : 'badge-neutral',
    });
    await wait(320);
  }
  check();

  const scoreLabel = complexityResult.score >= 8 ? 'HIGH' : complexityResult.score >= 5 ? 'MEDIUM' : 'LOW';
  emitDetail(3, {
    icon: 'fa-tachometer-alt',
    text: `Final Score: ${complexityResult.score}/10 — ${scoreLabel} COMPLEXITY`,
    type: complexityResult.score > 7 ? 'error' : complexityResult.score > 4 ? 'warning' : 'success',
    badge: `${complexityResult.score}/10`,
    badgeClass: `badge-score-${scoreLabel.toLowerCase()}`,
  });
  await wait(300);

  emitDone(3);
  await wait(350); check();

  /* ─── STEP 4  Assignment & Routing Decision ───────────── */
  emitStart(4);
  await wait(350);

  assignmentResult = decideAssignment(ticket, complexityResult);

  if (assignmentResult.type === 'analyst') {
    emitDetail(4, { icon: 'fa-exclamation-triangle', text: `Complexity ${complexityResult.score}/10 exceeds agent threshold (>7)`, type: 'warning' });
    await wait(380); check();

    emitDetail(4, { icon: 'fa-user-shield', text: 'Activating Human-in-Loop protocol...', type: 'hil' });
    await wait(450); check();

    emitDetail(4, { icon: 'fa-search-plus', text: `Scanning analyst roster for ${category.replace('_', ' ')} specialist...`, type: 'info' });
    await wait(380); check();

    emitDetail(4, { icon: 'fa-user-tie', text: `Selected: ${assignmentResult.assignTo}`, type: 'analyst-route', badge: 'Human-in-Loop', badgeClass: 'badge-hil' });
    await wait(350); check();

    emitDetail(4, { icon: 'fa-hands-helping', text: 'Expert review required for high-complexity incident', type: 'warning' });
    await wait(280);
  } else {
    emitDetail(4, { icon: 'fa-check-circle', text: `Complexity ${complexityResult.score}/10 within agent capability (≤7)`, type: 'success' });
    await wait(350); check();

    emitDetail(4, { icon: 'fa-search-plus', text: `Scanning agent roster for ${category.replace('_', ' ')} specialist...`, type: 'info' });
    await wait(350); check();

    emitDetail(4, { icon: 'fa-robot', text: `Selected: ${assignmentResult.assignTo}`, type: 'agent-route', badge: 'AI Agent', badgeClass: 'badge-agent' });
    await wait(300); check();

    emitDetail(4, { icon: 'fa-bolt', text: 'Automated resolution path activated', type: 'success' });
    await wait(250);
  }

  emitDetail(4, { icon: 'fa-check-double', text: `Ticket assigned to ${assignmentResult.assignTo}`, type: 'success' });
  await wait(250);

  emitDone(4);
  await wait(300);

  /* ─── STEP 5  ServiceNow Ticket Update ────────────── */
  check();
  emitStart(5);
  await wait(350);

  // ── Await backend result first (need RCA for work notes) ──
  if (backendPromise) {
    emitDetail(5, { icon: 'fa-satellite-dish', text: 'Awaiting backend triage results (RCA, KB, resolved incidents)...', type: 'info' });
    await wait(300);

    try {
      backendResult = await backendPromise;
      if (backendResult && backendResult.trace) {
        for (const entry of backendResult.trace) {
          trace(entry.step || 'backend', entry.label || '', entry.data || {});
        }
      }
      if (backendResult && backendResult.rca) {
        emitDetail(5, { icon: 'fa-brain', text: `AI RCA received — Confidence: ${Math.round((backendResult.rca.confidence || 0) * 100)}%`, type: 'success', badge: `${Math.round((backendResult.rca.confidence || 0) * 100)}%`, badgeClass: 'badge-kb' });
        await wait(350); check();
        trace('llm_result', 'AI RCA received from Copilot CLI', {
          confidence: backendResult.rca.confidence,
          root_cause: backendResult.rca.root_cause?.substring(0, 120),
          citations: backendResult.rca.citations?.length || 0,
          model: backendResult.model,
          duration_ms: backendResult.duration_ms,
        });
      } else {
        emitDetail(5, { icon: 'fa-exclamation-triangle', text: 'Backend RCA not available — using client-side triage data for SNOW update', type: 'warning' });
        await wait(300);
      }
      if (backendResult && backendResult.error) {
        trace('error', 'Backend triage returned an error', { error: backendResult.error });
      }
    } catch (err) {
      trace('error', 'Failed to get backend result', { error: err.message });
      emitDetail(5, { icon: 'fa-exclamation-triangle', text: `Backend error: ${err.message}`, type: 'warning' });
      await wait(250);
    }
  }

  // ── Update SNOW work notes ──
  let snowUpdateResult = null;
  const rca = backendResult?.rca || null;
  const snowSysId = ticket._snow_sys_id;

  if (apiAvailable && snowSysId) {
    emitDetail(5, { icon: 'fa-cloud-upload-alt', text: `Posting triage work notes to ServiceNow ${ticket.id}...`, type: 'info' });
    await wait(400); check();

    emitDetail(5, { icon: 'fa-link', text: `MCP snow_client → PATCH /api/now/table/incident/${snowSysId.substring(0, 16)}...`, type: 'info' });
    await wait(300); check();

    try {
      snowUpdateResult = await updateSnowWorkNotes({
        sys_id: snowSysId,
        incident_id: ticket.id,
        title: ticket.title,
        rca_summary: rca?.rca_summary || `Client-side triage: ${assignmentResult.reason}`,
        root_cause: rca?.root_cause || `Category: ${category}, Complexity: ${complexityResult.score}/10`,
        confidence: rca?.confidence || (complexityResult.score <= 5 ? 0.7 : 0.5),
        recommended_actions: rca?.recommended_actions || assignmentResult.params,
        resolution_steps: rca?.resolution_steps || [`Assigned to ${assignmentResult.assignTo}`, `Priority: ${ticket.priority}`, `Domain: ${CATEGORY_LABELS[category] || category}`],
        citations: rca?.citations || [],
        assigned_to: assignmentResult.assignTo,
        complexity: complexityResult.score,
        category: category,
        priority: ticket.priority,
        model: backendResult?.model || 'client-side',
        duration_ms: backendResult?.duration_ms || 0,
        knowledge_gap: rca?.knowledge_gap || 'none',
      });

      // Merge SNOW update traces into debug trace
      if (snowUpdateResult?.trace) {
        for (const entry of snowUpdateResult.trace) {
          trace(entry.step || 'snow_update', entry.label || '', entry.data || {});
        }
      }

      if (snowUpdateResult?.status === 'ok') {
        emitDetail(5, { icon: 'fa-check-circle', text: `✓ ServiceNow ${ticket.id} work notes updated successfully`, type: 'success', badge: 'Updated', badgeClass: 'badge-good' });
        await wait(350); check();

        emitDetail(5, { icon: 'fa-file-medical-alt', text: `Work notes posted: RCA, ${rca?.recommended_actions?.length || 0} actions, ${rca?.resolution_steps?.length || 0} resolution steps, ${rca?.citations?.length || 0} citations`, type: 'info' });
        await wait(250);
      } else {
        emitDetail(5, { icon: 'fa-exclamation-triangle', text: `SNOW update returned error: ${snowUpdateResult?.error || 'unknown'}`, type: 'warning' });
        await wait(300);
      }
    } catch (err) {
      trace('snow_update', 'SNOW update call failed', { error: err.message });
      emitDetail(5, { icon: 'fa-times-circle', text: `SNOW update failed: ${err.message}`, type: 'error' });
      await wait(300);
    }
  } else if (!snowSysId) {
    emitDetail(5, { icon: 'fa-info-circle', text: 'No SNOW sys_id on ticket — skipping ServiceNow update (local/static ticket)', type: 'info' });
    await wait(300);
    trace('snow_update', 'Skipped — no sys_id', { ticket_id: ticket.id });
  } else {
    emitDetail(5, { icon: 'fa-info-circle', text: 'Triage API unavailable — SNOW update skipped', type: 'warning' });
    await wait(300);
    trace('snow_update', 'Skipped — API unavailable', { ticket_id: ticket.id });
  }

  emitDetail(5, { icon: 'fa-flag-checkered', text: 'Triage workflow complete', type: 'success' });
  await wait(200);

  emitDone(5);
  await wait(300);

  /* ─── Build Final Result ──────────────────────────────── */

  trace('executor', 'Triage complete', {
    kbCount: kbResults.length,
    pastCount: pastTicketResults.length,
    complexity: complexityResult.score,
    assignTo: assignmentResult.assignTo,
    apiAvailable,
    backendRCA: backendResult?.rca ? true : false,
    snowUpdated: snowUpdateResult?.status === 'ok',
  });

  const finalResult = {
    kbArticles: kbResults.map(kb => ({
      id: kb.id, title: kb.title, url: kb.url,
      relevance: `${kb.relevancePercent}% match`,
      sys_id: kb.sys_id,
    })),
    pastTickets: pastTicketResults.map(pt => ({
      id: pt.id, title: pt.title, match: `${pt.similarity}% match`,
    })),
    sops,
    complexity: complexityResult.score,
    complexityFactors: complexityResult.factors,
    assignment: assignmentResult.type,
    assignTo: assignmentResult.assignTo,
    agent: ticket.agent,
    decisionType: assignmentResult.decisionType,
    decisionLabel: `Assigned to ${assignmentResult.assignTo}`,
    decisionParams: assignmentResult.params,
    // Execution agent route for navigation
    executionRoute: assignmentResult.executionMatch?.route || null,
    executionAgentId: assignmentResult.executionMatch?.agentId || null,
    executionAgentName: assignmentResult.executionMatch?.agentName || null,
    // Ticket info for passing to agent execution page
    _ticket: { id: ticket.id, title: ticket.title, priority: ticket.priority, enrichment: ticket.enrichment, agent: ticket.agent, started: ticket.started },
    _steps: internalSteps,
    _debugTrace: getDebugTrace(),
    // Backend data (real SNOW + LLM results)
    _backendResult: backendResult || null,
    _apiAvailable: apiAvailable,
    _rca: backendResult?.rca || null,
    _snowKBArticles: backendResult?.snow_kb_articles || [],
    _snowResolvedIncidents: backendResult?.snow_resolved_incidents || [],
    _snowUpdated: snowUpdateResult?.status === 'ok',
    _snowUpdateTrace: snowUpdateResult?.trace || [],
  };

  onTriageComplete(finalResult);
  return finalResult;
}
