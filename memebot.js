// ****************************************
//** Discord Bot v2.0 **
//** Local Directory path /home/justin/discordBot **
//**
// ****************************************
//New ES6 Node/Javascript stuff
'use strict'

const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");

bot.login("MjcwMjM5NDM2OTgwMjI0MDAw.C11ALQ.3oWQPghx-HumtWRJEauE8s8rH2M");


//when the bot is ready
bot.on('ready', () => {
  console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

//when the bot disconnects
bot.on("disconnected", () => {
    console.log("Disconnected, exiting!");
    process.exit();
});

bot.on('message', msg => {
    console.log("Testing new versions");
});