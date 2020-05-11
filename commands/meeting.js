const pauta = require("../pauta");

module.exports = async (message)=> {
    await message.channel.send("Começando a reunião. Atenção @everyone!")
    pauta.goTo(0)
    const pt = await message.channel.send(pauta.topics)
    pt.pin()
    return pt.id
  }