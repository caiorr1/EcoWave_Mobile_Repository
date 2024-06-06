const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  senha_hash: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'Usuarios'
});

module.exports = Usuario;
