'use strict';
module.exports = (sequelize, DataTypes) => {
	const Guild = sequelize.define('User', {
		userID: DataTypes.STRING,
		username: DataTypes.STRING,
		photo: DataTypes.STRING,
	}, {});
	return Guild;
};