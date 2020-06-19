const { remove, goTo } = require("../utils/topicsHandler")
const { MessageEmbed } = require("discord.js")
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.topics === null || guild.topics == '[]') {
            return message.channel.send('Não há nenhum tópico para ser removido')
        } else {
            let topicsToRemove = message.content.slice(1).split(',')
            topicsToRemove[0] = topicsToRemove[0].slice(8)
            topicsToRemove = topicsToRemove.map((topicToRemove) => topicToRemove.trim())
            let oldTopics = JSON.parse(guild.topics)

            if (topicsToRemove[0] == '*') {
                oldTopics = []
            } else {
                topicsToRemove.forEach((topicToRemove) => {
                    oldTopics = remove(oldTopics, topicToRemove)
                })
            }
            const stringifiedUpdatedTopics = JSON.stringify(oldTopics)
            await guild.update({ topics: stringifiedUpdatedTopics })

            if (guild.meeting) {
                if (guild.done_topics > 0) {
                    await guild.decrement('done_topics')
                    oldTopics = goTo(oldTopics, guild.done_topics - 1)
                } else {
                    oldTopics = goTo(oldTopics, guild.done_topics)
                }

                const pt = await message.channel.messages.fetch(guild.topics_message_id)
                const embed = new MessageEmbed()
                    .setTitle(pt.embeds[0].title)
                    .setColor(pt.embeds[0].color.toString(16))
                    .setDescription(pt.embeds[0].description)
                    .addFields(oldTopics !== null && oldTopics.length > 0 ? { name: '\u200b', value: oldTopics } : { name: '\u200b', value: "Não há nenhum tópico. Digite `!help` para saber como adicioná-los" })
                pt.edit(embed)
            } else {
                message.channel.send(oldTopics !== null && oldTopics.length > 0 ? `Nova pauta: ${oldTopics}` : `Todos os tópicos foram removidos`)
            }
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}