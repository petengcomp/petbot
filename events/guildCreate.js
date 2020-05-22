module.exports = (client, guild) => {
    const allChannels = guild.channels.cache
    allChannels.find((elem)=>elem.type == 'text').send("Oi")
}