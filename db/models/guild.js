'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guild = sequelize.define('Guild', {
    guildID: DataTypes.STRING,
    guildName: DataTypes.STRING,
    banner: DataTypes.STRING,
    ownerID: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    prefix: DataTypes.STRING,
  }, {});
  return Guild;
};