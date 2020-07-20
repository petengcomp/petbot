const Guilds = require('../data/dbObjects')
const { MessageEmbed } = require("discord.js")

module.exports = async (message) => {
    if (message.channel.type === 'dm') return

    const guild = await Guilds.findOne({ where: { guild_id: message.guild.id } })
    if (guild) {
        if (guild.meeting) {
            if (guild.sent_since_meeting_start === guild.max_messages_til_resend) {
                await guild.update({ sent_since_meeting_start: 0 })
                const pt = await message.channel.messages.fetch(guild.topics_message_id)
                await pt.unpin()
                const embed = new MessageEmbed()
                    .setTitle(pt.embeds[0].title)
                    .setColor(pt.embeds[0].color.toString(16))
                    .setDescription(pt.embeds[0].description)
                    .addFields(pt.embeds[0].fields)
                const msg = await message.channel.send(embed)

                await guild.update({ topics_message_id: msg.id })
                await msg.react('🔽')
                await msg.react('🔼')
                await msg.react('❌')
                await msg.pin()
            } else if (!message.author.bot) {
                await guild.increment('sent_since_meeting_start')
            }
        }
    } else {
        return message.channel.send('Esse servidor não está no banco. Algo de errado não está certo.')
    }
}