/**
 * game.js — Formação de Professores Autores e Formadores para EaD
 *
 * Estado do jogo, progressão de missões, recompensa decrescente,
 * cálculo de nível, conquistas, persistência em localStorage e
 * sistema de eventos para a camada de apresentação (app.js).
 *
 * Depende de:
 *   theme.js    → window.THEME
 *   missions.js → window.MISSIONS, window.ACHIEVEMENTS, window.CONTENT_THEMES
 *
 * Este arquivo NÃO toca no DOM. Ele expõe window.Game com a API
 * pública do motor de estado, exatamente como o app.js espera.
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 * Apoio: Inteligência Artificial generativa (ferramenta de apoio)
 */

window.Game = (function () {
  'use strict';

  /* ============================================================
   * 1. CONSTANTES
   * ============================================================ */

  var STORAGE_KEY = 'ufu-ead-ldi:state';
  var VERSION = '1.0.0';

  /* Recompensa decrescente — multiplicador por número de erros.
     Referência do Prompt-Mestre v4.0:
       0 erros → 100%    (10 aura / 1000 XP)
       1 erro  →  70%    ( 7 aura /  700 XP)
       2 erros →  50%    ( 5 aura /  500 XP)
       3+ erros → 30%    ( 3 aura /  300 XP) */
  var REWARD_MULTIPLIERS = [1, 0.7, 0.5, 0.3];

  /* Níveis por XP acumulado — mesmos limiares usados pelo app.js */
  var LEVELS = [
    { level: 1, min: 0,     label: 'Iniciante' },
    { level: 2, min: 1000,  label: 'Aprendiz' },
    { level: 3, min: 2500,  label: 'Praticante' },
    { level: 4, min: 4500,  label: 'Docente Reflexivo' },
    { level: 5, min: 7000,  label: 'Docente Experiente' },
    { level: 6, min: 10000, label: 'Praticante Sênior' }
  ];

  /* IDs de conquistas automáticas usados pelo app.js */
  var ACH_CONTENT_THEMES = 'estudioso';
  var ACH_GLOSSARY       = 'curioso';

  /* Limiares para desbloqueio automático */
  var CONTENT_THEMES_THRESHOLD = 3;
  var GLOSSARY_TERMS_THRESHOLD = 5;

  /* ============================================================
   * 2. ESTADO
   * ============================================================ */

  var state = null;
  var listeners = {};

  /* ============================================================
   * 3. HELPERS
   * ============================================================ */

  function defaultState() {
    return {
      version: VERSION,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentMissionId: 1,
      completedMissions: [],
      aura: 0,
      xp: 0,
      level: 1,
      achievements: [],
      bossCompleted: false,
      bossScore: 0,
      answers: {},
      missionAttempts: {},
      openedContentThemes: [],
      openedGlossaryTerms: []
    };
  }

  function cloneState(s) {
    /* Cópia rasa cuidadosa: duplica arrays e objetos de 1º nível */
    var copy = {};
    for (var k in s) {
      if (!s.hasOwnProperty(k)) continue;
      var v = s[k];
      if (Array.isArray(v)) {
        copy[k] = v.slice();
      } else if (v && typeof v === 'object') {
        var objCopy = {};
        for (var kk in v) {
          if (v.hasOwnProperty(kk)) objCopy[kk] = v[kk];
        }
        copy[k] = objCopy;
      } else {
        copy[k] = v;
      }
    }
    return copy;
  }

  function ensureShape(s) {
    /* Garante que todos os campos existam, mesmo após upgrade */
    var d = defaultState();
    for (var k in d) {
      if (!d.hasOwnProperty(k)) continue;
      if (s[k] === undefined) s[k] = d[k];
    }
    /* Sanitizações específicas */
    if (!Array.isArray(s.completedMissions)) s.completedMissions = [];
    if (!Array.isArray(s.achievements)) s.achievements = [];
    if (!Array.isArray(s.openedContentThemes)) s.openedContentThemes = [];
    if (!Array.isArray(s.openedGlossaryTerms)) s.openedGlossaryTerms = [];
    if (typeof s.answers !== 'object' || s.answers === null || Array.isArray(s.answers)) {
      s.answers = {};
    }
    if (typeof s.missionAttempts !== 'object' || s.missionAttempts === null || Array.isArray(s.missionAttempts)) {
      s.missionAttempts = {};
    }
    if (typeof s.bossCompleted !== 'boolean') s.bossCompleted = !!s.bossCompleted;
    if (typeof s.bossScore !== 'number' || isNaN(s.bossScore)) s.bossScore = 0;
    if (typeof s.aura !== 'number' || isNaN(s.aura)) s.aura = 0;
    if (typeof s.xp !== 'number' || isNaN(s.xp)) s.xp = 0;
    return s;
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return defaultState();
      return ensureShape(parsed);
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      /* Storage cheio ou bloqueado — falha silenciosa */
      return false;
    }
  }

  /* ============================================================
   * 4. EVENTOS
   * ============================================================ */

  function on(event, handler) {
    if (typeof handler !== 'function') return;
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(handler);
  }

  function off(event, handler) {
    if (!listeners[event]) return;
    var idx = listeners[event].indexOf(handler);
    if (idx !== -1) listeners[event].splice(idx, 1);
  }

  function notify(event, data) {
    if (!listeners[event]) return;
    for (var i = 0; i < listeners[event].length; i++) {
      try {
        listeners[event][i](data, getState());
      } catch (e) {
        /* Silencioso para não quebrar o fluxo */
        if (window.console && window.console.warn) {
          window.console.warn('[game.js] listener de "' + event + '" falhou:', e);
        }
      }
    }
  }

  /* ============================================================
   * 5. UTILITÁRIOS DE MISSÃO
   * ============================================================ */

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

  function arrayContains(arr, value) {
    return arr.indexOf(value) !== -1;
  }

  function arrayPushUnique(arr, value) {
    if (!arrayContains(arr, value)) {
      arr.push(value);
      return true;
    }
    return false;
  }

  function calculateLevel(xp) {
    var info = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].min) info = LEVELS[i];
    }
    return info.level;
  }

  function getLevelInfo(xp) {
    var info = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].min) info = LEVELS[i];
    }
    return info;
  }

  /* ============================================================
   * 6. CÁLCULO DA RECOMPENSA DECRESCENTE
   * ============================================================ */

  function getAttempts(missionId) {
    var v = state.missionAttempts[missionId];
    return typeof v === 'number' ? v : 0;
  }

  function registerWrongAttempt(missionId) {
    var current = getAttempts(missionId);
    state.missionAttempts[missionId] = current + 1;
    return state.missionAttempts[missionId];
  }

  function clearAttempts(missionId) {
    delete state.missionAttempts[missionId];
  }

  function calculateReward(mission, wrongAttempts) {
    var baseAura = (mission && mission.reward && mission.reward.aura) || 10;
    var baseXp   = (mission && mission.reward && mission.reward.xp)   || 1000;
    var idx = Math.min(wrongAttempts, REWARD_MULTIPLIERS.length - 1);
    var multiplier = REWARD_MULTIPLIERS[idx];
    return {
      aura: Math.round(baseAura * multiplier),
      xp:   Math.round(baseXp   * multiplier)
    };
  }

  /* ============================================================
   * 7. MISSÕES — Progressão
   * ============================================================ */

  function isMissionCompleted(missionId) {
    return arrayContains(state.completedMissions, missionId);
  }

  function isMissionUnlocked(missionId) {
    if (missionId === 1) return true;
    /* Considera desbloqueada se a anterior foi concluída */
    return isMissionCompleted(missionId - 1);
  }

  function getCurrentMissionId() {
    if (!window.MISSIONS) return 1;
    for (var i = 0; i < window.MISSIONS.length; i++) {
      var m = window.MISSIONS[i];
      if (!isMissionCompleted(m.id) && isMissionUnlocked(m.id)) {
        return m.id;
      }
    }
    /* Todas concluídas — retorna o id seguinte ao último */
    return window.MISSIONS.length + 1;
  }

  /* ----------------------------------------------------------
   * completeMission
   * ----------------------------------------------------------
   * Chamado pelo app.js quando o usuário clica em uma alternativa.
   *
   * Retorna:
   *   { reward: { aura, xp } | null, achievement: 'id' | null }
   *
   * - Se a alternativa for CORRETA: concede recompensa baseada
   *   nas tentativas erradas anteriores, registra conclusão,
   *   desbloqueia a conquista da missão.
   * - Se ERRADA: apenas registra o incremento de tentativa;
   *   devolve reward=null e achievement=null.
   * ---------------------------------------------------------- */

  function completeMission(missionId, optionIndex) {
    var mission = findMission(missionId);
    if (!mission) return { reward: null, achievement: null };

    if (typeof optionIndex !== 'number' || optionIndex < 0 ||
        optionIndex >= mission.options.length) {
      return { reward: null, achievement: null };
    }

    var option = mission.options[optionIndex];
    var isCorrect = !!option.correct;

    if (!isCorrect) {
      /* Regista o erro — só para controlar a recompensa decrescente */
      registerWrongAttempt(missionId);
      saveState();
      notify('mission:wrong', {
        missionId: missionId,
        optionIndex: optionIndex,
        attempts: getAttempts(missionId)
      });
      return { reward: null, achievement: null };
    }

    /* ----- Resposta correta ----- */

    var wrongAttempts = getAttempts(missionId);
    var reward = calculateReward(mission, wrongAttempts);

    /* Atualiza estado */
    arrayPushUnique(state.completedMissions, missionId);
    state.aura += reward.aura;
    state.xp += reward.xp;
    state.level = calculateLevel(state.xp);
    state.answers[missionId] = optionIndex;

    /* Avança o cursor da jornada */
    var nextId = missionId + 1;
    if (state.currentMissionId < nextId) {
      state.currentMissionId = nextId;
    }

    /* Limpa as tentativas — a missão foi concluída */
    clearAttempts(missionId);

    /* Desbloqueia a conquista associada à missão */
    var unlockedAchievement = null;
    if (mission.achievement && arrayPushUnique(state.achievements, mission.achievement)) {
      unlockedAchievement = mission.achievement;
    }

    /* Verifica desbloqueio automático do Boss */
    var totalMissions = (window.MISSIONS || []).length;
    if (state.completedMissions.length >= totalMissions) {
      /* Sinaliza que o Boss está disponível (não precisa gravar flag) */
      notify('boss:unlocked', {
        message: 'Desafio Final desbloqueado.'
      });
    }

    saveState();

    notify('mission:completed', {
      missionId: missionId,
      optionIndex: optionIndex,
      reward: reward,
      achievement: unlockedAchievement,
      wrongAttempts: wrongAttempts
    });

    return {
      reward: reward,
      achievement: unlockedAchievement
    };
  }

  /* ============================================================
   * 8. BOSS FINAL
   * ============================================================ */

  function isBossUnlocked() {
    if (!window.MISSIONS) return false;
    return state.completedMissions.length >= window.MISSIONS.length;
  }

  function isBossCompleted() {
    return !!state.bossCompleted;
  }

  /* ----------------------------------------------------------
   * setBossResult
   * ----------------------------------------------------------
   * Registra a conclusão do Boss com a pontuação calculada pelo app.js.
   * Retorna { achievement: 'id' | null }.
   * ---------------------------------------------------------- */

  function setBossResult(score) {
    var prevCompleted = !!state.bossCompleted;
    state.bossCompleted = true;
    state.bossScore = typeof score === 'number' && !isNaN(score) ? score : 0;

    /* Concede recompensa de XP/aura se for a primeira conclusão */
    var reward = null;
    if (!prevCompleted && window.BOSS && window.BOSS.reward) {
      reward = {
        aura: window.BOSS.reward.aura || 50,
        xp:   window.BOSS.reward.xp   || 5000
      };
      state.aura += reward.aura;
      state.xp += reward.xp;
      state.level = calculateLevel(state.xp);
    }

    /* Desbloqueia conquista do Boss */
    var unlockedAchievement = null;
    var bossAchId = (window.BOSS && window.BOSS.achievement) || 'boss-final';
    if (arrayPushUnique(state.achievements, bossAchId)) {
      unlockedAchievement = bossAchId;
    }

    saveState();

    notify('boss:completed', {
      score: state.bossScore,
      reward: reward,
      achievement: unlockedAchievement
    });

    return {
      achievement: unlockedAchievement,
      reward: reward
    };
  }

  /* ============================================================
   * 9. GLOSSÁRIO E CONTEÚDOS
   * ============================================================ */

  /* ----------------------------------------------------------
   * markContentThemeOpened
   * ----------------------------------------------------------
   * Chamado quando o usuário abre um cartão de tema de conteúdo.
   * Retorna { unlocked: bool } — true se uma nova conquista foi
   * desbloqueada neste ato (apenas `estudioso`).
   * ---------------------------------------------------------- */

  function markContentThemeOpened(themeId) {
    if (!themeId) return { unlocked: false };

    arrayPushUnique(state.openedContentThemes, themeId);

    var unlocked = false;
    if (state.openedContentThemes.length >= CONTENT_THEMES_THRESHOLD &&
        arrayPushUnique(state.achievements, ACH_CONTENT_THEMES)) {
      unlocked = true;
      notify('achievement:unlocked', {
        achievementId: ACH_CONTENT_THEMES,
        source: 'content-themes',
        count: state.openedContentThemes.length
      });
    }

    saveState();
    return { unlocked: unlocked };
  }

  /* ----------------------------------------------------------
   * markGlossaryTermOpened
   * ----------------------------------------------------------
   * Chamado quando o usuário expande um termo do glossário.
   * Retorna { unlocked: bool } — true se uma nova conquista foi
   * desbloqueada neste ato (apenas `curioso`).
   * ---------------------------------------------------------- */

  function markGlossaryTermOpened(term) {
    if (!term) return { unlocked: false };

    arrayPushUnique(state.openedGlossaryTerms, term);

    var unlocked = false;
    if (state.openedGlossaryTerms.length >= GLOSSARY_TERMS_THRESHOLD &&
        arrayPushUnique(state.achievements, ACH_GLOSSARY)) {
      unlocked = true;
      notify('achievement:unlocked', {
        achievementId: ACH_GLOSSARY,
        source: 'glossary',
        count: state.openedGlossaryTerms.length
      });
    }

    saveState();
    return { unlocked: unlocked };
  }

  /* ============================================================
   * 10. RESET
   * ============================================================ */

  function reset() {
    state = defaultState();
    saveState();
    notify('game:reset', {});
    return getState();
  }

  /* ============================================================
   * 11. API PÚBLICA
   * ============================================================ */

  function getState() {
    return {
      currentMissionId:    getCurrentMissionId(),
      completedMissions:   state.completedMissions.slice(),
      aura:                state.aura,
      xp:                  state.xp,
      level:               calculateLevel(state.xp),
      levelInfo:           getLevelInfo(state.xp),
      achievements:        state.achievements.slice(),
      bossCompleted:       !!state.bossCompleted,
      bossScore:           state.bossScore,
      answers:             cloneState({ answers: state.answers }).answers,
      missionAttempts:     cloneState({ missionAttempts: state.missionAttempts }).missionAttempts,
      openedContentThemes: state.openedContentThemes.slice(),
      openedGlossaryTerms: state.openedGlossaryTerms.slice()
    };
  }

  function init() {
    state = loadState();
    /* Sincroniza o currentMissionId com a realidade do progresso */
    state.currentMissionId = getCurrentMissionId();

    /* Recalcula o nível para evitar estado antigo inconsistente */
    state.level = calculateLevel(state.xp);

    saveState();
    notify('game:ready', { state: getState() });
  }

  /* ============================================================
   * 12. EXPORTAÇÃO
   * ============================================================ */

  return {
    /* Ciclo de vida */
    init: init,
    reset: reset,

    /* Estado */
    getState: getState,

    /* Missões */
    completeMission: completeMission,
    isMissionCompleted: isMissionCompleted,
    isMissionUnlocked: isMissionUnlocked,

    /* Boss */
    isBossUnlocked: isBossUnlocked,
    isBossCompleted: isBossCompleted,
    setBossResult: setBossResult,

    /* Glossário e conteúdos */
    markContentThemeOpened: markContentThemeOpened,
    markGlossaryTermOpened: markGlossaryTermOpened,

    /* Eventos */
    on: on,
    off: off,

    /* Utilitários expostos para o app.js */
    calculateLevel: calculateLevel,
    getLevelInfo: getLevelInfo,
    findMission: findMission,
    findAchievement: findAchievement,
    getAttempts: getAttempts,
    calculateReward: calculateReward,

    /* Constantes */
    VERSION: VERSION,
    LEVELS: LEVELS.slice(),
    STORAGE_KEY: STORAGE_KEY
  };

})();

/* ============================================================
 * AUTO-INICIALIZAÇÃO
 * ------------------------------------------------------------
 * Garante que o estado esteja carregado antes do app.js rodar.
 * ============================================================ */

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.Game.init();
    });
  } else {
    window.Game.init();
  }
} else {
  window.Game.init();
}