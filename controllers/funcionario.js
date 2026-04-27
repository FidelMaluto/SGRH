const service = require('../services/funcionario');

// POST
exports.criar = async (req,res) => {
    try {
        const funcionario = await service.criaFuncionario(req.body);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(500).json({Erro: error.message});
    };
};

// GET
exports.listar = async (req, res) => {
    const funcionarios = await service.listaFuncionarios();
    res.status(200).json(funcionarios);
};

// GET ID
exports.listarId = async (req, res) => {
    const funcionario = await service.listaIdFuncionario(req.params.id);
    if(!funcionario) return res.status(404).json({Erro: "Funcionário não encontrado!"});

    return res.json(funcionario);
};

// PUT
exports.atualizar = async (req, res) => {
    const funcionario = await service.atualizaFuncionario(
        req.params,
        req.body
    );

    if(!funcionario) return res.status(404).json({Erro: "Funcionário não encontrado!"});

    return res.status(302).json(funcionario);
};

// DELETE
exports.deletar = async (req, res) => {
    const deletado = await service.apagaFuncionario(req.params.id);

    if(!deletado) return res.status(404).json({Erro: "Funcionário não encontrado!"});

    return res.status(302).json({Message: "Funcionário deletado."});
};
