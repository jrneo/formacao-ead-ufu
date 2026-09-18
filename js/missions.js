/**
 * missions.js — Formação de Professores Autores e Formadores para EaD
 *
 * Parte 1 de 3: contém as 16 missões do LDI.
 * O Boss Final está em boss.js.
 * Glossário, conquistas e temas estão em data.js.
 *
 * Autor do projeto: Dirceu Nogueira de Sales Duarte Junior
 */

window.MISSIONS = [

  {
    id: 1,
    icon: '📚',
    title: 'O que é Educação a Distância?',
    category: 'Módulo 1 — Fundamentos da EaD',
    trail: 'fundamentos',
    character: 'amanda',
    characterIntro: 'Olá, colega! Antes de planejar qualquer disciplina a distância, precisamos alinhar o conceito. O que é, para você, Educação a Distância?',
    question: 'Qual das definições abaixo está mais alinhada à concepção de EaD adotada pela UFU no Guia de Estudos?',
    options: [
      {
        text: 'Processo de ensino e aprendizagem em que professores e alunos estão separados espacial e/ou temporalmente, mas podem estar próximos por meio da mediação de tecnologias de comunicação e informação.',
        correct: false,
        feedback: 'Você focou na separação espacial/temporal. O Guia (p. 41) reconhece esse aspecto, mas adota uma concepção mais ampla: a EaD é uma prática educativa situada e mediatizada, que leva o aluno a aprender a aprender, a saber pensar, criar, inovar e construir conhecimento.'
      },
      {
        text: 'Modalidade educacional em que a mediação didático-pedagógica ocorre com meios e tecnologias de informação e comunicação, com estudantes e professores em lugares ou tempos diversos.',
        correct: true,
        feedback: 'Correto. É exatamente a definição do Art. 1º do Decreto nº 5.622/2005, citada no Guia (p. 41) como uma concepção próxima da adotada pela maioria dos autores. O Guia complementa que a EaD é mais do que uma inovação técnica — é uma inovação social nas instituições de ensino superior.'
      },
      {
        text: 'Ensino a Distância é o processo de transmissão de conteúdos em que o professor é o único sujeito que ensina e o aluno é receptor passivo do conhecimento, sem autonomia nem corresponsabilidade.',
        correct: false,
        feedback: 'Você usou o termo Ensino a Distância e descreveu uma relação unilateral. O Guia (p. 41) diferencia: ensino está ligado a treinamento e instrução; educação refere-se à prática educativa que leva o aluno a aprender a aprender. A EaD adotada pela UFU privilegia a autonomia e a corresponsabilidade do aluno.'
      },
      {
        text: 'Educação a Distância é uma modalidade que substitui a educação presencial e dispensa a presença do professor, pois o aluno aprende sozinho com o material didático impresso e digital oferecido.',
        correct: false,
        feedback: 'Você afirmou que a EaD substitui a presencial e dispensa o professor. O Guia (p. 42) é claro: a EaD não pode ser vista como substituta da educação convencional, presencial. São duas modalidades do mesmo processo. Além disso, o professor continua sendo fundamental como mediador e proponente das atividades.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'fundamentos-1',
    applicationNote: 'Ao planejar sua disciplina, tenha clareza sobre qual concepção de EaD orienta sua prática. Isso refletirá no material, na avaliação e na mediação pedagógica.',
    source: {
      chapter: 'Módulo 1 — Fundamentos da EaD',
      pages: 'p. 40–47'
    }
  },

  {
    id: 2,
    icon: '🕰️',
    title: 'Linha do Tempo da EaD',
    category: 'Módulo 1 — Fundamentos da EaD',
    trail: 'fundamentos',
    character: 'amanda',
    characterIntro: 'Você sabia que a EaD não é uma invenção recente? Ela tem uma longa história de experimentações. Vamos testar seus conhecimentos?',
    question: 'Segundo Moore e Kearsley (2007), citados no Guia, a EaD evoluiu em cinco gerações. Qual das alternativas descreve corretamente a terceira geração?',
    options: [
      {
        text: 'Estudo por correspondência, com materiais impressos enviados pelo correio e comunicação assíncrona entre professor e aluno, sendo esta a primeira geração da EaD.',
        correct: false,
        feedback: 'Você descreveu a primeira geração (estudo por correspondência). O Guia (p. 49) explica que essa geração utilizava serviços postais baratos e confiáveis, impulsionados pela expansão das redes ferroviárias no século XIX.'
      },
      {
        text: 'Transmissão por rádio e TV, agregando as dimensões oral e visual à apresentação de informações aos alunos a distância, sendo esta a segunda geração da EaD.',
        correct: false,
        feedback: 'Você descreveu a segunda geração (rádio e TV). O Guia (p. 50) menciona que a primeira autorização para emissora educacional foi concedida em 1921, e a televisão educativa começou em 1934, na University of Iowa.'
      },
      {
        text: 'Universidades abertas que passaram a integrar áudio, vídeo e correspondências, com orientação face a face, equipes de cursos e método prático de criação e veiculação de instrução sistêmica.',
        correct: true,
        feedback: 'Correto. O Guia (p. 51) descreve a terceira geração como as universidades abertas, que integraram áudio, vídeo e correspondências, com orientação face a face e equipes de cursos. O final da década de 1960 e início da de 1970 marcou um período de mudanças importantes na EaD.'
      },
      {
        text: 'Teleconferência por áudio, vídeo e computador, proporcionando interação a distância em tempo real entre alunos e instrutores, sendo esta a quarta geração da EaD.',
        correct: false,
        feedback: 'Você descreveu a quarta geração (teleconferência). O Guia (p. 51) explica que essa geração surgiu nos Estados Unidos nos anos 1980 e era baseada na tecnologia da teleconferência, elaborada para o uso de grupos.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'fundamentos-2',
    applicationNote: 'Conhecer a história da EaD ajuda a entender por que a modalidade chegou ao modelo atual e como as tecnologias foram incorporadas.',
    source: {
      chapter: 'Módulo 1 — Fundamentos da EaD',
      pages: 'p. 48–52'
    }
  },

  {
    id: 3,
    icon: '⚖️',
    title: 'Leis que Sustentam a EaD',
    category: 'Módulo 1 — Fundamentos da EaD',
    trail: 'fundamentos',
    character: 'carlos',
    characterIntro: 'Olá, colega! A EaD no Brasil é regulamentada por leis e decretos. Conhecer essa legislação é fundamental para planejar sua disciplina dentro das normas.',
    question: 'Qual documento legal, citado no Guia, estabeleceu as normas para a oferta de disciplinas na modalidade a distância em cursos de graduação presencial, permitindo até 20% da carga horária total do curso?',
    options: [
      {
        text: 'Portaria MEC nº 1.428, de 28 de dezembro de 2018, que dispõe sobre a oferta, por Instituições de Educação Superior (IES), de disciplinas na modalidade a distância em cursos presenciais.',
        correct: true,
        feedback: 'Correto. O Guia (p. 56–57) cita a Portaria MEC nº 1.428/2018, que revogou a Portaria MEC nº 1.334/2016 e estabeleceu que as IES podem introduzir a oferta de disciplinas a distância em cursos presenciais, até o limite de 20% da carga horária total do curso.'
      },
      {
        text: 'Decreto nº 5.622, de 19 de dezembro de 2005, que regulamentou o Art. 80 da Lei de Diretrizes e Bases da Educação Nacional (LDB) e definiu regras gerais para a oferta de EaD no Brasil.',
        correct: false,
        feedback: 'Você citou o Decreto nº 5.622/2005, que foi um marco importante, mas foi revogado pelo Decreto nº 9.057/2017. O Guia (p. 54) explica que o decreto de 2005 regulamentou o Art. 80 da LDB.'
      },
      {
        text: 'Lei de Diretrizes e Bases da Educação Nacional (LDB) nº 9.394, de 20 de dezembro de 1996, que estabeleceu as diretrizes e bases da educação nacional brasileira de todos os níveis e modalidades.',
        correct: false,
        feedback: 'Você citou a LDB, que é a base legal da educação brasileira. O Guia (p. 54) menciona que o Art. 80 da LDB foi regulamentado por decretos posteriores. A pergunta se refere especificamente à oferta de disciplinas a distância em cursos presenciais.'
      },
      {
        text: 'Decreto nº 9.057, de 25 de maio de 2017, que regulamenta o Art. 80 da LDB e estabelece as diretrizes para a oferta de EaD no Brasil em todos os níveis e modalidades educacionais.',
        correct: false,
        feedback: 'Você citou o Decreto nº 9.057/2017, que revogou o Decreto nº 5.622/2005 e é o atual regulamento da EaD no Brasil. No entanto, a pergunta se refere à oferta de disciplinas a distância em cursos presenciais, regulamentada pela Portaria MEC nº 1.428/2018.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'fundamentos-3',
    applicationNote: 'Ao planejar uma disciplina a distância em curso presencial, consulte a Portaria MEC nº 1.428/2018 e o Projeto Pedagógico do curso.',
    source: {
      chapter: 'Módulo 1 — Fundamentos da EaD',
      pages: 'p. 53–59'
    }
  },

  {
    id: 4,
    icon: '💻',
    title: 'O Ambiente Virtual de Aprendizagem',
    category: 'Módulo 1 — Fundamentos da EaD',
    trail: 'fundamentos',
    character: 'amanda',
    characterIntro: 'O AVA Moodle é o espaço onde tudo acontece na EaD. Você conhece as ferramentas e suas potencialidades pedagógicas?',
    question: 'Segundo o Guia, qual das ferramentas do Moodle é uma atividade assíncrona de construção coletiva de um texto, em que os participantes criam e editam o texto em conjunto, e o ambiente registra todas as versões e a contribuição de cada um?',
    options: [
      {
        text: 'Fórum, que permite a interação assíncrona entre professores e alunos, com a possibilidade de abrir tópicos ilimitados para discussão de um tema proposto pelo professor da disciplina.',
        correct: false,
        feedback: 'Você citou o Fórum, que é uma atividade assíncrona de interação, mas não se trata de construção coletiva de um texto único. O Guia (p. 27–28) descreve o Fórum como espaço de troca de informações e discussão de ideias.'
      },
      {
        text: 'Diário, que é uma atividade assíncrona em que o aluno registra suas reflexões sobre determinado assunto, de forma progressiva, e apenas o professor tem acesso às anotações feitas por ele.',
        correct: false,
        feedback: 'Você citou o Diário, que é uma atividade de reflexão individual e progressiva, mas não é uma construção coletiva. O Guia (p. 30) explica que o Diário é uma atividade de reflexão orientada, na qual o aluno anota suas reflexões diariamente.'
      },
      {
        text: 'Glossário, que é uma atividade assíncrona que permite aos participantes inserir termos relevantes para a compreensão de determinados temas discutidos nas disciplinas ofertadas.',
        correct: false,
        feedback: 'Você citou o Glossário, que é uma atividade colaborativa, mas não se trata da construção de um texto único. O Guia (p. 30) descreve o Glossário como um espaço para inserir termos e definições, que podem ser comentados pelos colegas.'
      },
      {
        text: 'Wiki, que é uma atividade assíncrona de construção coletiva de um texto, em que os participantes criam e editam o texto em conjunto, e o ambiente registra todas as versões e a contribuição de cada um.',
        correct: true,
        feedback: 'Correto. O Guia (p. 30) descreve o Wiki como uma atividade assíncrona de construção coletiva de um texto. Os participantes do curso criam e editam o texto em conjunto, porém todos têm o direito de modificá-lo livremente. O ambiente Moodle registra todas as versões e a contribuição de cada participante.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'fundamentos-4',
    applicationNote: 'Ao planejar uma atividade colaborativa no Moodle, considere o Wiki para construção coletiva de texto e o Fórum para discussão de ideias.',
    source: {
      chapter: 'Módulo 1 — Fundamentos da EaD',
      pages: 'p. 20–39'
    }
  },

  {
    id: 5,
    icon: '📋',
    title: 'Planejando na EaD',
    category: 'Módulo 2 — Planejamento e Gestão em EaD',
    trail: 'planejamento',
    character: 'amanda',
    characterIntro: 'Olá, colega! Na EaD o planejamento é o fio condutor de todo o processo. Diferente do presencial, não dá para improvisar.',
    question: 'Segundo o Guia, por que o planejamento é considerado o fio condutor da Educação a Distância?',
    options: [
      {
        text: 'Porque, na EaD, alunos e professores estão em espaços e tempos distintos, mediados por tecnologias, o que exige um planejamento detalhado das etapas do antes, durante e depois do curso.',
        correct: true,
        feedback: 'Correto. O Guia (p. 71) afirma: o planejamento é o fio condutor da EaD, pois, nessa modalidade de ensino e aprendizagem, em que alunos e professores estão muitas vezes em espaços e tempos distintos, mediados por tecnologias, precisamos ser bem prescritivos, exigindo um planejamento detalhado das etapas do antes, durante e do depois do curso.'
      },
      {
        text: 'Porque o planejamento permite que o professor modifique o conteúdo da disciplina a qualquer momento, sem necessidade de previsão antecipada ou adaptação do material didático já produzido.',
        correct: false,
        feedback: 'Você afirmou que o conteúdo pode ser modificado a qualquer momento. O Guia (p. 67) explica que, na EaD, quando a disciplina é ofertada, o material didático está finalizado, com flexibilidade restrita para modificações.'
      },
      {
        text: 'Porque o planejamento é uma formalidade legal exigida pelo MEC para a oferta de cursos a distância, mas não interfere na qualidade do processo de ensino e aprendizagem ofertado.',
        correct: false,
        feedback: 'Você reduziu o planejamento a uma formalidade. O Guia (p. 61) cita Padilha (2001): Planejamento é o processo de busca de equilíbrio entre meios e fins, entre recursos e objetivos. E acrescenta: O ato de planejar é sempre processo de reflexão, de tomada de decisão sobre a ação.'
      },
      {
        text: 'Porque o planejamento é responsabilidade exclusiva da coordenação do curso, cabendo ao professor apenas executar o que foi definido nos documentos institucionais previamente aprovados.',
        correct: false,
        feedback: 'Você atribuiu o planejamento apenas à coordenação. O Guia (p. 60) afirma que os envolvidos no processo de EaD — como coordenadores, professores autores, professores formadores, instrutores e equipe técnica — precisam trabalhar de forma conjunta e com visão de todo o processo.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'planejamento-1',
    applicationNote: 'Ao planejar sua disciplina, detalhe as etapas do antes, durante e depois. Na EaD, a clareza das orientações é condição para o sucesso do aluno.',
    source: {
      chapter: 'Módulo 2 — Planejamento e Gestão em EaD',
      pages: 'p. 60–68'
    }
  },

  {
    id: 6,
    icon: '👥',
    title: 'Projetos e Profissionais da EaD',
    category: 'Módulo 2 — Planejamento e Gestão em EaD',
    trail: 'planejamento',
    character: 'carlos',
    characterIntro: 'Olá, colega! Um curso a distância não se faz sozinho. Ele envolve uma equipe multidisciplinar. Você sabe quem são esses profissionais?',
    question: 'Segundo o Guia, nos cursos ofertados totalmente a distância no âmbito da UAB, quais funções são preestabelecidas pela Portaria nº 183/2016?',
    options: [
      {
        text: 'Apenas as funções de professor e tutor, sendo as demais atribuições acumuladas por esses dois profissionais, conforme a necessidade de cada curso ofertado pelas instituições públicas de ensino.',
        correct: false,
        feedback: 'Você reduziu a equipe a professor e tutor. O Guia (p. 70) cita a Portaria nº 183/2016, que prevê as funções de coordenação de curso, coordenação de tutoria, tutor, professor conteudista e formador.'
      },
      {
        text: 'Coordenação de curso, coordenação de tutoria, tutor, professor conteudista e formador, conforme previsto na Portaria nº 183, de 21 de outubro de 2016, que define as funções dos agentes na UAB.',
        correct: true,
        feedback: 'Correto. O Guia (p. 70) afirma: Nos cursos ofertados totalmente a distância no âmbito da UAB, há agentes preestabelecidos pelo programa, conforme Portaria nº 183, de 21 de outubro de 2016, que prevê funções de coordenação de curso, coordenação de tutoria, tutor, professor conteudista e formador.'
      },
      {
        text: 'Somente a função de coordenador geral, que acumula todas as demais atribuições — como professor, tutor, conteudista e formador —, pois a UAB prioriza economia de recursos humanos nos cursos.',
        correct: false,
        feedback: 'Você afirmou que apenas o coordenador geral acumula todas as funções. O Guia (p. 70) lista cinco funções distintas: coordenação de curso, coordenação de tutoria, tutor, professor conteudista e formador.'
      },
      {
        text: 'Apenas as funções de professor conteudista e tutor, cabendo à coordenação de curso somente a gestão administrativa e financeira do curso, sem envolvimento pedagógico nas atividades de ensino.',
        correct: false,
        feedback: 'Você separou a coordenação do pedagógico. O Guia (p. 70) afirma que dividir o trabalho, atribuir responsabilidades e estabelecer mecanismos de comunicação e coordenação são ações imprescindíveis na organização de um curso.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'planejamento-2',
    applicationNote: 'Ao planejar sua disciplina, conheça as funções de cada profissional da equipe multidisciplinar e saiba com quem dialogar em cada etapa.',
    source: {
      chapter: 'Módulo 2 — Planejamento e Gestão em EaD',
      pages: 'p. 70–71'
    }
  },

  {
    id: 7,
    icon: '📝',
    title: 'A Disciplina na EaD',
    category: 'Módulo 2 — Planejamento e Gestão em EaD',
    trail: 'planejamento',
    character: 'amanda',
    characterIntro: 'Você já tem o Projeto Pedagógico aprovado. Agora é hora de estruturar a disciplina e produzir o material. Por onde começar?',
    question: 'Segundo o Guia, o que o professor deve elaborar ANTES de começar a escrever o conteúdo do material didático de sua disciplina?',
    options: [
      {
        text: 'O material didático completo, com todos os textos, atividades e avaliações, para depois definir o mapa de atividades e o cronograma de oferta da disciplina na plataforma Moodle da instituição.',
        correct: false,
        feedback: 'Você inverteu a ordem. O Guia (p. 97) é claro: Antes de começar a compor o material didático-pedagógico do curso, é necessário elaborar o Mapa de Atividades da disciplina. Sem o mapa de atividades, não há o que fazer.'
      },
      {
        text: 'Apenas o cronograma de oferta da disciplina, com as datas de início e fim de cada módulo, deixando a definição das atividades e do material didático para o momento da oferta aos alunos.',
        correct: false,
        feedback: 'Você reduziu o planejamento ao cronograma. O Guia (p. 97) explica que o mapa de atividades é o elemento organizativo das aulas, no qual o professor planeja todo o desenvolvimento da disciplina.'
      },
      {
        text: 'O Mapa de Atividades da disciplina, ponto de partida e referência de todo o processo de concepção do material, no qual o professor planeja objetivos, conteúdos, atividades, mídias e avaliação.',
        correct: true,
        feedback: 'Correto. O Guia (p. 97) afirma: Antes de começar a compor o material didático-pedagógico do curso, é necessário elaborar o Mapa de Atividades da disciplina. Sem o mapa de atividades, não há o que fazer. Ele é o ponto de partida e referência para todo o processo de concepção e elaboração do material da disciplina.'
      },
      {
        text: 'O plano de ensino no formato tradicional, com ementa, objetivos, conteúdos e bibliografia, sem detalhamento das atividades, mídias e formas de avaliação que serão utilizadas na modalidade a distância.',
        correct: false,
        feedback: 'Você citou o plano de ensino tradicional. O Guia (p. 97) explica que o plano de curso permite uma visão geral da disciplina e pode ou não ser cumprido pelo professor. Já o mapa de atividades pressupõe o desenvolvimento da maioria das suas ações.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'planejamento-3',
    applicationNote: 'Ao planejar sua disciplina, comece pelo Mapa de Atividades. Ele orientará a produção do material e a mediação do tutor.',
    source: {
      chapter: 'Módulo 2 — Planejamento e Gestão em EaD',
      pages: 'p. 71–94'
    }
  },

  {
    id: 8,
    icon: '📖',
    title: 'Produção de Material Impresso',
    category: 'Módulo 3 — Produção de Material Didático',
    trail: 'producao',
    character: 'amanda',
    characterIntro: 'Você sabia que, mesmo na era digital, o material impresso continua sendo a mídia mais acessível na EaD? Vamos entender por quê?',
    question: 'Segundo o Guia, qual é o papel do material impresso na Educação a Distância contemporânea?',
    options: [
      {
        text: 'O material impresso é uma mídia obsoleta que deve ser substituída integralmente pelas mídias digitais, pois a EaD contemporânea exige uso exclusivo de tecnologias online para garantir qualidade.',
        correct: false,
        feedback: 'Você considerou o material impresso obsoleto. O Guia (p. 103) afirma: Em uma visão superficial, o uso do material impresso na Educação a Distância pode parecer anacrônico. Porém, entre as suas vantagens, destaca-se a ausência de qualquer equipamento especial para sua visualização.'
      },
      {
        text: 'O material impresso é a única fonte de informação e produção de conhecimento dos alunos, suficiente por si só para garantir a aprendizagem, sem complementação por outras mídias digitais.',
        correct: false,
        feedback: 'Você afirmou que o material impresso é a única fonte. O Guia (p. 108) é claro: O material instrucional impresso não pode ser visto como a única fonte de informação e produção de conhecimento dos alunos, pois apresenta apenas os conteúdos básicos da disciplina.'
      },
      {
        text: 'O material impresso é importante, mas pode ser produzido sem cuidados específicos de linguagem, pois o aluno da EaD já está habituado à leitura de textos acadêmicos densos e complexos.',
        correct: false,
        feedback: 'Você afirmou que o material impresso não precisa de cuidados de linguagem. O Guia (p. 108–110) explica que a linguagem empregada pelos autores na produção do material instrucional deve ser aproximativa, dirigindo-se diretamente ao aluno.'
      },
      {
        text: 'O material impresso é um guia orientador que apresenta os conteúdos básicos da disciplina e ajuda o aluno a navegar por outros materiais, sendo a mídia mais acessível nos cursos a distância.',
        correct: true,
        feedback: 'Correto. O Guia (p. 103–108) afirma: O material impresso é o guia de estudo dos conteúdos básicos das disciplinas. Chamamos de guia de estudo porque o material impresso é o delineador do curso a distância.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'producao-1',
    applicationNote: 'Ao produzir o material impresso, escreva com linguagem dialógica e inclua indicações de leituras complementares, vídeos e atividades.',
    source: {
      chapter: 'Módulo 3 — Produção de Material Didático',
      pages: 'p. 97–110'
    }
  },

  {
    id: 9,
    icon: '🎬',
    title: 'Videoaula e Webconferência',
    category: 'Módulo 3 — Produção de Material Didático',
    trail: 'producao',
    character: 'amanda',
    characterIntro: 'A videoaula é um recurso audiovisual muito utilizado na EaD. Mas qual é o seu papel pedagógico? Vamos descobrir?',
    question: 'Segundo o Guia, qual é o principal objetivo da videoaula em um curso a distância?',
    options: [
      {
        text: 'Permitir que o aluno conheça o professor, criando relação mais humana e vínculo que aproxima docente e aluno, além de orientar a condução da disciplina e contextualizar conteúdos com a prática.',
        correct: true,
        feedback: 'Correto. O Guia (p. 112–113) afirma: O primeiro e fundamental objetivo desse recurso é permitir que o aluno conheça você, docente, que personifica, nesse instante, toda a credibilidade da instituição de ensino. E complementa: Esse processo cria uma relação mais humana, um vínculo que tende a fazer uma aproximação entre o professor e o aluno.'
      },
      {
        text: 'Repetir, no vídeo, pura e simplesmente, a informação que o aluno já recebeu no material impresso, garantindo que o conteúdo seja assimilado por meio da repetição e da memorização contínua.',
        correct: false,
        feedback: 'Você afirmou que a videoaula deve repetir o material impresso. O Guia (p. 113) é claro: Sugere-se que não haja duplicidade de informação entre o guia impresso e a videoaula. A videoaula deve, ao contrário, aprofundar ou detalhar temas, tópicos ou saberes constantes do guia impresso.'
      },
      {
        text: 'Substituir integralmente o material impresso, tornando-se a única fonte de conteúdo da disciplina, pois o formato audiovisual é mais atrativo e garante maior engajamento dos alunos no curso.',
        correct: false,
        feedback: 'Você afirmou que a videoaula substitui o material impresso. O Guia (p. 112) explica que os alunos recebem o material impresso, via correio, e que esse material contempla, na essência, a totalidade dos temas abordados na disciplina. A videoaula é um complemento.'
      },
      {
        text: 'Avaliar o desempenho dos alunos por meio de questionários aplicados durante a exibição do vídeo, garantindo que todos assistam ao conteúdo completo antes de prosseguir à etapa seguinte.',
        correct: false,
        feedback: 'Você atribuiu à videoaula uma função avaliativa. O Guia (p. 113) explica que a videoaula é um recurso de ensino e aprendizagem, que orienta o aluno sobre a condução da disciplina e contextualiza os conteúdos com a prática.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'producao-2',
    applicationNote: 'Ao planejar sua videoaula, evite repetir o material impresso. Aprofunde temas complexos e mostre como se relacionam com a prática.',
    source: {
      chapter: 'Módulo 3 — Produção de Material Didático',
      pages: 'p. 111–117'
    }
  },

  {
    id: 10,
    icon: '🌐',
    title: 'Hipermídias e Wiki',
    category: 'Módulo 3 — Produção de Material Didático',
    trail: 'producao',
    character: 'amanda',
    characterIntro: 'As hipermídias e o Wiki são recursos poderosos na EaD. Mas é preciso usá-los com planejamento. Vamos refletir?',
    question: 'Segundo o Guia, qual é o cuidado fundamental ao introduzir hiperlinks no material didático?',
    options: [
      {
        text: 'Inserir o máximo possível de hiperlinks no texto, para que o aluno tenha acesso a uma grande quantidade de informações complementares, mesmo que isso o leve a se dispersar do conteúdo principal.',
        correct: false,
        feedback: 'Você defendeu o excesso de hiperlinks. O Guia (p. 122) alerta: Tenha cuidado para não inserir excesso de hiperlinks, para o aluno não se perder nas navegações.'
      },
      {
        text: 'Introduzir o hipertexto de maneira planejada, orientando o aluno para a volta ao texto básico, evitando que ele se disperse do conteúdo específico da disciplina, garantindo vínculo com o texto.',
        correct: true,
        feedback: 'Correto. O Guia (p. 122) afirma: O hipertexto deve ser introduzido de maneira planejada, para que não se configure como um conjunto de hiperlinks sem vínculos com o conteúdo básico. E acrescenta: Ao usar hiperlinks, você, professor, deve tomar o cuidado de orientar o aluno para a sua volta ao texto básico.'
      },
      {
        text: 'Utilizar apenas hiperlinks para páginas externas, evitando links internos ao próprio material, pois estes podem confundir o aluno e dificultar a navegação no ambiente virtual de aprendizagem.',
        correct: false,
        feedback: 'Você restringiu os hiperlinks a páginas externas. O Guia (p. 121) explica que o hipertexto permite ao leitor navegar por entre outros textos e mídias dentro de um conteúdo específico, incluindo links internos.'
      },
      {
        text: 'Inserir hiperlinks apenas em materiais impressos, pois no ambiente virtual de aprendizagem o aluno já tem acesso a todos os conteúdos de que precisa, sem necessidade de links adicionais.',
        correct: false,
        feedback: 'Você restringiu os hiperlinks ao material impresso. O Guia (p. 118) explica que a Internet, ou o Ambiente Virtual de Aprendizagem, tem o papel de cuidar da interação e da interatividade entre os sujeitos envolvidos no processo de ensino e aprendizagem.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'producao-3',
    applicationNote: 'Ao usar hiperlinks, oriente o aluno para a volta ao texto básico e garanta que os links tenham vínculo com o conteúdo da disciplina.',
    source: {
      chapter: 'Módulo 3 — Produção de Material Didático',
      pages: 'p. 118–134'
    }
  },

  {
    id: 11,
    icon: '📊',
    title: 'Avaliação na EaD',
    category: 'Módulo 4 — Avaliação da Aprendizagem',
    trail: 'avaliacao',
    character: 'amanda',
    characterIntro: 'A avaliação é parte integrante do processo de ensino e aprendizagem. Mas como avaliar a distância? Vamos refletir sobre os tipos?',
    question: 'Segundo o Guia, qual é o tipo de avaliação que ocorre em diversos momentos do processo de ensino e aprendizagem, permitindo constatar se os alunos atingem os objetivos e fornecendo feedback contínuo?',
    options: [
      {
        text: 'Avaliação somativa, que tem o propósito de classificar os alunos ao final de um período de ensino, de acordo com o nível de aprendizagem, utilizando testes e provas para verificar objetivos.',
        correct: false,
        feedback: 'Você citou a avaliação somativa. O Guia (p. 148) explica que a avaliação somativa tem o propósito de classificar os alunos ao final de um período de ensino, de acordo com o nível de aprendizagem. Ela não é contínua nem fornece feedback durante o processo.'
      },
      {
        text: 'Avaliação diagnóstica, que é realizada no início de um ano, semestre ou unidade de ensino, permitindo ao professor averiguar os conhecimentos que o aluno já possui frente às novas propostas.',
        correct: false,
        feedback: 'Você citou a avaliação diagnóstica. O Guia (p. 147) explica que ela é realizada, geralmente, no início de um ano, semestre ou de uma unidade de ensino, permitindo ao professor averiguar os conhecimentos prévios dos alunos.'
      },
      {
        text: 'Avaliação formativa, que ocorre em diversos momentos do processo de ensino e aprendizagem, permitindo constatar se os alunos atingem os objetivos e fornecendo feedback que detecta falhas.',
        correct: true,
        feedback: 'Correto. O Guia (p. 148) afirma: A avaliação formativa permite constatar se os alunos estão atingindo os objetivos propostos. Também possibilita verificar a compatibilidade entre tais objetivos e os resultados efetivamente alcançados durante o desenvolvimento das atividades propostas. E acrescenta: A avaliação formativa é uma bússola orientadora que consiste na prática da avaliação contínua realizada durante o processo de ensino e aprendizagem.'
      },
      {
        text: 'Avaliação comparativa, que permite ao professor comparar o desempenho dos alunos entre si, estabelecendo rankings e classificações que estimulam a competição saudável entre eles.',
        correct: false,
        feedback: 'Você citou uma avaliação comparativa, que não é mencionada no Guia. O Guia (p. 147–148) apresenta três tipos: diagnóstica, formativa e somativa. A avaliação comparativa entre alunos não é adotada pela UFU.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'avaliacao-1',
    applicationNote: 'Ao planejar a avaliação de sua disciplina, privilegie a avaliação formativa, que perpassa todo o processo de aprendizagem.',
    source: {
      chapter: 'Módulo 4 — Avaliação da Aprendizagem',
      pages: 'p. 136–168'
    }
  },

  {
    id: 12,
    icon: '👩‍🏫',
    title: 'Professor, Tutor e Formador',
    category: 'Módulo 5 — Atuação Docente',
    trail: 'atuacao',
    character: 'carlos',
    characterIntro: 'Olá, colega! Na EaD a atuação docente é compartilhada. Você sabe qual é o papel do professor formador no acompanhamento do curso?',
    question: 'Segundo o Guia, qual é o papel do professor formador no acompanhamento de uma disciplina a distância?',
    options: [
      {
        text: 'O professor formador é responsável apenas pela produção do material didático, não tendo nenhuma atribuição no acompanhamento da disciplina após o início da oferta aos alunos matriculados.',
        correct: false,
        feedback: 'Você restringiu o professor formador à produção de material. O Guia (p. 176) explica que, finalizada a elaboração do material, o professor formador entra em ação para garantir o acompanhamento do curso.'
      },
      {
        text: 'O professor formador é responsável apenas pela correção das provas presenciais, não tendo atribuições relacionadas à orientação de tutores ou ao acompanhamento pedagógico no AVA.',
        correct: false,
        feedback: 'Você restringiu o professor formador à correção de provas. O Guia (p. 176) lista diversas atribuições: elaboração de atividades, planejamento de avaliações, acompanhamento da mediação pedagógica dos tutores, esclarecimento de dúvidas em webconferências e supervisão da correção.'
      },
      {
        text: 'O professor formador é responsável apenas pelo esclarecimento de dúvidas dos alunos, não tendo atribuições relacionadas à orientação de tutores, ao planejamento de avaliações ou à supervisão da correção das atividades avaliativas.',
        correct: false,
        feedback: 'Você restringiu o professor formador ao esclarecimento de dúvidas. O Guia (p. 176) lista: elaboração de atividades, planejamento de avaliações, acompanhamento da mediação pedagógica dos tutores, esclarecimento de dúvidas em webconferências e supervisão da correção.'
      },
      {
        text: 'O professor formador acompanha a disciplina, elaborando atividades, planejando avaliações e chaves de correção, acompanhando a mediação dos tutores e supervisionando a correção das atividades avaliativas por eles realizada.',
        correct: true,
        feedback: 'Correto. O Guia (p. 176–177) lista as seguintes atribuições do professor formador: elaboração de atividades de estudo a serem inseridas no AVA; planejamento das avaliações; acompanhamento da mediação pedagógica realizada pelos tutores; esclarecimento de dúvidas dos alunos em relação ao conteúdo e às atividades por meio de webconferências; supervisão da correção das atividades avaliativas realizada pelos tutores.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'atuacao-1',
    applicationNote: 'Ao atuar como professor formador, lembre-se de que sua atuação não se encerra na produção do material: você acompanha, orienta e supervisiona todo o processo.',
    source: {
      chapter: 'Módulo 5 — Atuação Docente',
      pages: 'p. 169–188'
    }
  },

  {
    id: 13,
    icon: '🧪',
    title: 'O primeiro bloco: boas-vindas e organização',
    category: 'Módulo Extra — Laboratório de Práticas',
    trail: 'praticas',
    character: 'amanda',
    characterIntro: 'Você acaba de receber a notícia de que vai ofertar sua disciplina de graduação a distância na UFU. O ambiente Moodle está vazio. Você tem 60 horas de carga horária, 30 alunos matriculados e precisa começar a organizar o AVA. Por onde começar?',
    question: 'Qual deve ser sua primeira ação ao organizar o AVA Moodle para sua disciplina a distância?',
    options: [
      {
        text: 'Criar o bloco Geral com recursos essenciais: Fórum de Notícias como canal oficial, Fórum de Dúvidas, Página de Boas-Vindas com o mapa de atividades, e organizar os módulos com prazos claros.',
        correct: true,
        feedback: 'Correto. O Guia (p. 25–26) explica que o bloco Geral deve conter informações importantes sobre o curso e os recursos de comunicação que serão utilizados (fórum de notícias, café virtual, sala de bate-papo, etc.). O Fórum de Notícias é o canal oficial de comunicação do professor com a turma. Sem ele, o aluno não recebe avisos importantes.'
      },
      {
        text: 'Colocar todo o conteúdo da disciplina de uma vez no AVA, para que o aluno tenha acesso a tudo desde o início, sem se preocupar com prazos ou organização modular, pois a EaD exige flexibilidade.',
        correct: false,
        feedback: 'Você propôs colocar todo o conteúdo de uma vez. O Guia (p. 100) explica que os conteúdos da disciplina em EaD devem ser encadeados em subdivisões lógicas e complementares, organizados em módulos semanais ou quinzenais. A ausência de organização modular desorienta o aluno.'
      },
      {
        text: 'Criar apenas o Fórum de Dúvidas, pois os alunos podem acessar o guia de estudos impresso e não precisam de outros recursos de comunicação ou organização no ambiente virtual de aprendizagem.',
        correct: false,
        feedback: 'Você reduziu o AVA ao Fórum de Dúvidas. O Guia (p. 25–26) explica que o bloco Geral deve conter informações importantes sobre o curso e vários recursos de comunicação que serão utilizados (fórum de notícias, café virtual, sala de bate-papo, etc.). O Fórum de Notícias é o canal oficial de comunicação.'
      },
      {
        text: 'Configurar o AVA apenas com os módulos de conteúdo, sem recursos de comunicação ou boas-vindas, pois o aluno da EaD deve ser autônomo e não precisa de orientações adicionais do professor.',
        correct: false,
        feedback: 'Você propôs um AVA sem recursos de comunicação. O Guia (p. 25) explica que o AVA é configurado como um espaço social para interação de professor, tutor e aprendizes. O Fórum de Notícias, o Fórum de Dúvidas e a Página de Boas-Vindas são essenciais para orientar o aluno.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'praticas-1',
    applicationNote: 'Ao organizar seu AVA, comece pelo bloco Geral: Fórum de Notícias, Fórum de Dúvidas, Café Virtual e Página de Boas-Vindas.',
    source: {
      chapter: 'Módulos 1, 2 e 3 (integração)',
      pages: 'p. 20–39, 71–94, 97–98'
    }
  },

  {
    id: 14,
    icon: '💬',
    title: 'Interação: fóruns, mensagens e o café virtual',
    category: 'Módulo Extra — Laboratório de Práticas',
    trail: 'praticas',
    character: 'amanda',
    characterIntro: 'Na segunda semana, você percebe que os alunos não estão interagindo. O Fórum de Apresentação teve poucas postagens. O Fórum de Dúvidas está vazio. Você recebe e-mails de alunos perguntando coisas que já estão no guia. Como usar as ferramentas do Moodle para criar comunidade e reduzir a sensação de isolamento?',
    question: 'Qual estratégia é mais adequada para estimular a interação dos alunos e reduzir a sensação de isolamento no AVA?',
    options: [
      {
        text: 'Criar um Fórum Geral para a apresentação, pois permite a abertura ilimitada de tópicos e cada aluno pode criar quantos tópicos desejar, estimulando a participação livre e espontânea dos alunos.',
        correct: false,
        feedback: 'Você optou por um Fórum Geral para a apresentação. O Guia (p. 27–28) explica que o Fórum Geral permite abertura ilimitada de tópicos, o que pode dispersar a discussão. Para apresentação, o Fórum de Simples Discussão é mais adequado, pois permite um único tópico central e evita dispersão.'
      },
      {
        text: 'Criar um Fórum de Simples Discussão para a apresentação, um Fórum de Dúvidas com resposta em até 24h, um Café Virtual para interação informal e usar o Chat e a Webconferência para momentos síncronos de debate e esclarecimento de dúvidas.',
        correct: true,
        feedback: 'Correto. O Guia (p. 27–28) descreve o Fórum de Simples Discussão como aquele em que existe um único tópico, estabelecido previamente pelo professor. O Café Virtual é um espaço de interação informal. O Chat é uma atividade síncrona para debate em tempo real. A Webconferência permite interação síncrona com áudio, vídeo e chat.'
      },
      {
        text: 'Criar apenas o Fórum de Dúvidas e responder às perguntas dos alunos por e-mail, pois o ambiente virtual não é o local adequado para interações informais ou debates que não estejam ligados diretamente ao conteúdo da disciplina.',
        correct: false,
        feedback: 'Você restringiu a interação ao Fórum de Dúvidas e ao e-mail. O Guia (p. 25) explica que o AVA é configurado como um espaço social para interação de professor, tutor e aprendizes. O Café Virtual e o Fórum de Apresentação são importantes para criar comunidade.'
      },
      {
        text: 'Não criar nenhum recurso adicional de interação, pois os alunos da EaD são adultos e devem ser autônomos, buscando o conhecimento por conta própria, sem necessidade de estímulo do professor.',
        correct: false,
        feedback: 'Você propôs ausência de recursos de interação. O Guia (p. 179) explica que os tutores devem, primordialmente, contribuir para a motivação e para o interesse do aluno, facilitando-lhe o processo de aprendizagem. A mediação pedagógica é essencial na EaD.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'praticas-2',
    applicationNote: 'Ao estimular a interação, combine recursos assíncronos (fóruns, café virtual) e síncronos (chat, webconferência) para atender diferentes estilos de participação.',
    source: {
      chapter: 'Módulos 1 e 5 (integração)',
      pages: 'p. 27–28, 179–182'
    }
  },

  {
    id: 15,
    icon: '📝',
    title: 'Avaliação: tarefas, questionários e além',
    category: 'Módulo Extra — Laboratório de Práticas',
    trail: 'praticas',
    character: 'amanda',
    characterIntro: 'Você precisa avaliar o aprendizado de 80 alunos em uma disciplina a distância. Tem 4 atividades avaliativas no seu mapa. Como configurar cada uma no Moodle? Que ferramenta usar para cada tipo?',
    question: 'Qual combinação de ferramentas do Moodle é mais adequada para avaliar diferentes tipos de aprendizagem em uma disciplina a distância?',
    options: [
      {
        text: 'Usar apenas Questionário para todas as atividades avaliativas, pois é a ferramenta mais objetiva e de correção automática, garantindo imparcialidade e agilidade na avaliação dos alunos.',
        correct: false,
        feedback: 'Você restringiu a avaliação ao Questionário. O Guia (p. 29–30) descreve diversas ferramentas: Tarefa, Diário, Glossário, Wiki, Fórum, Questionário, Chat. Cada uma tem potencialidades pedagógicas específicas.'
      },
      {
        text: 'Usar apenas Tarefa com envio de arquivo único para todas as atividades, pois permite ao aluno produzir textos e ao professor avaliar a qualidade da escrita e do conteúdo apresentado.',
        correct: false,
        feedback: 'Você restringiu a avaliação à Tarefa. O Guia (p. 29–30) descreve diversas ferramentas: Tarefa, Diário, Glossário, Wiki, Fórum, Questionário, Chat. Cada uma tem potencialidades pedagógicas específicas.'
      },
      {
        text: 'Combinar diferentes ferramentas: Tarefa para produção textual, Questionário para verificação objetiva, Glossário para construção colaborativa de conceitos e Wiki para produção coletiva de texto pelos alunos.',
        correct: true,
        feedback: 'Correto. O Guia (p. 29–30 e p. 156–163) descreve diversas ferramentas e suas potencialidades. A avaliação não pode se basear em um único instrumento. O professor deve usar instrumentos e momentos diversificados de avaliação, distribuindo o valor total entre os critérios.'
      },
      {
        text: 'Usar apenas Fórum para todas as atividades avaliativas, pois é a ferramenta que melhor estimula a interação e a construção coletiva do conhecimento, dispensando outros instrumentos de avaliação individual dos alunos.',
        correct: false,
        feedback: 'Você restringiu a avaliação ao Fórum. O Guia (p. 29–30) descreve diversas ferramentas: Tarefa, Diário, Glossário, Wiki, Fórum, Questionário, Chat. Cada uma tem potencialidades pedagógicas específicas.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'praticas-3',
    applicationNote: 'Ao planejar a avaliação, combine diferentes instrumentos para contemplar diferentes tipos de aprendizagem e estilos de participação.',
    source: {
      chapter: 'Módulos 1 e 4 (integração)',
      pages: 'p. 29–30, 156–163'
    }
  },

  {
    id: 16,
    icon: '🗂️',
    title: 'Organização: módulos, cronograma e progressão',
    category: 'Módulo Extra — Laboratório de Práticas',
    trail: 'praticas',
    character: 'amanda',
    characterIntro: 'Sua disciplina tem 60 horas e precisa ser organizada em módulos semanais. Você tem 4 módulos de conteúdo, 1 webconferência, 2 videoaulas e 4 atividades avaliativas. Como estruturar o Moodle para que o aluno não se perca?',
    question: 'Qual é a melhor forma de organizar os módulos e o cronograma de uma disciplina a distância no AVA Moodle?',
    options: [
      {
        text: 'Criar um único módulo com todo o conteúdo e todas as atividades, sem datas de abertura ou fechamento, para que o aluno tenha total flexibilidade e estude no seu ritmo, sem pressões de prazo.',
        correct: false,
        feedback: 'Você propôs um único módulo sem prazos. O Guia (p. 100) explica que os conteúdos da disciplina em EaD devem ser encadeados em subdivisões lógicas e complementares, organizados em módulos semanais ou quinzenais. A ausência de prazos pode levar o aluno a acumular atividades e não conseguir desenvolver nada.'
      },
      {
        text: 'Criar um módulo por quinzena, sem datas de abertura ou fechamento, pois a EaD exige flexibilidade total e o aluno adulto deve ser capaz de se organizar sem prazos definidos.',
        correct: false,
        feedback: 'Você propôs módulos quinzenais sem prazos. O Guia (p. 100) explica que não podemos deixar o aluno interpretar, erroneamente, que na EaD não há prazos para se realizar as atividades. Os prazos, dentro da flexibilidade, são essenciais para a organização do aluno.'
      },
      {
        text: 'Criar os módulos com todo o conteúdo, mas sem atividades avaliativas, pois a avaliação deve ocorrer apenas ao final da disciplina, por meio de uma prova presencial que contemple todo o conteúdo estudado no semestre.',
        correct: false,
        feedback: 'Você propôs avaliação apenas ao final. O Guia (p. 148) explica que a avaliação formativa é uma bússola orientadora que consiste na prática da avaliação contínua realizada durante o processo de ensino e aprendizagem. A avaliação somativa final não é suficiente.'
      },
      {
        text: 'Criar módulos semanais ou quinzenais com objetivos, conteúdos, atividades de estudo e avaliativas, datas de abertura e fechamento, restrições de acesso e Progresso de Conclusão visível ao aluno em cada etapa.',
        correct: true,
        feedback: 'Correto. O Guia (p. 100) explica que os conteúdos da disciplina em EaD devem ser encadeados em subdivisões lógicas e complementares, organizados em módulos semanais ou quinzenais. O mapa de atividades deve mostrar: tempo de duração, início e término, títulos, objetivos, atividades e recursos midiáticos, orientações para avaliação e para o tutor.'
      }
    ],
    reward: { aura: 10, xp: 1000 },
    achievement: 'praticas-4',
    applicationNote: 'Ao organizar sua disciplina, crie módulos semanais ou quinzenais com prazos definidos, atividades claras e Progresso de Conclusão visível para o aluno.',
    source: {
      chapter: 'Módulos 2 e 3 (integração)',
      pages: 'p. 71–94, 97–101'
    }
  }

];