const express = require('express');
const route = express.Router();
const controller = require('../controllers/funcionario');

route.post('/funcionario', controller.criar);
route.get('/funcionarios', controller.listar);
route.get('/funcionario/:id', controller.listarId);
route.put('/funcionario/:id', controller.atualizar);
route.delete('/funcionario/:id', controller.deletar);

module.exports = route;
