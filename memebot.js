// ****************************************
//** Discord Bot v2.0 **
//** Local Directory path /home/justin/discordBot **
//**
// ****************************************
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '!test') {
        message.reply('Fk Shimko');
    }
});

client.login("MjcwMjM5NDM2OTgwMjI0MDAw.C11ALQ.3oWQPghx-HumtWRJEauE8s8rH2M");