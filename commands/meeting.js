const pauta = require("../pauta");
const {MessageEmbed} = require("discord.js")

module.exports = async (message)=> {
    await message.channel.send("Começando a reunião. Atenção @everyone!")
    pauta.goTo(0)
    const embed = new MessageEmbed()
      .setTitle('Pauta')
      .setColor(0x56938E)
      .addFields({ name: '\u200b', value: pauta.topics })
    const msg = await message.channel.send(embed)
    msg.pin()
    return msg.id
  }