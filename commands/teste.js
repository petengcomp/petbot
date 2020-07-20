const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    //message.reply("nada sendo testado. E você não deveria estar usando esse comando.")
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        message.channel.send(JSON.parse(guild.referrals))
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}