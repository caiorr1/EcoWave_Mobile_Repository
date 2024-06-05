'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_usuario: DataTypes.STRING,
    senha_hash: DataTypes.STRING,
    email: DataTypes.STRING,
    data_registro: DataTypes.DATE,
    localizacao: DataTypes.STRING,
    foto_perfil: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
