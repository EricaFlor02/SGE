CREATE DATABASE sistema_eventos;

USE sistema_eventos;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('participante', 'administrador') NOT NULL
);


CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    data DATE,
    horario TIME,
    local VARCHAR(255),
    participantes INT DEFAULT 0
);

CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT,
    avaliacao INT,
    comentario TEXT,
    FOREIGN KEY (evento_id) REFERENCES eventos(id)
);

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Para senhas seguras
const session = require("express-session"); // Para gerenciar sessões

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configurar sessões
app.use(
    session({
        secret: "seu-segredo-aqui", // Chave secreta
        resave: false,
        saveUninitialized: true,
    })
);

// Configurar o banco de dados MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema_eventos",
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySQL!");
});

// Rota para login
app.post("/api/login", (req, res) => {
    const { email, senha } = req.body;

    const query = "SELECT * FROM usuarios WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(401).send("E-mail não encontrado.");
        }

        const user = results[0];

        // Comparar a senha com o hash armazenado
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(401).send("Senha incorreta.");
        }

        // Armazenar informações do usuário na sessão
        req.session.user = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
        };

        res.send({ message: "Login bem-sucedido", tipo: user.tipo });
    });
});

// Rota para verificar usuário logado
app.get("/api/auth", (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.status(401).send("Não autenticado.");
    }
});

// Rota para logout
app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send(err);
        res.send("Logout bem-sucedido.");
    });
});

// Iniciar o servidor
app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});
