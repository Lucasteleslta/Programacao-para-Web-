const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configura o Body-Parser para interpretar o body das requisições POST
app.use(bodyParser.urlencoded({ extended: false }));

// Configura a pasta views e define o EJS como motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir arquivos estáticos (CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial que renderiza o formulário
app.get('/', (req, res) => {
  const error = req.query.error ? req.query.error : '';
  res.render('index', { error });
});

// Rota para receber os dados do formulário
app.post('/dados', (req, res) => {
  const { nome, endereco, telefone, data } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (!nome || !endereco || !telefone || !data) {
    return res.redirect('/?error=Todos os campos devem ser preenchidos');
  }

  // Renderiza a página de dados se tudo estiver preenchido
  res.render('dados', { nome, endereco, telefone, data });
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
