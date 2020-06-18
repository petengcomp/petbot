const pauta = require("../pauta")
const Guilds = require('../data/dbObjects')
const { MessageEmbed } = require("discord.js")
const { goTo } = require("../pauta")

module.exports = async (message) => {
  const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
  if (guild) {
    const voiceStatus = message.guild.voiceStates.cache.get(message.author.id)
    if (voiceStatus != undefined && voiceStatus.channelID != null) {
      await message.channel.send("Começando a reunião.")
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
    const topics = JSON.parse(guild.topics)
    const embed = new MessageEmbed()
      .setTitle('Pauta')
      .setColor(0x56938E)
      .setDescription("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
      .addFields({ name: '\u200b', value: topics })
    const msg = await message.channel.send(embed)
    
    await guild.update({ meeting: true, idPauta: msg.id })
    await msg.react('🔽')
    await msg.react('🔼')
    await msg.react('❌')
    await msg.pin()

  } else {
    return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
  }
}