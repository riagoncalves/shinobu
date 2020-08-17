'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Commands', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			category: {
				type: Sequelize.ENUM,
				values: ['Moderation', 'NSFW', 'Cosmetics', 'Utility', 'Currency', 'Memes'],
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			usage: {
				type: Sequelize.TEXT,
			},
			aliases: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable('Commands');
	},
};
