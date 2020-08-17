'use strict';
module.exports = (sequelize, DataTypes) => {
	const Command = sequelize.define('Command', {
		name: DataTypes.STRING,
		category: DataTypes.ENUM(['Moderation', 'NSFW', 'Cosmetics', 'Utility', 'Currency', 'Memes']),
		description: DataTypes.TEXT,
		aliases: DataTypes.ARRAY(DataTypes.STRING),
	}, {});

	return Command;
};