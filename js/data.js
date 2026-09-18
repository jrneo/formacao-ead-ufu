/**
 * data.js — Formação de Professores Autores e Formadores para EaD
 *
 * Parte 3 de 3: contém glossário, conquistas e temas de conteúdo.
 * As 16 missões estão em missions.js.
 * O Boss Final está em boss.js.
 *
 * As conquistas agora têm um campo `trail` que define o tema visual
 * da medalha. Temas possíveis:
 *   - fundamentos   → 🔵 azul UFU       (livros)
 *   - planejamento  → 🟢 verde           (prancheta)
 *   - producao      → 🟡 dourado         (cinema)
 *   - avaliacao     → 🟣 roxo           (gráfico)
 *   - atuacao       → 🔴 vermelho        (docência)
 *   - praticas      → 🟠 laranja         (laboratório)
 *   - boss          → ⚫ preto e ouro    (coroa)
 *   - global        → ⚪ branco e cinza  (marco geral)
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 */

/* ============================================================
 * GLOSSÁRIO — 32 termos
 * ============================================================ */

window.GLOSSARY = [
  { term: 'Ambiente Virtual de Aprendizagem (AVA)', definition: 'Espaço de interação online construído com base em tecnologias digitais de informação e comunicação, voltado à interação entre usuários. Quando utilizado em processos educativos, torna-se um facilitador do ensino e da aprendizagem, pois possibilita a construção colaborativa do conhecimento.' },
  { term: 'Andragogia', definition: 'Conjunto de estratégias de aprendizagem com foco em adultos, considerando suas características psicopedagógicas, experiências prévias, autonomia e motivações.' },
  { term: 'Aprendizagem cooperativa', definition: 'Processo em que os alunos trabalham em grupos para alcançar objetivos comuns, compartilhando responsabilidades e construindo conhecimento coletivamente.' },
  { term: 'Aprendizagem online', definition: 'Processo de aprendizagem mediado por tecnologias digitais e internet, que pode ocorrer de forma síncrona ou assíncrona, em ambientes virtuais de aprendizagem.' },
  { term: 'Assincronia', definition: 'Comunicação ou interação que ocorre em tempos diferentes, sem a necessidade de simultaneidade entre os participantes. Exemplos: fórum, e-mail, diário.' },
  { term: 'Autonomia', definition: 'Capacidade do aluno de se responsabilizar pelo próprio processo de construção do conhecimento, controlando seu tempo de estudo, horários e ritmo de aprendizagem.' },
  { term: 'AVA Moodle', definition: 'Sistema gerenciador de cursos, gratuito e de código livre, pensado segundo uma filosofia pedagógica construcionista. Possui diversidade de recursos de apoio ao processo de ensino e aprendizagem a distância.' },
  { term: 'Chat', definition: 'Atividade síncrona que permite aos participantes do curso comunicar entre si em tempo real, por meio de troca de mensagens escritas. Possui dia e hora para início e período de duração.' },
  { term: 'Ciberespaço', definition: 'Espaço virtual de comunicação e interação proporcionado pelas tecnologias digitais e pela internet, onde ocorrem trocas de informações e construção de conhecimento.' },
  { term: 'Competência', definition: 'Capacidade de mobilizar conhecimentos, habilidades e atitudes para resolver situações-problema em contextos específicos.' },
  { term: 'Construtivismo', definition: 'Teoria pedagógica segundo a qual o conhecimento é construído ativamente pelo aluno, a partir de suas interações com o meio, e não simplesmente transmitido pelo professor.' },
  { term: 'Design Instrucional (DI)', definition: 'Campo de estudo que trata do planejamento do ensino e aprendizagem, incluindo atividades, estratégias, sistemas de avaliação, métodos e materiais didáticos. O DI é um integrador da equipe multidisciplinar.' },
  { term: 'Educação a Distância (EaD)', definition: 'Modalidade educacional em que a mediação didático-pedagógica ocorre com a utilização de meios e tecnologias de informação e comunicação, com estudantes e professores desenvolvendo atividades educativas em lugares ou tempos diversos.' },
  { term: 'Equipe multidisciplinar', definition: 'Grupo de profissionais de diferentes áreas (professores, tutores, web designers, programadores, revisores, etc.) que atuam de forma integrada no planejamento, produção e oferta de cursos na modalidade a distância.' },
  { term: 'Hipermídia', definition: 'Recurso que reúne não somente textos, como também imagens, sons, vídeos e quaisquer outras informações que possuam representação no formato digital, possibilitando fazer links entre elementos de mídia.' },
  { term: 'Hipertexto', definition: 'Texto em formato digital que agrega outros conjuntos de informações (imagens, sons, ícones, gráficos, blocos de textos) com a função de conectar diversos conjuntos de informações ao texto principal, acessados através de hiperlinks.' },
  { term: 'Mapa de Atividades', definition: 'Elemento organizativo das aulas, no qual o professor planeja todo o desenvolvimento de uma disciplina: objetivos, conteúdos, atividades, mídias, formas de avaliação e cronograma. É o ponto de partida para a produção do material didático.' },
  { term: 'Mediação pedagógica', definition: 'Atitude, comportamento do professor que se coloca como facilitador, incentivador ou motivador da aprendizagem, sendo uma ponte entre o aprendiz e sua aprendizagem.' },
  { term: 'Moodle', definition: 'Plataforma de aprendizagem de código aberto, utilizada pela UFU para configuração dos ambientes virtuais dos cursos a distância. Possui ferramentas de interação, avaliação e gestão de conteúdo.' },
  { term: 'Polidocência', definition: 'Conceito que se refere ao trabalho docente na EaD, organizado de forma coletiva e cooperativa, no qual o papel docente é desempenhado por um grupo de profissionais com formações diversas.' },
  { term: 'Presencialidade', definition: 'Característica dos momentos presenciais em cursos a distância, como avaliações, apresentações, encontros nos polos e webconferências, que complementam a mediação virtual.' },
  { term: 'Professor autor', definition: 'Profissional responsável pela produção do material didático de uma disciplina ou curso a distância, incluindo guia de estudos, videoaulas, atividades e avaliações.' },
  { term: 'Professor formador', definition: 'Profissional responsável pelo acompanhamento da disciplina, orientação de tutores, planejamento de avaliações, esclarecimento de dúvidas em webconferências e supervisão da correção.' },
  { term: 'Projeto', definition: 'Empreendimento não repetitivo, caracterizado por uma sequência clara e lógica de eventos, com início, meio e fim, que se destina a atingir um objetivo claro e definido, conduzido por pessoas dentro de parâmetros predefinidos de tempo, custo, recursos e qualidade.' },
  { term: 'Realidade aumentada (RA)', definition: 'Linha de pesquisa que lida com a integração do mundo real e elementos virtuais ou dados criados pelo computador, permitindo visualização de objetos e simulações em 3D.' },
  { term: 'Sincronia', definition: 'Comunicação ou interação que ocorre em tempo real, com simultaneidade entre os participantes. Exemplos: chat, webconferência, videoconferência.' },
  { term: 'Tecnologias da Informação e Comunicação (TIC)', definition: 'Conjunto de recursos tecnológicos utilizados para mediar a comunicação e a informação, incluindo computadores, internet, softwares, ambientes virtuais de aprendizagem, entre outros.' },
  { term: 'Tutor', definition: 'Profissional que atua na mediação pedagógica entre alunos e conteúdos, acompanhando o aluno ao longo do processo de aprendizagem, orientando, corrigindo atividades e mantendo contato com o professor responsável.' },
  { term: 'Universidade Aberta do Brasil (UAB)', definition: 'Sistema integrado por universidades públicas que oferece cursos de nível superior para camadas da população que têm dificuldade de acesso à formação universitária, por meio do uso da metodologia da educação a distância.' },
  { term: 'Videoaula', definition: 'Recurso audiovisual que complementa o material impresso, permitindo ao aluno visualizar situações, experiências e representações de realidades não-observáveis. Apresenta uma nova abordagem do conteúdo e contempla aprofundamentos teóricos e atividades de prática.' },
  { term: 'Webconferência', definition: 'Sistema de comunicação síncrona que permite interação por meio de áudio, vídeo e chat com os participantes. Permite compartilhamento de arquivos e da tela do apresentador.' },
  { term: 'Wiki', definition: 'Atividade assíncrona de construção coletiva de um texto, em que os participantes criam e editam o texto em conjunto, e o ambiente registra todas as versões e a contribuição de cada um.' }
];

