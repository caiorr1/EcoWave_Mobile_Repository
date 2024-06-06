const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Usuario = require('./user');

const ItemReciclado = sequelize.define('ItemReciclado', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_item: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  data_coleta: {
    type: DataTypes.DATE
  },
  localizacao: {
    type: DataTypes.STRING(100)
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'usuario_id'
    }
  }
}, {
  timestamps: false,
  tableName: 'ItensReciclados'
});

module.exports = ItemReciclado;
