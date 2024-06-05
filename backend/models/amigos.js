'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amigos = sequelize.define('Amigos', {
    amigo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    data_amizade: DataTypes.DATE
  }, {});
  Amigos.associate = function(models) {
    Amigos.belongsTo(models.User, { foreignKey: 'usuario_id' });
  };
  return Amigos;
};
