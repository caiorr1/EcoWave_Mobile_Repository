const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Coleta = sequelize.define('Coleta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'usuario_id'
    }
  },
  tipo_item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'coletas',
  timestamps: false
});

module.exports = Coleta;
