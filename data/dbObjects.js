const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
})

const Guilds = sequelize.import('./models/Guilds')
const Topics = sequelize.import('./models/Topics')

Topics.belongsTo(Guilds, {foreignKey: 'guild_id'});

module.exports = {Guilds, Topics}