module.exports = async (message)=> {
    await message.channel.send("Oie! Eu sou o Pet Bot 3.0 😎")
    await message.channel.send("`!help` - Ajuda sobre os comandos.\n" + 
    "`!meeting` - Inicia a reunião.\n" +
    "\t`!meeting <nome de um cargo>` - Inicia a reunião, verificando se todos com o cargo estão no canal de voz. O cargo não pode conter espaços.\n" +
    "`!mktopic <topico 1>, <topico 2>, ...` - Adiciona os tópicos na pauta.\n" +
    "`!rmtopic <topico 1>, <topico 2>, ...` - Remove os tópicos da pauta (case insensitive). Digite `!rmtopic *` para remover todos\n" +
    "`!vote <título>` - Faz uma votação com Sim, Não e Abstenção.\n" +
    "`!poll <título>, <número de votos por pessoa>, <opção 1>, <opção 2>, ...` - Faz uma votação com até 10 opções.\n" +
    "`!settings` \n"+
    "\t`!settings maxtime <tempo em segundos>` - Altera o tempo máximo para os 2 tipos de votação. O limite é 600 segundos.\n" +
    "\t`!settings maxmsg <número de mensagens>` - Altera o máximo de mensagens enviadas durante uma reunião até que a pauta seja reenviada. O padrão é 10 mensagens.\n")
}