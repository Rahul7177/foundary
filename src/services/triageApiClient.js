/* ────────────────────────────────────────────────────────────
 *  Triage Agent API Client
 *
 *  Bridges the React frontend to the Python triage agent API
 *  (ghcp_agents/triage_api.py running on port 8042).
 *
 *  Calls: SNOW KB search, SNOW resolved incidents, full LLM triage.
 *  Returns structured trace data for the debug panel.
 * ──────────────────────────────────────────────────────────── */

const API_BASE = '/api/triage';

/**
 * Check if the triage API backend is available.
 * @returns {Promise<{ok: boolean, data?: object, error?: string}>}
 */
export async function checkTriageApiHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = await res.json();
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e.message || 'API unreachable' };
  }
}

/**
 * Search ServiceNow KB articles via the Python backend (real SNOW API call).
 * @param {string} query - Search query (typically the ticket title)
 * @param {number} [maxResults=5]
 * @returns {Promise<{articles: Array, trace: Array, error?: string}>}
 */
export async function searchSnowKB(query, maxResults = 5) {
  try {
    const res = await fetch(`${API_BASE}/snow-kb`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, max_results: maxResults }),
    });
    const data = await res.json();
    return {
      articles: data.articles || [],
      trace: data.trace || [],
      error: data.status === 'error' ? data.error : null,
    };
  } catch (e) {
    return {
      articles: [],
      trace: [{ ts: new Date().toISOString(), step: 'snow_kb', label: 'FETCH ERROR', data: { error: e.message }, status: 'error' }],
      error: e.message,
    };
  }
}

/**
 * Search ServiceNow resolved incidents via the Python backend (real SNOW API call).
 * @param {string} description
 * @param {string} [category]
 * @param {number} [maxResults=5]
 * @returns {Promise<{incidents: Array, trace: Array, error?: string}>}
 */
export async function searchSnowResolved(description, category, maxResults = 5) {
  try {
    const res = await fetch(`${API_BASE}/snow-resolved`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, category: category || null, max_results: maxResults }),
    });
    const data = await res.json();
    return {
      incidents: data.incidents || [],
      trace: data.trace || [],
      error: data.status === 'error' ? data.error : null,
    };
  } catch (e) {
    return {
      incidents: [],
      trace: [{ ts: new Date().toISOString(), step: 'snow_resolved', label: 'FETCH ERROR', data: { error: e.message }, status: 'error' }],
      error: e.message,
    };
  }
}

/**
 * Run full triage via the Python agent (SNOW + Local KB + LLM via Copilot CLI).
 * @param {object} ticket - Full ticket object from tickets.json
 * @param {object} [options]
 * @param {boolean} [options.skipLLM=false] - Skip LLM call for faster SNOW-only triage
 * @param {boolean} [options.skipSnowUpdate=true] - Skip SNOW incident update
 * @returns {Promise<{status: string, rca?: object, trace: Array, error?: string, ...}>}
 */
export async function runFullTriage(ticket, options = {}) {
  const { skipLLM = false, skipSnowUpdate = true } = options;
  try {
    const res = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticket,
        skip_llm: skipLLM,
        skip_snow_update: skipSnowUpdate,
      }),
    });
    const data = await res.json();
    return {
      ...data,
      trace: data.trace || [],
      error: data.status === 'error' ? (data.error || 'Unknown error') : null,
    };
  } catch (e) {
    return {
      status: 'error',
      error: e.message,
      trace: [{ ts: new Date().toISOString(), step: 'executor', label: 'FETCH ERROR', data: { error: e.message }, status: 'error' }],
      rca: null,
      snow_kb_articles: [],
      snow_resolved_incidents: [],
    };
  }
}

/**
 * Update ServiceNow incident work notes with full triage RCA results.
 * Called AFTER triage completes so the debugger can show real-time traces
 * of the MCP → SNOW interaction.
 *
 * @param {object} params
 * @param {string} params.sys_id         - SNOW sys_id
 * @param {string} params.incident_id    - INC number
 * @param {string} [params.title]        - Ticket title
 * @param {string} [params.rca_summary]  - RCA summary text
 * @param {string} [params.root_cause]   - Identified root cause
 * @param {number} [params.confidence]   - Confidence score 0-1
 * @param {string[]} [params.recommended_actions]
 * @param {string[]} [params.resolution_steps]
 * @param {Array}  [params.citations]    - Source citations
 * @param {string} [params.assigned_to]  - Assignment target
 * @param {number} [params.complexity]   - Complexity score
 * @param {string} [params.category]
 * @param {string} [params.priority]
 * @param {string} [params.model]        - LLM model used
 * @param {number} [params.duration_ms]  - Triage duration
 * @returns {Promise<{status: string, snow_updated: boolean, trace: Array, error?: string}>}
 */
export async function updateSnowWorkNotes(params) {
  try {
    const res = await fetch(`${API_BASE}/snow-update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    return {
      ...data,
      trace: data.trace || [],
      error: data.status === 'error' ? (data.error || 'Update failed') : null,
    };
  } catch (e) {
    return {
      status: 'error',
      error: e.message,
      snow_updated: false,
      trace: [{ ts: new Date().toISOString(), step: 'snow_update', label: 'FETCH ERROR', data: { error: e.message }, status: 'error' }],
    };
  }
}
