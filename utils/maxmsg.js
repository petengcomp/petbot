const Guilds = require('../data/dbObjects')

module.exports = async (message, arg)=> {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if(!isNaN(arg)){
        await guild.update({ max_messages_til_resend: arg})
        message.channel.send(`Máximo de mensagens até que a pauta seja reenviada alterado para ${arg}.`)
    } else {
        message.channel.send('Não é um número.')
    }
}