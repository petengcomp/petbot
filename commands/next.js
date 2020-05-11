const pauta = require("../pauta");
const {MessageEmbed} = require("discord.js")

module.exports = async (message, status, idPauta, doneTopics)=> {
    if(status){
        if(doneTopics+1 >= pauta.topics.length){
            message.channel.send("Não há mais tópicos!")
        }else{
            const pt = await message.channel.messages.fetch(idPauta)
            pauta.goTo(++doneTopics)
            const embed = new MessageEmbed()
            .setTitle('Pauta')
            .setColor(0x56938E)
            .addFields({ name: '\u200b', value: pauta.topics })
            pt.edit(embed)
        }
        return doneTopics
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
}