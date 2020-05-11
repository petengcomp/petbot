const pauta = require("../pauta");
const context = require("../meetingContext")
const {MessageEmbed} = require("discord.js")

module.exports = async (message)=> {
    if(context.thereIsMeeting){
        const args = message.content.slice(0).split(' ');
        args.shift()
        args.forEach(element => {
            pauta.add(element)
        })
        const pt = await message.channel.messages.fetch(context.idPauta)
        const embed = new MessageEmbed()
        .setTitle('Pauta')
        .setColor(0x56938E)
        .addFields({ name: '\u200b', value: pauta.topics })
        pt.edit(embed)
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
}