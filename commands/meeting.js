const pauta = require("../pauta");
const context = require("../meetingContext")
const {MessageEmbed} = require("discord.js")

module.exports = async (message)=> {
    context.thereIsMeeting = true
    await message.channel.send("Começando a reunião. Atenção @everyone!")
    message.channel.send("Aperte '🔽' para passar o tópico ou '🔼' para voltar. Ao final da reunião, aperte '❌' para finalizá-la 😉")
    pauta.goTo(0)
    const embed = new MessageEmbed()
      .setTitle('Pauta')
      .setColor(0x56938E)
      .addFields({ name: '\u200b', value: pauta.topics })
    const msg = await message.channel.send(embed)
    try {
			await msg.react('🔽');
			await msg.react('🔼');
		  await msg.react('❌');
		} catch (error) {
			console.error('One of the emojis failed to react.');
		}
    await msg.pin()
    context.idPauta = msg.id
  }