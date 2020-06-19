const Sequelize = require('sequelize');
require("dotenv").config()
let sequelize

if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		dialectOptions: {
		  ssl: true
		}
	  })
} else {
	sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		storage: 'database.sqlite',
	})
}

const Guilds = sequelize.import('./models/Guilds')

module.exports = Guilds