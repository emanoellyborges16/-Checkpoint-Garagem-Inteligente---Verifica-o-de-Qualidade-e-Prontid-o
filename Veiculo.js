/**
 * Representa um veículo genérico. Classe base.
 * @class
 */
class Veiculo {
    /**
     * Cria uma instância de Veiculo.
     * @param {string} marca - A marca do veículo.
     * @param {string} modelo - O modelo do veículo.
     * @param {number} ano - O ano de fabricação do veículo.
     * @param {string} cor - A cor do veículo.
     */
    constructor(marca, modelo, ano, cor) {
        if (!marca || !modelo || !ano || !cor) {
            throw new Error("Marca, modelo, ano e cor são obrigatórios.");
        }
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
        this.velocidadeMaxima = this._definirVelocidadeMaxima();
    }

    /**
     * Define a velocidade máxima padrão.
     * @protected
     * @returns {number} A velocidade máxima.
     */
    _definirVelocidadeMaxima() {
        return 120; // Velocidade padrão genérica
    }

    /**
     * Liga ou desliga o veículo. Zera a velocidade se desligado.
     * @returns {boolean} O novo estado do motor (true=ligado, false=desligado).
     */
    ligarDesligar() {
        this.ligado = !this.ligado;
        if (!this.ligado) {
            this.velocidade = 0;
        }
        console.log(`Veículo ${this.ligado ? 'ligado' : 'desligado'}. Velocidade: ${this.velocidade}`);
        return this.ligado;
    }

    /**
     * Aumenta a velocidade.
     * @param {number} [valor=10] - O quanto acelerar.
     * @returns {boolean} - True se acelerou, false caso contrário.
     */
    acelerar(valor = 10) {
        if (this.ligado && this.velocidade < this.velocidadeMaxima) {
            const velocidadeAntiga = this.velocidade;
            this.velocidade = Math.min(this.velocidade + valor, this.velocidadeMaxima);
            console.log(`Acelerando... Velocidade: ${velocidadeAntiga} -> ${this.velocidade} km/h`);
            return true;
        } else if (!this.ligado) {
             console.warn("Não pode acelerar: Motor desligado.");
        } else {
             console.warn("Não pode acelerar: Velocidade máxima atingida.");
        }
        return false;
    }

    /**
     * Reduz a velocidade.
     * @param {number} [valor=15] - O quanto frear.
     * @returns {boolean} - True se freou (velocidade > 0), false caso contrário.
     */
    frear(valor = 15) {
        if (this.velocidade > 0) {
             const velocidadeAntiga = this.velocidade;
            this.velocidade = Math.max(this.velocidade - valor, 0);
            console.log(`Freando... Velocidade: ${velocidadeAntiga} -> ${this.velocidade} km/h`);
            return true;
        } else {
             console.info("Não pode frear: Veículo já está parado.");
        }
        return false;
    }

     /**
     * Retorna uma descrição básica.
     * @returns {string} Marca e modelo e ano.
     */
    getDescricao() {
        return `${this.marca} ${this.modelo} (${this.ano})`;
    }
}