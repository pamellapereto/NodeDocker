const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const conexao = mysql.createConnection ({
    host: '172.17.0.1',
    port: '6520',
    user: 'root',
    password: '123@senac',
    database: 'bancoLoja'
});

conexao.connect((erro) => {
    if (erro) {
        return console.error(`Não conectou! ➝ ${erro}`);
    }
    console.log(`Banco de dados online! ➝ ${conexao.threadId}`);

});

app.get("/usuarios/listar", (req, res) => {
    conexao.query("Select * from usuario", (erro, dados) => {
        if (erro) return res.status(500).send({output: `Erro ➝ ${erro}`})
        res.status(200).send({output: dados});
    });
});

app.post("/usuarios/cadastrar", (req, res) => {
    if (req.body.nomeUsuario == "" || 
    req.body.nomeUsuario == "" ||
    req.body.senha == "" ||
    req.body.email == "" ||
    req.body.nomeCompleto == "" ||
    req.body.cpf == "" ||
    req.body.foto == ""
    ) {
        return res.status(400).send ({ output: `Você deve passar todos os dados!` })
    }

    conexao.query("insert into usuario set ?", req.body, (erro, data) => {
        if (erro) return res.status(500).send({output: `Erro ao tentar cadastrar ➝ ${erro}`})
        res.status(201).send({output: `Usuário cadastrado com sucesso!`, dados:data})
    });
});

app.post("/usuarios/login", (req, res) => {
    if (req.body.nomeUsuario == "" ||
        req.body.senha == "") {
            return res.status(400).send({output: `Você deve passar todos os dados!`});
        }

        conexao.query("select * from usuario where nomeUsuario = ? and senha = ?", [red.body.nomeUsuario, red.body.senha], (erro, data) => {
            if (erro) return res.status(500).send({output: `Erro ao tentar logar ➝ ${erro}`})
            res.status(200).send({output: `Logado!`, dados:data})

        })
});

app.put("/usuarios/atualizar/:id", (req, res) => {
    conexao.query("update usuario set ? where id = ?" [req.body, req.params.id], (erro, data) => {
        if (erro) return res.status(500).send({output: `Erro ao tentar atualizar ➝ ${erro}`})
        res.status(200).send({output: `Dados atualizados com sucesso!`, dados:data})
    });
});

app.listen("3000", () => console.log("Servidor online!"))