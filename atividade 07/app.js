const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const db = new sqlite3.Database(":memory:");

app.use(session({
  secret: "segredo_super_secreto",
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Criação das tabelas de banco de dados
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, content TEXT)");
});

// rota de registro
app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
      if (err) {
        return res.send("Erro ao criar usuário");
      }
      res.redirect("/login");
    });
  });

// rota de login
app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err || !user || !bcrypt.compareSync(password, user.password)) {
        return res.send("Credenciais inválidas");
      }
  
      req.session.userId = user.id;
      res.redirect("/messages");
    });
  });
  
  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  });

// rota das menssagens 
// Middleware de autenticação
function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    next();
  }
  
  app.get("/messages", isAuthenticated, (req, res) => {
    db.all("SELECT * FROM messages", (err, messages) => {
      if (err) {
        return res.send("Erro ao carregar mensagens");
      }
      res.render("message_board", { messages });
    });
  });
  
  app.post("/message/new", isAuthenticated, (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;
  
    db.run("INSERT INTO messages (user_id, title, content) VALUES (?, ?, ?)", [userId, title, content], function(err) {
      if (err) {
        return res.send("Erro ao postar mensagem");
      }
      res.redirect("/messages");
    });
  });

// rota visualização
  app.get("/message/:id", isAuthenticated, (req, res) => {
    const messageId = req.params.id;
  
    db.get("SELECT * FROM messages WHERE id = ?", [messageId], (err, message) => {
      if (err || !message) {
        return res.send("Mensagem não encontrada");
      }
      res.render("message_detail", { message });
    });
  });

// iniciar
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
  
