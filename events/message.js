const meeting = require("../commands/meeting")
const end = require("../commands/end")
const next = require("../commands/next")
const back = require("../commands/back")
const mktopic = require("../commands/mktopic")
const rmtopic = require("../commands/rmtopic")

let thereIsMeeting = false
let idPauta = null
let doneTopics = 0

module.exports = async (client, message) => {
    if (message.content.startsWith("!meeting")) {
        thereIsMeeting = true
        idPauta = await meeting(message)
    }
    if (message.content.startsWith("!end")) {
        thereIsMeeting = await end(message, thereIsMeeting, idPauta)
    }
    if(message.content.startsWith("!next")){
        doneTopics = await next(message, thereIsMeeting, idPauta, doneTopics)
    }
    if(message.content.startsWith("!back")){
        doneTopics = await back(message, thereIsMeeting, idPauta, doneTopics)
    }
    if(message.content.startsWith("!mktopic")){
        mktopic(message, thereIsMeeting, idPauta)
    }
    if(message.content.startsWith("!rmtopic")){
        rmtopic(message, thereIsMeeting, idPauta)
    }
}