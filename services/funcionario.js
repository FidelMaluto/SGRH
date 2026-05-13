const Funcionario = require('../models/funcionario');

// Rota POST
exports.criaFuncionario = async (dados) => {
    return await Funcionario.create(dados);
};

// Rota GET 
exports.listaFuncionarios = async () => {
    return Funcionario.findAll();
};

// Rota GET ID
exports.listaIdFuncionario = async (id) => {
    return await Funcionario.findByPk(id);
};

// Rota PUT
exports.atualizaFuncionario = async (id, dados) => {
    const funcionario = await Funcionario.findByPk(id);
    if(!funcionario) return null;

    return await funcionario.update(dados);
};

// Rota DELETE
exports.apagaFuncionario = async (id) => {
    const funcionario = await Funcionario.findByPk(id);
    if(!funcionario) return null;

    await funcionario.destroy();
    return true;
}
