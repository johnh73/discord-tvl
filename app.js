require('dotenv').config()
const axios = require('axios');
const Discord = require('discord.js');

const client = new Discord.Client();

let guildMeCache = [];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activity: {
            type: "WATCHING",
            name: `${process.env.NAME} TVL`
        }
    })
    client.guilds.cache.each(guild => guildMeCache.push(guild.me));
});

async function getTVL() {
    let res = await axios.get(process.env.TVL_URL);
    return res.data
}

async function show() {
    let TVL = await getTVL()
    guildMeCache.forEach(guildMe => guildMe.setNickname(`$${Math.floor(TVL)}`));
    
}

setInterval(show, 60000)


client.login(process.env.BOT_TOKEN);

