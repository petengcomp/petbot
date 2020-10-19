const { removest, goTo } = require("../utils/topicsHandler")
const { MessageEmbed } = require("discord.js")
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.topics === null || guild.topics == '[]') {
            return message.channel.send('Não há nenhum tópico para subtópicos serem removidos')
        } else {
            let subTopicsToRemove = message.content.slice(1).split(';')
            subTopicsToRemove[0] = subTopicsToRemove[0].slice(11)

            let oldTopics = JSON.parse(guild.topics)

            for(let i = 0; i< subTopicsToRemove.length; i++){
                let subTopic = subTopicsToRemove[i].split(',')
                subTopic = subTopic.map(st=> st.trim())
                if(subTopic[0] === '*'){
                    oldTopics.forEach(topic=>{
                        topic.subtopics = []
                    })
                    break
                }else{
                    let index = oldTopics.findIndex(topic => {
                        return topic.name === subTopic[0]
                    })
                    if(index === -1 ){
                        message.channel.send(`Não existe tópico na pauta com o nome ${subTopic[0]}.`)
                    }else{
                        for(let j = 1; j< subTopic.length; j++){
                            if(subTopic[j] === '*'){
                                oldTopics[index].subtopics = []
                                break
                            }
                            oldTopics[index].subtopics = removest(oldTopics[index].subtopics, subTopic[j])
                        }
                    }
                }
            }


            const stringifiedUpdatedTopics = JSON.stringify(oldTopics)
            await guild.update({ topics: stringifiedUpdatedTopics })

            if (guild.meeting) {
                let aux = []
                oldTopics.map(topic => {
                    aux.push(topic.name)
                    topic.subtopics.map(subtopic => {
                        aux.push(` \u00A0\u00A0\u00A0\u00A0 ${subtopic}`)
                    })
                })
                oldTopics = aux
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
                message.channel.send(oldTopics !== null && oldTopics.length > 0 ? `Nova pauta: ${oldTopics.map(topic => topic.name)}` : `Todos os tópicos foram removidos`)
            }
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}