const pauta = require("../pauta");

module.exports = async (message, status, idPauta)=> {
    if(status){
        const args = message.content.slice(0).split(' ');
        args.shift()
        args.forEach(element => {
            pauta.remove(element)
        })
        const pt = await message.channel.messages.fetch(idPauta)
        pt.edit(pauta.topics)
    }else{
        message.channel.send("Não há nenhuma reunião rolando 🤔") 
    }
}