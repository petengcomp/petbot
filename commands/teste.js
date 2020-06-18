// module.exports = async (message)=> {
//     message.reply("nada sendo testado. E você não deveria estar usando esse comando.")
// }
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    try {
        await Guilds.create({
            guild_id: message.guild.id
        })
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            return console.log('Voltei 😁')
        }
        return console.log('Algo deu errado 😕 '+ e)
    }
}