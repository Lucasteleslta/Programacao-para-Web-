const express = require('express');
const calculadora = require('./util/calculadora'); // Importa o módulo de cálculos

const app = express();
const port = 3000;

// Rota de soma
app.get('/somar/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.somar(Number(a), Number(b));
    res.send(`Resultado da soma: ${resultado}`);
});

// Rota de subtração
app.get('/subtrair/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.subtrair(Number(a), Number(b));
    res.send(`Resultado da subtração: ${resultado}`);
});

// Rota de multiplicação
app.get('/multiplicar/:a/:b', (req, res) => {
    const { a, b } = req.params;
    const resultado = calculadora.multiplicar(Number(a), Number(b));
    res.send(`Resultado da multiplicação: ${resultado}`);
});

// Rota de divisão
app.get('/dividir/:a/:b', (req, res) => {
    const { a, b } = req.params;
    if (b == 0) {
        return res.send('Erro: Divisão por zero não é permitida.');
    }
    const resultado = calculadora.dividir(Number(a), Number(b));
    res.send(`Resultado da divisão: ${resultado}`);
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
