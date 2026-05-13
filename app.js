require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const funcionarioRoute = require('./routes/funcionarios');
// Teste--> Criando tabela automaticamente

app.use(express.json());
app.use('/api', funcionarioRoute);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso.');
    }).catch(err => {
        console.error('Erro ao conectar: ', err);
    });

// Criando a tabela
sequelize.sync().then(() =>
    console.log('Tabela criada.')).catch(err => console.error(err));

module.exports = app;
