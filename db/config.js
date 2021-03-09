require('dotenv').config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PW,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: 'postgres',
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};