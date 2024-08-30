// Função para verificar se um número é primo
function verificarNumeroPrimo(n) {
    if (n <= 1) {
        return false;
    }
    if (n === 2) {
        return true;
    }
    if (n % 2 === 0) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

// Casos de teste para verificarNumeroPrimo
console.log("Teste de números primos:");
console.log(verificarNumeroPrimo(0));        // false
console.log(verificarNumeroPrimo(1));        // false
console.log(verificarNumeroPrimo(2));        // true
console.log(verificarNumeroPrimo(3));        // true
console.log(verificarNumeroPrimo(7));        // true
console.log(verificarNumeroPrimo(83));       // true
console.log(verificarNumeroPrimo(100));      // false
console.log(verificarNumeroPrimo(991));      // true
console.log(verificarNumeroPrimo(104729));   // true
console.log(verificarNumeroPrimo(14348907)); // false

// Função para transpor uma matriz
function transporMatriz(A) {
    let transposta = [];
    for (let i = 0; i < A[0].length; i++) {
        transposta[i] = [];
        for (let j = 0; j < A.length; j++) {
            transposta[i][j] = A[j][i];
        }
    }

    console.log("Matriz original:");
    console.table(A);

    console.log("Matriz transposta:");
    console.table(transposta);

    return transposta;
}

// Exemplo de uso da função transporMatriz
console.log("Transposição de matriz:");
let matriz = [
    [1, 2],
    [3, 4],
    [5, 6]
];

transporMatriz(matriz);
