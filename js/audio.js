/**
 * audio.js — Formação de Professores Autores e Formadores para EaD
 *
 * Motor de áudio do LDI. Três frentes independentes:
 *
 *   1. VOZ        — Web Speech API (pt-BR, com fallback pt-*)
 *   2. EFEITOS    — Web Audio API, sintetizados em tempo real
 *   3. MELODIA    — 5 melodias originais em estilo caixinha de música
 *
 * Tratamento de texto antes da fala:
 *   • Remove emojis e símbolos decorativos
 *   • Expande parentéticos de gênero: professor(a) → professor e professora
 *   • Expande abreviações: p. → página, art. → artigo, Prof. → Professor
 *   • Normaliza CAPS LOCK preservando siglas conhecidas
 *   • Substitui siglas por pronúncia fonética: AVA → ava, UFU → ufu
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 * Apoio: Inteligência Artificial generativa (ferramenta de apoio)
 */

window.Audio = (function () {
  'use strict';

  /* ============================================================
   * 1. CONSTANTES
   * ============================================================ */

  var STORAGE_KEY = 'ufu-ead-ldi:audio-prefs';
  var VERSION = '1.1.0';

  var DEFAULT_PREFS = {
    voice:    false,
    sfx:      false,
    ambience: false,
    melody:   'caminho'
  };

  var SPEECH_RATE   = 0.98;
  var SPEECH_PITCH  = 1.0;
  var SPEECH_VOLUME = 1.0;
  var SFX_VOLUME    = 0.35;
  var AMBIENCE_VOLUME = 0.10;

  /* ------------------------------------------------------------
   * 1.1 DICIONÁRIO DE SIGLAS — como pronunciar
   * ------------------------------------------------------------
   * Regra geral em pt-BR:
   *   • Siglas que formam palavra → escrever em minúsculas como
   *     uma palavra fonética (AVA → "ava", UFU → "ufu").
   *   • Siglas soletradas → separar por espaço cada letra
   *     (PDF → "pê dê éfe").
   * ---------------------------------------------------------- */

  var PRONUNCIATION = {

    /* Siglas lidas como palavras (uma sílaba) */
    'AVA':      'ava',
    'EaD':      'ead',
    'UFU':      'ufu',
    'UAB':      'uabe',
    'MEC':      'mec',
    'CAPES':    'capes',
    'CEaD':     'cead',
    'INEP':     'inépi',
    'CONAES':   'conáis',
    'SERES':    'séres',
    'PIDE':     'píde',
    'MOOC':     'muque',
    'TIC':      'tic',
    'ENEM':     'enem',
    'ENADE':    'enáde',
    'UOL':      'uol',

    /* Siglas com hífen ou maiúscula interna */
    'SisUAB':   'sis uabe',
    'e-MEC':    'e mec',
    'EduCAPES': 'educápis',
    'Educapes': 'educápis',

    /* Siglas soletradas (letra por letra) */
    'LDB':      'éle dê bê',
    'CNE':      'cê ene é',
    'CES':      'cê e ésse',
    'PACC':     'pá cê cê',
    'DED':      'dê e dê',
    'PDF':      'pê dê éfe',
    'HTML':     'agá tê eme éle',
    'CD':       'cê dê',
    'DVD':      'dê vê dê',
    'MP3':      'eme pê três',
    'LDI':      'éle dê i',
    'BBC':      'bê bê cê',
    'USP':      'u esse pê',
    'UFMG':     'u éfe eme gê',
    'Unicamp':  'Unicâmpi',

    /* Nomes próprios e estrangeirismos */
    'Moodle':    'Mudi',
    'MOODLE':    'Mudi',
    'Web':       'Uébi',
    'web':       'uébi',
    'Chat':      'Chati',
    'chat':      'chati',
    'Design':    'Dizáin',
    'design':    'dizáin',
    'Online':    'Onlain',
    'online':    'onlain',
    'Feedback':  'Fídibek',
    'feedback':  'fídibek',
    'Podcast':   'Podicasti',
    'podcast':   'podicasti',
    'Wiki':      'Uíqui',
    'wiki':      'uíqui',
    'PowerPoint':'Pauer point',
    'YouTube':   'Youtúbi',
    'Google':    'Gúgou',
    'Libras':    'Libras',
    'libras':    'libras'
  };

  /* ------------------------------------------------------------
   * 1.2 DICIONÁRIO DE GÊNERO — parentéticos irregulares
   * ------------------------------------------------------------
   * Quando o texto tem "professor(a)", expandimos para
   * "professor e professora". Para palavras regulares (terminação
   * em -o) aplicamos a regra genérica. Aqui ficam os irregulares.
   * ---------------------------------------------------------- */

  var GENDER_DICT = {
    'professor':   'professor e professora',
    'aluno':       'aluno e aluna',
    'diretor':     'diretor e diretora',
    'coordenador': 'coordenador e coordenadora',
    'tutor':       'tutor e tutora',
    'autor':       'autor e autora',
    'instrutor':   'instrutor e instrutora',
    'formador':    'formador e formadora',
    'educador':    'educador e educadora',
    'orientador':  'orientador e orientadora',
    'pesquisador': 'pesquisador e pesquisadora',
    'mediador':    'mediador e mediadora'
  };

  /* ------------------------------------------------------------
   * 1.3 ABREVIAÇÕES — ordem importa (as mais longas primeiro)
   * ------------------------------------------------------------ */

  var ABBREVIATIONS = [
    { pattern: /\b[Pp]rofessora?\b/g, replacement: 'Professora' },   /* protege */
    { pattern: /\b[Pp]rof\.\s*/g,     replacement: 'Professor ' },
    { pattern: /\b[Pp]rofa\.\s*/g,    replacement: 'Professora ' },
    { pattern: /\b[Pp]{2}\.\s*/g,     replacement: 'páginas ' },
    { pattern: /\b[Pp]ág\.\s*/g,      replacement: 'página ' },
    { pattern: /\b[Aa]rt\.\s*/g,      replacement: 'artigo ' },
    { pattern: /\b[Aa]rt[.]?\s+(?=\d)/g, replacement: 'artigo ' },
    { pattern: /\b[Nn][º°]\.?\s*/g,   replacement: 'número ' },
    { pattern: /\b[Nn]o\.\s*/g,       replacement: 'número ' },
    { pattern: /\b[Cc]f\.\s*/g,       replacement: 'confira ' },
    { pattern: /\b[Ee]x\.\s*/g,       replacement: 'exemplo ' },
    { pattern: /\b[Oo]bs\.\s*/g,      replacement: 'observação ' },
    { pattern: /\b[Ss]éc\.\s*/g,      replacement: 'século ' },
    { pattern: /(?<![A-Za-z])[Pp]\.\s*/g, replacement: 'página ' }   /* p. no final */
  ];

  /* ============================================================
   * 2. ESTADO
   * ============================================================ */

  var prefs = null;
  var audioCtx = null;
  var masterGain = null;
  var sfxGain = null;
  var ambienceGain = null;

  var currentUtterance = null;
  var speechQueue = [];
  var speaking = false;

  var currentMelodyId = null;
  var melodyTimer = null;
  var melodyPlaying = false;

  var gestureReceived = false;
  var initialized = false;

  /* ============================================================
   * 3. PREFERÊNCIAS
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
   * 4. HELPERS DE SUPORTE
   * ============================================================ */

  function isAudioContextSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  function isSpeechSupported() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  /* ============================================================
   * 5. AUDIO CONTEXT
   * ============================================================ */

  function ensureAudioContext() {
    if (audioCtx) {
      if (audioCtx.state === 'suspended') {
        try { audioCtx.resume(); } catch (e) { /* silencioso */ }
      }
      return audioCtx;
    }
    if (!isAudioContextSupported()) return null;

    try {
      var Ctor = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctor();

      masterGain = audioCtx.createGain();
      masterGain.gain.value = 1.0;
      masterGain.connect(audioCtx.destination);

      sfxGain = audioCtx.createGain();
      sfxGain.gain.value = SFX_VOLUME;
      sfxGain.connect(masterGain);

      ambienceGain = audioCtx.createGain();
      ambienceGain.gain.value = AMBIENCE_VOLUME;
      ambienceGain.connect(masterGain);

      return audioCtx;
    } catch (e) {
      audioCtx = null;
      return null;
    }
  }

  function resumeAudioContext() {
    if (audioCtx && audioCtx.state === 'suspended') {
      try { audioCtx.resume(); } catch (e) { /* silencioso */ }
    }
  }

  /* ============================================================
   * 6. PREPARAÇÃO DO TEXTO PARA A FALA
   * ============================================================ */

  /* ----------------------------------------------------------
   * 6.1 Remove emojis, símbolos decorativos e marcações
   * ---------------------------------------------------------- */

  function removeEmojisAndSymbols(text) {
    if (!text) return '';
    var cleaned = String(text);

    /* Emojis principais */
    cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}]/gu, ' ');
    cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]/gu, ' ');
    cleaned = cleaned.replace(/[\u{1F680}-\u{1F6FF}]/gu, ' ');
    cleaned = cleaned.replace(/[\u{2600}-\u{26FF}]/gu, ' ');
    cleaned = cleaned.replace(/[\u{2700}-\u{27BF}]/gu, ' ');
    cleaned = cleaned.replace(/[\u{FE00}-\u{FE0F}]/gu, ''); /* variation selectors */

    /* Símbolos decorativos — preserva pontuação */
    cleaned = cleaned.replace(/[•◆◇●○■□▪▫◾◽→←↑↓⇒⇐⇑⇓✕✖✓✔✗✘★☆♦♣♠♥]/g, ' ');
    cleaned = cleaned.replace(/\.{3,}/g, '.');
    cleaned = cleaned.replace(/[—–]/g, ' ');

    /* Markdown residual */
    cleaned = cleaned.replace(/[*_#`~]/g, ' ');

    /* HTML residual */
    cleaned = cleaned.replace(/<[^>]+>/g, ' ');

    /* Colapsa espaços */
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  /* ----------------------------------------------------------
   * 6.2 Expande parentéticos de gênero
   * ----------------------------------------------------------
   * Professor(a) → "professor e professora"
   * Usa dicionário para irregularidades; regra genérica para o resto.
   * ---------------------------------------------------------- */

  function expandGenderParentheticals(text) {
    if (!text) return '';
    /* Regex captura a palavra antes de "(a)" */
    return text.replace(/([a-záéíóúâêôãõç]+)\(a\)/gi, function (match, base) {
      var key = base.toLowerCase();
      if (GENDER_DICT[key]) {
        /* Preserva capitalização da primeira letra */
        var expanded = GENDER_DICT[key];
        if (base.charAt(0) === base.charAt(0).toUpperCase()) {
          expanded = expanded.charAt(0).toUpperCase() + expanded.slice(1);
        }
        return expanded;
      }
      /* Regra genérica: terminação em 'a' */
      var feminino = base + 'a';
      /* Preserva capitalização inicial */
      if (base.charAt(0) === base.charAt(0).toUpperCase()) {
        feminino = feminino.charAt(0).toUpperCase() + feminino.slice(1);
      }
      return base + ' e ' + feminino;
    });
  }

  /* ----------------------------------------------------------
   * 6.3 Expande abreviações
   * ---------------------------------------------------------- */

  function expandAbbreviations(text) {
    if (!text) return '';
    var result = text;
    for (var i = 0; i < ABBREVIATIONS.length; i++) {
      result = result.replace(ABBREVIATIONS[i].pattern, ABBREVIATIONS[i].replacement);
    }
    return result;
  }

  /* ----------------------------------------------------------
   * 6.4 Normaliza CAPS LOCK preservando siglas
   * ---------------------------------------------------------- */

  function normalizeCapsWords(text) {
    if (!text) return '';
    var tokens = text.split(/(\s+)/);
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (!t || t.length < 3) continue;
      if (/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}$/.test(t)) {
        /* É CAIXA ALTA — verifica se é uma sigla conhecida */
        var isSigla = false;
        for (var key in PRONUNCIATION) {
          if (PRONUNCIATION.hasOwnProperty(key) && t === key) {
            isSigla = true;
            break;
          }
        }
        if (!isSigla) {
          /* Reduz para Capitalize */
          tokens[i] = t.charAt(0) + t.slice(1).toLowerCase();
        }
      }
    }
    return tokens.join('');
  }

  /* ----------------------------------------------------------
   * 6.5 Aplica dicionário de pronúncia
   * ---------------------------------------------------------- */

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function applyPronunciationDict(text) {
    if (!text) return '';
    var result = text;
    /* Ordena as chaves por comprimento (maior primeiro) para evitar
       que siglas curtas consumam siglas longas */
    var keys = Object.keys(PRONUNCIATION).sort(function (a, b) {
      return b.length - a.length;
    });
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var regex = new RegExp('\\b' + escapeRegExp(key) + '\\b', 'g');
      result = result.replace(regex, PRONUNCIATION[key]);
    }
    return result;
  }

  /* ----------------------------------------------------------
   * 6.6 Pipeline completo
   * ---------------------------------------------------------- */

  function prepareTextForSpeech(text) {
    if (!text) return '';
    var result = String(text);
    result = removeEmojisAndSymbols(result);
    result = expandGenderParentheticals(result);
    result = expandAbbreviations(result);
    result = normalizeCapsWords(result);
    result = applyPronunciationDict(result);
    /* Colapsa espaços novamente após todas as substituições */
    result = result.replace(/\s+/g, ' ').trim();
    return result;
  }

  /* ============================================================
   * 7. VOZ — Web Speech API
   * ============================================================ */

  function pickPtBrVoice() {
    if (!isSpeechSupported()) return null;
    var voices;
    try {
      voices = window.speechSynthesis.getVoices();
    } catch (e) { return null; }
    if (!voices || voices.length === 0) return null;

    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang && voices[i].lang.toLowerCase() === 'pt-br') return voices[i];
    }
    for (var j = 0; j < voices.length; j++) {
      if (voices[j].lang && voices[j].lang.toLowerCase().indexOf('pt') === 0) return voices[j];
    }
    return null;
  }

  function doSpeak(text, options) {
    if (!prefs.voice) return false;
    if (!isSpeechSupported()) return false;
    if (!text) return false;

    options = options || {};
    var interrupt = options.interrupt !== false;
    if (interrupt) stopSpeak();

    var cleaned = prepareTextForSpeech(text);
    if (!cleaned || cleaned.length < 2) return false;

    try {
      var utter = new window.SpeechSynthesisUtterance(cleaned);
      utter.lang = options.lang || 'pt-BR';
      utter.rate = typeof options.rate === 'number' ? options.rate : SPEECH_RATE;
      utter.pitch = typeof options.pitch === 'number' ? options.pitch : SPEECH_PITCH;
      utter.volume = typeof options.volume === 'number' ? options.volume : SPEECH_VOLUME;

      var voice = pickPtBrVoice();
      if (voice) utter.voice = voice;

      utter.onstart = function () { speaking = true; };
      utter.onend = function () {
        speaking = false;
        currentUtterance = null;
        if (speechQueue.length > 0) {
          var next = speechQueue.shift();
          doSpeak(next.text, next.options);
        }
      };
      utter.onerror = function () {
        speaking = false;
        currentUtterance = null;
      };

      currentUtterance = utter;
      window.speechSynthesis.speak(utter);
      return true;
    } catch (e) {
      speaking = false;
      currentUtterance = null;
      return false;
    }
  }

  function speak(text, options) {
    options = options || {};
    if (speaking && options.interrupt === false) {
      speechQueue.push({ text: text, options: options });
      return true;
    }
    return doSpeak(text, options);
  }

  function stopSpeak() {
    if (!isSpeechSupported()) return;
    try {
      window.speechSynthesis.cancel();
    } catch (e) { /* silencioso */ }
    speaking = false;
    currentUtterance = null;
    speechQueue = [];
  }

  /* ============================================================
   * 8. EFEITOS SONOROS
   * ============================================================ */

  function playTone(freq, duration, type, startTime, gainValue) {
    if (!audioCtx) return null;
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();

    osc.type = type || 'sine';
    osc.frequency.value = freq;

    var t0 = startTime || audioCtx.currentTime;
    var dur = duration || 0.15;
    var vol = typeof gainValue === 'number' ? gainValue : 0.5;

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain);
    gain.connect(sfxGain);

    osc.start(t0);
    osc.stop(t0 + dur + 0.05);

    return { osc: osc, gain: gain };
  }

  function playNoise(duration, startTime, gainValue) {
    if (!audioCtx) return null;
    var sampleRate = audioCtx.sampleRate;
    var bufferSize = Math.floor(sampleRate * duration);
    var buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    var source = audioCtx.createBufferSource();
    source.buffer = buffer;

    var filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1200;

    var gain = audioCtx.createGain();
    var t0 = startTime || audioCtx.currentTime;
    var vol = typeof gainValue === 'number' ? gainValue : 0.2;

    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain);

    source.start(t0);
    source.stop(t0 + duration + 0.05);
    return { source: source, gain: gain, filter: filter };
  }

  function sfxBadge() {
    var t = audioCtx.currentTime;
    playTone(880.00,  0.09, 'sine',     t,         0.45);
    playTone(1174.66, 0.09, 'sine',     t + 0.08,  0.45);
    playTone(1396.91, 0.20, 'sine',     t + 0.16,  0.55);
  }

  function sfxBadgeWrong() {
    var t = audioCtx.currentTime;
    playTone(329.63, 0.16, 'triangle', t,         0.40);
    playTone(246.94, 0.26, 'triangle', t + 0.12,  0.45);
    playNoise(0.14, t, 0.08);
  }

  function sfxSuccess() {
    var t = audioCtx.currentTime;
    playTone(523.25,  0.10, 'sine', t,         0.45);
    playTone(659.25,  0.10, 'sine', t + 0.08,  0.45);
    playTone(783.99,  0.12, 'sine', t + 0.16,  0.45);
    playTone(1046.50, 0.20, 'sine', t + 0.26,  0.55);
  }

  function sfxError() {
    var t = audioCtx.currentTime;
    playTone(440.00,  0.12, 'triangle', t,         0.35);
    playTone(349.23,  0.12, 'triangle', t + 0.10,  0.35);
    playTone(293.66,  0.22, 'triangle', t + 0.20,  0.40);
  }

  function sfxAchievement() {
    var t = audioCtx.currentTime;
    playTone(523.25,  0.12, 'sine', t,         0.40);
    playTone(659.25,  0.12, 'sine', t + 0.10,  0.40);
    playTone(783.99,  0.12, 'sine', t + 0.20,  0.40);
    playTone(1046.50, 0.15, 'sine', t + 0.30,  0.50);
    playTone(1318.51, 0.28, 'sine', t + 0.44,  0.55);
  }

  function sfxUnlock() {
    var t = audioCtx.currentTime;
    playTone(392.00, 0.10, 'sine', t,        0.35);
    playTone(523.25, 0.10, 'sine', t + 0.08, 0.40);
    playTone(659.25, 0.20, 'sine', t + 0.16, 0.45);
  }

  function sfxAdvance() {
    var t = audioCtx.currentTime;
    playTone(587.33, 0.08, 'sine', t,        0.35);
    playTone(783.99, 0.15, 'sine', t + 0.07, 0.40);
  }

  function sfxComplete() {
    var t = audioCtx.currentTime;
    playTone(523.25,  0.30, 'sine', t,         0.35);
    playTone(659.25,  0.30, 'sine', t + 0.02,  0.30);
    playTone(783.99,  0.40, 'sine', t + 0.04,  0.35);
    playTone(1046.50, 0.50, 'sine', t + 0.10,  0.40);
  }

  function sfxBoss() {
    var t = audioCtx.currentTime;
    playTone(130.81, 0.40, 'sawtooth', t,         0.22);
    playTone(196.00, 0.30, 'sawtooth', t + 0.10,  0.22);
    playTone(261.63, 0.35, 'triangle', t + 0.20,  0.30);
    playTone(392.00, 0.45, 'sine',     t + 0.32,  0.40);
    playTone(523.25, 0.55, 'sine',     t + 0.44,  0.45);
  }

  var SFX_MAP = {
    badge:       sfxBadge,
    badgeWrong:  sfxBadgeWrong,
    success:     sfxSuccess,
    error:       sfxError,
    achievement: sfxAchievement,
    unlock:      sfxUnlock,
    advance:     sfxAdvance,
    complete:    sfxComplete,
    boss:        sfxBoss
  };

  function playSfx(name) {
    if (!prefs.sfx) return false;
    if (!name) return false;
    var fn = SFX_MAP[name];
    if (typeof fn !== 'function') return false;
    if (!ensureAudioContext()) return false;
    resumeAudioContext();
    try {
      fn();
      return true;
    } catch (e) {
      return false;
    }
  }

  function speakAfterSfx(sfxName, text, options) {
    var sfxPlayed = false;
    if (prefs.sfx && ensureAudioContext()) {
      sfxPlayed = playSfx(sfxName);
    }
    var delay = sfxPlayed ? 450 : 0;
    if (delay === 0) {
      if (text) speak(text, options);
      return;
    }
    window.setTimeout(function () {
      if (text) speak(text, options);
    }, delay);
  }

  /* ============================================================
   * 9. MELODIAS — caixinha de música
   * ============================================================ */

  var NOTES = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
    A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
    A5: 880.00, B5: 987.77,
    C6: 1046.50, D6: 1174.66, E6: 1318.51
  };

  var MELODIES = {
    caminho: {
      id:   'caminho',
      name: 'Caminho Suave',
      icon: '🌿',
      notes: [
        { n: NOTES.C5, d: 0.55 }, { n: NOTES.E5, d: 0.55 },
        { n: NOTES.G5, d: 0.55 }, { n: NOTES.E5, d: 0.55 },
        { n: NOTES.F5, d: 0.55 }, { n: NOTES.A5, d: 0.55 },
        { n: NOTES.G5, d: 0.55 }, { n: NOTES.E5, d: 0.55 },
        { n: NOTES.D5, d: 0.55 }, { n: NOTES.F5, d: 0.55 },
        { n: NOTES.A5, d: 0.55 }, { n: NOTES.G5, d: 0.55 },
        { n: NOTES.E5, d: 0.80 }, { n: NOTES.C5, d: 0.80 },
        { n: 0,         d: 0.60 }
      ]
    },
    passos: {
      id:   'passos',
      name: 'Passos na Névoa',
      icon: '🌫️',
      notes: [
        { n: NOTES.A4, d: 0.65 }, { n: NOTES.C5, d: 0.65 },
        { n: NOTES.E5, d: 0.65 }, { n: NOTES.D5, d: 0.65 },
        { n: NOTES.C5, d: 0.65 }, { n: NOTES.E5, d: 0.65 },
        { n: NOTES.G5, d: 0.95 }, { n: 0,         d: 0.45 },
        { n: NOTES.F5, d: 0.65 }, { n: NOTES.E5, d: 0.65 },
        { n: NOTES.D5, d: 0.65 }, { n: NOTES.C5, d: 0.65 },
        { n: NOTES.A4, d: 1.20 }, { n: 0,         d: 0.65 }
      ]
    },
    amanhecer: {
      id:   'amanhecer',
      name: 'Amanhecer',
      icon: '🌅',
      notes: [
        { n: NOTES.G5, d: 0.45 }, { n: NOTES.A5, d: 0.45 },
        { n: NOTES.B5, d: 0.45 }, { n: NOTES.C6, d: 0.85 },
        { n: NOTES.B5, d: 0.45 }, { n: NOTES.A5, d: 0.45 },
        { n: NOTES.G5, d: 0.85 }, { n: 0,         d: 0.35 },
        { n: NOTES.E5, d: 0.45 }, { n: NOTES.G5, d: 0.45 },
        { n: NOTES.A5, d: 0.45 }, { n: NOTES.B5, d: 0.85 },
        { n: NOTES.A5, d: 0.65 }, { n: NOTES.G5, d: 1.00 },
        { n: 0,         d: 0.55 }
      ]
    },
    brisa: {
      id:   'brisa',
      name: 'Brisa de Estudo',
      icon: '🍃',
      notes: [
        { n: NOTES.C5, d: 0.35 }, { n: NOTES.C5, d: 0.35 },
        { n: NOTES.E5, d: 0.35 }, { n: NOTES.G5, d: 0.35 },
        { n: NOTES.E5, d: 0.35 }, { n: NOTES.C5, d: 0.65 },
        { n: 0,         d: 0.35 },
        { n: NOTES.D5, d: 0.35 }, { n: NOTES.D5, d: 0.35 },
        { n: NOTES.F5, d: 0.35 }, { n: NOTES.A5, d: 0.35 },
        { n: NOTES.F5, d: 0.35 }, { n: NOTES.D5, d: 0.65 },
        { n: 0,         d: 0.40 },
        { n: NOTES.E5, d: 0.35 }, { n: NOTES.G5, d: 0.35 },
        { n: NOTES.B5, d: 0.35 }, { n: NOTES.A5, d: 0.35 },
        { n: NOTES.G5, d: 0.65 }, { n: NOTES.E5, d: 0.65 },
        { n: NOTES.C5, d: 1.00 }
      ]
    },
    tarde: {
      id:   'tarde',
      name: 'Tarde Serena',
      icon: '🌇',
      notes: [
        { n: NOTES.F5, d: 0.55 }, { n: NOTES.G5, d: 0.55 },
        { n: NOTES.A5, d: 0.55 }, { n: NOTES.G5, d: 0.55 },
        { n: NOTES.F5, d: 0.55 }, { n: NOTES.E5, d: 0.55 },
        { n: NOTES.D5, d: 0.55 }, { n: NOTES.C5, d: 0.55 },
        { n: 0,         d: 0.45 },
        { n: NOTES.A5, d: 0.55 }, { n: NOTES.G5, d: 0.55 },
        { n: NOTES.F5, d: 0.55 }, { n: NOTES.E5, d: 0.55 },
        { n: NOTES.D5, d: 0.75 }, { n: NOTES.C5, d: 1.20 },
        { n: 0,         d: 0.65 }
      ]
    }
  };

  function playMusicBoxNote(freq, duration, startTime) {
    if (!audioCtx || !freq || freq === 0) return;

    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;

    var t0 = startTime;
    var dur = duration || 0.5;

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(0.55, t0 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain);
    gain.connect(ambienceGain);

    osc.start(t0);
    osc.stop(t0 + dur + 0.05);

    var osc2 = audioCtx.createOscillator();
    var gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2;
    gain2.gain.setValueAtTime(0.0001, t0);
    gain2.gain.linearRampToValueAtTime(0.14, t0 + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * 0.7);
    osc2.connect(gain2);
    gain2.connect(ambienceGain);
    osc2.start(t0);
    osc2.stop(t0 + dur * 0.7 + 0.05);
  }

  function scheduleMelody(melodyId) {
    if (!audioCtx) return;
    var melody = MELODIES[melodyId];
    if (!melody) return;

    melodyPlaying = true;

    var notes = melody.notes;
    var startTime = audioCtx.currentTime + 0.15;
    var totalDuration = 0;

    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
      playMusicBoxNote(note.n, note.d, startTime + totalDuration);
      totalDuration += note.d;
    }

    var loopDelay = (totalDuration + 1.6) * 1000;
    melodyTimer = window.setTimeout(function () {
      if (melodyPlaying && prefs.ambience) {
        scheduleMelody(melodyId);
      }
    }, loopDelay);
  }

  function startMelody(melodyId) {
    if (!prefs.ambience) return;
    if (!ensureAudioContext()) return;
    resumeAudioContext();
    stopMelody();
    currentMelodyId = melodyId;
    scheduleMelody(melodyId);
  }

  function stopMelody() {
    if (melodyTimer) {
      window.clearTimeout(melodyTimer);
      melodyTimer = null;
    }
    melodyPlaying = false;
  }

  function getMelodies() {
    var list = [];
    for (var k in MELODIES) {
      if (!MELODIES.hasOwnProperty(k)) continue;
      list.push({
        id:   MELODIES[k].id,
        name: MELODIES[k].name,
        icon: MELODIES[k].icon
      });
    }
    return list;
  }

  /* ============================================================
   * 10. SETTERS
   * ============================================================ */

  function setVoice(enabled) {
    prefs.voice = !!enabled;
    savePrefs();
    if (!prefs.voice) stopSpeak();
  }

  function setSfx(enabled) {
    prefs.sfx = !!enabled;
    savePrefs();
    if (prefs.sfx) {
      if (ensureAudioContext()) {
        resumeAudioContext();
        try { sfxAdvance(); } catch (e) { /* silencioso */ }
      }
    }
  }

  function setAmbience(enabled) {
    prefs.ambience = !!enabled;
    savePrefs();
    if (prefs.ambience) {
      startMelody(prefs.melody);
    } else {
      stopMelody();
    }
  }

  function setMelody(melodyId) {
    if (!MELODIES[melodyId]) return false;
    prefs.melody = melodyId;
    savePrefs();
    if (prefs.ambience) {
      startMelody(melodyId);
    }
    return true;
  }

  /* ============================================================
   * 11. CICLO DE VIDA
   * ============================================================ */

  function handleFirstGesture() {
    if (gestureReceived) return;
    gestureReceived = true;

    ensureAudioContext();
    resumeAudioContext();

    if (prefs.ambience) {
      startMelody(prefs.melody);
    }

    if (document && document.removeEventListener) {
      document.removeEventListener('click',      handleFirstGesture);
      document.removeEventListener('keydown',    handleFirstGesture);
      document.removeEventListener('touchstart', handleFirstGesture);
    }
  }

  function init() {
    if (initialized) return;
    initialized = true;

    prefs = loadPrefs();

    if (typeof document !== 'undefined') {
      document.addEventListener('click',      handleFirstGesture);
      document.addEventListener('keydown',    handleFirstGesture);
      document.addEventListener('touchstart', handleFirstGesture);
    }

    if (isSpeechSupported()) {
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = function () { /* aciona cache */ };
      }
      try { window.speechSynthesis.getVoices(); } catch (e) { /* silencioso */ }
    }
  }

  /* ============================================================
   * 12. API PÚBLICA
   * ============================================================ */

  return {
    init: init,

    /* Voz */
    speak: speak,
    stopSpeak: stopSpeak,
    isSpeaking: function () { return speaking; },

    /* Efeitos */
    playSfx: playSfx,
    speakAfterSfx: speakAfterSfx,

    /* Melodias */
    getMelodies: getMelodies,

    /* Preferências */
    getPrefs: getPrefs,
    setVoice: setVoice,
    setSfx: setSfx,
    setAmbience: setAmbience,
    setMelody: setMelody,

    /* Utilitários expostos para testes */
    removeEmojisAndSymbols: removeEmojisAndSymbols,
    expandGenderParentheticals: expandGenderParentheticals,
    expandAbbreviations: expandAbbreviations,
    normalizeCapsWords: normalizeCapsWords,
    applyPronunciationDict: applyPronunciationDict,
    prepareTextForSpeech: prepareTextForSpeech,

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
      window.Audio.init();
    });
  } else {
    window.Audio.init();
  }
} else {
  window.Audio.init();
}