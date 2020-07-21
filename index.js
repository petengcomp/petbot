require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const cron = require('cron')
const client = new Discord.Client()
const bdayTask = require('./utils/bdayTask')

client.on('ready', () => {
    console.log(`Logged in!`)
    client.task = new cron.CronJob('0 11 */1 * *', () => bdayTask(client))
    client.task.start()
})

fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

client.login(process.env.BOT_TOKEN)