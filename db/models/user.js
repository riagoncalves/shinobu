'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userID: DataTypes.STRING,
		username: DataTypes.STRING,
		photo: DataTypes.STRING,
		donuts: DataTypes.INTEGER,
		experience: DataTypes.INTEGER,
		level: DataTypes.INTEGER,
		dailyCheck: DataTypes.DATE,
		rep: DataTypes.INTEGER,
		repCheck: DataTypes.DATE,
		title: DataTypes.STRING,
		color: DataTypes.STRING,
	}, {});

	User.associate = function(models) {
		User.hasMany(models.UserBackground, { as: 'backgrounds' });
		User.belongsTo(models.UserBackground, { as: 'Background' });
	};

	return User;
};