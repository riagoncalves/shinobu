'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				'Users',
				'rep',
				{
					type: Sequelize.INTEGER,
					defaultValue: 0,
				},
			),
			queryInterface.addColumn(
				'Users',
				'repCheck',
				{
					type: Sequelize.DATE,
					defaultValue: new Date(new Date().setDate(new Date().getDate() - 1)),
				},
			),
			queryInterface.addColumn(
				'Users',
				'title',
				{
					type: Sequelize.STRING,
				},
			),
			queryInterface.addColumn(
				'Users',
				'BackgroundId',
				{
					type: Sequelize.INTEGER,
					references: {
						model: {
							tableName: 'UserBackgrounds',
						},
						key: 'id',
					},
				},
			),
		]);
	},

	down: (queryInterface) => {
		return Promise.all([
			queryInterface.removeColumn('Users', 'rep'),
			queryInterface.removeColumn('Users', 'repCheck'),
			queryInterface.removeColumn('Users', 'title'),
			queryInterface.removeColumn('Users', 'BackgroundId'),
		]);
	},
};
