module.exports = async (message)=> {
    await message.channel.send("Oie! Eu sou o Pet Bot 2.0 😎")
    await message.channel.send("`!help` - Ajuda sobre os comandos.\n" + 
    "`!meeting` - Inicia a reunião.\n" +
    "`!next` - Passa para o próximo tópico.\n" +
    "`!back` - Volta para o tópico anterior.\n" +
    "`!end` - Finaliza a reunião.\n" +
    "`!mktopic <topico 1>, <topico 2>` - Adiciona os tópicos na pauta.\n" +
    "`!rmtopic <topico 1>, <topico 2>` - Remove os tópicos da pauta (case insensitive).\n")
}