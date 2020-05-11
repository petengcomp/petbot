const pauta = require("../pauta");

module.exports = async (message, status, idPauta)=> {
    if(status){
        const pinned = await message.channel.messages.fetchPinned()
        pinned.get(idPauta).unpin()
        pauta.goTo(0)
        message.channel.send("Reunião finalizada! 😁") 
        return false
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
        return false
    }
}