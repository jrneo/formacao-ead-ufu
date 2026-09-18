# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## Tipos de mudança

- **Adicionado** — novas funcionalidades, arquivos ou conteúdos.
- **Modificado** — mudanças em funcionalidades existentes.
- **Corrigido** — correção de bugs ou inconsistências.
- **Removido** — funcionalidades ou arquivos removidos.
- **Segurança** — correções de vulnerabilidades ou melhorias de privacidade.

---

## [Não publicado]

### Pendente

- Adicionar `docs/guia-formacao-professores-autores-formadores-ead-ufu.pdf`
  (conteúdo do autor).
- (Opcional) Adicionar os SVGs dos personagens em `assets/images/`:
  - `amanda.svg`
  - `carlos.svg`
  - `badge.svg`
  - `badge-wrong.svg`
  - `logo.svg`

  Sem eles, o sistema usa fallback de emoji automaticamente.

---

## [1.0.0] — 2026

### Versão inicial completa do LDI "Formação de Professores Autores e Formadores para EaD — UFU".

**Registro pedagógico:** Andragógico
**Base técnica:** Guia de Estudos do Curso de Formação de Professores Autores e Formadores para atuar em Cursos/Disciplinas na modalidade a Distância — UFU (2026), 232 páginas.
**Público-alvo:** Professores e professoras universitários(as), tutores e coordenadores em formação profissional continuada.
**Autor e responsável:** Dirceu Nogueira de Sales Duarte Junior.

### Adicionado

#### Estrutura geral

- Aplicação web local em HTML5, CSS3 e JavaScript puro, sem frameworks,
  sem CDNs e sem bibliotecas externas.
- Sistema de build zero — basta abrir `index.html` no navegador.
- Estrutura semântica acessível com `role="main"`, `role="dialog"`,
  `role="switch"`, `aria-live`, `aria-modal`, `aria-labelledby`,
  `aria-checked` e `aria-label`.

#### JavaScript — Motor

- **`js/theme.js`** — identidade do curso: título, subtítulo, tagline,
  personagens-guia (Amanda, Carlos e default), paleta de cores, trilhas
  temáticas, gamificação, telas, conteúdo da tela "Como Jogar", ficha
  técnica e transparência sobre IA.
- **`js/missions.js`** — 16 missões com 4 alternativas cada. Cada missão
  cita página exata do Guia de Estudos e oferece feedback formativo
  específico por alternativa.
- **`js/boss.js`** — Desafio Final com 3 decisões sequenciais. Cada
  decisão tem 4 alternativas, feedback específico e página do Guia.
- **`js/data.js`** — 32 termos de glossário, 19 conquistas e 9 temas de
  conteúdo.
- **`js/game.js`** — motor de estado com persistência em `localStorage`,
  sistema de tentativas, **recompensa decrescente** (10 → 7 → 5 → 3),
  cálculo de nível (6 níveis), conquistas automáticas
  (`estudioso` e `curioso`), eventos pub/sub e API pública.
- **`js/audio.js`** — voz via Web Speech API (pt-BR com fallback pt-*),
  dicionário de pronúncia, **9 efeitos sonoros** sintetizados via Web
  Audio API, e **5 melodias originais** em estilo caixinha de música.
- **`js/accessibility.js`** — painel lateral deslizante com toggles de
  voz, efeitos, som ambiente, seleção de melodia, modo escuro, alto
  contraste, redução de movimento e escala de fonte (5 níveis). Focus
  trap, ESC para fechar, anúncios ARIA live, respeito a preferências
  do sistema operacional.
- **`js/app.js`** — orquestrador e camada de apresentação. Renderização
  das telas (home, como jogar, mapa, missão, boss, conteúdos, glossário,
  conquistas, sobre, transparência, final), **badges animados** de
  acerto/erro, **toasts** de conquistas, **feedback formativo** com
  tentar novamente / ver resposta, delegação de eventos por
  `[data-action]`.

#### JavaScript — Funcionalidades pedagógicas

- **Feedback formativo em camadas**: ao errar, o app NÃO revela a
  resposta de imediato. Mostra o feedback específico da escolha errada
  e oferece dois caminhos: tentar novamente ou ver a resposta.
- **Recompensa decrescente**: 1ª tentativa (10 aura / 1000 XP),
  2ª (7 / 700), 3ª (5 / 500), após 3 erros (3 / 300).
- **Revelação automática após 3 erros** com aviso claro ao usuário.
- **Aura nunca negativa**.
- **Persistência automática** em `localStorage` com namespace
  `ufu-ead-ldi`.
- **Guarda contra dupla premiação** — se a missão já foi concluída,
  não soma recompensa novamente.

#### CSS

