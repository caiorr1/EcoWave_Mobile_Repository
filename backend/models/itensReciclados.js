'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItensReciclados = sequelize.define('ItensReciclados', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo_item: DataTypes.STRING,
    data_coleta: DataTypes.DATE,
    localizacao: DataTypes.STRING,
    quantidade: DataTypes.INTEGER
  }, {});
  ItensReciclados.associate = function(models) {
    ItensReciclados.belongsTo(models.User, { foreignKey: 'usuario_id' });
  };
  return ItensReciclados;
};
