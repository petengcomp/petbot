const { remove } = require("../pauta");
const context = require("../meetingContext")
const { MessageEmbed } = require("discord.js")
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    //if(context.thereIsMeeting){
    let topicsToRemove = message.content.slice(1).split(',')
    topicsToRemove[0] = topicsToRemove[0].slice(8)
    topicsToRemove = topicsToRemove.map((topicToRemove) => topicToRemove.trim())

    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.topics === null || guild.topics == '[]') {
            return message.channel.send('Não há nenhum tópico para ser removido')
        } else {
            if (topicsToRemove[0] == '*') {
                await guild.update({ topics: '[]' })
                return message.channel.send('Todos os tópicos foram removidos')
            } else {
                let oldTopics = JSON.parse(guild.topics)
                topicsToRemove.forEach((topicToRemove) => {
                    oldTopics = remove(oldTopics, topicToRemove)
                })
                const stringifiedUpdatedTopics = JSON.stringify(oldTopics)
                await guild.update({ topics: stringifiedUpdatedTopics })
                return message.channel.send('Tópicos removidos')
            }
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }

    const pt = await message.channel.messages.fetch(context.idPauta)
    const embed = new MessageEmbed()
        .setTitle('Pauta')
        .setColor(0x56938E)
        .setDescription("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
        .addFields({ name: '\u200b', value: pauta.topics })
    pt.edit(embed)

    // }else{
    //     message.channel.send("Não há nenhuma reunião rolando 🤔") 
    // }
}