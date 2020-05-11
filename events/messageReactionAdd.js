const context = require("../meetingContext")
const next = require("../commands/next")
const end = require("../commands/end")
const back = require("../commands/back")

module.exports = async (client, reaction, user) => {
      let message = reaction.message
      let emoji = reaction.emoji

      if(message.id == context.idPauta){
          if (emoji.name === '🔼') {
            back(message)
         } else if (emoji.name === '🔽') {
            next(message)
         }else if (emoji.name === '❌') {
            end(message)
         }     
      }
}