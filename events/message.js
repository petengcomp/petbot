const meeting = require("../commands/meeting")
const end = require("../commands/end")
const next = require("../commands/next")
const back = require("../commands/back")
const mktopic = require("../commands/mktopic")
const rmtopic = require("../commands/rmtopic")
const help = require("../commands/help")
const poll = require("../commands/poll")
const vote = require("../commands/vote")
const maxtime = require("../commands/maxtime")
const teste = require("../commands/teste")

module.exports = async (client, message) => {
    if (message.content.startsWith("!meeting")) {
        meeting(message)
    }
    if (message.content.startsWith("!end")) {
        end(message)
    }
    if(message.content.startsWith("!next")){
        next(message)
    }
    if(message.content.startsWith("!back")){
        back(message)
    }
    if(message.content.startsWith("!mktopic")){
        mktopic(message)
    }
    if(message.content.startsWith("!rmtopic")){
        rmtopic(message)
    }
    if(message.content.startsWith("!help")){
        help(message)
    }
    if(message.content.startsWith("!poll")){
        poll(message)
    }
    if(message.content.startsWith("!vote")){
        vote(message)
    }
    if(message.content.startsWith("!maxtime")){
        maxtime(message)
    }
    if(message.content.startsWith("!teste")){
        teste(client, message)
    }
}