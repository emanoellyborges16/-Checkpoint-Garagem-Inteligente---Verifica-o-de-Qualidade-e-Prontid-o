# Meu Carro Dinâmico Interativo 🚗💨

## Visão Geral

Este é um projeto web simples que demonstra a interação dinâmica com um objeto **Carro** usando HTML, CSS e JavaScript (com Programação Orientada a Objetos - POO). O foco principal é fornecer feedback visual **imediato** na interface do usuário (UI) conforme o estado do carro (ligado/desligado, velocidade) é alterado através de botões de controle.

A aplicação simula um painel básico onde você pode ver os detalhes de um carro específico (um VW Fusca por padrão, mas facilmente customizável no código `js/app.js`), ligar/desligar seu motor, acelerar e frear, observando as atualizações em tempo real e um log das ações realizadas.

## Funcionalidades

*   **Exibição de Detalhes:** Mostra informações do carro como Marca, Modelo, Ano, Status (Ligado/Desligado), Velocidade Atual, Velocidade Máxima e Número de Portas.
*   **Controle do Motor:** Botão "Ligar"/"Desligar" que altera o estado do carro e atualiza visualmente o status (com cor) e o próprio botão.
*   **Aceleração:** Botão "Acelerar" que aumenta a velocidade do carro (se ligado e abaixo da velocidade máxima). O botão é desabilitado dinamicamente quando não é possível acelerar.
*   **Frenagem:** Botão "Frear" que diminui a velocidade do carro (se ligado e em movimento). O botão é desabilitado dinamicamente quando o carro está parado.
*   **Atualização Dinâmica da UI:** Todos os dados exibidos (status, velocidade) e o estado dos botões são atualizados instantaneamente após cada ação do usuário.
*   **Feedback Visual Claro:**
    *   O status "Ligado"/"Desligado" muda de cor (verde/vermelho).
    *   O botão Ligar/Desligar muda de cor e texto conforme o estado do motor.
    *   Botões de Acelerar/Frear são visualmente desabilitados (acinzentados) quando a ação não é permitida.
*   **Log de Ações:** Uma lista na parte inferior da tela exibe um histórico das interações realizadas com o carro (motor ligado/desligado, aceleração, frenagem, alertas de velocidade máxima, etc.), com timestamp.

## Tecnologias Utilizadas

*   **HTML5:** Para a estrutura semântica da página.
*   **CSS3:** Para estilização, layout e feedback visual dinâmico (cores, estados `:disabled`).
*   **JavaScript (ES6+):**
    *   **Programação Orientada a Objetos (POO):** Uso de `class` para modelar `Veiculo` e `Carro`.
    *   **Manipulação do DOM:** Seleção e atualização de elementos HTML para refletir o estado do carro.
    *   **Gerenciamento de Eventos:** Uso de `addEventListener` para capturar cliques nos botões e disparar ações.

## Como Executar Localmente

Este projeto é totalmente front-end e não requer nenhuma instalação complexa ou servidor back-end.

1.  **Salve os Arquivos:** Certifique-se de ter os seguintes arquivos com a estrutura de pastas correta:
    ```
    SEU_PROJETO/
    ├── index.html
    ├── style.css
    └── js/
        ├── app.js       # Script principal da UI
        └── classes/     # Pasta para as classes
            ├── Veiculo.js
            └── Carro.js
    ```

2.  **Abra o `index.html` no Navegador:**
    *   Navegue até a pasta `SEU_PROJETO` no seu explorador de arquivos.
    *   Dê um duplo clique no arquivo `index.html`.
    *   Seu navegador padrão (Chrome, Firefox, Edge, etc.) abrirá a aplicação, e ela estará pronta para uso.

## Estrutura do Projeto








## Conceitos de Programação Demonstrados

*   **Encapsulamento (POO):** A lógica e os dados do carro (como ligar, desligar, acelerar, velocidade atual) estão contidos dentro das classes `Veiculo` e `Carro`.
*   **Herança (POO):** A classe `Carro` herda propriedades e métodos da classe `Veiculo` e adiciona/sobrescreve funcionalidades específicas (como `numPortas` e `_definirVelocidadeMaxima`).
*   **Manipulação Direta do DOM:** O `app.js` demonstra como selecionar elementos HTML e atualizar seu conteúdo (`textContent`), classes CSS (`classList`) e atributos (`disabled`) para criar uma interface interativa.
*   **Interface Reativa (Simulada):** Embora não use um framework reativo (como React, Vue, Angular), o padrão de ter uma função central (`atualizarUI`) que é chamada após cada mudança de estado para redesenhar a UI simula um comportamento reativo.
*   **Event Handling:** Demonstra como capturar eventos do usuário (cliques em botões) e executar a lógica correspondente de forma organizada.

---

Este README deve dar uma boa visão geral do projeto "Meu Carro Dinâmico Interativo". É só salvar este texto em um arquivo chamado `README.md` na pasta principal do seu projeto.