/**
 * theme.js — Formação de Professores Autores e Formadores para EaD
 *
 * Identidade visual, textos, personagens-guia, trilhas e rótulos de
 * interface do LDI do curso de Formação de Professores Autores e
 * Formadores para atuar em Cursos/Disciplinas na modalidade a
 * Distância — UFU.
 *
 * Este é o PRIMEIRO script carregado. Ele injeta as cores como
 * variáveis CSS em :root e alimenta o app.js, o game.js e o audio.js
 * com todo o conteúdo textual do projeto.
 *
 * Registro pedagógico: Andragógico (adultos em formação profissional
 * continuada — professores universitários, tutores e coordenadores).
 *
 * Base técnica: Guia de Estudos do Curso de Formação de Professores
 * Autores e Formadores para atuar em Cursos/Disciplinas na modalidade
 * a Distância — UFU (2026), 232 páginas.
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 * Apoio: Inteligência Artificial generativa (ferramenta de apoio)
 */

window.THEME = {

  /* ============================================================
   * 1. META — identidade textual do LDI
   * ============================================================ */

  meta: {
    title:    'Formação de Professores Autores e Formadores',
    subtitle: 'Curso de Formação de Professores Autores e Formadores — UFU',
    kicker:   'Livro Digital Interativo',
    tagline:  'Planeje, produza, avalie e atue na Educação a Distância.',
    intro:
      'Uma jornada gamificada pelos cinco módulos do Guia de Estudos da UFU. ' +
      'Cada situação apresenta um problema real do cotidiano de professoras e ' +
      'professores universitários que vão ofertar disciplinas ou cursos a ' +
      'distância. Você decide, recebe feedback formativo e avança. O material ' +
      'de referência está sempre a um clique de distância.'
  },

  /* ============================================================
   * 2. CHARACTERS — personagens-guia (registro andragógico)
   * ============================================================
   * Cada personagem tem:
   *   - id      : identificador usado em missions.js
   *   - name    : nome exibido na interface
   *   - role    : papel (subtítulo curto)
   *   - svg     : caminho do avatar SVG em assets/images/
   *   - bio     : apresentação curta (usada em textos de apoio)
   * ============================================================ */

  characters: {
    amanda: {
      id:   'amanda',
      name: 'Amanda',
      role: 'Professora formadora',
      svg:  'assets/images/amanda.svg',
      bio:
        'Professora formadora experiente. Já percorreu o caminho da EaD e ' +
        'quer ajudar você a percorrer também. Fala como quem já viveu o ' +
        'planejamento, a produção de material, a avaliação e a tutoria.'
    },
    carlos: {
      id:   'carlos',
      name: 'Carlos',
      role: 'Coordenador de curso',
      svg:  'assets/images/carlos.svg',
      bio:
        'Coordenador de curso na UFU. Traz a visão institucional e as ' +
        'exigências legais da EaD. Ajuda a conectar o planejamento pedagógico ' +
        'às normas da UAB e da UFU.'
    },
    default: {
      id:   'default',
      name: 'Guia',
      role: 'Mentor(a)',
      svg:  'assets/images/amanda.svg',
      bio:  'Personagem-guia padrão.'
    }
  },

  /* ============================================================
   * 3. COLORS — paleta UFU + gamificação
   * ============================================================
   * Cada chave vira uma variável CSS --color-<kebab-case>.
   * Ex.:  primaryDark  →  --color-primary-dark
   *       surfaceAlt  →  --color-surface-alt
   *       textInverse →  --color-text-inverse
   * ============================================================ */

  colors: {
    /* Fundos e superfícies */
    bg:            '#f7f4ee',
    surface:       '#ffffff',
    surfaceAlt:    '#f0ebdf',

    /* Texto */
    text:          '#1e1a12',
    textMuted:     '#5a5142',
    textInverse:   '#ffffff',

    /* Azul UFU (primária) */
    primary:       '#1b3a6b',
    primaryDark:   '#0f2547',
    primaryLight:  '#5472d3',

    /* Verde (secundária — sucesso) */
    secondary:     '#2e8b57',
    secondaryDark: '#1f6039',

    /* Dourado (destaque) */
    accent:        '#c9a227',
    accentDark:    '#8a6d15',

    /* Estados */
    danger:        '#b23a3a',
    dangerDark:    '#8a1c1c',
    success:       '#2e8b57',
    warning:       '#ef6c00',

    /* Extra — usado em destaques andragógicos */
    purple:        '#6b4a8a',

    /* Bordas */
    border:        '#e0d8c4',
    borderStrong:  '#c8bda6'
  },

  /* ============================================================
   * 4. TRAILS — trilhas temáticas
   * ============================================================
   * missions.js referencia cada trilha pelo id (ex.: trail: 'fundamentos').
   * O app.js busca em THEME.trails[id] para exibir ícone e rótulo.
   * ============================================================ */

  trails: {
    fundamentos: {
      id:    'fundamentos',
      label: 'Fundamentos da EaD',
      icon:  '📚'
    },
    planejamento: {
      id:    'planejamento',
      label: 'Planejamento e Gestão',
      icon:  '📋'
    },
    producao: {
      id:    'producao',
      label: 'Produção de Material',
      icon:  '🎬'
    },
    avaliacao: {
      id:    'avaliacao',
      label: 'Avaliação da Aprendizagem',
      icon:  '📊'
    },
    atuacao: {
      id:    'atuacao',
      label: 'Atuação Docente',
      icon:  '👩‍🏫'
    },
    praticas: {
      id:    'praticas',
      label: 'Laboratório de Práticas',
      icon:  '🧪'
    }
  },

  /* ============================================================
   * 5. GAMIFICATION — vocabulário andragógico
   * ============================================================ */

  gamification: {
    scoreName: 'Progresso',      // rótulo do HUD (topo)
    xpName:    'Experiência',    // rótulo do HUD
    levelName: 'Nível'           // rótulo do HUD
  },

  /* ============================================================
   * 6. SCREENS — títulos e subtítulos das telas
   * ============================================================ */

  screens: {
    mapTitle:    '🗺️ Mapa da Jornada',
    mapSubtitle: 'Sua trilha de aprendizagem pelos cinco módulos do Guia de Estudos da UFU.',

    contentsTitle:    '📖 Conteúdos',
    contentsSubtitle: 'Revisão por temas, para consulta sempre que precisar.',

    glossaryTitle:    '📚 Glossário',
    glossarySubtitle: 'Termos essenciais da EaD, extraídos do Guia de Estudos.',

    achievementsTitle: '🏆 Conquistas',

    aboutTitle:    'ℹ️ Sobre o LDI',
    aboutSubtitle: 'Ficha técnica, autoria e responsabilidade.',

    transparencyTitle: '🧠 Transparência sobre IA',

    howtoTitle:    '🎓 Como Jogar',
    howtoSubtitle: 'Entenda a dinâmica antes de começar a jornada.'
  },

  /* ============================================================
   * 7. HOWTO — tela "Como Jogar"
   * ============================================================ */

  howTo: {

    intro:
      'Este Livro Digital Interativo transforma o Guia de Estudos da UFU em ' +
      'uma jornada de decisões reais. Cada situação apresenta um problema do ' +
      'cotidiano de professoras e professores universitários que vão ofertar ' +
      'disciplinas ou cursos a distância. Você decide, recebe feedback ' +
      'formativo e avança.',

    whyItMatters:
      'A EaD não é uma modalidade menor. É uma modalidade que exige ' +
      'planejamento detalhado, produção de material de qualidade, avaliação ' +
      'formativa e atuação docente articulada com tutoria. Ao decidir cada ' +
      'situação, você está treinando o olhar crítico que a UFU espera de ' +
      'professores autores e formadores. O guia não é um manual — é um convite ' +
      'à prática reflexiva.',

    steps: [
      {
        icon:  '🎯',
        title: '1. Leia a situação',
        text:
          'Cada missão apresenta um problema real: planejar uma disciplina, ' +
          'produzir material, avaliar alunos, orientar tutores. Leia com ' +
          'atenção e pense em como você agiria.'
      },
      {
        icon:  '🔀',
        title: '2. Escolha uma alternativa',
        text:
          'Quatro alternativas são apresentadas. Apenas uma está alinhada ao ' +
          'Guia de Estudos da UFU. As alternativas são embaralhadas a cada ' +
          'abertura da missão — não vale decorar posição.'
      },
      {
        icon:  '💡',
        title: '3. Receba feedback formativo',
        text:
          'Se errar, o jogo oferece uma dica específica com a página exata do ' +
          'material onde você pode revisar o conceito. Você decide se tenta ' +
          'de novo ou se revela a resposta. Errar não custa Progresso — apenas ' +
          'reduz a recompensa da próxima tentativa (10 → 7 → 5 → 3).'
      },
      {
        icon:  '🏆',
        title: '4. Avance na jornada',
        text:
          'Ao acertar, você ganha Progresso e Experiência, desbloqueia a ' +
          'próxima missão e pode conquistar medalhas. Cada tela mostra seu ' +
          'nível atual e o quanto falta para o próximo.'
      },
      {
        icon:  '👑',
        title: '5. Enfrente o Desafio Integrador',
        text:
          'Ao concluir todas as situações, você enfrenta um caso final com ' +
          'três decisões sequenciais que integram todos os módulos. É o ' +
          'momento de aplicar o que aprendeu.'
      },
      {
        icon:  '📄',
        title: '6. Consulte o Guia sempre que precisar',
        text:
          'O Guia de Estudos da UFU está disponível a qualquer momento. Use-o ' +
          'como referência antes de responder ou para aprofundar o conteúdo ' +
          'depois do feedback.',
        action: {
          label:  '📄 Acessar o Guia de Estudos da UFU (PDF)',
          url:    'docs/guia-formacao-professores-autores-formadores-ead-ufu.pdf',
          target: '_blank',
          type:   'link'
        }
      }
    ],

    tips: [
      '📌 Leia o Guia de Estudos antes de responder cada situação.',
      '📌 Use o Glossário para consultar termos que não conhece.',
      '📌 Volte ao Mapa para revisar missões já concluídas.',
      '📌 Ajuste fonte, contraste e áudio no painel ♿ de Acessibilidade.',
      '📌 Seu progresso é salvo automaticamente no navegador.',
      '📌 Cada erro indica a página exata do Guia onde revisar o conceito.'
    ]
  },

  /* ============================================================
   * 8. TEXTS — ficha técnica e transparência
   * ============================================================ */

  texts: {

    /* Ficha técnica exibida na tela "Sobre o LDI" */
    aboutItems: [
      {
        term: 'Título',
        def:  'Formação de Professores Autores e Formadores para EaD'
      },
      {
        term: 'Subtítulo',
        def:
          'Curso de Formação de Professores Autores e Formadores para atuar ' +
          'em Cursos/Disciplinas na modalidade a Distância — UFU'
      },
      {
        term: 'Autor e responsável pelo desenvolvimento',
        def:  'Dirceu Nogueira de Sales Duarte Junior'
      },
      {
        term: 'Apoio no desenvolvimento',
        def:
          'Inteligência Artificial generativa, utilizada como ferramenta de ' +
          'apoio à ideação, organização, redação, programação, revisão e ' +
          'desenvolvimento da experiência interativa.'
      },
      {
        term: 'Base técnica',
        def:
          'Guia de Estudos do Curso de Formação de Professores Autores e ' +
          'Formadores para atuar em Cursos/Disciplinas na modalidade a ' +
          'Distância — UFU (2026), 232 páginas.'
      },
      {
        term: 'Instituição',
        def:
          'Universidade Federal de Uberlândia (UFU) / Centro de Educação a ' +
          'Distância (CEaD) / Universidade Aberta do Brasil (UAB)'
      },
      {
        term: 'Responsabilidade pelo conteúdo',
        def:
          'A seleção das fontes, a definição dos objetivos pedagógicos, as ' +
          'decisões de conteúdo, a validação das informações e a ' +
          'responsabilidade pelo produto final são do autor.'
      },
      {
        term: 'Registro pedagógico',
        def:
          'Andragógico — voltado a adultos em formação profissional ' +
          'continuada (professores universitários, tutores e coordenadores).'
      },
      {
        term: 'Modelo pedagógico',
        def:
          'Feedback formativo em camadas, com recompensa decrescente a cada ' +
          'tentativa (10 → 7 → 5 → 3). As alternativas são embaralhadas a ' +
          'cada abertura para evitar memorização de posição. Toda dica aponta ' +
          'a página exata do material didático.'
      },
      {
        term: 'Licença',
        def: 'Creative Commons — CC BY-NC-SA 4.0'
      }
    ],

    /* Texto exibido na tela "Transparência sobre IA" */
    transparency: [
      'Este Livro Digital Interativo (LDI) foi desenvolvido com apoio de ' +
      'Inteligência Artificial generativa, utilizada como ferramenta de ' +
      'apoio à ideação, organização, redação, programação, revisão e ' +
      'desenvolvimento da experiência interativa.',

      'A Inteligência Artificial generativa não é autora principal da obra. ' +
      'A responsabilidade pelo conteúdo, pelas decisões pedagógicas e pela ' +
      'validação das informações é integralmente do autor indicado na ficha ' +
      'técnica.',

      'Todo o conteúdo técnico foi extraído exclusivamente do Guia de ' +
      'Estudos do Curso de Formação de Professores Autores e Formadores para ' +
      'atuar em Cursos/Disciplinas na modalidade a Distância — UFU (2026). ' +
      'Cada missão, cada dica e cada feedback citam a página exata do ' +
      'material de referência.',

      'Onde o Guia não cobre explicitamente um tema, o LDI não inventa. ' +
      'Nesses casos, o conteúdo é marcado como "a validar na fonte" ou ' +
      'remete ao próprio Guia para consulta.'
    ]
  },

  /* ============================================================
   * 9. UI — rótulos de botões e mensagens curtas
   * ============================================================ */

  ui: {
    /* Botões principais */
    btnStartJourney:    'Começar Jornada',
    btnContinueJourney: 'Continuar Jornada',
    btnHowTo:           'Como Jogar',

    /* Navegação */
    btnHome:      'Início',
    btnBackToMap: 'Voltar ao mapa',
    btnContinue:  'Continuar',
    btnStartMission: 'Começar missão',
    btnFaceBoss:  'Enfrentar o Desafio Final',

    /* Reset */
    btnReset:     'Reiniciar jornada',
    resetConfirm:
      'Reiniciar a jornada? Todo o progresso será apagado. As preferências ' +
      'de acessibilidade serão mantidas.',

    /* Mensagens de toast */
    toastReset:
      'Jornada reiniciada. Boa nova caminhada!',
    toastBossUnlocked:
      '👑 Desafio Final desbloqueado! Você concluiu todas as missões.',

    /* Rótulos de status de missão */
    labelLocked:    'Bloqueada',
    labelAvailable: 'Disponível',
    labelCurrent:   'Missão atual',
    labelCompleted: 'Concluída',

    /* Tela final */
    finalTitle: '👑 Desafio Final concluído'
  }

};