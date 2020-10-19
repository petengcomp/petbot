const meeting = require("../commands/meeting")
const end = require("../commands/end")
const next = require("../commands/next")
const back = require("../commands/back")
const mktopic = require("../commands/mktopic")
const rmtopic = require("../commands/rmtopic")
const help = require("../commands/help")
const poll = require("../commands/poll")
const vote = require("../commands/vote")
const teste = require("../commands/teste")
const settings = require("../commands/settings")
const reminder = require("../commands/reminder")
const bday = require("../commands/bday")
const countSentMessages = require("../utils/countMessages")
const mksubtopic = require("../commands/mksubtopic")
const rmsubtopic = require("../commands/rmsubtopic")

const Guilds = require('../data/dbObjects')

module.exports = async (client, message) => {
    //tenta encontrar ou criar o servidor no bd
    const [guild, created] = await Guilds.findOrCreate({ where: { guild_id: message.guild.id } })
    // try {
    //     await Guilds.create({
    //         guild_id: message.guild.id
    //     })
    // }
    // catch (e) {
    //     if (e.name === 'SequelizeUniqueConstraintError') {
    //         return console.log('Voltei 😁')
    //     }
    //     return console.log('Algo deu errado 😕 '+ e)
    // }

    countSentMessages(message)

    if (message.content.startsWith("!meeting")) {
        meeting(message)
    } else if (message.content.startsWith("!end")) {
        end(message)
    } else if (message.content.startsWith("!next")) {
        next(message)
    } else if (message.content.startsWith("!back")) {
        back(message)
    } else if (message.content.startsWith("!mktopic")) {
        mktopic(message)
    } else if (message.content.startsWith("!mksubtopic")) {
        mksubtopic(message)
    } else if (message.content.startsWith("!rmtopic")) {
        rmtopic(message)
    } else if (message.content.startsWith("!rmsubtopic")) {
        rmsubtopic(message)
    } else if (message.content.startsWith("!help")) {
        help(message)
    } else if (message.content.startsWith("!poll")) {
        poll(message)
    } else if (message.content.startsWith("!vote")) {
        vote(client, message)
    } else if (message.content.startsWith("!settings")) {
        settings(message)
    } else if (message.content.startsWith("!reminder")) {
        reminder(message)
    } else if (message.content.startsWith("!bday")) {
        bday(message)
    } else if (message.content.startsWith("!teste")) {
        teste(client, message)
    }
}