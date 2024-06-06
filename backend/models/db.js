const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

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
    allowNull: false
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'Usuarios'
});

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
  }
}, {
  timestamps: false,
  tableName: 'ItensReciclados'
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  sequelize,
  Usuario,
  ItemReciclado
};
