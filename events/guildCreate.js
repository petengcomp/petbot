const Guilds = require('../data/dbObjects')

module.exports = async (client, guild) => {
    try {
        await Guilds.create({
            guild_id: guild.id
        })
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            return console.log('Voltei 😁')
        }
        return console.log('Algo deu errado 😕 '+ e)
    }
}