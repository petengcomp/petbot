const pauta = require("../pauta");

module.exports = async (message, status, idPauta, doneTopics)=> {
    if(status){
        if(doneTopics+1 >= pauta.topics.length){
            message.channel.send("Não há mais tópicos!")
        }else{
            const pt = await message.channel.messages.fetch(idPauta)
            pauta.goTo(++doneTopics)
            pt.edit(pauta.topics)
        }
        return doneTopics
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
}