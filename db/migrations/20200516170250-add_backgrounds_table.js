'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Backgrounds', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			link: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			value: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		return queryInterface.dropTable('Backgrounds');
	},
};
