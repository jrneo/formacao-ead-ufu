/**
 * app.js — Formação de Professores Autores e Formadores para EaD
 *
 * Navegação, renderização das telas, montagem da interface e
 * interação entre os módulos.
 *
 * Depende de (carregados antes, via defer):
 *   theme.js          → window.THEME
 *   missions.js       → window.MISSIONS
 *   boss.js           → window.BOSS
 *   data.js           → window.GLOSSARY, window.ACHIEVEMENTS, window.CONTENT_THEMES
 *   game.js           → window.Game
 *   audio.js          → window.Audio
 *   accessibility.js  → window.A11y
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 * Apoio: Inteligência artificial generativa (ferramenta de apoio)
 */

(function () {
  'use strict';

  /* ============================================================
   * 1. TEMA (fallback seguro)
   * ============================================================ */

  var FALLBACK_THEME = {
    meta: { title: 'LDI', subtitle: '', tagline: '', kicker: '', intro: '' },
    characters: { default: { id: 'default', name: 'Guia', svg: '' } },
    screens: {
      mapTitle: '🗺️ Mapa da Jornada', mapSubtitle: '',
      contentsTitle: '📖 Conteúdos', contentsSubtitle: '',
      glossaryTitle: '📚 Glossário', glossarySubtitle: '',
      achievementsTitle: '🏆 Conquistas',
      aboutTitle: 'ℹ️ Sobre', aboutSubtitle: '',
      transparencyTitle: '🧠 Transparência sobre IA',
      howtoTitle: '🎓 Como Jogar', howtoSubtitle: ''
    },
    howTo: { intro: '', whyItMatters: '', steps: [], tips: [] },
    texts: { aboutItems: [], transparency: [] },
    gamification: { scoreName: 'Progresso', xpName: 'Experiência', levelName: 'Nível' },
    ui: {
      btnStartJourney: 'Começar Jornada', btnContinueJourney: 'Continuar Jornada',
      btnHowTo: 'Como Jogar',
      btnHome: 'Início', btnBackToMap: 'Voltar ao mapa',
      btnContinue: 'Continuar', btnStartMission: 'Começar missão',
      btnFaceBoss: 'Enfrentar o Desafio Final', btnReset: 'Reiniciar jornada',
      resetConfirm: 'Tem certeza?', toastReset: 'Reiniciada.',
      toastBossUnlocked: '👑 Desafio Final desbloqueado!',
      labelLocked: 'Bloqueada', labelAvailable: 'Disponível',
      labelCurrent: 'Missão atual', labelCompleted: 'Concluída',
      finalTitle: '👑 Desafio Final concluído'
    }
  };

  function getTheme() { return window.THEME || FALLBACK_THEME; }

  function getCharacter(id) {
    var T = getTheme();
    if (id && T.characters[id]) return T.characters[id];
    return T.characters.default;
  }

  /* ============================================================
   * 2. CONSTANTES
   * ============================================================ */

  var SCREENS = {
    HOME: 'home', HOWTO: 'howto', MAP: 'map',
    MISSION: 'mission', BOSS: 'boss',
    CONTENTS: 'contents', GLOSSARY: 'glossary', ACHIEVEMENTS: 'achievements',
    ABOUT: 'about', TRANSPARENCY: 'transparency', FINAL: 'final'
  };

  var PHASE = {
    INTRO: 'intro',
    QUESTION: 'question',
    WRONG_FEEDBACK: 'wrong-feedback',
    REVEAL: 'reveal',
    SUCCESS: 'success',
    RESULT: 'result'
  };

  var MAX_WRONG_ATTEMPTS = 3;

  var LEVELS = [
    { level: 1, min: 0,     label: 'Iniciante' },
    { level: 2, min: 1000,  label: 'Aprendiz' },
    { level: 3, min: 2500,  label: 'Praticante' },
    { level: 4, min: 4500,  label: 'Docente Reflexivo' },
    { level: 5, min: 7000,  label: 'Docente Experiente' },
    { level: 6, min: 10000, label: 'Praticante Sênior' }
  ];

  /* ------------------------------------------------------------
   * 2.1 TEMAS VISUAIS DAS MEDALHAS
   * ------------------------------------------------------------
   * Cada trilha tem uma paleta (gradiente externo, cor do anel,
   * cor interna, cor do ícone) usada para desenhar as medalhas
   * na tela de conquistas.
   * ---------------------------------------------------------- */

  var TRAIL_THEMES = {
    fundamentos: {
      label: 'Fundamentos da EaD',
      icon:  '📚',
      // Azul UFU (livros, base do conhecimento)
      outer: ['#1b3a6b', '#0f2547'],
      ring:  '#c9a227',
      inner: '#2d4a7c',
      glyph: '#e6c34a',
      text:  '#1b3a6b'
    },
    planejamento: {
      label: 'Planejamento e Gestão',
      icon:  '📋',
      // Verde (prancheta, organização)
      outer: ['#2e8b57', '#1f6039'],
      ring:  '#c9a227',
      inner: '#3d9d6a',
      glyph: '#e6c34a',
      text:  '#1f6039'
    },
    producao: {
      label: 'Produção de Material',
      icon:  '🎬',
      // Dourado (cinema, brilho)
      outer: ['#c9a227', '#8a6d15'],
      ring:  '#f0d76a',
      inner: '#d4b449',
      glyph: '#1b3a6b',
      text:  '#8a6d15'
    },
    avaliacao: {
      label: 'Avaliação da Aprendizagem',
      icon:  '📊',
      // Roxo (gráfico, reflexão)
      outer: ['#6b4a8a', '#4a2f66'],
      ring:  '#c9a227',
      inner: '#8b63a8',
      glyph: '#e6c34a',
      text:  '#4a2f66'
    },
    atuacao: {
      label: 'Atuação Docente',
      icon:  '👩‍🏫',
      // Vermelho (docência, paixão)
      outer: ['#b23a3a', '#8a1c1c'],
      ring:  '#c9a227',
      inner: '#c94f4f',
      glyph: '#e6c34a',
      text:  '#8a1c1c'
    },
    praticas: {
      label: 'Laboratório de Práticas',
      icon:  '🧪',
      // Laranja (laboratório, química)
      outer: ['#ef6c00', '#bf5000'],
      ring:  '#c9a227',
      inner: '#f08630',
      glyph: '#1b3a6b',
      text:  '#bf5000'
    },
    boss: {
      label: 'Desafio Final',
      icon:  '👑',
      // Preto e dourado (autoridade, mestre)
      outer: ['#1a1a1a', '#000000'],
      ring:  '#e6c34a',
      inner: '#2d2d2d',
      glyph: '#f0d76a',
      text:  '#1a1a1a'
    },
    global: {
      label: 'Marco Geral',
      icon:  '🏅',
      // Cinza-aço (conquista universal)
      outer: ['#5a5142', '#3a3428'],
      ring:  '#c9a227',
      inner: '#756a58',
      glyph: '#e6c34a',
      text:  '#3a3428'
    }
  };

  function getTrailTheme(trailId) {
    return TRAIL_THEMES[trailId] || TRAIL_THEMES.global;
  }

  function getStatusMeta() {
    var ui = getTheme().ui;
    return {
      locked:    { icon: '🔒', label: ui.labelLocked,    disabled: true  },
      available: { icon: '▶️', label: ui.labelAvailable, disabled: false },
      current:   { icon: '🔥', label: ui.labelCurrent,   disabled: false },
      completed: { icon: '✅', label: ui.labelCompleted, disabled: false }
    };
  }

  /* ============================================================
   * 3. ESTADO INTERNO DA UI
   * ============================================================ */

  var ui = {
    currentScreen: null,
    mission: {
      id: null,
      phase: PHASE.INTRO,
      selectedOption: null,
      correctIndex: null,
      wasCorrect: false,
      revealed: false,
      reward: null,
      autoRevealed: false
    },
    boss: {
      phase: PHASE.INTRO,
      decisionIndex: 0,
      selectedOption: null,
      wasCorrect: false,
      correctCount: 0
    },
    a11yReturnFocus: null
  };

  var screenRoot = null;

  /* ============================================================
   * 4. HELPERS DE DOM
   * ============================================================ */

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function appendChildren(parent, children) {
    if (children == null || children === false) return;
    var list = Array.isArray(children) ? children : [children];
    list.forEach(function (child) {
      if (child == null || child === false) return;
      if (Array.isArray(child)) appendChildren(parent, child);
      else if (child instanceof Node) parent.appendChild(child);
      else parent.appendChild(document.createTextNode(String(child)));
    });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        if (val == null || val === false) return;
        if (key === 'class') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key === 'style') node.setAttribute('style', val);
        else if (key === 'dataset') {
          Object.keys(val).forEach(function (d) { node.dataset[d] = val[d]; });
        } else node.setAttribute(key, val);
      });
    }
    appendChildren(node, children);
    return node;
  }

  function clearNode(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function buttonEl(icon, label, action, variant, extraAttrs) {
    var attrs = { type: 'button', class: 'btn btn-' + (variant || 'secondary'), 'data-action': action };
    if (extraAttrs) Object.keys(extraAttrs).forEach(function (k) { attrs[k] = extraAttrs[k]; });
    return el('button', attrs, [
      icon ? el('span', { class: 'btn-icon', 'aria-hidden': 'true', text: icon }) : null,
      el('span', { class: 'btn-label', text: label })
    ]);
  }

  /* ============================================================
   * 4.1 AVATARES COM FALLBACK DE EMOJI
   * ============================================================ */

  function characterEmoji(characterId) {
    if (characterId === 'amanda') return '👩‍🏫';
    if (characterId === 'carlos') return '👨‍🏫';
    return '🎓';
  }

  function characterAvatarEl(characterId) {
    var ch = getCharacter(characterId);
    var src = ch.svg || '';
    var fallbackEmoji = characterEmoji(characterId);

    if (!src) {
      return el('div', { class: 'character-avatar', 'aria-hidden': 'true' }, [
        el('span', {
          text: fallbackEmoji,
          style: 'font-size: 2.25rem; line-height: 1;'
        })
      ]);
    }

    var img = el('img', { src: src, alt: '', width: '64', height: '64' });
    img.addEventListener('error', function () {
      var parent = this.parentNode;
      if (!parent) return;
      clearNode(parent);
      parent.appendChild(el('span', {
        text: fallbackEmoji,
        style: 'font-size: 2.25rem; line-height: 1;'
      }));
    });

    return el('div', { class: 'character-avatar', 'aria-hidden': 'true' }, [img]);
  }

  /* ============================================================
   * 4.2 MEDALHA SVG TEMÁTICA
   * ------------------------------------------------------------
   * Gera um SVG de medalha com cores e ícone definidos pela trilha.
   * Inclui:
   *   • Fita/lacre na parte superior
   *   • Círculo externo com gradiente
   *   • Anel dourado intermediário
   *   • Círculo interno colorido
   *   • Ícone da conquista no centro
   *   • Estrelas decorativas (apenas desbloqueada)
   * Se `unlocked === false`, usa cinza e aplica filtro.
   * ============================================================ */

  function renderMedalSVG(achievement, unlocked) {
    var trail = getTrailTheme(achievement.trail);
    var uid = 'medal-' + achievement.id + '-' + Math.random().toString(36).slice(2, 8);
    var outer1 = unlocked ? trail.outer[0] : '#8a8a8a';
    var outer2 = unlocked ? trail.outer[1] : '#5a5a5a';
    var ring   = unlocked ? trail.ring : '#9a9a9a';
    var inner  = unlocked ? trail.inner : '#6a6a6a';
    var glyph  = unlocked ? trail.glyph : '#cccccc';

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 140');
    svg.setAttribute('width', '100');
    svg.setAttribute('height', '116');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', achievement.name + (unlocked ? ' — desbloqueada' : ' — bloqueada'));
    svg.classList.add('medal-svg');
    if (!unlocked) svg.classList.add('medal-svg--locked');

    var defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML =
      '<linearGradient id="' + uid + '-outer" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + outer1 + '"/>' +
        '<stop offset="100%" stop-color="' + outer2 + '"/>' +
      '</linearGradient>' +
      '<radialGradient id="' + uid + '-inner" cx="40%" cy="35%" r="70%">' +
        '<stop offset="0%" stop-color="' + inner + '" stop-opacity="0.95"/>' +
        '<stop offset="100%" stop-color="' + outer2 + '" stop-opacity="1"/>' +
      '</radialGradient>' +
      '<linearGradient id="' + uid + '-ribbon" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#b23a3a"/>' +
        '<stop offset="100%" stop-color="#7a1f1f"/>' +
      '</linearGradient>';
    svg.appendChild(defs);

    /* Fitas laterais (atrás da medalha) */
    var ribbon = document.createElementNS(svgNS, 'path');
    ribbon.setAttribute('d', 'M 42 8 L 30 42 L 42 38 L 52 44 L 55 10 Z');
    ribbon.setAttribute('fill', unlocked ? 'url(#' + uid + '-ribbon)' : '#4a4a4a');
    ribbon.setAttribute('stroke', unlocked ? '#5c1414' : '#2a2a2a');
    ribbon.setAttribute('stroke-width', '1');
    svg.appendChild(ribbon);

    var ribbon2 = document.createElementNS(svgNS, 'path');
    ribbon2.setAttribute('d', 'M 78 8 L 90 42 L 78 38 L 68 44 L 65 10 Z');
    ribbon2.setAttribute('fill', unlocked ? 'url(#' + uid + '-ribbon)' : '#4a4a4a');
    ribbon2.setAttribute('stroke', unlocked ? '#5c1414' : '#2a2a2a');
    ribbon2.setAttribute('stroke-width', '1');
    svg.appendChild(ribbon2);

    /* Anel externo (sombra) */
    var ringOuter = document.createElementNS(svgNS, 'circle');
    ringOuter.setAttribute('cx', '60');
    ringOuter.setAttribute('cy', '62');
    ringOuter.setAttribute('r', '46');
    ringOuter.setAttribute('fill', outer2);
    ringOuter.setAttribute('opacity', '0.4');
    svg.appendChild(ringOuter);

    /* Medalha circular externa */
    var medalOuter = document.createElementNS(svgNS, 'circle');
    medalOuter.setAttribute('cx', '60');
    medalOuter.setAttribute('cy', '60');
    medalOuter.setAttribute('r', '44');
    medalOuter.setAttribute('fill', 'url(#' + uid + '-outer)');
    medalOuter.setAttribute('stroke', outer2);
    medalOuter.setAttribute('stroke-width', '2');
    svg.appendChild(medalOuter);

    /* Anel dourado */
    var goldRing = document.createElementNS(svgNS, 'circle');
    goldRing.setAttribute('cx', '60');
    goldRing.setAttribute('cy', '60');
    goldRing.setAttribute('r', '37');
    goldRing.setAttribute('fill', 'none');
    goldRing.setAttribute('stroke', ring);
    goldRing.setAttribute('stroke-width', '2.5');
    goldRing.setAttribute('opacity', '0.9');
    svg.appendChild(goldRing);

    /* Círculo interno */
    var innerCircle = document.createElementNS(svgNS, 'circle');
    innerCircle.setAttribute('cx', '60');
    innerCircle.setAttribute('cy', '60');
    innerCircle.setAttribute('r', '34');
    innerCircle.setAttribute('fill', 'url(#' + uid + '-inner)');
    svg.appendChild(innerCircle);

    /* Texto/ícone no centro (como <text>) */
    var iconText = document.createElementNS(svgNS, 'text');
    iconText.setAttribute('x', '60');
    iconText.setAttribute('y', '60');
    iconText.setAttribute('text-anchor', 'middle');
    iconText.setAttribute('dominant-baseline', 'central');
    iconText.setAttribute('font-size', '34');
    iconText.setAttribute('font-family', 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif');
    iconText.setAttribute('fill', glyph);
    iconText.textContent = achievement.icon || '🏆';
    if (!unlocked) {
      iconText.setAttribute('opacity', '0.6');
    }
    svg.appendChild(iconText);

    /* Estrelas decorativas quando desbloqueada */
    if (unlocked) {
      var spark1 = document.createElementNS(svgNS, 'circle');
      spark1.setAttribute('cx', '30');
      spark1.setAttribute('cy', '30');
      spark1.setAttribute('r', '2.2');
      spark1.setAttribute('fill', '#fff');
      spark1.setAttribute('opacity', '0.85');
      svg.appendChild(spark1);

      var spark2 = document.createElementNS(svgNS, 'circle');
      spark2.setAttribute('cx', '88');
      spark2.setAttribute('cy', '38');
      spark2.setAttribute('r', '1.8');
      spark2.setAttribute('fill', '#fff');
      spark2.setAttribute('opacity', '0.7');
      svg.appendChild(spark2);

      var spark3 = document.createElementNS(svgNS, 'circle');
      spark3.setAttribute('cx', '86');
      spark3.setAttribute('cy', '90');
      spark3.setAttribute('r', '1.5');
      spark3.setAttribute('fill', '#fff');
      spark3.setAttribute('opacity', '0.55');
      svg.appendChild(spark3);
    } else {
      /* Cadeado centralizado sobre a medalha quando bloqueada */
      var lockText = document.createElementNS(svgNS, 'text');
      lockText.setAttribute('x', '60');
      lockText.setAttribute('y', '90');
      lockText.setAttribute('text-anchor', 'middle');
      lockText.setAttribute('font-size', '20');
      lockText.setAttribute('font-family', 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif');
      lockText.textContent = '🔒';
      svg.appendChild(lockText);
    }

    return svg;
  }

  /* ============================================================
   * 5. ACESSO AOS MÓDULOS
   * ============================================================ */

  function getGame()  { return window.Game  || null; }
  function getAudio() { return window.Audio || null; }
  function getA11y()  { return window.A11y  || null; }

  function getState() {
    var G = getGame();
    if (G && typeof G.getState === 'function') {
      try { return G.getState(); } catch (e) { /* fallback */ }
    }
    return {
      currentMissionId: 1, completedMissions: [], aura: 0, xp: 0, level: 1,
      achievements: [], bossCompleted: false, bossScore: 0, answers: {}
    };
  }

  function findMission(id) {
    if (!window.MISSIONS) return null;
    for (var i = 0; i < window.MISSIONS.length; i++) {
      if (window.MISSIONS[i].id === id) return window.MISSIONS[i];
    }
    return null;
  }

  function findAchievement(id) {
    if (!window.ACHIEVEMENTS) return null;
    for (var i = 0; i < window.ACHIEVEMENTS.length; i++) {
      if (window.ACHIEVEMENTS[i].id === id) return window.ACHIEVEMENTS[i];
    }
    return null;
  }

  function findCorrectIndex(mission) {
    if (!mission || !mission.options) return 0;
    for (var i = 0; i < mission.options.length; i++) {
      if (mission.options[i].correct) return i;
    }
    return 0;
  }

  function getLevelInfo(xp) {
    var info = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].min) info = LEVELS[i];
    }
    return info;
  }

  function getScoreLabel() {
    var T = getTheme();
    return (T.gamification && T.gamification.scoreName) || 'Progresso';
  }

  function getXpLabel() {
    var T = getTheme();
    return (T.gamification && T.gamification.xpName) || 'Experiência';
  }

  function getAttemptsCount(missionId) {
    var G = getGame();
    if (G && typeof G.getAttempts === 'function') {
      try { return G.getAttempts(missionId); } catch (e) { /* fallback */ }
    }
    return 0;
  }

  /* ============================================================
   * 6. HUD, ANÚNCIOS E TOASTS
   * ============================================================ */

  function applyThemeToHeader() {
    var T = getTheme();
    var brandTitle = qs('#brand-title');
    var brandSubtitle = qs('#brand-subtitle');
    var lblAura = qs('#hud-label-aura');
    var lblXp = qs('#hud-label-xp');
    var lblLevel = qs('#hud-label-level');
    if (brandTitle) brandTitle.textContent = T.meta.title;
    if (brandSubtitle) brandSubtitle.textContent = T.meta.subtitle;
    if (lblAura && T.gamification) lblAura.textContent = T.gamification.scoreName;
    if (lblXp && T.gamification) lblXp.textContent = T.gamification.xpName;
    if (lblLevel && T.gamification) lblLevel.textContent = T.gamification.levelName;
  }

  function updateHUD() {
    var state = getState();
    var auraEl = qs('#hud-aura');
    var xpEl = qs('#hud-xp');
    var levelEl = qs('#hud-level');
    var info = getLevelInfo(state.xp);
    if (auraEl) auraEl.textContent = String(state.aura);
    if (xpEl) xpEl.textContent = String(state.xp);
    if (levelEl) {
      levelEl.textContent = String(info.level);
      levelEl.setAttribute('title', info.label);
    }
  }

  function announce(text, priority) {
    if (!text) return;
    var region = qs(priority === 'assertive' ? '#alert-region' : '#live-region');
    if (!region) return;
    clearNode(region);
    window.setTimeout(function () { region.textContent = text; }, 60);
  }

  function showToast(text, type) {
    var region = qs('#toast-region');
    if (!region) return;
    var toast = el('div', { class: 'toast toast-' + (type || 'info'), role: 'status' }, [
      el('span', { class: 'toast-text', text: text })
    ]);
    region.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add('toast-out');
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3200);
  }

  /* ============================================================
   * 7. BADGE OVERLAY
   * ============================================================ */

  var badgeTimer = null;

  function showBadge(text, variant) {
    var isWrong = (variant === 'wrong');
    var imgSrc = isWrong ? 'assets/images/badge-wrong.svg' : 'assets/images/badge.svg';
    var sfxName = isWrong ? 'badgeWrong' : 'badge';
    var modifier = isWrong ? 'badge-overlay--wrong' : 'badge-overlay--correct';
    var fallbackEmoji = isWrong ? '❌' : '🏅';

    var existing = document.querySelector('.badge-overlay');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    if (badgeTimer) { window.clearTimeout(badgeTimer); badgeTimer = null; }

    var img = el('img', { class: 'badge-overlay-img', src: imgSrc, alt: '' });
    img.addEventListener('error', function () {
      var parent = this.parentNode;
      if (!parent) return;
      clearNode(parent);
      parent.appendChild(el('div', {
        class: 'badge-overlay-img',
        'aria-hidden': 'true',
        text: fallbackEmoji,
        style: 'font-size: clamp(120px, 30vw, 200px); line-height: 1; text-align: center;'
      }));
    });

    var overlay = el('div', {
      class: 'badge-overlay ' + modifier,
      'aria-hidden': 'true'
    }, [
      el('div', { class: 'badge-overlay-inner' }, [
        img,
        text ? el('p', { class: 'badge-overlay-text', text: text }) : null
      ])
    ]);

    document.body.appendChild(overlay);
    playSfx(sfxName);

    badgeTimer = window.setTimeout(function () {
      overlay.classList.add('badge-overlay-out');
      window.setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
      badgeTimer = null;
    }, 2500);
  }

  /* ============================================================
   * 8. FALA E ÁUDIO
   * ============================================================ */

  function speak(text, opts) {
    if (!text) return;
    var A = getAudio();
    if (A && typeof A.speak === 'function') {
      try { A.speak(text, opts); } catch (e) { /* silencioso */ }
    }
  }

  function stopSpeak() {
    var A = getAudio();
    if (A && typeof A.stopSpeak === 'function') {
      try { A.stopSpeak(); } catch (e) { /* silencioso */ }
    }
  }

  function playSfx(name) {
    var A = getAudio();
    if (A && typeof A.playSfx === 'function') {
      try { A.playSfx(name); } catch (e) { /* silencioso */ }
    }
  }

  function speakAfterSfx(sfxName, text, opts) {
    var A = getAudio();
    if (A && typeof A.speakAfterSfx === 'function') {
      try { A.speakAfterSfx(sfxName, text, opts); return; }
      catch (e) { /* fallback */ }
    }
    playSfx(sfxName);
    if (text) window.setTimeout(function () { speak(text, opts); }, 400);
  }

  function handleAchievementUnlock(achievementId) {
    if (!achievementId) return;
    var ach = findAchievement(achievementId);
    if (!ach) return;
    window.setTimeout(function () {
      showToast('🏆 Conquista: ' + ach.name, 'achievement');
      announce('Conquista desbloqueada: ' + ach.name, 'assertive');
      speakAfterSfx('achievement', 'Conquista desbloqueada: ' + ach.name);
    }, 500);
  }

  /* ============================================================
   * 9. MONTAGEM E FOCO
   * ============================================================ */

  function mountScreen(section) {
    if (!screenRoot) return;
    stopSpeak();
    clearNode(screenRoot);
    screenRoot.appendChild(section);
    focusScreen();
  }

  function focusScreen() {
    if (!screenRoot) return;
    var heading = qs('h1, h2', screenRoot);
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      try { heading.focus({ preventScroll: false }); }
      catch (e) { heading.focus(); }
    } else screenRoot.focus();
  }

  /* ============================================================
   * 10. NAVEGAÇÃO
   * ============================================================ */

  function navigate(screen) {
    ui.currentScreen = screen;
    switch (screen) {
      case SCREENS.HOME:         renderHome();         break;
      case SCREENS.HOWTO:        renderHowTo();        break;
      case SCREENS.MAP:          renderMap();          break;
      case SCREENS.CONTENTS:     renderContents();     break;
      case SCREENS.GLOSSARY:     renderGlossary();     break;
      case SCREENS.ACHIEVEMENTS: renderAchievements(); break;
      case SCREENS.ABOUT:        renderAbout();        break;
      case SCREENS.TRANSPARENCY: renderTransparency(); break;
      case SCREENS.FINAL:        renderFinal();        break;
      default: renderHome();
    }
  }

  /* ============================================================
   * 11. TELA: HOME
   * ============================================================ */

  function renderHome() {
    var T = getTheme();
    var state = getState();
    var hasProgress = state.completedMissions.length > 0 || state.aura > 0 || state.xp > 0;

    var mainActions = [];
    if (hasProgress) {
      mainActions.push(buttonEl('▶️', T.ui.btnContinueJourney, 'continue-journey', 'primary'));
    } else {
      mainActions.push(buttonEl('▶️', T.ui.btnStartJourney, 'start-journey', 'primary'));
    }
    mainActions.push(buttonEl('🎓', T.ui.btnHowTo, 'go-howto', 'secondary'));

    var navActions = [
      buttonEl('🗺️', 'Mapa da Jornada', 'go-map', 'secondary'),
      buttonEl('📖', 'Conteúdos', 'go-contents', 'secondary'),
      buttonEl('📚', 'Glossário', 'go-glossary', 'secondary'),
      buttonEl('🏆', 'Conquistas', 'go-achievements', 'secondary'),
      buttonEl('♿', 'Acessibilidade', 'open-a11y', 'secondary'),
      buttonEl('ℹ️', 'Sobre o LDI', 'go-about', 'secondary')
    ];

    var section = el('section', {
      class: 'screen screen-home',
      'data-screen': SCREENS.HOME,
      'aria-labelledby': 'home-title'
    }, [
      el('div', { class: 'home-hero' }, [
        el('p', { class: 'home-kicker', text: T.meta.kicker }),
        el('h1', { id: 'home-title', class: 'home-title', text: T.meta.title }),
        el('p', { class: 'home-subtitle', text: T.meta.subtitle }),
        el('p', { class: 'home-tagline', text: T.meta.tagline })
      ]),
      el('div', { class: 'home-intro' }, [el('p', { text: T.meta.intro })]),
      el('nav', { class: 'home-actions home-actions-primary', 'aria-label': 'Ações principais' }, mainActions),
      el('nav', { class: 'home-actions home-actions-secondary', 'aria-label': 'Explorar conteúdo' }, navActions)
    ]);

    mountScreen(section);
  }

  /* ============================================================
   * 12. TELA: COMO JOGAR
   * ============================================================ */

  function renderHowTo() {
    var T = getTheme();
    var howto = T.howTo || {};

    var stepCards = (howto.steps || []).map(function (step) {
      var cardChildren = [
        el('div', { class: 'howto-step-icon', 'aria-hidden': 'true', text: step.icon }),
        el('div', { class: 'howto-step-body' }, [
          el('h3', { class: 'howto-step-title', text: step.title }),
          el('p', { class: 'howto-step-text', text: step.text })
        ])
      ];

      if (step.action && step.action.url) {
        var linkAttrs = {
          href: step.action.url,
          class: 'btn btn-primary howto-step-link'
        };
        if (step.action.target) linkAttrs.target = step.action.target;
        if (step.action.target === '_blank') linkAttrs.rel = 'noopener noreferrer';
        if (step.action.type === 'download') linkAttrs.download = '';

        cardChildren.push(el('div', { class: 'howto-step-action' }, [
          el('a', linkAttrs, [el('span', { text: step.action.label })])
        ]));
      }

      return el('li', { class: 'howto-step' }, cardChildren);
    });

    var tipItems = (howto.tips || []).map(function (tip) {
      return el('li', { class: 'howto-tip', text: tip });
    });

    var children = [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'howto-title', text: T.screens.howtoTitle }),
        el('p', { class: 'screen-subtitle', text: T.screens.howtoSubtitle })
      ])
    ];

    if (howto.intro) {
      children.push(el('div', { class: 'howto-intro' }, [el('p', { text: howto.intro })]));
    }

    if (howto.whyItMatters) {
      children.push(el('div', { class: 'howto-why' }, [
        el('h2', { class: 'howto-why-title', text: '💡 Por que isso importa para você' }),
        el('p', { class: 'howto-why-text', text: howto.whyItMatters })
      ]));
    }

    children.push(el('ol', { class: 'howto-steps', 'aria-label': 'Passo a passo' }, stepCards));

    if (tipItems.length) {
      children.push(el('section', { class: 'howto-tips-section', 'aria-label': 'Dicas' }, [
        el('h2', { class: 'howto-tips-title', text: '💡 Dicas rápidas' }),
        el('ul', { class: 'howto-tips' }, tipItems)
      ]));
    }

    children.push(el('div', { class: 'screen-actions' }, [
      buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')
    ]));

    var section = el('section', {
      class: 'screen screen-howto',
      'data-screen': SCREENS.HOWTO,
      'aria-labelledby': 'howto-title'
    }, children);

    mountScreen(section);
  }

  /* ============================================================
   * 13. TELA: MAPA
   * ============================================================ */

  function getMissionStatus(id) {
    var state = getState();
    if (state.completedMissions.indexOf(id) !== -1) return 'completed';
    if (id === state.currentMissionId) return 'current';
    if (id < state.currentMissionId) return 'available';
    return 'locked';
  }

  function getBossStatus() {
    var state = getState();
    if (state.bossCompleted) return 'completed';
    var total = (window.MISSIONS || []).length;
    if (state.completedMissions.length >= total || state.currentMissionId > total) return 'available';
    return 'locked';
  }

  function renderMissionCard(mission, status) {
    var meta = getStatusMeta()[status] || getStatusMeta().locked;
    var trail = null;
    if (mission.trail && getTheme().trails && getTheme().trails[mission.trail]) {
      trail = getTheme().trails[mission.trail];
    }

    var inner = [
      el('div', { class: 'mission-card-icon', 'aria-hidden': 'true', text: mission.icon }),
      el('div', { class: 'mission-card-body' }, [
        el('p', { class: 'mission-card-number' }, [
          el('span', { text: 'Missão ' + mission.id }),
          trail ? el('span', { class: 'mission-card-trail', text: ' · ' + trail.icon + ' ' + trail.label }) : null
        ]),
        el('h2', { class: 'mission-card-title', text: mission.title }),
        el('p', { class: 'mission-card-category', text: mission.category }),
        el('p', { class: 'mission-card-status' }, [
          el('span', { 'aria-hidden': 'true', text: meta.icon + ' ' }),
          el('span', { text: meta.label })
        ])
      ])
    ];

    var card;
    if (meta.disabled) {
      card = el('div', { class: 'mission-card mission-card-' + status, 'aria-disabled': 'true' }, inner);
    } else {
      card = el('button', {
        type: 'button',
        class: 'mission-card mission-card-' + status,
        'data-action': 'open-mission',
        'data-mission-id': String(mission.id),
        'aria-label': 'Missão ' + mission.id + ': ' + mission.title + '. ' + meta.label
      }, inner);
    }

    return el('li', { class: 'mission-list-item' }, card);
  }

  function renderBossCard(status) {
    var meta = getStatusMeta()[status] || getStatusMeta().locked;
    var boss = window.BOSS || {};
    var inner = [
      el('div', { class: 'mission-card-icon', 'aria-hidden': 'true', text: boss.icon || '👑' }),
      el('div', { class: 'mission-card-body' }, [
        el('p', { class: 'mission-card-number', text: 'Desafio Final' }),
        el('h2', { class: 'mission-card-title', text: boss.title || 'Desafio Final' }),
        el('p', { class: 'mission-card-category', text: boss.category || '' }),
        el('p', { class: 'mission-card-status' }, [
          el('span', { 'aria-hidden': 'true', text: meta.icon + ' ' }),
          el('span', { text: meta.label })
        ])
      ])
    ];

    var card;
    if (meta.disabled) {
      card = el('div', { class: 'mission-card mission-card-boss mission-card-' + status, 'aria-disabled': 'true' }, inner);
    } else {
      card = el('button', {
        type: 'button',
        class: 'mission-card mission-card-boss mission-card-' + status,
        'data-action': 'open-boss',
        'aria-label': 'Desafio Final: ' + (boss.title || '') + '. ' + meta.label
      }, inner);
    }

    return el('li', { class: 'mission-list-item' }, card);
  }

  function renderMap() {
    var T = getTheme();
    var state = getState();
    var total = (window.MISSIONS || []).length;
    var completedCount = state.completedMissions.length;
    var progressPct = total > 0 ? Math.min(100, Math.round((completedCount / total) * 100)) : 0;

    var items = [];
    (window.MISSIONS || []).forEach(function (m) { items.push(renderMissionCard(m, getMissionStatus(m.id))); });
    items.push(renderBossCard(getBossStatus()));

    var section = el('section', {
      class: 'screen screen-map',
      'data-screen': SCREENS.MAP,
      'aria-labelledby': 'map-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'map-title', text: T.screens.mapTitle }),
        el('p', { class: 'screen-subtitle', text: T.screens.mapSubtitle })
      ]),
      el('div', {
        class: 'progress-bar',
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': String(total),
        'aria-valuenow': String(completedCount),
        'aria-label': 'Progresso: ' + completedCount + ' de ' + total
      }, [
        el('div', { class: 'progress-fill', style: 'width: ' + progressPct + '%' }),
        el('span', { class: 'progress-label', text: completedCount + '/' + total })
      ]),
      el('ol', { class: 'mission-list', 'aria-label': 'Missões' }, items),
      el('div', { class: 'screen-actions' }, [buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')])
    ]);

    mountScreen(section);
  }

  /* ============================================================
   * 14. TELA: MISSÃO
   * ============================================================ */

  function renderMission(id) {
    var mission = findMission(id);
    if (!mission) { renderNotFound('Missão não encontrada.'); return; }

    var state = getState();
    var alreadyCompleted = state.completedMissions.indexOf(id) !== -1;
    var prevAnswer = state.answers ? state.answers[id] : undefined;

    ui.mission.id = id;
    ui.mission.reward = null;
    ui.mission.revealed = false;
    ui.mission.autoRevealed = false;
    ui.mission.correctIndex = findCorrectIndex(mission);

    if (alreadyCompleted && typeof prevAnswer === 'number') {
      ui.mission.phase = PHASE.SUCCESS;
      ui.mission.selectedOption = prevAnswer;
      ui.mission.wasCorrect = true;
      renderMissionSuccess(mission, null, null, true);
    } else {
      ui.mission.phase = PHASE.INTRO;
      ui.mission.selectedOption = null;
      ui.mission.wasCorrect = false;
      renderMissionIntro(mission);
    }
  }

  function renderMissionHeader(mission, phaseLabel) {
    var trail = null;
    if (mission.trail && getTheme().trails && getTheme().trails[mission.trail]) {
      trail = getTheme().trails[mission.trail];
    }
    return el('header', { class: 'mission-header' }, [
      el('p', { class: 'mission-header-meta' }, [
        el('span', { class: 'mission-header-number', text: 'Missão ' + mission.id }),
        el('span', { class: 'mission-header-sep', text: ' • ', 'aria-hidden': 'true' }),
        trail ? el('span', { class: 'mission-header-trail', text: trail.icon + ' ' + trail.label }) : null,
        trail ? el('span', { class: 'mission-header-sep', text: ' • ', 'aria-hidden': 'true' }) : null,
        el('span', { class: 'mission-header-phase', text: phaseLabel })
      ]),
      el('h1', { class: 'mission-header-title' }, [
        el('span', { class: 'mission-header-icon', 'aria-hidden': 'true', text: mission.icon + ' ' }),
        el('span', { text: mission.title })
      ]),
      el('p', { class: 'mission-header-category', text: mission.category })
    ]);
  }

  function renderMissionIntro(mission) {
    var T = getTheme();
    var ch = getCharacter(mission.character);
    var section = el('section', {
      class: 'screen screen-mission screen-mission-intro',
      'data-screen': SCREENS.MISSION
    }, [
      renderMissionHeader(mission, 'Introdução'),
      el('div', { class: 'character-card' }, [
        characterAvatarEl(mission.character),
        el('div', { class: 'character-info' }, [
          el('p', { class: 'character-name', text: ch.name }),
          el('p', { class: 'character-line', text: mission.characterIntro })
        ])
      ]),
      el('div', { class: 'screen-actions' }, [
        buttonEl('▶️', T.ui.btnStartMission, 'mission-start', 'primary'),
        buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')
      ])
    ]);
    mountScreen(section);
    speak(mission.characterIntro);
  }

  function renderMissionQuestion(mission) {
    var T = getTheme();
    var optionEls = mission.options.map(function (opt, i) {
      return el('li', { class: 'option-item' }, [
        el('button', {
          type: 'button',
          class: 'option-btn',
          'data-action': 'mission-answer',
          'data-option-index': String(i)
        }, [
          el('span', { class: 'option-letter', 'aria-hidden': 'true', text: String.fromCharCode(65 + i) + '.' }),
          el('span', { class: 'option-text', text: opt.text })
        ])
      ]);
    });

    var section = el('section', {
      class: 'screen screen-mission screen-mission-question',
      'data-screen': SCREENS.MISSION
    }, [
      renderMissionHeader(mission, 'Desafio'),
      el('div', { class: 'question-card' }, [
        el('h2', { class: 'question-text', text: mission.question }),
        el('ul', { class: 'option-list', 'aria-label': 'Alternativas' }, optionEls)
      ]),
      el('div', { class: 'screen-actions' }, [buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')])
    ]);
    mountScreen(section);
    speak(mission.question);
  }

  function renderMissionWrongFeedback(mission) {
    var T = getTheme();
    var chosenIndex = ui.mission.selectedOption;
    var chosen = mission.options[chosenIndex];
    var attempts = getAttemptsCount(mission.id);
    var remaining = Math.max(0, MAX_WRONG_ATTEMPTS - attempts);
    var isLastAttempt = (remaining === 1);

    var voiceLine = 'Vamos revisar. ' + chosen.feedback +
      '. Você pode tentar novamente ou clicar em Ver resposta para conferir o gabarito.';

    showBadge('Vamos revisar.', 'wrong');
    speakAfterSfx('error', voiceLine);
    announce('Resposta incorreta. Você tem ' + remaining +
             (remaining === 1 ? ' tentativa' : ' tentativas') + ' antes da revelação automática.',
             'polite');

    var children = [
      renderMissionHeader(mission, 'Vamos revisar'),
      el('div', { class: 'feedback-card feedback-incorrect' }, [
        el('h2', { class: 'feedback-title', text: '❌ Essa escolha merece revisão' }),
        el('p', { class: 'feedback-text', text: chosen.feedback }),
        el('p', { class: 'feedback-attempts', text:
          isLastAttempt
            ? '⚠️ Última tentativa antes da revelação automática.'
            : '🔎 Ainda restam ' + remaining + ' tentativas antes da revelação automática.'
        })
      ]),
      el('div', { class: 'screen-actions screen-actions-stack' }, [
        buttonEl('🔁', 'Tentar novamente', 'mission-retry', 'primary'),
        buttonEl('💡', 'Ver resposta', 'mission-reveal', 'secondary'),
        buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')
      ])
    ];

    var section = el('section', {
      class: 'screen screen-mission screen-mission-wrong-feedback',
      'data-screen': SCREENS.MISSION
    }, children);
    mountScreen(section);
  }

  function renderMissionReveal(mission) {
    var T = getTheme();
    var correctIndex = ui.mission.correctIndex;
    var correctOpt = mission.options[correctIndex];
    var wasAutoRevealed = ui.mission.autoRevealed === true;

    var voiceLine = 'A resposta correta era: ' + correctOpt.text + '. . . ' + correctOpt.feedback;

    showBadge('Resposta revelada', 'correct');
    speakAfterSfx('complete', voiceLine);
    announce('Resposta correta revelada.', 'polite');

    var children = [
      renderMissionHeader(mission, 'Resposta revelada'),
      el('div', { class: 'feedback-card feedback-correct' }, [
        el('h2', { class: 'feedback-title', text: '💡 Resposta correta' }),
        el('p', { class: 'feedback-correct-text', text: correctOpt.text }),
        el('p', { class: 'feedback-text', text: correctOpt.feedback })
      ])
    ];

    if (wasAutoRevealed) {
      children.push(el('p', { class: 'feedback-note', text:
        'A revelação foi automática após ' + MAX_WRONG_ATTEMPTS +
        ' tentativas. A recompensa foi ajustada para o mínimo da missão.'
      }));
    }

    if (mission.applicationNote) {
      children.push(el('div', { class: 'application-note' }, [
        el('p', { class: 'application-note-title', text: '🔧 Aplicação prática' }),
        el('p', { class: 'application-note-text', text: mission.applicationNote })
      ]));
    }

    children.push(el('div', { class: 'screen-actions' }, [
      buttonEl('▶️', T.ui.btnContinue, 'mission-continue', 'primary'),
      buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')
    ]));

    var section = el('section', {
      class: 'screen screen-mission screen-mission-reveal',
      'data-screen': SCREENS.MISSION
    }, children);
    mountScreen(section);
  }

  function renderMissionSuccess(mission, reward, achievementName, isReview) {
    var T = getTheme();
    var correctIndex = ui.mission.correctIndex;
    var correctOpt = mission.options[correctIndex];

    var voiceLine = 'Boa escolha! ' + correctOpt.feedback;
    if (achievementName) voiceLine += ' . . . Conquista desbloqueada: ' + achievementName + '!';

    if (!isReview) {
      showBadge('Boa escolha!', 'correct');
      speakAfterSfx('success', voiceLine);
      announce('Resposta correta.', 'polite');
    } else {
      speak('Você já concluiu esta missão. ' + correctOpt.feedback);
    }

    var children = [
      renderMissionHeader(mission, isReview ? 'Revisão' : 'Boa escolha'),
      el('div', { class: 'feedback-card feedback-correct' }, [
        el('h2', { class: 'feedback-title', text: '✅ Boa escolha!' }),
        el('p', { class: 'feedback-correct-text', text: correctOpt.text }),
        el('p', { class: 'feedback-text', text: correctOpt.feedback })
      ])
    ];

    if (reward) {
      children.push(el('div', { class: 'reward-card' }, [
        el('p', { class: 'reward-title', text: '🏆 Recompensa' }),
        el('ul', { class: 'reward-list' }, [
          el('li', { text: '✨ +' + reward.aura + ' ' + getScoreLabel() }),
          el('li', { text: '⭐ +' + reward.xp + ' ' + getXpLabel() })
        ])
      ]));
    }

    if (mission.applicationNote) {
      children.push(el('div', { class: 'application-note' }, [
        el('p', { class: 'application-note-title', text: '🔧 Aplicação prática' }),
        el('p', { class: 'application-note-text', text: mission.applicationNote })
      ]));
    }

    children.push(el('div', { class: 'screen-actions' }, [
      buttonEl('▶️', T.ui.btnContinue, 'mission-continue', 'primary'),
      buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')
    ]));

    var section = el('section', {
      class: 'screen screen-mission screen-mission-success',
      'data-screen': SCREENS.MISSION
    }, children);
    mountScreen(section);

    if (achievementName && !isReview) {
      window.setTimeout(function () {
        showToast('🏆 Conquista: ' + achievementName, 'achievement');
        announce('Conquista desbloqueada: ' + achievementName, 'assertive');
        playSfx('achievement');
      }, 500);
    }
  }

  function selectMissionOption(index) {
    var mission = findMission(ui.mission.id);
    if (!mission) return;
    var option = mission.options[index];
    if (!option) return;

    stopSpeak();

    ui.mission.selectedOption = index;
    ui.mission.wasCorrect = !!option.correct;

    if (!option.correct) {
      var G = getGame();
      var attempts = 0;
      if (G && typeof G.completeMission === 'function') {
        try {
          G.completeMission(mission.id, index);
          attempts = getAttemptsCount(mission.id);
        } catch (e) { /* silencioso */ }
      }

      if (attempts >= MAX_WRONG_ATTEMPTS) {
        ui.mission.autoRevealed = true;
        revealAnswer(mission, true);
        return;
      }

      ui.mission.phase = PHASE.WRONG_FEEDBACK;
      renderMissionWrongFeedback(mission);
      return;
    }

    var achievementName = null;
    var reward = null;
    var G2 = getGame();
    if (G2 && typeof G2.completeMission === 'function') {
      try {
        var alreadyDone = (typeof G2.isMissionCompleted === 'function') &&
                          G2.isMissionCompleted(mission.id);
        if (!alreadyDone) {
          var result = G2.completeMission(mission.id, index);
          if (result && result.reward) reward = result.reward;
          if (result && result.achievement) {
            var ach = findAchievement(result.achievement);
            if (ach) achievementName = ach.name;
          }
        }
      } catch (e) { /* silencioso */ }
    }

    ui.mission.phase = PHASE.SUCCESS;
    updateHUD();
    renderMissionSuccess(mission, reward, achievementName, false);
  }

  function revealAnswer(mission, wasAutoRevealed) {
    if (!mission) return;

    var correctIndex = ui.mission.correctIndex;
    if (typeof correctIndex !== 'number') correctIndex = findCorrectIndex(mission);

    var G = getGame();
    if (G && typeof G.completeMission === 'function') {
      try {
        var alreadyDone = (typeof G.isMissionCompleted === 'function') &&
                          G.isMissionCompleted(mission.id);
        if (!alreadyDone) {
          G.completeMission(mission.id, correctIndex);
        }
      } catch (e) { /* silencioso */ }
    }

    ui.mission.selectedOption = correctIndex;
    ui.mission.wasCorrect = true;
    ui.mission.revealed = true;
    ui.mission.autoRevealed = !!wasAutoRevealed;
    ui.mission.phase = PHASE.REVEAL;

    updateHUD();
    renderMissionReveal(mission);
  }

  function retryMissionQuestion() {
    var mission = findMission(ui.mission.id);
    if (!mission) return;

    ui.mission.selectedOption = null;
    ui.mission.wasCorrect = false;
    ui.mission.phase = PHASE.QUESTION;

    stopSpeak();
    renderMissionQuestion(mission);
  }

  function continueAfterMission() {
    var T = getTheme();
    var state = getState();
    var total = (window.MISSIONS || []).length;
    if (state.completedMissions.length >= total && !state.bossCompleted) {
      showToast(T.ui.toastBossUnlocked, 'unlock');
      announce('Desafio Final desbloqueado. Volte ao mapa.', 'polite');
    }
    navigate(SCREENS.MAP);
  }

  /* ============================================================
   * 15. TELA: BOSS
   * ============================================================ */

  function renderBoss() {
    var boss = window.BOSS;
    if (!boss) { renderNotFound('Desafio Final não encontrado.'); return; }
    var state = getState();
    if (state.bossCompleted) { ui.boss.phase = PHASE.RESULT; renderFinal(); return; }
    ui.boss.phase = PHASE.INTRO;
    ui.boss.decisionIndex = 0;
    ui.boss.correctCount = 0;
    ui.boss.selectedOption = null;
    ui.boss.wasCorrect = false;
    renderBossIntro();
  }

  function renderBossIntro() {
    var T = getTheme();
    var boss = window.BOSS;
    var ch = getCharacter(boss.character);
    var section = el('section', {
      class: 'screen screen-boss screen-boss-intro',
      'data-screen': SCREENS.BOSS
    }, [
      el('header', { class: 'mission-header mission-header-boss' }, [
        el('p', { class: 'mission-header-meta' }, [
          el('span', { class: 'mission-header-number', text: 'Desafio Final' }),
          el('span', { class: 'mission-header-sep', text: ' • ', 'aria-hidden': 'true' }),
          el('span', { class: 'mission-header-phase', text: 'Introdução' })
        ]),
        el('h1', { class: 'mission-header-title' }, [
          el('span', { class: 'mission-header-icon', 'aria-hidden': 'true', text: (boss.icon || '👑') + ' ' }),
          el('span', { text: boss.title })
        ]),
        el('p', { class: 'mission-header-category', text: boss.category || '' })
      ]),
      el('div', { class: 'character-card' }, [
        characterAvatarEl(boss.character),
        el('div', { class: 'character-info' }, [
          el('p', { class: 'character-name', text: ch.name }),
          el('p', { class: 'character-line', text: boss.characterIntro })
        ])
      ]),
      boss.scenario ? el('div', { class: 'scenario-card' }, [
        el('p', { class: 'scenario-title', text: '📍 Cenário' }),
        el('p', { class: 'scenario-text', text: boss.scenario })
      ]) : null,
      el('div', { class: 'screen-actions' }, [
        buttonEl('👑', T.ui.btnFaceBoss, 'boss-start', 'primary'),
        buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'secondary')
      ])
    ]);
    mountScreen(section);
    speak(boss.characterIntro);
  }

  function renderBossDecision() {
    var boss = window.BOSS;
    var decision = boss.decisions[ui.boss.decisionIndex];
    if (!decision) { ui.boss.phase = PHASE.RESULT; renderBossResult(); return; }

    var optionEls = decision.options.map(function (opt, i) {
      return el('li', { class: 'option-item' }, [
        el('button', {
          type: 'button',
          class: 'option-btn',
          'data-action': 'boss-answer',
          'data-option-index': String(i)
        }, [
          el('span', { class: 'option-letter', 'aria-hidden': 'true', text: String.fromCharCode(65 + i) + '.' }),
          el('span', { class: 'option-text', text: opt.text })
        ])
      ]);
    });

    var totalDecisions = boss.decisions.length;
    var currentNum = ui.boss.decisionIndex + 1;

    var section = el('section', {
      class: 'screen screen-boss screen-boss-decision',
      'data-screen': SCREENS.BOSS
    }, [
      el('header', { class: 'mission-header mission-header-boss' }, [
        el('p', { class: 'mission-header-meta' }, [
          el('span', { class: 'mission-header-number', text: 'Decisão ' + currentNum + ' de ' + totalDecisions }),
          el('span', { class: 'mission-header-sep', text: ' • ', 'aria-hidden': 'true' }),
          el('span', { class: 'mission-header-phase', text: 'Desafio Final' })
        ]),
        el('h1', { class: 'mission-header-title' }, [
          el('span', { class: 'mission-header-icon', 'aria-hidden': 'true', text: '👑 ' }),
          el('span', { text: boss.title })
        ])
      ]),
      el('div', { class: 'question-card question-card-boss' }, [
        el('h2', { class: 'question-text', text: decision.prompt }),
        el('ul', { class: 'option-list', 'aria-label': 'Alternativas' }, optionEls)
      ])
    ]);
    mountScreen(section);
    speak(decision.prompt);
  }

  function renderBossFeedback(withSfx) {
    var boss = window.BOSS;
    var decision = boss.decisions[ui.boss.decisionIndex];
    if (!decision) return;

    var chosen = decision.options[ui.boss.selectedOption];
    var wasCorrect = ui.boss.wasCorrect;
    var feedbackTitle = wasCorrect ? '✅ Boa escolha!' : '❌ Essa escolha merece revisão';
    var feedbackClass = wasCorrect ? 'feedback-correct' : 'feedback-incorrect';

    var children = [
      el('header', { class: 'mission-header mission-header-boss' }, [
        el('p', { class: 'mission-header-meta' }, [
          el('span', { class: 'mission-header-number', text: 'Feedback' }),
          el('span', { class: 'mission-header-sep', text: ' • ', 'aria-hidden': 'true' }),
          el('span', { class: 'mission-header-phase', text: 'Desafio Final' })
        ]),
        el('h1', { class: 'mission-header-title' }, [
          el('span', { class: 'mission-header-icon', 'aria-hidden': 'true', text: '👑 ' }),
          el('span', { text: boss.title })
        ])
      ]),
      el('div', { class: 'feedback-card ' + feedbackClass }, [
        el('h2', { class: 'feedback-title', text: feedbackTitle }),
        el('p', { class: 'feedback-text', text: chosen.feedback })
      ]),
      el('div', { class: 'screen-actions' }, [buttonEl('▶️', 'Continuar', 'boss-continue', 'primary')])
    ];

    var section = el('section', {
      class: 'screen screen-boss screen-boss-feedback',
      'data-screen': SCREENS.BOSS
    }, children);
    mountScreen(section);

    var voiceLine = feedbackTitle + '. ' + chosen.feedback;
    var sfxName = wasCorrect ? 'success' : 'error';

    if (wasCorrect) showBadge('Boa escolha!', 'correct');
    else showBadge('Vamos revisar.', 'wrong');

    if (withSfx) speakAfterSfx(sfxName, voiceLine);
    else speak(voiceLine);
    announce(wasCorrect ? 'Decisão correta.' : 'Decisão incorreta.', 'polite');
  }

  function selectBossOption(index) {
    var boss = window.BOSS;
    var decision = boss.decisions[ui.boss.decisionIndex];
    if (!decision) return;
    var option = decision.options[index];
    if (!option) return;

    stopSpeak();

    ui.boss.selectedOption = index;
    ui.boss.wasCorrect = !!option.correct;
    if (option.correct) ui.boss.correctCount += 1;
    renderBossFeedback(true);
  }

  function continueAfterBossDecision() {
    ui.boss.decisionIndex += 1;
    ui.boss.selectedOption = null;
    ui.boss.wasCorrect = false;
    var boss = window.BOSS;
    if (ui.boss.decisionIndex >= boss.decisions.length) {
      ui.boss.phase = PHASE.RESULT;
      renderBossResult();
    } else {
      ui.boss.phase = PHASE.QUESTION;
      renderBossDecision();
    }
  }

  function renderBossResult() {
    var T = getTheme();
    var boss = window.BOSS;
    var G = getGame();
    var score = ui.boss.correctCount * (boss.scoring && boss.scoring.perCorrect || 25);

    var unlockedName = null;
    if (G && typeof G.setBossResult === 'function') {
      try {
        var res = G.setBossResult(score);
        if (res && res.achievement) {
          var ach = findAchievement(res.achievement);
          if (ach) unlockedName = ach.name;
        }
      } catch (e) { /* silencioso */ }
    }

    var total = boss.decisions.length;
    var correct = ui.boss.correctCount;
    var message;
    if (correct === total) message = 'Perfeito! Você tomou todas as decisões corretas.';
    else if (correct >= Math.ceil(total / 2)) message = 'Bom trabalho! A maioria das decisões foi acertada.';
    else message = 'Algumas decisões pedem revisão. Volte aos conteúdos quando quiser.';

    var voiceLine = 'Desafio Final concluído. ' + message;
    if (unlockedName) voiceLine += ' . . . Conquista desbloqueada: ' + unlockedName + '!';
    speakAfterSfx('complete', voiceLine);

    if (unlockedName) {
      window.setTimeout(function () {
        showToast('🏆 Conquista: ' + unlockedName, 'achievement');
        announce('Conquista desbloqueada: ' + unlockedName, 'assertive');
        playSfx('achievement');
      }, 800);
    }

    var state = getState();

    var section = el('section', {
      class: 'screen screen-final screen-boss-result',
      'data-screen': SCREENS.FINAL,
      'aria-labelledby': 'final-title'
    }, [
      el('header', { class: 'screen-header screen-header-final' }, [
        el('h1', { id: 'final-title', text: T.ui.finalTitle }),
        el('p', { class: 'screen-subtitle', text: boss.title })
      ]),
      el('div', { class: 'final-summary' }, [el('p', { class: 'final-message', text: message })]),
      el('div', { class: 'final-stats' }, [
        statCard('🎯', 'Acertos', correct + '/' + total),
        statCard('✨', getScoreLabel() + ' total', String(state.aura)),
        statCard('⭐', getXpLabel() + ' total', String(state.xp)),
        statCard('🏅', 'Nível', String(getLevelInfo(state.xp).level))
      ]),
      el('div', { class: 'screen-actions screen-actions-stack' }, [
        buttonEl('📖', 'Revisar conteúdos', 'go-contents', 'primary'),
        buttonEl('🏆', 'Ver conquistas', 'go-achievements', 'secondary'),
        buttonEl('🗺️', 'Voltar ao mapa', 'go-map', 'secondary'),
        buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')
      ])
    ]);
    mountScreen(section);
    updateHUD();
  }

  function statCard(icon, label, value) {
    return el('div', { class: 'stat-card' }, [
      el('span', { class: 'stat-icon', 'aria-hidden': 'true', text: icon }),
      el('span', { class: 'stat-label', text: label }),
      el('span', { class: 'stat-value', text: value })
    ]);
  }

  /* ============================================================
   * 16. TELA: CONTEÚDOS
   * ============================================================ */

  function renderContents() {
    var T = getTheme();
    var themes = window.CONTENT_THEMES || [];

    var cards = themes.map(function (theme) {
      var details = el('details', { class: 'content-card' }, [
        el('summary', { class: 'content-card-summary' }, [
          el('span', { class: 'content-card-icon', 'aria-hidden': 'true', text: theme.icon + ' ' }),
          el('span', { class: 'content-card-title', text: theme.title }),
          el('span', { class: 'content-card-pages', text: theme.pages || '' })
        ]),
        el('div', { class: 'content-card-body' }, [
          el('p', { class: 'content-card-summary-text', text: theme.summary }),
          theme.missionId ? el('p', { class: 'content-card-link' }, [
            el('button', {
              type: 'button',
              class: 'btn btn-link',
              'data-action': 'open-mission',
              'data-mission-id': String(theme.missionId)
            }, [
              el('span', { 'aria-hidden': 'true', text: '▶️ ' }),
              el('span', { text: 'Ir para a missão relacionada' })
            ])
          ]) : null
        ])
      ]);

      details.addEventListener('toggle', function () {
        if (!details.open) return;
        var G = getGame();
        if (!G || typeof G.markContentThemeOpened !== 'function') return;
        var result = G.markContentThemeOpened(theme.id);
        if (result && result.unlocked) handleAchievementUnlock('estudioso');
      });

      return el('li', { class: 'content-card-item' }, [details]);
    });

    var section = el('section', {
      class: 'screen screen-contents',
      'data-screen': SCREENS.CONTENTS,
      'aria-labelledby': 'contents-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'contents-title', text: T.screens.contentsTitle }),
        el('p', { class: 'screen-subtitle', text: T.screens.contentsSubtitle })
      ]),
      el('ul', { class: 'content-list' }, cards),
      el('div', { class: 'screen-actions' }, [buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 17. TELA: GLOSSÁRIO
   * ============================================================ */

  function renderGlossary() {
    var T = getTheme();
    var glossary = window.GLOSSARY || [];

    var cards = glossary.map(function (item) {
      var details = el('details', { class: 'glossary-card' }, [
        el('summary', { class: 'glossary-summary' }, [
          el('span', { class: 'glossary-term', text: item.term })
        ]),
        el('div', { class: 'glossary-body' }, [
          el('p', { class: 'glossary-definition', text: item.definition })
        ])
      ]);

      details.addEventListener('toggle', function () {
        if (!details.open) return;
        var G = getGame();
        if (!G || typeof G.markGlossaryTermOpened !== 'function') return;
        var result = G.markGlossaryTermOpened(item.term);
        if (result && result.unlocked) handleAchievementUnlock('curioso');
      });

      return el('li', { class: 'glossary-item' }, [details]);
    });

    var section = el('section', {
      class: 'screen screen-glossary',
      'data-screen': SCREENS.GLOSSARY,
      'aria-labelledby': 'glossary-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'glossary-title', text: T.screens.glossaryTitle }),
        el('p', { class: 'screen-subtitle', text: T.screens.glossarySubtitle })
      ]),
      el('ul', { class: 'glossary-list' }, cards),
      el('div', { class: 'screen-actions' }, [buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 18. TELA: CONQUISTAS — com medalhas temáticas
   * ============================================================ */

  function renderAchievementCard(ach, unlocked) {
    var trail = getTrailTheme(ach.trail);

    /* Container */
    var card = el('li', {
      class: 'achievement-card ' +
        (unlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'),
      'data-trail': ach.trail || 'global'
    });

    /* Medalha SVG */
    var medalWrap = el('div', { class: 'achievement-medal' }, [
      renderMedalSVG(ach, unlocked)
    ]);

    /* Corpo */
    var body = el('div', { class: 'achievement-body' }, [
      el('h2', { class: 'achievement-name', text: ach.name }),
      el('p', { class: 'achievement-description', text: ach.description }),
      el('p', { class: 'achievement-trail' }, [
        el('span', { 'aria-hidden': 'true', text: trail.icon + ' ' }),
        el('span', { text: trail.label })
      ]),
      el('p', { class: 'achievement-status' }, [
        el('span', { 'aria-hidden': 'true', text: unlocked ? '✅ ' : '🔒 ' }),
        el('span', { text: unlocked ? 'Desbloqueada' : 'Bloqueada' })
      ])
    ]);

    card.appendChild(medalWrap);
    card.appendChild(body);
    return card;
  }

  function renderAchievements() {
    var T = getTheme();
    var state = getState();
    var all = window.ACHIEVEMENTS || [];

    /* Ordena: primeiro as desbloqueadas, depois por trilha */
    var unlockedList = [];
    var lockedList = [];
    all.forEach(function (ach) {
      if (state.achievements.indexOf(ach.id) !== -1) unlockedList.push(ach);
      else lockedList.push(ach);
    });

    var cards = [];
    unlockedList.forEach(function (ach) { cards.push(renderAchievementCard(ach, true)); });
    lockedList.forEach(function (ach) { cards.push(renderAchievementCard(ach, false)); });

    var total = all.length;
    var unlockedCount = unlockedList.length;
    var progressPct = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;

    var section = el('section', {
      class: 'screen screen-achievements',
      'data-screen': SCREENS.ACHIEVEMENTS,
      'aria-labelledby': 'achievements-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'achievements-title', text: T.screens.achievementsTitle }),
        el('p', { class: 'screen-subtitle',
          text: unlockedCount + ' de ' + total + ' desbloqueadas'
        })
      ]),

      /* Barra de progresso específica das conquistas */
      el('div', {
        class: 'achievements-progress',
        role: 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': String(total),
        'aria-valuenow': String(unlockedCount),
        'aria-label': 'Progresso das conquistas: ' + unlockedCount + ' de ' + total
      }, [
        el('div', { class: 'achievements-progress-fill',
          style: 'width: ' + progressPct + '%' }),
        el('span', { class: 'achievements-progress-label',
          text: unlockedCount + '/' + total })
      ]),

      el('ul', { class: 'achievements-list' }, cards),
      el('div', { class: 'screen-actions' }, [buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 19. TELA: SOBRE
   * ============================================================ */

  function renderAbout() {
    var T = getTheme();
    var items = T.texts.aboutItems || [];

    var dlChildren = [];
    items.forEach(function (it) {
      dlChildren.push(el('div', { class: 'about-item' }, [
        el('dt', { class: 'about-term', text: it.term }),
        el('dd', { class: 'about-def', text: it.def })
      ]));
    });

    var section = el('section', {
      class: 'screen screen-about',
      'data-screen': SCREENS.ABOUT,
      'aria-labelledby': 'about-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'about-title', text: T.screens.aboutTitle }),
        el('p', { class: 'screen-subtitle', text: T.screens.aboutSubtitle })
      ]),
      el('dl', { class: 'about-list' }, dlChildren),
      el('div', { class: 'screen-actions screen-actions-stack' }, [
        buttonEl('🧠', 'Transparência sobre IA', 'go-transparency', 'secondary'),
        buttonEl('🔁', T.ui.btnReset, 'reset-journey', 'danger'),
        buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')
      ])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 20. TELA: TRANSPARÊNCIA
   * ============================================================ */

  function renderTransparency() {
    var T = getTheme();
    var paragraphs = (T.texts.transparency || []).map(function (p) {
      return el('p', { text: p });
    });

    var section = el('section', {
      class: 'screen screen-transparency',
      'data-screen': SCREENS.TRANSPARENCY,
      'aria-labelledby': 'transparency-title'
    }, [
      el('header', { class: 'screen-header' }, [
        el('h1', { id: 'transparency-title', text: T.screens.transparencyTitle })
      ]),
      el('div', { class: 'transparency-body' }, paragraphs),
      el('div', { class: 'screen-actions' }, [buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 21. TELA: FINAL
   * ============================================================ */

  function renderFinal() {
    var state = getState();
    if (!state.bossCompleted) { navigate(SCREENS.MAP); return; }
    if (window.BOSS) {
      ui.boss.correctCount = state.bossScore && window.BOSS.scoring
        ? Math.round(state.bossScore / window.BOSS.scoring.perCorrect)
        : 0;
      renderBossResult();
    } else navigate(SCREENS.MAP);
  }

  /* ============================================================
   * 22. NÃO ENCONTRADO
   * ============================================================ */

  function renderNotFound(message) {
    var T = getTheme();
    var section = el('section', {
      class: 'screen screen-error',
      'data-screen': 'error',
      role: 'alert'
    }, [
      el('h1', { text: 'Ops…' }),
      el('p', { text: message || 'Conteúdo não encontrado.' }),
      el('div', { class: 'screen-actions' }, [
        buttonEl('🗺️', T.ui.btnBackToMap, 'go-map', 'primary'),
        buttonEl('🏠', T.ui.btnHome, 'go-home', 'secondary')
      ])
    ]);
    mountScreen(section);
  }

  /* ============================================================
   * 23. AÇÕES DE JORNADA
   * ============================================================ */

  function startJourney() {
    var G = getGame();
    if (G && typeof G.reset === 'function') {
      try { G.reset(); } catch (e) { /* silencioso */ }
    }
    updateHUD();
    navigate(SCREENS.MAP);
  }

  function continueJourney() {
    var state = getState();
    var total = (window.MISSIONS || []).length;
    if (state.bossCompleted) { navigate(SCREENS.FINAL); return; }
    if (state.completedMissions.length >= total || state.currentMissionId > total) { renderBoss(); return; }
    var nextId = state.currentMissionId;
    if (nextId && nextId >= 1 && nextId <= total) renderMission(nextId);
    else navigate(SCREENS.MAP);
  }

  function resetJourney() {
    var T = getTheme();
    var confirmed = window.confirm(T.ui.resetConfirm);
    if (!confirmed) return;
    var G = getGame();
    if (G && typeof G.reset === 'function') {
      try { G.reset(); } catch (e) { /* silencioso */ }
    }
    updateHUD();
    showToast(T.ui.toastReset, 'info');
    announce('Jornada reiniciada.', 'polite');
    navigate(SCREENS.HOME);
  }

  /* ============================================================
   * 24. PAINEL DE ACESSIBILIDADE
   * ============================================================ */

  function openA11yPanel() {
    var Acc = getA11y();
    if (Acc && typeof Acc.openPanel === 'function') {
      try { Acc.openPanel(); return; } catch (e) { /* fallback manual */ }
    }
    var panel = qs('#a11y-panel');
    var backdrop = qs('#a11y-backdrop');
    var opener = qs('#btn-open-a11y');
    if (!panel || !backdrop) return;

    ui.a11yReturnFocus = opener;
    backdrop.hidden = false;
    panel.hidden = false;
    if (opener) opener.setAttribute('aria-expanded', 'true');

    var first = panel.querySelector('button, [href], input, select, textarea');
    if (first) window.setTimeout(function () { try { first.focus(); } catch (e) {} }, 30);

    document.addEventListener('keydown', handleA11yKeydown);
    backdrop.addEventListener('click', closeA11yPanel);
  }

  function closeA11yPanel() {
    var Acc = getA11y();
    if (Acc && typeof Acc.closePanel === 'function') {
      try { Acc.closePanel(); return; } catch (e) { /* fallback manual */ }
    }
    var panel = qs('#a11y-panel');
    var backdrop = qs('#a11y-backdrop');
    var opener = qs('#btn-open-a11y');
    if (!panel || !backdrop) return;

    panel.hidden = true;
    backdrop.hidden = true;
    if (opener) opener.setAttribute('aria-expanded', 'false');

    document.removeEventListener('keydown', handleA11yKeydown);
    backdrop.removeEventListener('click', closeA11yPanel);

    if (ui.a11yReturnFocus && typeof ui.a11yReturnFocus.focus === 'function') {
      try { ui.a11yReturnFocus.focus(); } catch (e) { /* silencioso */ }
    }
    ui.a11yReturnFocus = null;
  }

  function handleA11yKeydown(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeA11yPanel(); return; }
    if (e.key === 'Tab') trapFocus(e);
  }

  function trapFocus(e) {
    var panel = qs('#a11y-panel');
    if (!panel) return;
    var focusables = qsa(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      panel
    ).filter(function (n) { return !n.disabled && n.offsetParent !== null; });
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ============================================================
   * 25. DELEGAÇÃO DE EVENTOS
   * ============================================================ */

  function bindEvents() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-action]');
      if (!trigger) return;
      var action = trigger.getAttribute('data-action');
      if (!action) return;
      e.preventDefault();
      handleAction(action, trigger);
    });

    var btnOpen = qs('#btn-open-a11y');
    if (btnOpen) {
      btnOpen.addEventListener('click', function (e) { e.preventDefault(); openA11yPanel(); });
    }

    var btnClose = qs('#btn-close-a11y');
    if (btnClose) {
      btnClose.addEventListener('click', function (e) { e.preventDefault(); closeA11yPanel(); });
    }
  }

  function handleAction(action, target) {
    switch (action) {
      case 'go-home':         navigate(SCREENS.HOME); break;
      case 'go-howto':        navigate(SCREENS.HOWTO); break;
      case 'go-map':          navigate(SCREENS.MAP); break;
      case 'go-contents':     navigate(SCREENS.CONTENTS); break;
      case 'go-glossary':     navigate(SCREENS.GLOSSARY); break;
      case 'go-achievements': navigate(SCREENS.ACHIEVEMENTS); break;
      case 'go-about':        navigate(SCREENS.ABOUT); break;
      case 'go-transparency': navigate(SCREENS.TRANSPARENCY); break;
      case 'open-a11y':       openA11yPanel(); break;
      case 'start-journey':   startJourney(); break;
      case 'continue-journey': continueJourney(); break;
      case 'reset-journey':   resetJourney(); break;

      case 'open-mission': {
        var id = parseInt(target.getAttribute('data-mission-id'), 10);
        if (!isNaN(id)) renderMission(id);
        break;
      }
      case 'mission-start': {
        stopSpeak();
        ui.mission.phase = PHASE.QUESTION;
        var m = findMission(ui.mission.id);
        if (m) renderMissionQuestion(m);
        break;
      }
      case 'mission-answer': {
        var idx = parseInt(target.getAttribute('data-option-index'), 10);
        if (!isNaN(idx)) selectMissionOption(idx);
        break;
      }
      case 'mission-retry': {
        retryMissionQuestion();
        break;
      }
      case 'mission-reveal': {
        var m2 = findMission(ui.mission.id);
        if (m2) revealAnswer(m2, false);
        break;
      }
      case 'mission-continue': continueAfterMission(); break;
      case 'open-boss': renderBoss(); break;
      case 'boss-start': {
        stopSpeak();
        ui.boss.phase = PHASE.QUESTION;
        ui.boss.decisionIndex = 0;
        ui.boss.correctCount = 0;
        renderBossDecision();
        break;
      }
      case 'boss-answer': {
        var bIdx = parseInt(target.getAttribute('data-option-index'), 10);
        if (!isNaN(bIdx)) selectBossOption(bIdx);
        break;
      }
      case 'boss-continue': continueAfterBossDecision(); break;
      default: break;
    }
  }

  /* ============================================================
   * 26. INICIALIZAÇÃO
   * ============================================================ */

  function init() {
    screenRoot = qs('#screen-root');
    if (!screenRoot) return;

    applyThemeToHeader();

    var G = getGame();
    if (G && typeof G.init === 'function') {
      try { G.init(); } catch (e) { /* silencioso */ }
    }
    var A = getAudio();
    if (A && typeof A.init === 'function') {
      try { A.init(); } catch (e) { /* silencioso */ }
    }
    var Acc = getA11y();
    if (Acc && typeof Acc.init === 'function') {
      try { Acc.init(); } catch (e) { /* silencioso */ }
    }

    bindEvents();
    updateHUD();
    navigate(SCREENS.HOME);
  }

  /* ============================================================
   * 27. API PÚBLICA
   * ============================================================ */

  window.App = {
    init: init,
    navigate: navigate,
    updateHUD: updateHUD,
    announce: announce,
    showToast: showToast,
    showBadge: showBadge,
    screens: SCREENS,
    getTheme: getTheme
  };

  /* ============================================================
   * 28. AUTO-INICIALIZAÇÃO
   * ============================================================ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else init();

})();