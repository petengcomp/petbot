const Guilds = require('../data/dbObjects')

module.exports = async (message, arg)=> {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if(!isNaN(arg)){
        const time = (arg > 600 ? 600 : arg)
        await guild.update({ vote_time: time})
        message.channel.send(`Tempo máximo de votação alterado para ${time} segundos.`)
    } else {
        message.channel.send('Não é um número.')
    }
}