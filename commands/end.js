const pauta = require("../pauta");
const context = require("../meetingContext")

module.exports = async (message)=> {
    if(context.thereIsMeeting){
        const pinned = await message.channel.messages.fetchPinned()
        pinned.get(context.idPauta).unpin()
        pauta.goTo(0)
        message.channel.send("Reunião finalizada! 😁") 
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
    context.thereIsMeeting = false
}