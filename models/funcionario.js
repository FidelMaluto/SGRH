const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Funcionario = sequelize.define('Funcionario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING
    },
    salario: {
        type: DataTypes.FLOAT
    }
}, {
    tableName: 'funcionario',
    timestamps: true
});

module.exports = Funcionario;
