'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userID: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			username: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
			},
			photo: {
				type: Sequelize.STRING,
			},
			donuts: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			experience: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			level: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
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
		return queryInterface.dropTable('Users');
	},
};
