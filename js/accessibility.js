/**
 * accessibility.js — Formação de Professores Autores e Formadores para EaD
 *
 * Painel de acessibilidade do LDI. Controla:
 *
 *   - Leitura em voz alta  (delega para window.Audio)
 *   - Efeitos sonoros      (delega para window.Audio)
 *   - Som ambiente         (delega para window.Audio)
 *   - Melodia de fundo     (delega para window.Audio)
 *   - Modo escuro          (aplica html.theme-dark)
 *   - Alto contraste       (aplica html.high-contrast)
 *   - Reduzir animações    (aplica html.reduce-motion)
 *   - Tamanho da fonte     (aplica html.font-scale-N, N = 1 a 5)
 *
 * Expõe window.A11y com a API pública esperada pelo app.js:
 *
 *   A11y.init()
 *   A11y.openPanel()
 *   A11y.closePanel()
 *   A11y.isPanelOpen()
 *   A11y.getPrefs()
 *   A11y.reset()
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 * Apoio: Inteligência Artificial generativa (ferramenta de apoio)
 */

window.A11y = (function () {
  'use strict';

  /* ============================================================
   * 1. CONSTANTES
   * ============================================================ */

  var STORAGE_KEY = 'ufu-ead-ldi:a11y-prefs';
  var VERSION = '1.0.0';

  var FONT_SCALE_MIN = 1;
  var FONT_SCALE_MAX = 5;
  var FONT_SCALE_DEFAULT = 2;

  var FONT_SCALE_LABELS = {
    1: 'Texto pequeno',
    2: 'Tamanho padrão',
    3: 'Texto grande',
    4: 'Texto muito grande',
    5: 'Texto gigante'
  };

  var DEFAULT_PREFS = {
    voice:    false,
    sfx:      false,
    ambience: false,
    melody:   'caminho',
    theme:    'light',      // 'light' | 'dark'
    contrast: false,
    motion:   true,         // true = animações ligadas (padrão)
    fontScale: FONT_SCALE_DEFAULT
  };

  /* ============================================================
   * 2. ESTADO
   * ============================================================ */

  var prefs = null;
  var initialized = false;
  var panelOpen = false;
  var lastFocusedElement = null;
  var dom = {};

  /* ============================================================
   * 3. PREFERÊNCIAS — persistência
   * ============================================================ */

  function loadPrefs() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULT_PREFS);
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return Object.assign({}, DEFAULT_PREFS);
      var merged = Object.assign({}, DEFAULT_PREFS);
      for (var k in parsed) {
        if (parsed.hasOwnProperty(k)) merged[k] = parsed[k];
      }
      /* Sanitizações */
      if (merged.fontScale < FONT_SCALE_MIN) merged.fontScale = FONT_SCALE_MIN;
      if (merged.fontScale > FONT_SCALE_MAX) merged.fontScale = FONT_SCALE_MAX;
      if (merged.theme !== 'dark') merged.theme = 'light';
      merged.contrast = !!merged.contrast;
      merged.voice    = !!merged.voice;
      merged.sfx      = !!merged.sfx;
      merged.ambience = !!merged.ambience;
      merged.motion   = merged.motion !== false;
      return merged;
    } catch (e) {
      return Object.assign({}, DEFAULT_PREFS);
    }
  }

  function savePrefs() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getPrefs() {
    var copy = {};
    for (var k in prefs) {
      if (prefs.hasOwnProperty(k)) copy[k] = prefs[k];
    }
    return copy;
  }

  /* ============================================================
   * 4. HELPERS DE DOM
   * ============================================================ */

  function $(id) {
    return document.getElementById(id);
  }

  function qsa(selector, root) {
    root = root || document;
    var nodes = root.querySelectorAll(selector);
    return Array.prototype.slice.call(nodes);
  }

  function addClass(el, cls) {
    if (!el) return;
    if (el.classList) el.classList.add(cls);
    else if (!hasClass(el, cls)) el.className = (el.className + ' ' + cls).trim();
  }

  function removeClass(el, cls) {
    if (!el) return;
    if (el.classList) el.classList.remove(cls);
    else el.className = (' ' + el.className + ' ').replace(' ' + cls + ' ', ' ').trim();
  }

  function hasClass(el, cls) {
    if (!el) return false;
    if (el.classList) return el.classList.contains(cls);
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') !== -1;
  }

  function setAttr(el, name, value) {
    if (!el) return;
    el.setAttribute(name, value);
  }

  function isVisible(el) {
    if (!el) return false;
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  /* ============================================================
   * 5. CACHE DE ELEMENTOS
   * ============================================================ */

  function cacheElements() {
    dom.html = document.documentElement;

    /* Abertura / fechamento */
    dom.openBtn    = $('btn-open-a11y');
    dom.closeBtn   = $('btn-close-a11y');
    dom.panel      = $('a11y-panel');
    dom.backdrop   = $('a11y-backdrop');

    /* Áudio */
    dom.toggleVoice    = $('a11y-voice');
    dom.toggleSfx      = $('a11y-sfx');
    dom.toggleAmbience = $('a11y-ambience');
    dom.melodySelect   = $('a11y-ambience-theme');

    /* Aparência */
    dom.toggleTheme    = $('a11y-theme');
    dom.toggleContrast = $('a11y-contrast');
    dom.toggleMotion   = $('a11y-motion');

    /* Fonte */
    dom.fontDown  = $('a11y-font-down');
    dom.fontReset = $('a11y-font-reset');
    dom.fontUp    = $('a11y-font-up');
    dom.fontStatus = $('a11y-font-status');
  }

  /* ============================================================
   * 6. APLICAÇÃO DAS PREFERÊNCIAS
   * ============================================================ */

  function applyTheme() {
    if (prefs.theme === 'dark') {
      addClass(dom.html, 'theme-dark');
    } else {
      removeClass(dom.html, 'theme-dark');
    }
  }

  function applyContrast() {
    if (prefs.contrast) {
      addClass(dom.html, 'high-contrast');
    } else {
      removeClass(dom.html, 'high-contrast');
    }
  }

  function applyMotion() {
    /* Reduce-motion é aplicado quando motion === false */
    if (prefs.motion === false) {
      addClass(dom.html, 'reduce-motion');
    } else {
      removeClass(dom.html, 'reduce-motion');
    }
  }

  function applyFontScale() {
    for (var i = FONT_SCALE_MIN; i <= FONT_SCALE_MAX; i++) {
      removeClass(dom.html, 'font-scale-' + i);
    }
    addClass(dom.html, 'font-scale-' + prefs.fontScale);
    updateFontStatus();
  }

  function updateFontStatus() {
    if (!dom.fontStatus) return;
    dom.fontStatus.textContent = FONT_SCALE_LABELS[prefs.fontScale] || 'Tamanho padrão';
  }

  function applyAllPrefs() {
    applyTheme();
    applyContrast();
    applyMotion();
    applyFontScale();
    syncTogglesUI();
    syncMelodySelect();
  }

  /* ============================================================
   * 7. SINCRONIZAÇÃO DA UI DOS TOGGLES
   * ============================================================ */

  function syncTogglesUI() {
    syncToggle(dom.toggleVoice,    prefs.voice);
    syncToggle(dom.toggleSfx,      prefs.sfx);
    syncToggle(dom.toggleAmbience, prefs.ambience);
    syncToggle(dom.toggleTheme,    prefs.theme === 'dark');
    syncToggle(dom.toggleContrast, prefs.contrast);
    syncToggle(dom.toggleMotion,   prefs.motion === false);
    /* O toggle de "reduzir animações" está ativo quando motion === false */

    if (dom.fontDown)  dom.fontDown.disabled  = (prefs.fontScale <= FONT_SCALE_MIN);
    if (dom.fontUp)    dom.fontUp.disabled    = (prefs.fontScale >= FONT_SCALE_MAX);
    if (dom.fontReset) dom.fontReset.disabled = (prefs.fontScale === FONT_SCALE_DEFAULT);
  }

  function syncToggle(el, isOn) {
    if (!el) return;
    el.setAttribute('aria-pressed', isOn ? 'true' : 'false');
    var stateEl = el.querySelector('.toggle-state');
    if (stateEl) stateEl.textContent = isOn ? 'Ligado' : 'Desligado';
    if (isOn) addClass(el, 'is-on');
    else removeClass(el, 'is-on');
  }

  function syncMelodySelect() {
    if (!dom.melodySelect) return;
    if (dom.melodySelect.value !== prefs.melody) {
      dom.melodySelect.value = prefs.melody;
    }
  }

  /* ============================================================
   * 8. COMUNICAÇÃO COM O MÓDULO DE ÁUDIO
   * ============================================================ */

  function getAudio() {
    return window.Audio || null;
  }

  function audioSetVoice(enabled) {
    var A = getAudio();
    if (A && typeof A.setVoice === 'function') {
      try { A.setVoice(enabled); } catch (e) { /* silencioso */ }
    }
  }

  function audioSetSfx(enabled) {
    var A = getAudio();
    if (A && typeof A.setSfx === 'function') {
      try { A.setSfx(enabled); } catch (e) { /* silencioso */ }
    }
  }

  function audioSetAmbience(enabled) {
    var A = getAudio();
    if (A && typeof A.setAmbience === 'function') {
      try { A.setAmbience(enabled); } catch (e) { /* silencioso */ }
    }
  }

  function audioSetMelody(melodyId) {
    var A = getAudio();
    if (A && typeof A.setMelody === 'function') {
      try { A.setMelody(melodyId); } catch (e) { /* silencioso */ }
    }
  }

  /* ============================================================
   * 9. TOGGLES E CONTROLES
   * ============================================================ */

  function toggleVoice() {
    prefs.voice = !prefs.voice;
    savePrefs();
    audioSetVoice(prefs.voice);
    syncToggle(dom.toggleVoice, prefs.voice);
  }

  function toggleSfx() {
    prefs.sfx = !prefs.sfx;
    savePrefs();
    audioSetSfx(prefs.sfx);
    syncToggle(dom.toggleSfx, prefs.sfx);
  }

  function toggleAmbience() {
    prefs.ambience = !prefs.ambience;
    savePrefs();
    audioSetAmbience(prefs.ambience);
    syncToggle(dom.toggleAmbience, prefs.ambience);
  }

  function changeMelody() {
    if (!dom.melodySelect) return;
    var value = dom.melodySelect.value;
    prefs.melody = value;
    savePrefs();
    audioSetMelody(value);
  }

  function toggleTheme() {
    prefs.theme = (prefs.theme === 'dark') ? 'light' : 'dark';
    savePrefs();
    applyTheme();
    syncToggle(dom.toggleTheme, prefs.theme === 'dark');
  }

  function toggleContrast() {
    prefs.contrast = !prefs.contrast;
    savePrefs();
    applyContrast();
    syncToggle(dom.toggleContrast, prefs.contrast);
  }

  function toggleMotion() {
    prefs.motion = !prefs.motion;
    savePrefs();
    applyMotion();
    syncToggle(dom.toggleMotion, prefs.motion === false);
  }

  function fontDown() {
    if (prefs.fontScale <= FONT_SCALE_MIN) return;
    prefs.fontScale -= 1;
    savePrefs();
    applyFontScale();
    syncTogglesUI();
  }

  function fontUp() {
    if (prefs.fontScale >= FONT_SCALE_MAX) return;
    prefs.fontScale += 1;
    savePrefs();
    applyFontScale();
    syncTogglesUI();
  }

  function fontReset() {
    prefs.fontScale = FONT_SCALE_DEFAULT;
    savePrefs();
    applyFontScale();
    syncTogglesUI();
  }

  /* ============================================================
   * 10. PAINEL — abrir / fechar
   * ============================================================ */

  function openPanel() {
    if (!dom.panel) return;
    if (panelOpen) return;

    lastFocusedElement = document.activeElement;
    dom.panel.hidden = false;
    if (dom.backdrop) dom.backdrop.hidden = false;
    if (dom.openBtn) dom.openBtn.setAttribute('aria-expanded', 'true');

    panelOpen = true;

    /* Foca o primeiro elemento focável do painel */
    window.setTimeout(function () {
      var first = dom.panel.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (first && typeof first.focus === 'function') {
        try { first.focus(); } catch (e) { /* silencioso */ }
      }
    }, 30);
  }

  function closePanel() {
    if (!dom.panel) return;
    if (!panelOpen) return;

    dom.panel.hidden = true;
    if (dom.backdrop) dom.backdrop.hidden = true;
    if (dom.openBtn) dom.openBtn.setAttribute('aria-expanded', 'false');

    panelOpen = false;

    /* Devolve o foco para o elemento anterior (ou o botão de abrir) */
    var target = lastFocusedElement;
    if (!target && dom.openBtn) target = dom.openBtn;
    if (target && typeof target.focus === 'function') {
      try { target.focus(); } catch (e) { /* silencioso */ }
    }
    lastFocusedElement = null;
  }

  function isPanelOpen() {
    return panelOpen;
  }

  /* ============================================================
   * 11. FOCUS TRAP E TECLADO
   * ============================================================ */

  function getFocusableElements(container) {
    if (!container) return [];
    var selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var nodes = qsa(selector, container);
    return nodes.filter(function (n) {
      return !n.disabled && isVisible(n);
    });
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (panelOpen) {
        e.preventDefault();
        closePanel();
      }
      return;
    }

    if (!panelOpen) return;
    if (e.key !== 'Tab') return;

    var focusables = getFocusableElements(dom.panel);
    if (focusables.length === 0) return;

    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    var active = document.activeElement;

    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* ============================================================
   * 12. EVENTOS
   * ============================================================ */

  function bindEvents() {
    if (dom.openBtn) {
      dom.openBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openPanel();
      });
    }
    if (dom.closeBtn) {
      dom.closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closePanel();
      });
    }
    if (dom.backdrop) {
      dom.backdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closePanel();
      });
    }

    /* Áudio */
    if (dom.toggleVoice)    dom.toggleVoice.addEventListener('click',    toggleVoice);
    if (dom.toggleSfx)      dom.toggleSfx.addEventListener('click',      toggleSfx);
    if (dom.toggleAmbience) dom.toggleAmbience.addEventListener('click', toggleAmbience);
    if (dom.melodySelect)   dom.melodySelect.addEventListener('change',  changeMelody);

    /* Aparência */
    if (dom.toggleTheme)    dom.toggleTheme.addEventListener('click',    toggleTheme);
    if (dom.toggleContrast) dom.toggleContrast.addEventListener('click', toggleContrast);
    if (dom.toggleMotion)   dom.toggleMotion.addEventListener('click',   toggleMotion);

    /* Fonte */
    if (dom.fontDown)  dom.fontDown.addEventListener('click',  fontDown);
    if (dom.fontUp)    dom.fontUp.addEventListener('click',    fontUp);
    if (dom.fontReset) dom.fontReset.addEventListener('click', fontReset);

    /* Teclado global (ESC + focus trap) */
    document.addEventListener('keydown', handleKeydown);
  }

  /* ============================================================
   * 13. RESET DE PREFERÊNCIAS
   * ============================================================ */

  function reset() {
    prefs = Object.assign({}, DEFAULT_PREFS);
    savePrefs();
    applyAllPrefs();
    audioSetVoice(prefs.voice);
    audioSetSfx(prefs.sfx);
    audioSetAmbience(prefs.ambience);
    audioSetMelody(prefs.melody);
  }

  /* ============================================================
   * 14. CICLO DE VIDA
   * ============================================================ */

  function init() {
    if (initialized) return;
    initialized = true;

    cacheElements();
    prefs = loadPrefs();
    bindEvents();

    /* Aplica preferências ao <html> */
    applyAllPrefs();

    /* Sincroniza com o módulo de áudio */
    audioSetVoice(prefs.voice);
    audioSetSfx(prefs.sfx);
    /* Som ambiente NÃO é iniciado automaticamente — depende de gesto
       do usuário (política de autoplay). O audio.js cuida disso no
       primeiro clique. */

    /* Painel começa fechado */
    if (dom.panel) dom.panel.hidden = true;
    if (dom.backdrop) dom.backdrop.hidden = true;
    if (dom.openBtn) dom.openBtn.setAttribute('aria-expanded', 'false');
  }

  /* ============================================================
   * 15. API PÚBLICA
   * ============================================================ */

  return {
    /* Ciclo de vida */
    init: init,
    reset: reset,

    /* Painel */
    openPanel: openPanel,
    closePanel: closePanel,
    isPanelOpen: isPanelOpen,

    /* Preferências */
    getPrefs: getPrefs,

    /* Constantes */
    VERSION: VERSION
  };

})();

/* ============================================================
 * AUTO-INICIALIZAÇÃO
 * ============================================================ */

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.A11y.init();
    });
  } else {
    window.A11y.init();
  }
} else {
  window.A11y.init();
}