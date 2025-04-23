/**
 * Representa um Carro, herdando de Veiculo.
 * @class
 * @extends Veiculo
 */
class Carro extends Veiculo {
    /**
     * Cria uma instância de Carro.
     * @param {string} marca - A marca.
     * @param {string} modelo - O modelo.
     * @param {number} ano - O ano.
     * @param {string} cor - A cor.
     * @param {number} numPortas - O número de portas.
     */
    constructor(marca, modelo, ano, cor, numPortas) {
        super(marca, modelo, ano, cor); // Chama o construtor da classe pai (Veiculo)
        if (numPortas === undefined || numPortas === null || numPortas < 1) {
             throw new Error("Número de portas é obrigatório para Carro e deve ser positivo.");
        }
        this.numPortas = numPortas;
    }

    /**
     * Define a velocidade máxima específica para Carro.
     * @override // Indica que está sobrescrevendo um método da classe pai
     * @protected
     * @returns {number} Velocidade máxima do carro.
     */
    _definirVelocidadeMaxima() {
        // Carros geralmente têm uma velocidade máxima maior que um veículo genérico
        return 180;
    }

    // Poderia adicionar métodos específicos de Carro aqui se necessário
    // Ex: abrirPortaMalas() { console.log("Porta-malas aberto"); }
}