- **`css/style.css`** — identidade visual completa. Reset, variáveis
  CSS com fallback, tipografia, layout do app, header com HUD,
  barra de progresso, botões (primary, secondary, danger, link, nav),
  telas específicas, cartões, badges animados, toasts, responsividade
  mobile-first, estilos de impressão.
- **`css/accessibility.css`** — modo escuro (`html.theme-dark`)
  completo, alto contraste (`html.high-contrast`) com bordas
  fortes e sem gradientes, redução de movimento
  (`html.reduce-motion`), painel deslizante, toggles com switch
  visual, escala de fonte em 5 níveis, tooltips, `.sr-only` e
  `#live-region`.

#### HTML

- **`index.html`** — estrutura HTML5 semântica, meta-informações,
  favicon SVG externo, injeção dinâmica das cores do tema via
  `<style id="theme-colors">`, botão flutuante de acessibilidade no
  cabeçalho (canto superior direito), painel de acessibilidade
  completo, região ARIA live, `<noscript>` com fallback, ordem
  correta de carregamento dos 8 scripts.

#### Assets (opcionais — fallback automático se ausentes)

- **`assets/images/amanda.svg`** — avatar da personagem Amanda
  (professora formadora). *Se ausente, exibe 👩‍🏫*.
- **`assets/images/carlos.svg`** — avatar do personagem Carlos
  (coordenador de curso). *Se ausente, exibe 👨‍🏫*.
- **`assets/images/badge.svg`** — medalha dourada com estrela
  (acerto). *Se ausente, exibe 🏅*.
- **`assets/images/badge-wrong.svg`** — medalha prateada com
  polegar para baixo (erro). *Se ausente, exibe ❌*.
- **`assets/images/logo.svg`** — logotipo institucional.
- **`assets/icons/favicon.svg`** — favicon standalone.

#### Acessibilidade

- Painel completo com toggles de voz, efeitos, som ambiente, modo
  escuro, alto contraste, redução de movimento, escala de fonte e
  seletor de melodia.
- Focus trap no painel (Tab e Shift+Tab ciclam dentro).
- ESC fecha o painel e devolve o foco ao botão que o abriu.
- Anúncios ARIA live para leitores de tela.
- `role="switch"` com `aria-checked` nos toggles.
- Tooltips via `data-tooltip` (hover + foco de teclado).
- Respeito a `prefers-color-scheme`, `prefers-reduced-motion` e
  `prefers-contrast` na primeira visita.
- Áreas de toque ≥ 44×44 px em todos os controles interativos.

#### Áudio

- Voz em pt-BR com fallback pt-*.
- Dicionário de pronúncia para termos estrangeiros (Moodle → "Mudi",
  AVA → "A V A", CAPES → "Cápis", etc.).
- Remoção de emojis e símbolos antes da fala.
- Normalização de CAIXA ALTA preservando siglas conhecidas.
- 9 efeitos sonoros sintetizados em tempo real.
- 5 melodias originais em estilo caixinha de música, com loop suave.
- Volume discreto da melodia (ambientação, não protagonismo).
- Encadeamento sem sobreposição entre SFX e fala.
- Política de navegadores respeitada (áudio só após gesto do usuário).

#### Persistência

- Estado do jogo em `localStorage` com namespace `ufu-ead-ldi:state`.
- Preferências de áudio em `ufu-ead-ldi:audio-prefs`.
- Preferências de acessibilidade em `ufu-ead-ldi:a11y-prefs`.
- Reset preserva preferências e apaga apenas o estado do jogo.

#### Documentação

- **`LEIA-ME.txt`** — instruções de uso, estrutura de arquivos,
  convenção de nomes, observações sobre as imagens, requisitos
  técnicos, privacidade e licença.
- **`docs/testes.html`** — suíte com 106 testes cobrindo `theme.js`,
  `missions.js`, `boss.js`, `data.js`, `game.js`, `audio.js`,
  `accessibility.js` e integração. Verifica requisitos específicos
  do Prompt-Mestre v4.0 (recompensa decrescente, equilíbrio de
  alternativas, distribuição de posições, etc.).
- **`docs/referencias.html`** — referências bibliográficas
  organizadas por módulo, com citações ABNT.
- **`docs/CHANGELOG.md`** — este arquivo.
- **`docs/guia-publicacao.md`** — instruções de publicação em local,
  GitHub Pages, Netlify, servidor próprio e Moodle/AVA.

### Conteúdo pedagógico

#### Missões (16 + Boss Final)

- **Módulo 1 — Fundamentos da EaD:** missões 1 a 4.
- **Módulo 2 — Planejamento e Gestão:** missões 5 a 7.
- **Módulo 3 — Produção de Material:** missões 8 a 10.
- **Módulo 4 — Avaliação:** missão 11.
- **Módulo 5 — Atuação Docente:** missão 12.
- **Módulo Extra — Laboratório de Práticas:** missões 13 a 16.
- **Boss Final — "O Desafio do Professor Autor":** 3 decisões
  sequenciais integrando todos os módulos.

