const Guilds = require('../data/dbObjects')
const moment = require('moment')
const Discord = require("discord.js")

module.exports = function bdayTask(client) {
    client.guilds.cache.forEach(async (guild, guildId, map) => {
        const anyChannel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

        const fetchedGuild = await Guilds.findOne({ where: { guild_id: guildId } })
        if (fetchedGuild) {
            const today = moment()
            const allBirthdays = new Discord.Collection(JSON.parse(fetchedGuild.birthdays))
            allBirthdays.forEach((bday, person) => {
                today.year(moment(bday).year())

                if (today.isSame(bday, 'day')) {
                    anyChannel.send(`Feliz aniversário <@${person}>!!! ${moment().diff(bday, 'years')} aninhos, né? Tudo de bom 😋`)
                }
            })
        } else {
            return anyChannel.send('Esse servidor não está no banco. Algo de errado não está certo.')
        }
    })
}