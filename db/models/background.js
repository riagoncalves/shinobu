'use strict';
module.exports = (sequelize, DataTypes) => {
  const Background = sequelize.define('Background', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    value: DataTypes.INTEGER,
    rank: DataTypes.ENUM(
      'Common',
      'Uncommon',
      'Rare',
      'Legendary',
    ),
  }, {});

  Background.associate = function(models) {
    Background.hasMany(models.UserBackground, { as: 'userbackgrounds' });
  };

  return Background;
};