module.exports = async (message) => {
    await message.channel.send("Oie! Eu sou o Pet Bot 3.0 😎")
    await message.channel.send("**Para saber mais sobre os comandos:**\n"+
        "`!help` - Ajuda sobre os comandos.\n" +
        "**Comandos para começar reunião:**\n"+
        "`!meeting` - Inicia a reunião.\n" +
        "\t`!meeting <nome de um cargo>` - Inicia a reunião, verificando se todos com o cargo estão no canal de voz. O cargo não pode conter espaços e o @.\n" +
        "**Para adicionar algo à pauta:**\n" +
        "`!mktopic <topico 1>, <topico 2>, ...` - Adiciona os tópicos na pauta.\n" +
        "`!mksubtopic <topico 1>, <subtopico 1>, <subtopico 1>, <subtopico 2> ...; <topico 2>, <subtopico 3>, <subtopico 4>, ...` - Adiciona os subtópicos no tópico especificado da pauta.\n" +
        "**Para apagar algo da pauta:**\n" +
        "`!rmtopic <topico 1>, <topico 2>, ...` - Remove os tópicos da pauta (case insensitive). Digite `!rmtopic *` para remover todos\n" +
        "`!rmsubtopic <topico 1>, <subtopico 1>, <subtópico2>, ...; <topico 2>, <subtopico 3>, <subtopico 4>, ...` - Remove os subtópicos no tópico especificado da pauta (case insensitive). Digite `!rmsubtopic <topico 1>, *; <topico 2>, *` para remover todos subtópicos de determinado tópico. Digite `!rmtopic *` para remover todos\n" +
        "**Após a reunião, lembre-se de usar o comando abaixo para definir os encaminhamentos da semana**"+
        "`!reminder <encaminhamento1> ; <encaminhamento2> ; ...` - Adiciona encaminhamentos para serem verificados na próxima reunião. Lembre-se de separá-los usado ponto-e-vírgula \n" +
        "**Para definir seu aniversário e receber uma mensagem de parabéns de mim, use:**"+
        "`!bday <DD/MM/AAAA>` - Salva sua data de aniversário.\n" +
        "**Caso queira fazer uma votação:**\n"+
        "`!vote <título>` - Faz uma votação com as opções **Sim**, **Não** e **Abstenção**.\n" +
        "`!poll <título>, <número de votos por pessoa>, <opção 1>, <opção 2>, ...` - Faz uma votação com até 10 opções.\n" +
        "**Se quiser que eu altere alguma das minhas configurações, use:**"+
        "`!settings` \n" +
        "\t`!settings maxtime <tempo em segundos>` - Altera o tempo máximo para os 2 tipos de votação. O limite é 600 segundos.\n" +
        "\t`!settings maxmsg <número de mensagens>` - Altera o máximo de mensagens enviadas durante uma reunião até que a pauta seja reenviada. O padrão é 10 mensagens.\n")
}