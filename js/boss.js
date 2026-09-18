/**
 * boss.js — Formação de Professores Autores e Formadores para EaD
 *
 * Parte 2 de 3: contém o Boss Final com 3 decisões sequenciais.
 * As 16 missões estão em missions.js.
 * Glossário, conquistas e temas estão em data.js.
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 */

window.BOSS = {
  id: 'boss-final',
  icon: '👑',
  title: 'O Desafio do Professor Autor',
  category: 'Desafio Integrador',
  character: 'amanda',
  characterIntro: 'Você chegou ao desafio final. Três decisões sequenciais. Cada uma depende da anterior. No final, você terá um plano de AVA validado (ou não) pelas orientações do Guia.',
  scenario: 'Você foi designado para ofertar uma disciplina de graduação a distância na UFU. O coordenador do curso pediu que você apresente, em 3 decisões sequenciais, o esboço completo do seu AVA no Moodle. Cada decisão depende da anterior.',
  scoring: { perCorrect: 25 },
  reward: { aura: 50, xp: 5000 },
  achievement: 'boss-final',
  decisions: [
    {
      id: 'boss-d1',
      title: 'Decisão 1 — Estrutura geral',
      prompt: 'Quantos módulos criar e qual a duração de cada um para uma disciplina de 60 horas?',
      options: [
        {
          text: 'Criar 4 módulos quinzenais, com 15 horas de estudo cada, totalizando 60 horas. Cada módulo terá objetivos claros, conteúdos organizados, atividades de estudo e avaliativas, além de prazos definidos para cada etapa.',
          correct: true,
          feedback: 'Correto. O Guia (p. 100) explica que os conteúdos devem ser organizados em módulos semanais ou quinzenais. Para 60 horas, 4 módulos quinzenais de 15 horas cada é uma organização adequada, permitindo que o aluno estude no seu ritmo dentro do prazo.'
        },
        {
          text: 'Criar 1 módulo único com 60 horas de estudo, para que o aluno tenha total flexibilidade e estude no seu próprio ritmo, sem pressões de prazos parciais definidos pelo professor.',
          correct: false,
          feedback: 'Você propôs 1 módulo único. O Guia (p. 100) explica que os conteúdos da disciplina em EaD devem ser encadeados em subdivisões lógicas e complementares, organizados em módulos semanais ou quinzenais. Um único módulo desorienta o aluno.'
        },
        {
          text: 'Criar 10 módulos semanais, com 6 horas de estudo cada, para que o aluno tenha prazos curtos e mantenha o ritmo de estudo constante ao longo de todo o semestre letivo da disciplina.',
          correct: false,
          feedback: 'Você propôs 10 módulos semanais de 6 horas. O Guia (p. 100) recomenda que a organização temporal dos ciclos de aprendizagem seja de uma semana ou uma quinzena, considerando a complexidade do material. Para 60 horas, 10 módulos de 6 horas podem ser muito fragmentados.'
        },
        {
          text: 'Criar 2 módulos mensais, com 30 horas de estudo cada, para que o aluno tenha mais tempo para se aprofundar nos conteúdos e realizar todas as atividades com bastante calma.',
          correct: false,
          feedback: 'Você propôs 2 módulos mensais de 30 horas. O Guia (p. 100) recomenda módulos semanais ou quinzenais. Módulos mensais podem fazer o aluno acumular conteúdo e perder o ritmo de estudo.'
        }
      ]
    },
    {
      id: 'boss-d2',
      title: 'Decisão 2 — Recursos de comunicação e interação',
      prompt: 'Quais recursos de comunicação e interação criar no bloco Geral do AVA?',
      options: [
        {
          text: 'Criar apenas o Fórum de Dúvidas, pois os alunos adultos são autônomos e não precisam de outros canais de comunicação ou interação com o professor e os demais colegas de turma.',
          correct: false,
          feedback: 'Você reduziu os recursos ao Fórum de Dúvidas. O Guia (p. 25–26) explica que o bloco Geral deve conter informações importantes sobre o curso e vários recursos de comunicação que serão utilizados (fórum de notícias, café virtual, sala de bate-papo, etc.).'
        },
        {
          text: 'Criar Fórum de Notícias como canal oficial, Fórum de Dúvidas com resposta em 24h, Fórum de Apresentação em Simples Discussão, Café Virtual e agendar Chat e Webconferência para síncronos.',
          correct: true,
          feedback: 'Correto. O Guia (p. 25–28) descreve esses recursos como essenciais. O Fórum de Notícias é o canal oficial. O Fórum de Dúvidas agiliza a resolução. O Fórum de Apresentação em Simples Discussão permite um único tópico central. O Café Virtual é um espaço de interação informal. O Chat e a Webconferência permitem interação síncrona.'
        },
        {
          text: 'Criar apenas o Fórum de Notícias, pois é o canal oficial de comunicação do professor com a turma, e os demais recursos são redundantes e desnecessários para a aprendizagem.',
          correct: false,
          feedback: 'Você reduziu os recursos ao Fórum de Notícias. O Guia (p. 25–28) descreve diversos recursos: Fórum de Dúvidas, Fórum de Apresentação, Café Virtual, Chat, Webconferência. Cada um tem uma função específica.'
        },
        {
          text: 'Não criar nenhum recurso de comunicação, pois a interação deve ocorrer apenas por e-mail, que é um canal mais direto e individualizado entre o professor e cada um dos alunos.',
          correct: false,
          feedback: 'Você propôs ausência de recursos de comunicação no AVA. O Guia (p. 25) explica que o AVA é configurado como um espaço social para interação de professor, tutor e aprendizes. O e-mail é um canal complementar, não o principal.'
        }
      ]
    },
    {
      id: 'boss-d3',
      title: 'Decisão 3 — Avaliação e cronograma',
      prompt: 'Como configurar as atividades avaliativas e o cronograma de prazos no AVA?',
      options: [
        {
          text: 'Configurar uma única prova presencial ao final da disciplina, com todo o conteúdo, sem atividades avaliativas ao longo do semestre, para garantir a imparcialidade e objetividade da avaliação dos alunos.',
          correct: false,
          feedback: 'Você propôs avaliação apenas ao final. O Guia (p. 148) explica que a avaliação formativa é uma bússola orientadora que consiste na prática da avaliação contínua realizada durante o processo de ensino e aprendizagem. A avaliação somativa final não é suficiente.'
        },
        {
          text: 'Configurar as atividades avaliativas com prazos flexíveis e sem restrições de acesso, para que o aluno possa realizá-las a qualquer momento do semestre, sem pressões de prazo algum.',
          correct: false,
          feedback: 'Você propôs prazos flexíveis sem restrições. O Guia (p. 100) explica que não podemos deixar o aluno interpretar, erroneamente, que na EaD não há prazos para se realizar as atividades. Os prazos, dentro da flexibilidade, são essenciais.'
        },
        {
          text: 'Configurar atividades avaliativas com datas de abertura e fechamento, combinando ferramentas como Tarefa, Questionário, Glossário, Wiki e Fórum, distribuindo o valor entre critérios claros e usando o Progresso de Conclusão como guia.',
          correct: true,
          feedback: 'Correto. O Guia (p. 29–30 e p. 156–163) descreve diversas ferramentas e suas potencialidades. A avaliação deve ser contínua e formativa, com prazos definidos e critérios claros. O Progresso de Conclusão orienta o aluno sobre o que já foi realizado e o que falta.'
        },
        {
          text: 'Configurar as atividades avaliativas sem critérios de correção previamente definidos, para que o professor tenha liberdade total na avaliação e possa considerar o contexto e as dificuldades individuais de cada aluno.',
          correct: false,
          feedback: 'Você propôs ausência de critérios. O Guia (p. 149) explica que no processo avaliativo os professores devem tornar públicas todas as informações referentes às avaliações, desde o início do processo, para que o aluno não seja surpreendido. A isso chamamos critérios de avaliação.'
        }
      ]
    }
  ]
};