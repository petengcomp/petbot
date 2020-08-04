const Guilds = require('../data/dbObjects')

module.exports = async (message) => {
    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        let referrals = message.content.slice(1).split(';')
        referrals[0] = referrals[0].slice(8)
        referrals = referrals.map((refferal) => {
            if (refferal.length > 0)
                return "• " + refferal.trim()
        })
        const stringifiedRefferals = JSON.stringify(referrals.join('\n'))
        await guild.update({ referrals: stringifiedRefferals })
        message.author.send('Encaminhamentos salvos!')
        message.author.send(referrals.join('\n'))

    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}