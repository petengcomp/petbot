const next = require("../commands/next")
const end = require("../commands/end")
const back = require("../commands/back")
const Guilds = require('../data/dbObjects')
const { MessageEmbed } = require("discord.js")

module.exports = async (client, reaction, user) => {
   let message = reaction.message
   let emoji = reaction.emoji
   const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
   if (guild) {
      if (message.id == guild.topics_message_id && !user.bot) {
         if (emoji.name === '❌') {
            await end(message)
         } else if (emoji.name === '🔼') {
            await back(message)
         } else if (emoji.name === '🔽') {
            await next(message)
         }
      }
   } else {
      return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
   }
}