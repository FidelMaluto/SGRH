const service = require('../services/funcionario');

// POST
exports.criar = async (req, res) => {
    try {
        const funcionario = await service.criaFuncionario(req.body);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(500).json({ Erro: error.message });
    };
};

// GET
exports.listar = async (req, res) => {
    try {
        const funcionarios = await service.listaFuncionarios();
        res.status(200).json(funcionarios);
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao consultar!" + error.message });
    }
};

// GET ID
exports.listarId = async (req, res) => {
    try {
        const funcionario = await service.listaIdFuncionario(req.params.id);
        if (!funcionario) return res.status(404).json({ Erro: "Funcionário não encontrado!" });

        return res.json(funcionario);
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao buscar Funcionário!" + error.message });
    }
};

// PUT
exports.atualizar = async (req, res) => {
    try {
        const funcionario = await service.atualizaFuncionario(
            req.params.id,
            req.body
        );

        if (!funcionario) return res.status(404).json({ Erro: "Funcionário não encontrado!" });

        return res.status(302).json(funcionario);
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao atualizar!" + error.message });
    }
};

// DELETE
exports.deletar = async (req, res) => {
    try {
        const deletado = await service.apagaFuncionario(req.params.id);

        if (!deletado) return res.status(404).json({ Erro: "Funcionário não encontrado!" });

        return res.status(302).json({ Message: "Funcionário deletado." });
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao apagar!" + error.message });
    }
};