/* ============================================================
 * CONQUISTAS — 19 conquistas
 * ------------------------------------------------------------
 * Campos:
 *   id           identificador único
 *   name         nome exibido
 *   description  descrição curta
 *   icon         emoji representativo (usado no fallback)
 *   trail        tema visual da medalha (define cor e ícone)
 *                valores: 'fundamentos' | 'planejamento' | 'producao'
 *                         | 'avaliacao' | 'atuacao' | 'praticas'
 *                         | 'boss' | 'global'
 *
 * As conquistas estudioso e curioso são automáticas:
 *   - estudioso  → abrir 3 temas de conteúdo
 *   - curioso    → abrir 5 termos do glossário
 * ============================================================ */

window.ACHIEVEMENTS = [
  {
    id: 'fundamentos-1',
    name: 'Fundamentos da EaD',
    description: 'Concluiu a primeira missão sobre o conceito de Educação a Distância.',
    icon: '📚',
    trail: 'fundamentos'
  },
  {
    id: 'fundamentos-2',
    name: 'Linha do Tempo',
    description: 'Identificou corretamente a terceira geração da EaD: as universidades abertas.',
    icon: '🕰️',
    trail: 'fundamentos'
  },
  {
    id: 'fundamentos-3',
    name: 'Legislação em Foco',
    description: 'Compreendeu a Portaria MEC nº 1.428/2018 e a oferta de disciplinas a distância em cursos presenciais.',
    icon: '⚖️',
    trail: 'fundamentos'
  },
  {
    id: 'fundamentos-4',
    name: 'Arquiteto(a) do AVA',
    description: 'Identificou o Wiki como ferramenta de construção coletiva de texto no Moodle.',
    icon: '💻',
    trail: 'fundamentos'
  },
  {
    id: 'planejamento-1',
    name: 'Planejador(a) Estratégico(a)',
    description: 'Compreendeu que o planejamento é o fio condutor da EaD.',
    icon: '📋',
    trail: 'planejamento'
  },
  {
    id: 'planejamento-2',
    name: 'Arquiteto(a) de Equipe',
    description: 'Identificou as funções dos profissionais da EaD previstas na Portaria nº 183/2016.',
    icon: '👥',
    trail: 'planejamento'
  },
  {
    id: 'planejamento-3',
    name: 'Planejador(a) de Disciplina',
    description: 'Reconheceu o Mapa de Atividades como ponto de partida do planejamento na EaD.',
    icon: '📝',
    trail: 'planejamento'
  },
  {
    id: 'producao-1',
    name: 'Produtor(a) de Material Impresso',
    description: 'Compreendeu o papel do material impresso como guia orientador na EaD.',
    icon: '📖',
    trail: 'producao'
  },
  {
    id: 'producao-2',
    name: 'Produtor(a) de Videoaula',
    description: 'Identificou o papel da videoaula como recurso de vínculo e contextualização.',
    icon: '🎬',
    trail: 'producao'
  },
  {
    id: 'producao-3',
    name: 'Produtor(a) de Hipermídias',
    description: 'Compreendeu a importância do planejamento de hiperlinks no material didático.',
    icon: '🌐',
    trail: 'producao'
  },
  {
    id: 'avaliacao-1',
    name: 'Avaliador(a) Formativo(a)',
    description: 'Identificou a avaliação formativa como bússola orientadora do processo.',
    icon: '📊',
    trail: 'avaliacao'
  },
  {
    id: 'atuacao-1',
    name: 'Professor(a) Formador(a)',
    description: 'Compreendeu as atribuições do professor formador no acompanhamento do curso.',
    icon: '👩‍🏫',
    trail: 'atuacao'
  },
  {
    id: 'praticas-1',
    name: 'Boas-Vindas Bem Dadas',
    description: 'Organizou o bloco Geral do AVA com os recursos essenciais.',
    icon: '🧪',
    trail: 'praticas'
  },
  {
    id: 'praticas-2',
    name: 'Comunidade Viva',
    description: 'Combinou recursos assíncronos e síncronos para estimular a interação.',
    icon: '💬',
    trail: 'praticas'
  },
  {
    id: 'praticas-3',
    name: 'Avaliador(a) Estratégico(a)',
    description: 'Combinou diferentes ferramentas de avaliação no Moodle.',
    icon: '📝',
    trail: 'praticas'
  },
  {
    id: 'praticas-4',
    name: 'Organizador(a) de AVA',
    description: 'Estruturou módulos com prazos, atividades e Progresso de Conclusão.',
    icon: '🗂️',
    trail: 'praticas'
  },
  {
    id: 'boss-final',
    name: 'Mestre do Desafio Integrador',
    description: 'Concluiu o Desafio Final com as decisões alinhadas ao Guia.',
    icon: '👑',
    trail: 'boss'
  },
  {
    id: 'estudioso',
    name: 'Estudioso(a)',
    description: 'Abriu 3 temas de conteúdo para revisão.',
    icon: '🔍',
    trail: 'global'
  },
  {
    id: 'curioso',
    name: 'Curioso(a)',
    description: 'Abriu 5 termos do glossário.',
    icon: '📖',
    trail: 'global'
  }
];

