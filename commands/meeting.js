const Guilds = require('../data/dbObjects')
const { MessageEmbed } = require("discord.js")
const { goTo } = require("../utils/topicsHandler")
const end = require("../commands/end")

module.exports = async (message) => {
  let guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
  if (guild) {
    if(guild.meeting){
      message.channel.send('Finalizando a reunião em aberto')
      await end(message)
      guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    }
    const voiceStatus = message.guild.voiceStates.cache.get(message.author.id)
    if (voiceStatus != undefined && voiceStatus.channelID != null) {
      message.channel.send("Começando a reunião.")
      const allMembers = message.guild.members.cache
      const presentMembers = message.guild.voiceStates.cache
      const missing = allMembers.difference(presentMembers)
      missing.sweep((elem) => elem.user.bot)
      if (missing.size > 0) {
        let msg = `Ainda faltam: `
        missing.forEach((elem) => msg += `<@${elem.user.id}> `)
        message.channel.send(msg)
      } else {
        message.channel.send("Todos estão presentes.")
      }
    } else {
      return message.reply("você precisa estar em um canal de voz para começar uma reunião.")
    }
    let topics = JSON.parse(guild.topics)
    topics = goTo(topics, 0)
    const embed = new MessageEmbed()
      .setTitle('Pauta')
      .setColor(0x56938E)
      .setDescription("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
      .addFields(topics !== null && topics.length > 0 ? { name: '\u200b', value: topics } : { name: '\u200b', value: "Não há nenhum tópico. Digite `!help` para saber como adicioná-los"})
    const msg = await message.channel.send(embed)
    
    await guild.update({ meeting: true, topics_message_id: msg.id })
    await msg.react('🔽')
    await msg.react('🔼')
    await msg.react('❌')
    await msg.pin()

  } else {
    return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
  }
}