const Guilds = require('../data/dbObjects')

module.exports = async (message)=> {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        const arg = parseInt(message.content.slice(9))
        if(!isNaN(arg)){
            const time = (arg > 600 ? 600 : arg)
            await guild.update({ voteTime: time})
            message.channel.send(`Tempo máximo de votação alterado para ${time}.`)
        } else {
            message.channel.send('Não é um número.')
        }
    } else {
        message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}