#### Distribuição das posições corretas

- A: 4 missões (3, 5, 9, 13).
- B: 4 missões (1, 6, 10, 14).
- C: 4 missões (2, 7, 11, 15).
- D: 4 missões (4, 8, 12, 16).

#### Glossário

- 32 termos com definições baseadas no Guia de Estudos.

#### Conquistas

- 19 conquistas por ação real, nunca por tempo de tela.
- 17 associadas a missões e ao Boss.
- 2 automáticas: `estudioso` (abrir 3 temas de conteúdo) e
  `curioso` (abrir 5 termos do glossário).

#### Temas de conteúdo

- 9 temas de revisão, cada um apontando para a missão relacionada.

### Modificado

- N/A (versão inicial).

### Corrigido

- N/A (versão inicial).

### Segurança

- Nenhuma dependência externa — não há CDNs, bibliotecas de
  terceiros ou chamadas de rede.
- Todo o conteúdo é local; nenhum dado é enviado para servidores.
- Persistência apenas em `localStorage` do próprio navegador.
- Nenhuma fonte remota, imagem remota ou script remoto é carregado.

---

## Modelo pedagógico (v1.0.0)

O LDI adota o modelo v4.0 do Prompt-Mestre:

1. **Registro pedagógico** — Andragógico, voltado a adultos em
   formação profissional continuada.
2. **Feedback formativo em camadas** — o erro é ponto de partida,
   não ponto final.
3. **Recompensa decrescente** — erra não custa aura; apenas reduz a
   recompensa da próxima tentativa.
4. **Alternativas equilibradas** — diferença máxima de comprimento
   entre alternativas por missão.
5. **Embaralhamento em runtime** — defesa contra memorização de
   posição.
6. **Dicas específicas** — cada alternativa errada tem feedback
   específico e citação de página.
7. **Regras visíveis ao jogador** — tela "Como Jogar" explica o
   sistema de tentativas e recompensa decrescente.
8. **Aura nunca negativa** — princípio pedagógico e técnico.
9. **Conquistas por ação real** — nunca por tempo de tela.
10. **Acessibilidade plena** — como requisito, não como adição.

---

## Histórico de versões do Prompt-Mestre

| Versão | Data | Mudanças principais |
|--------|------|---------------------|
| v1.0 | — | Prompt inicial. Estrutura básica de LDI gamificado. |
| v2.0 | — | Sistema de acessibilidade completo. Separação de `theme.js` e `missions.js`. |
| v3.0 | — | Registro pedagógico (pedagógico / andragógico / misto). Estrutura de arquivos consolidada. Regras invioláveis. |
| **v4.0** | **2026** | **Feedback formativo em camadas; recompensa decrescente; "Aura em Alta" 100 → 90; alternativas equilibradas (±20%); embaralhamento em runtime; campo `hint` por alternativa errada; regras visíveis em 4 pontos.** |

---

## Compatibilidade

- **Navegadores suportados:** Chrome, Firefox, Edge e Safari
  atualizados (últimas 2 versões maiores).
- **Dispositivos:** desktop, notebook, tablet e celular
  (mobile-first).
- **Acessibilidade:** compatível com leitores de tela (NVDA, JAWS,
  VoiceOver, TalkBack).
- **JavaScript:** ES5-safe (`var`, `function`, sem arrow, sem
  `let`/`const`, sem template strings).
- **LocalStorage:** requerido para persistência; se indisponível, o
  jogo funciona em modo volátil.

---

## Licença

Creative Commons — CC BY-NC-SA 4.0.

---

## Autor e responsabilidade

**Autor e responsável pelo desenvolvimento:**
Dirceu Nogueira de Sales Duarte Junior.

**Apoio no desenvolvimento:** Inteligência Artificial generativa,
utilizada como ferramenta de apoio à ideação, organização, redação,
programação, revisão e desenvolvimento da experiência interativa.

**Base técnica:** Guia de Estudos do Curso de Formação de Professores
Autores e Formadores para atuar em Cursos/Disciplinas na modalidade a
Distância — UFU (2026), 232 páginas.

**Responsabilidade pelo conteúdo:** A seleção das fontes, a definição
dos objetivos pedagógicos, as decisões de conteúdo, a validação das
informações e a responsabilidade pelo produto final são do autor.

---

## Referências do projeto

- **Prompt-Mestre v4.0** — documento de especificação do LDI.
- **Guia de Estudos da UFU (2026)** — fonte primária de todo o
  conteúdo técnico.
- **Keep a Changelog** — https://keepachangelog.com/pt-BR/1.1.0/
- **Semantic Versioning** — https://semver.org/lang/pt-BR/