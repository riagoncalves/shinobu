'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userID: DataTypes.STRING,
		username: DataTypes.STRING,
		photo: DataTypes.STRING,
		donuts: DataTypes.INTEGER,
		experience: DataTypes.INTEGER,
		level: DataTypes.INTEGER,
	}, {});
	return User;
};