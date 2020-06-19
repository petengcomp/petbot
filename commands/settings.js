const Guilds = require('../data/dbObjects')
const maxtime = require("../utils/maxtime")
const maxmsg = require("../utils/maxmsg")
const meetrole = require("../utils/meetrole")

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        const setting = message.content.slice(1).split(' ')
        switch(setting[1]){
            case 'maxtime':
                maxtime(message, setting[2])
            break
            case 'maxmsg':
                maxmsg(message, setting[2])
            break
            default:
                message.channel.send('Comando não reconhecido. Verifique `!help`.')
            break
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}