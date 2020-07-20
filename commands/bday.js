const Guilds = require('../data/dbObjects')
const moment = require('moment')
const Discord = require("discord.js")

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        moment.locale('pt')
        const birthday = moment(message.content.slice(5).trim(), "DD/MM/YYYY", true)
        if (birthday.isValid()) {
            const allBirthdays = new Discord.Collection(JSON.parse(guild.birthdays))
            allBirthdays.set(message.author.id, birthday)

            const stringifiedBdays = JSON.stringify(Array.from(allBirthdays.entries()))
            await guild.update({ birthdays: stringifiedBdays })
            message.author.send(`Seu niver foi salvo como ${birthday.format("D [de] MMMM")}`)
        } else {
            message.author.send('A data de aniversário que você colocou é inválida... Lembre-se de colocar DD/MM/AAAA')
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}