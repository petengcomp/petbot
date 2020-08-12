const Guilds = require('../data/dbObjects')
const Discord = require("discord.js")

module.exports = async (client, guildMember) => {
    const guild = await Guilds.findOne({ where: { guild_id: guildMember.guild.id } })
    if (guild) {
        const allBirthdays = new Discord.Collection(JSON.parse(guild.birthdays))
        allBirthdays.delete(guildMember.id)
        const stringifiedBdays = JSON.stringify(Array.from(allBirthdays.entries()))
        await guild.update({ birthdays: stringifiedBdays })
    } else {
        return console.log('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}