'use strict';
module.exports = (sequelize, DataTypes) => {
  const Background = sequelize.define('Background', {
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    link: DataTypes.STRING,
    value: DataTypes.INTEGER,
    rank: DataTypes.ENUM(
      'common',
      'uncommon',
      'rare',
      'legendary',
    ),
  }, {});

  Background.associate = function(models) {
    Background.hasMany(models.UserBackground, { as: 'userbackgrounds' });
  };

  return Background;
};
