'use strict';
module.exports = (sequelize, DataTypes) => {
	const Guild = sequelize.define('Guild', {
		name: DataTypes.STRING,
		link: DataTypes.STRING,
		value: DataTypes.INTEGER,
	}, {});
	return Guild;
};