/**
 * Controla a interface do usuário para o carro dinâmico.
 * Conecta os botões HTML à lógica da classe Carro e atualiza a tela.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Criação da Instância do Carro ---
    // Altere aqui para criar o carro que você quiser!
    let meuCarro;
    try {
         meuCarro = new Carro('Volkswagen', 'Fusca', 1975, 'Azul', 2);
        // Exemplo 2: const meuCarro = new Carro('Toyota', 'Corolla', 2023, 'Prata', 4);
    } catch (error) {
        console.error("Erro ao criar o carro:", error);
        alert("Não foi possível criar o carro. Verifique o console.");
        // Poderia exibir uma mensagem de erro na tela aqui
        return; // Interrompe a execução se o carro não puder ser criado
    }


    // --- Referências aos Elementos do DOM (Interface) ---
    const carModelDisplay = document.getElementById('car-model');
    const carStatusDisplay = document.getElementById('car-status');
    const carSpeedDisplay = document.getElementById('car-speed');
    const carMaxSpeedDisplay = document.getElementById('car-max-speed');
    const carDoorsDisplay = document.getElementById('car-doors');

    const toggleEngineBtn = document.getElementById('btn-toggle-engine');
    const accelerateBtn = document.getElementById('btn-accelerate');
    const brakeBtn = document.getElementById('btn-brake');

    const logList = document.getElementById('log-list');

    // --- Função Principal de Atualização da UI ---
    /**
     * Atualiza todos os elementos da interface com base no estado atual de 'meuCarro'.
     * É chamada sempre que o estado do carro muda.
     */
    function atualizarUI() {
        if (!meuCarro) return; // Segurança caso o carro não tenha sido criado

        // Atualiza Textos na tela
        carModelDisplay.textContent = meuCarro.getDescricao();
        carStatusDisplay.textContent = meuCarro.ligado ? 'Ligado' : 'Desligado';
        carSpeedDisplay.textContent = meuCarro.velocidade;
        carMaxSpeedDisplay.textContent = meuCarro.velocidadeMaxima;
        carDoorsDisplay.textContent = meuCarro.numPortas;

        // Atualiza Classes CSS (para mudar cores/estilos) e Texto do Botão Ligar/Desligar
        carStatusDisplay.classList.toggle('status-on', meuCarro.ligado);
        carStatusDisplay.classList.toggle('status-off', !meuCarro.ligado);
        toggleEngineBtn.textContent = meuCarro.ligado ? 'Desligar' : 'Ligar';
        toggleEngineBtn.classList.toggle('engine-on', meuCarro.ligado); // Classe para estilizar botão ligado

        // Habilita/Desabilita Botões de Ação conforme o estado
        // Acelerar: só se ligado E velocidade abaixo da máxima
        accelerateBtn.disabled = !meuCarro.ligado || meuCarro.velocidade >= meuCarro.velocidadeMaxima;
        // Frear: só se ligado E velocidade maior que zero
        brakeBtn.disabled = !meuCarro.ligado || meuCarro.velocidade <= 0;

        console.log("UI Atualizada:", { ligado: meuCarro.ligado, velocidade: meuCarro.velocidade });
    }

    /**
     * Adiciona uma mensagem formatada ao log de ações na tela.
     * @param {string} message - A mensagem principal a ser logada.
     * @param {string} [type='info'] - Tipo de log ('info', 'warn', 'success'). Afeta o estilo (ver CSS).
     */
    function adicionarLog(message, type = 'info') {
        const li = document.createElement('li');
        const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false }); // Formato 24h
        li.textContent = `[${timestamp}] ${message}`;
        li.classList.add(`log-${type}`); // Adiciona classe para estilização CSS (ex: log-warn)

        // Adiciona o novo log no TOPO da lista
        logList.insertBefore(li, logList.firstChild);

        // Remove o placeholder inicial se ainda existir
        const placeholder = logList.querySelector('.placeholder');
        if (placeholder) placeholder.remove();

        // Limita o número de logs na tela para não ficar gigante (opcional)
         const maxLogsVisiveis = 20;
         while (logList.children.length > maxLogsVisiveis) {
            logList.removeChild(logList.lastChild); // Remove o mais antigo (o último da lista)
         }
    }

    // --- Event Listeners (O que acontece quando clica nos botões) ---

    // Botão Ligar/Desligar
    toggleEngineBtn.addEventListener('click', () => {
        if (!meuCarro) return;
        const estavaLigado = meuCarro.ligado;
        const novoEstado = meuCarro.ligarDesligar(); // Chama o método da classe Carro
        adicionarLog(`Motor ${novoEstado ? 'LIGADO' : 'DESLIGADO'}.`, novoEstado ? 'success' : 'info');
        if(!novoEstado && estavaLigado) { // Se foi desligado e antes estava ligado
            adicionarLog(`Velocidade zerada ao desligar.`);
        }
        atualizarUI(); // ESSENCIAL: Atualiza a tela para refletir a mudança
    });

    // Botão Acelerar
    accelerateBtn.addEventListener('click', () => {
        if (!meuCarro) return;
        const velocidadeAntes = meuCarro.velocidade;
        if (meuCarro.acelerar()) { // Chama o método e verifica se a ação foi bem-sucedida
            adicionarLog(`Acelerando... Velocidade: ${velocidadeAntes} -> ${meuCarro.velocidade} km/h`);
            atualizarUI(); // Atualiza a tela
             // Adiciona aviso se atingiu a velocidade máxima
             if (meuCarro.velocidade === meuCarro.velocidadeMaxima) {
                adicionarLog(`Velocidade máxima (${meuCarro.velocidadeMaxima} km/h) atingida!`, 'warn');
            }
        } else {
             // Se acelerar() retornou false, loga um aviso (motor desligado ou já na máxima)
             const razao = !meuCarro.ligado ? "Motor desligado" : "Velocidade máxima já atingida";
              adicionarLog(`Não foi possível acelerar (${razao}).`, 'warn');
              // Atualiza a UI mesmo assim para garantir que botões fiquem desabilitados corretamente
              atualizarUI();
        }
    });

    // Botão Frear
    brakeBtn.addEventListener('click', () => {
        if (!meuCarro) return;
        const velocidadeAntes = meuCarro.velocidade;
        if (meuCarro.frear()) { // Chama o método e verifica se teve efeito
            adicionarLog(`Freando... Velocidade: ${velocidadeAntes} -> ${meuCarro.velocidade} km/h`);
            atualizarUI(); // Atualiza a tela
            // Adiciona info se o carro parou completamente
            if (meuCarro.velocidade === 0) {
                 adicionarLog(`Carro parado.`);
            }
        } else {
            // Se frear() retornou false (já estava parado)
             adicionarLog(`Não foi possível frear (Carro já está parado).`, 'warn');
             atualizarUI();
        }
    });

    // --- Inicialização da Aplicação ---
    if(meuCarro) {
        adicionarLog(`Pronto! Carro: ${meuCarro.getDescricao()}.`);
        atualizarUI(); // Chama uma vez no início para configurar a tela com os dados iniciais do carro
    } else {
         // Se chegou aqui sem carro, já houve um alerta. Pode adicionar msg na tela.
         document.querySelector('.car-container').innerHTML = "<h1>Erro ao carregar o carro. Verifique o console.</h1>";
    }

}); // Fim do DOMContentLoaded