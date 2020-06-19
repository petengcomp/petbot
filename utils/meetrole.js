const Guilds = require('../data/dbObjects')

module.exports = async (message, arg)=> {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    await guild.update({ meet_role: arg})
    message.channel.send(`Cargo para reunião: ${arg} `)
}