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
const countSentMessages = require("../utils/countMessages")

module.exports = async (client, message) => {
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
    } else if (message.content.startsWith("!rmtopic")) {
        rmtopic(message)
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
    } else if (message.content.startsWith("!teste")) {
        teste(message)
    }
}