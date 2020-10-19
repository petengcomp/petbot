const { add, goTo, addst } = require('../utils/topicsHandler')
const { MessageEmbed } = require('discord.js')
const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        
        if (guild.topics !== null) {
            let topics = JSON.parse(guild.topics)
            let newSubTopics = message.content.slice(1).split(';')
            newSubTopics[0] = newSubTopics[0].slice(11)
            // newSubTopics = newTopics.map((newTopic) => newTopic.trim())

            newSubTopics.map(newSubTopic=>{
                let subTopic = newSubTopic.split(',')
                subTopic = subTopic.map(st=> st.trim())
                // 
                // let Topico = {
                //     name: subTopic[0],
                //     subtopics: subTopic.slice(1)
                // }
                let index = topics.findIndex(topic => {
                    return topic.name === subTopic[0]
                })
                if(index === -1 ){
                    message.channel.send(`Não existe tópico na pauta com o nome ${subTopic[0]}.`)
                }else{
                    subTopic.slice(1).forEach(st=>{
                        topics[index].subtopics = addst(topics[index].subtopics, st)
                    } )
                }
            })
            const stringifiedUpdatedTopics = JSON.stringify(topics)
            await guild.update({ topics: stringifiedUpdatedTopics })
            if (guild.meeting) {
                let aux = []
                topics.map(topic => {
                    aux.push(topic.name)
                    topic.subtopics.map(subtopic => {
                        aux.push(` \u00A0\u00A0\u00A0\u00A0 ${subtopic}`)
                    })
                })
                topics = aux
                topics = goTo(topics, guild.done_topics)
                
                const pt = await message.channel.messages.fetch(guild.topics_message_id)
                const embed = new MessageEmbed()
                    .setTitle(pt.embeds[0].title)
                    .setColor(pt.embeds[0].color.toString(16))
                    .setDescription(pt.embeds[0].description)
                    .addFields({ name: '\u200b', value: topics})
                pt.edit(embed)
            } else {
                message.channel.send(`Nova pauta: ${topics.map(topic=> {return topic.name})}`)
            }
        }else{
            return message.channel.send('Esse servidor não possui uma pauta de reunião ainda. Por favor crie sua pauta com o comando !mktopic.')
        }
        
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}