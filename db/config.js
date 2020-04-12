const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PW, {
	host: '127.0.0.1',
	dialect: 'postgres',
	logging: false,
	operatorsAliases: false,
});