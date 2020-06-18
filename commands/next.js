const context = require("../meetingContext")
const Guilds = require('../data/dbObjects')
const { MessageEmbed } = require("discord.js")
const { goTo } = require("../pauta")

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.meeting) {
            let topics = JSON.parse(guild.topics)
            if (guild.doneTopics + 1 >= topics.length) {
                message.channel.send("Não há mais tópicos!")
            } else {
                const pt = await message.channel.messages.fetch(guild.idPauta)
                let doneTopics = guild.doneTopics
                topics = goTo(topics, ++doneTopics)
                const embed = new MessageEmbed()
                    .setTitle('Pauta')
                    .setDescription("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
                    .setColor(0x56938E)
                    .addFields({ name: '\u200b', value: topics })
                pt.edit(embed)
                await guild.increment('doneTopics')
            }
        } else {
            message.channel.send("Não há nenhuma reunião rolando 🤔")
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}