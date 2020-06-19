const Sequelize = require('sequelize');
require("dotenv").config()
let sequelize

if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		native: true
	})
} else {
	sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		storage: 'database.sqlite',
	})
}

sequelize.import('./models/Guilds')

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force }).then(async () => {
	console.log('Banco de dados syncado')
	sequelize.close()
}).catch(console.error)