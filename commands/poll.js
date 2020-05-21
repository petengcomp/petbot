const {MessageEmbed} = require("discord.js")
const DURATION = 15
const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

module.exports = async (message)=> {
    let ops = []
    let args = message.content.slice(6).split(',');
    const title = args[0]
    const numOfOptions = args[1].trim()
    const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(numOfOptions > 1 ? `Essa votação durará ${DURATION} segundos. Clique em uma das reações para votar. Somente **${numOfOptions}** opções serão contabilizadas` : `Essa votação durará ${DURATION} segundos. Clique em uma das reações para votar. Somente **${numOfOptions}** opção será contabilizada`)
    .setColor(0xFFA17A)
    args = args.slice(2)
    let i = 0
    args.forEach(elem => {
        ops.push({emoji: reactions[i], option: elem.trim()})
        i++
    })
    const fields = []
    for (let i = 0; i < ops.length; i++) {
        fields.push({name: '\u200b', value: `${ops[i].emoji} ${ops[i].option}`})
    }
    message.channel.send("Iniciando regime de votação")
    const poll = await message.channel.send(embed.addFields(fields))
    for(let i=0; i < ops.length; i++){
        await poll.react(reactions[i])
    }

    const filter = (reaction, user) => {
        if (!user.bot) {
            let occur = poll.reactions.cache.filter((elem) => elem.users.cache.has(user.id)).size
            return occur <= numOfOptions && reactions.includes(reaction.emoji.name)
        } else {
            return false
        }
    }

    poll.awaitReactions(filter, {time: DURATION * 1000})
        .then(collected => {
            ops.forEach((elem) => {
                elem.count = collected.get(elem.emoji) !== undefined ? (collected.get(elem.emoji).count-1) : 0
            })
            const max = ops.reduce((p, c) => p.count > c.count ? p : c)
            if (max.count > 0){
                const approved = ops.filter((elem) => elem.count == max.count)
                if (approved.length > 1) {
                    message.channel.send("Houve um empate:")
                    approved.forEach((elem) => message.channel.send(elem.option))
                } else 
                    message.channel.send("Aprovado: \n**"+approved[0].option+"**")
            }else{
                message.channel.send("Nenhum voto.")
            }
        })
}