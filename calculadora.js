/*
 * ===================================================================
 * SCRIPT DE INTERATIVIDADE - CALCULADORA DE IMC
 * ===================================================================
 *
 * ÍNDICE:
 * 1. INICIALIZAÇÃO PRINCIPAL (DOMContentLoaded)
 * 2. CONFIGURAÇÃO DOS COMPONENTES
 * - setupIMCCalculator()
 * - setupAccordion()
 * 3. FUNÇÕES AUXILIARES DA CALCULADORA
 * - calcularIMC()
 * - obterClassificacaoIMC()
 * - exibirResultado()
 *
*/

// 1. INICIALIZAÇÃO PRINCIPAL
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Chama as funções que preparam cada parte interativa da página.
    setupIMCCalculator();
    setupAccordion();
});


// 2. CONFIGURAÇÃO DOS COMPONENTES
// ===================================================================

/**
 * Prepara a calculadora de IMC: captura elementos e anexa eventos.
 */
function setupIMCCalculator() {
    const form = document.getElementById('imc-form');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const resultadoContainer = document.getElementById('resultado-container');
    const errorMessageDiv = document.getElementById('error-message');

    if (!form || !resultadoContainer) {
        console.error("ERRO: Elementos essenciais da calculadora não encontrados. Verifique os IDs 'imc-form' e 'resultado-container'.");
        return;
    }

    // Evento de envio do formulário para calcular
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        errorMessageDiv.textContent = '';
        resultadoContainer.classList.remove('visivel');

        const peso = parseFloat(pesoInput.value.replace(',', '.'));
        const altura = parseFloat(alturaInput.value.replace(',', '.'));

        if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
            errorMessageDiv.textContent = 'Por favor, insira valores válidos para peso e altura.';
            return;
        }

        const imc = calcularIMC(peso, altura);
        const classificacaoInfo = obterClassificacaoIMC(imc);
        exibirResultado(resultadoContainer, classificacaoInfo, imc);
    });

    // Evento para limpar o formulário e os resultados
    form.addEventListener('reset', () => {
        errorMessageDiv.textContent = '';
        resultadoContainer.classList.remove('visivel');
        
        const classificacaoP = document.getElementById('classificacao');
        classificacaoP.className = '';
        resultadoContainer.className = 'resultado-box';
    });
}

/**
 * Prepara o componente Accordion.
 */
function setupAccordion() {
    const accordionHeader = document.querySelector('.accordion-header');

    if (accordionHeader) {
        accordionHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}


// 3. FUNÇÕES AUXILIARES DA CALCULADORA
// ===================================================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function obterClassificacaoIMC(imc) {
    if (imc < 18.5) return { texto: 'Abaixo do peso', classeCor: 'cor-atencao', classeBoxCor: 'box-cor-atencao' };
    if (imc < 24.9) return { texto: 'Peso normal', classeCor: 'cor-normal', classeBoxCor: 'box-cor-normal' };
    if (imc < 29.9) return { texto: 'Sobrepeso', classeCor: 'cor-atencao', classeBoxCor: 'box-cor-atencao' };
    if (imc < 34.9) return { texto: 'Obesidade grau I', classeCor: 'cor-alerta', classeBoxCor: 'box-cor-alerta' };
    if (imc < 39.9) return { texto: 'Obesidade grau II', classeCor: 'cor-perigo', classeBoxCor: 'box-cor-perigo' };
    return { texto: 'Obesidade grau III ou Mórbida', classeCor: 'cor-perigo', classeBoxCor: 'box-cor-perigo' };
}

function exibirResultado(resultadoContainer, classificacaoInfo, imc) {
    const resultadoP = resultadoContainer.querySelector('#resultado');
    const classificacaoP = resultadoContainer.querySelector('#classificacao');

    resultadoP.textContent = `Seu IMC é: ${imc.toFixed(2)}`;
    classificacaoP.textContent = classificacaoInfo.texto;

    classificacaoP.className = '';
    resultadoContainer.className = 'resultado-box';

    classificacaoP.classList.add(classificacaoInfo.classeCor);
    resultadoContainer.classList.add(classificacaoInfo.classeBoxCor);
    resultadoContainer.classList.add('visivel');
}