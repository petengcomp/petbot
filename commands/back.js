const pauta = require("../pauta");
const context = require("../meetingContext")
const {MessageEmbed} = require("discord.js")

module.exports = async (message)=> {
    if(context.thereIsMeeting){
        if(context.doneTopics-1 < 0){
            message.channel.send("Não há mais tópicos!")
        }else{
            const pt = await message.channel.messages.fetch(context.idPauta)
            pauta.goTo(--context.doneTopics)
            const embed = new MessageEmbed()
            .setTitle('Pauta')
            .setColor(0x56938E)
            .addFields({ name: '\u200b', value: pauta.topics })
            pt.edit(embed)
        }
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
}