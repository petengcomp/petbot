const pauta = require("../pauta")
const Guilds = require('../data/dbObjects')

module.exports = async (message)=> {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.meeting) {
            const pinned = await message.channel.messages.fetchPinned()
            pinned.get(guild.idPauta).unpin()
            pauta.goTo(0)
            message.channel.send("Reunião finalizada! 😁")
            await guild.update({ meeting: false, idPauta: null })
        } else {
            message.channel.send("Não há nenhuma reunião rolando 🤔") 
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}