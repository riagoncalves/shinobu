require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PW,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		username: process.env.DB_USER,
		password: process.env.DB_PW,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		dialect: 'postgres',
	},
};