const { Sequelize, DataTypes } = require('sequelize');

// Configurar o Sequelize
const sequelize = new Sequelize("",{dialect: 'postgres'});


// Definir um modelo para uma tabela chamada 'Usuarios'
const Usuario = sequelize.define('Usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Sincronizar o modelo com o banco de dados
sequelize.sync({ force: true }) // Use { force: true } apenas para recrear o banco de dados
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });

module.exports = { Usuario };
