const ALFABETO = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Matriz Chave 5x5 Invertível (Exemplo robusto)
const MATRIZ_CHAVE = [
    [1, 0, 1, 0, 1],
    [0, 2, 1, 0, 0],
    [1, 0, 2, 1, 0],
    [0, 1, 0, 2, 1],
    [1, 1, 0, 0, 2]
];

function processar() {
    let texto = document.getElementById('inputMensagem').value.toUpperCase();
    
    // 1. Converter texto para números (0-26) e completar até 25 elementos
    let numeros = texto.split('').map(c => ALFABETO.indexOf(c));
    while (numeros.length < 25) numeros.push(0);

    // 2. Criar Matriz da Mensagem (M) 5x5
    let matrizM = [];
    for (let i = 0; i < 5; i++) {
        matrizM.push(numeros.slice(i * 5, i * 5 + 5));
    }

    // 3. Multiplicação de Matrizes: M x Chave
    let matrizResult = multiplicar(matrizM, MATRIZ_CHAVE);

    // 4. Exibir no HTML
    renderizarGrid('gridMensagem', matrizM.flat());
    renderizarGrid('gridResultado', matrizResult.flat());
    document.getElementById('stringTransmitida').innerText = matrizResult.flat().join('   ');
}

function multiplicar(A, B) {
    let res = Array.from({ length: 5 }, () => new Array(5).fill(0));
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                res[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return res;
}

function renderizarGrid(id, dados) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    dados.forEach(num => {
        const div = document.createElement('div');
        div.textContent = num;
        container.appendChild(div);
    });
}