const { add, goTo } = require('../utils/topicsHandler')
const { MessageEmbed } = require('discord.js')
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        let newTopics = message.content.slice(1).split(',')
        newTopics[0] = newTopics[0].slice(8)
        newTopics = newTopics.map((newTopic) => newTopic.trim())

        let topics = []
        if (guild.topics !== null) {
            topics = JSON.parse(guild.topics)
        }
        newTopics.forEach((newTopic) => {
            topics = add(topics, newTopic)
        })
        const stringifiedUpdatedTopics = JSON.stringify(topics)
        await guild.update({ topics: stringifiedUpdatedTopics })

        if (guild.meeting) {
            topics = goTo(topics, guild.done_topics)
            
            const pt = await message.channel.messages.fetch(guild.topics_message_id)
            const embed = new MessageEmbed()
                .setTitle('Pauta')
                .setColor(0x56938E)
                .setDescription("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
                .addFields({ name: '\u200b', value: topics })
            pt.edit(embed)
        } else {
            message.channel.send(`Nova pauta: ${topics}`)
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}