/* ============================================================
 * TEMAS DE CONTEÚDO — 9 temas de revisão
 * ============================================================ */

window.CONTENT_THEMES = [
  {
    id: 'tema-1',
    icon: '📚',
    title: 'Concepções de EaD',
    summary: 'Diferentes definições e tendências da Educação a Distância, incluindo a diferenciação entre Ensino a Distância e Educação a Distância.',
    pages: 'p. 40–47',
    missionId: 1
  },
  {
    id: 'tema-2',
    icon: '🕰️',
    title: 'Histórico da EaD',
    summary: 'As cinco gerações da EaD segundo Moore e Kearsley (2007): correspondência, rádio e TV, universidades abertas, teleconferência e classes virtuais.',
    pages: 'p. 48–52',
    missionId: 2
  },
  {
    id: 'tema-3',
    icon: '⚖️',
    title: 'Legislação da EaD no Brasil',
    summary: 'Principais marcos legais: LDB 9.394/96, Decreto 5.622/2005, Decreto 9.057/2017, Portaria MEC 1.428/2018 e Resolução CNE/CES 1/2016.',
    pages: 'p. 53–59',
    missionId: 3
  },
  {
    id: 'tema-4',
    icon: '🏛️',
    title: 'A EaD na UFU',
    summary: 'Histórico da EaD na UFU: criação do CEaD, credenciamento MEC, cursos ofertados, recredenciamento e parcerias com a UAB.',
    pages: 'p. 60–65',
    missionId: 5
  },
  {
    id: 'tema-5',
    icon: '👥',
    title: 'Profissionais da EaD',
    summary: 'Funções e atribuições dos profissionais envolvidos na oferta de cursos na EaD: coordenação, professores autores e formadores, tutores e equipe técnica.',
    pages: 'p. 70–71',
    missionId: 6
  },
  {
    id: 'tema-6',
    icon: '📝',
    title: 'Planejamento de Disciplina na EaD',
    summary: 'Etapas de planejamento de uma disciplina a distância: Mapa de Atividades, definição de mídias, produção de material, avaliação e cronograma.',
    pages: 'p. 71–94',
    missionId: 7
  },
  {
    id: 'tema-7',
    icon: '🎬',
    title: 'Produção de Material Didático',
    summary: 'Mídias impressa, audiovisual e hipermidiática. Videoaulas, webconferências, hipermídias, wiki, podcast, animações e imagens.',
    pages: 'p. 95–134',
    missionId: 8
  },
  {
    id: 'tema-8',
    icon: '📊',
    title: 'Avaliação na EaD',
    summary: 'Tipos de avaliação (diagnóstica, formativa e somativa), critérios, instrumentos e especificidades do sistema de avaliação na UFU.',
    pages: 'p. 136–168',
    missionId: 11
  },
  {
    id: 'tema-9',
    icon: '👩‍🏫',
    title: 'Atuação Docente e Tutoria',
    summary: 'Concepções de trabalho docente na EaD, equipes multidisciplinares, funções do professor autor e formador e do tutor, formas de acompanhamento e avaliação.',
    pages: 'p. 169–188',
    missionId: 12
  }
];