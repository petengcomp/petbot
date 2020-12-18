const Guilds = require('../data/dbObjects')
const moment = require('moment')
const Discord = require("discord.js")
const bdayTask = require('../utils/bdayTask')

module.exports = async (client, message) => {
    //message.reply("nada sendo testado. E você não deveria estar usando esse comando.")
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.meeting) {
            // const pinned = await message.channel.messages.fetchPinned()
            // await pinned.get(guild.topics_message_id).unpin()
            await guild.update({ meeting: false, topics_message_id: null, done_topics: 0, sent_since_meeting_start: 0 })
            await message.channel.send("Reunião finalizada! 😁 ")
            // await message.channel.send("**Lembre-se** de adicionar os encaminhamentos aqui. Use o comando `!reminder <encaminhamento1> ; <encaminhamento2> ; ...`")
        } else {
            message.channel.send("Não há nenhuma reunião rolando 🤔")
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}