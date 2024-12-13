const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema_eventos",
});

// Conecta ao banco de dados
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySQL!");
});

// Rota para registrar usuários
app.post("/api/usuarios", (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    const query = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
    db.query(query, [nome, email, senha, tipo], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Usuário registrado com sucesso!");
    });
});

// Rota para login de usuários
app.post("/api/usuarios/login", (req, res) => {
    const { email, senha } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(query, [email, senha], (err, results) => {
        if (err) return res.status(500).send("Erro ao verificar credenciais.");
        if (results.length === 0) return res.status(401).send("E-mail ou senha incorretos.");
        res.json({ user: results[0] });
    });
});


// Rota para login de usuários
app.post("/api/usuarios/login", (req, res) => {
    const { email, senha } = req.body;
    const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(query, [email, senha], (err, results) => {
        if (err) return res.status(500).send("Erro ao verificar credenciais.");
        if (results.length === 0) return res.status(401).send("E-mail ou senha incorretos.");
        res.json({ user: results[0] });
    });
});

// Rota para criar eventos
app.post("/api/eventos", (req, res) => {
    const { titulo, descricao, data, horario, local } = req.body;
    const query = "INSERT INTO eventos (titulo, descricao, data, horario, local) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [titulo, descricao, data, horario, local], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Evento criado com sucesso!");
    });
});

// Rota para listar eventos
app.get("/api/eventos", (req, res) => {
    const query = "SELECT * FROM eventos";
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Rota para enviar feedback
app.post("/api/feedbacks", (req, res) => {
    const { evento_id, avaliacao, comentario } = req.body;
    const query = "INSERT INTO feedbacks (evento_id, avaliacao, comentario) VALUES (?, ?, ?)";
    db.query(query, [evento_id, avaliacao, comentario], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Feedback enviado com sucesso!");
    });
});

// Inicia o servidor
app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000.");
});
