const next = require("../commands/next")
const end = require("../commands/end")
const back = require("../commands/back")
const Guilds = require('../data/dbObjects')

module.exports = async (client, reaction, user) => {
   let message = reaction.message
   let emoji = reaction.emoji
   const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
   if (guild) {
      if (guild.meeting) {
         if (message.id == guild.idPauta) {
            if (emoji.name === '🔼') {
               back(message)
            } else if (emoji.name === '🔽') {
               next(message)
            } else if (emoji.name === '❌') {
               end(message)
            }
         }
      } else {
         message.channel.send("Não há nenhuma reunião rolando 🤔")
      }
   } else {
      return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
   }
}