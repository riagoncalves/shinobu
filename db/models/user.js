'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userID: DataTypes.STRING,
		username: DataTypes.STRING,
		photo: DataTypes.STRING,
	}, {});
	return User;
};