/* IA locale : un vrai modèle de langage qui tourne dans le navigateur (WebGPU, via WebLLM).
   Rien ne sort de l'appareil : le modèle est téléchargé une fois depuis Hugging Face puis gardé
   en cache par le navigateur. Le prof lui donne les passages du cours qui répondent à la question
   (recherche locale), le modèle rédige la réponse. */
(function () {
  'use strict';
  const LIB = 'https://esm.run/@mlc-ai/web-llm@0.2.89';
  const K = 'cloclo.llm';
  const MODELS = [
    { id: 'Qwen3.5-2B', label: 'Équilibré', size: '1,1 Go', note: 'bon compromis, recommandé' },
    { id: 'Qwen3.5-0.8B', label: 'Léger', size: '0,5 Go', note: 'pour un téléphone ou un vieil ordi' },
    { id: 'Qwen3.5-4B', label: 'Costaud', size: '2,4 Go', note: 'le plus juste, il faut une bonne carte graphique' }
  ];
  const cfg = () => { try { return JSON.parse(localStorage.getItem(K) || '{}'); } catch (e) { return {}; } };
  const setCfg = o => { try { localStorage.setItem(K, JSON.stringify(Object.assign(cfg(), o))); } catch (e) { } };

  let lib = null, engine = null, loaded = null, loading = null, f16 = null, listeners = new Set();
  let state = { phase: 'off', progress: 0, text: '' }; // off | loading | ready | error
  const emit = s => { state = Object.assign({}, state, s); listeners.forEach(f => { try { f(state); } catch (e) { } }); };

  async function gpuInfo() {
    if (!('gpu' in navigator)) return { ok: false, why: 'Ce navigateur n\'a pas WebGPU (essaie Chrome, Edge, ou Safari récent).' };
    try {
      const a = await navigator.gpu.requestAdapter();
      if (!a) return { ok: false, why: 'Aucune carte graphique utilisable par le navigateur.' };
      f16 = a.features.has('shader-f16');
      return { ok: true, f16 };
    } catch (e) { return { ok: false, why: 'WebGPU indisponible (' + e.message + ').' }; }
  }
  const fullId = (id, half) => id + (half ? '-q4f16_1-MLC' : '-q4f32_1-MLC');
  // Sur téléphone, le modèle léger par défaut (mémoire et batterie)
  const mobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const defaultModel = () => mobile ? MODELS[1] : MODELS[0];
  const chosen = () => MODELS.find(m => m.id === cfg().model) || defaultModel();

  async function load(id) {
    id = id || chosen().id;
    if (engine && loaded === id) return engine;
    if (loading) return loading;
    loading = (async () => {
      const g = await gpuInfo();
      if (!g.ok) { emit({ phase: 'error', text: g.why }); throw new Error(g.why); }
      emit({ phase: 'loading', progress: 0, text: 'Chargement de la bibliothèque…' });
      lib = lib || await import(LIB);
      const opts = { initProgressCallback: p => emit({ phase: 'loading', progress: p.progress || 0, text: tidy(p.text || '') }) };
      if (engine) { try { await engine.unload(); } catch (e) { } engine = null; }
      for (let tryN = 1; ; tryN++) {
        try { engine = await lib.CreateMLCEngine(fullId(id, g.f16), opts, API.ctx ? { context_window_size: API.ctx } : undefined); break; }
        catch (e) {
          engine = null;
          // coupure réseau pendant le téléchargement : on reprend (les morceaux déjà reçus restent en cache)
          if (tryN < 4 && /network|fetch|Cache|Failed to load/i.test(e.message)) { emit({ phase: 'loading', text: 'Connexion coupée, je reprends le téléchargement… (essai ' + (tryN + 1) + ')' }); await new Promise(r => setTimeout(r, 1500 * tryN)); continue; }
          emit({ phase: 'error', text: 'Impossible de charger le modèle : ' + e.message }); throw e;
        }
      }
      loaded = id; setCfg({ model: id, on: true });
      emit({ phase: 'ready', progress: 1, text: 'Prêt : ' + label(id) + ', sur ta carte graphique.' });
      return engine;
    })();
    try { return await loading; } finally { loading = null; }
  }
  function tidy(t) {
    const m = t.match(/(\d+)MB fetched/); const pc = t.match(/(\d+)% completed/);
    if (/Fetching param cache/i.test(t) && m) return 'Téléchargement du modèle : ' + m[1] + ' Mo' + (pc ? ' (' + pc[1] + ' %)' : '');
    if (/Loading model from cache/i.test(t)) return 'Lecture du modèle depuis le cache…' + (pc ? ' ' + pc[1] + ' %' : '');
    if (/shader|GPU|compil/i.test(t)) return 'Préparation de la carte graphique…';
    return t.slice(0, 90);
  }
  const label = id => { const m = MODELS.find(x => x.id === id); return m ? m.label + ' (' + m.id + ')' : id; };

  // Le modèle choisi est-il déjà téléchargé ? (pour le recharger seul à l'ouverture du cerveau)
  async function cached(id) {
    try {
      const g = await gpuInfo(); if (!g.ok) return false;
      lib = lib || await import(LIB);
      return await lib.hasModelInCache(fullId(id || chosen().id, g.f16));
    } catch (e) { return false; }
  }
  async function forget() {
    try {
      const g = await gpuInfo(); lib = lib || await import(LIB);
      if (engine) { await engine.unload(); engine = null; loaded = null; }
      for (const m of MODELS) for (const half of [true, false]) { try { await lib.deleteModelAllInfoInCache(fullId(m.id, half)); } catch (e) { } }
    } catch (e) { }
    setCfg({ on: false }); emit({ phase: 'off', progress: 0, text: '' });
  }

  // Génère une réponse en flux. messages : [{role, content}]. onText(texteComplet)
  let stopFlag = false;
  async function chat(messages, onText, o = {}) {
    if (!engine) throw new Error('modèle non chargé');
    stopFlag = false;
    const req = { messages, stream: true, temperature: o.temperature ?? 0.4, top_p: 0.9, max_tokens: o.max_tokens || 800, frequency_penalty: o.nofp ? 0 : 0.3, extra_body: { enable_thinking: false } };
    let out = '';
    try {
      const chunks = await engine.chat.completions.create(req);
      for await (const c of chunks) {
        const d = c.choices && c.choices[0] && c.choices[0].delta && c.choices[0].delta.content;
        if (d) { out += d; onText(clean(out)); }
        if (stopFlag) { try { engine.interruptGenerate(); } catch (e) { } break; }
      }
    } catch (e) {
      // la carte graphique a lâché : on jette le moteur et on le recharge (depuis le cache) en arrière-plan
      const id = loaded; try { engine.unload(); } catch (x) { } engine = null; loaded = null;
      emit({ phase: 'off', progress: 0, text: '' });
      setTimeout(() => load(id).catch(() => { }), 300);
      throw e;
    }
    return clean(out);
  }
  const clean = t => t.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').replace(/^\s+/, '');

  const API = window.LocalLLM = {
    MODELS, cfg, setCfg, load, chosen, cached, forget, chat, gpuInfo, label,
    stop() { stopFlag = true; },
    ready: () => !!engine && state.phase === 'ready',
    wanted: () => cfg().on === true,
    get state() { return state; },
    on(f) { listeners.add(f); return () => listeners.delete(f); }
  };
})();
