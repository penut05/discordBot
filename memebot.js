// ****************************************
//** Discord Bot v2.0 **
//** Local Directory path /home/justin/discordBot **
//**
// ****************************************
//New ES6 Node/Javascript stuff
'use strict'

const Discord = require("discord.js");
const bot = new Discord.Client();

//** Use Request to make calls to kyles bot, but cant call it anymore **
//const request = require("request");

const jsonfile = require("jsonfile");
const util = require("util");

//Node package for writing files
var fileLog = require('fs');

//UPDATE THESE FIELDS WHEN CHANGING SERVERS
var loginInfo = "/home/justin/discordBot/login.json";
var file = "/home/justin/discordBot/users.json";
var logfile = "/home/justin/discordBot/log.txt";

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
    var message = {
        info: "Memebot69 commands are: .help, .spin <Bet Amount>, .coins, .top, and .cowpies. To spin the slot machine, type .spin ###. Replace the ### with your bet ammount",
        error: "Error encounted, please contact Pakoola.",
        activeUser: "Already an active user.",
        spinHelp: "Enter a valid entry. For example: .spin <bet ammount>",
        addedToDatabase: "You have been added to the database.",
        addMeDatabase: "Please type .addme to add youself to the database.",
        spam: "FUCKING NORMIES, GET OFF OF MY FUCKING BOARD!!!!!@@!@!@",
        cowpies1: "http://i.imgur.com/tY1Ij8w.jpg",
        cowpies2: "",
        shrug: "¯\_(ツ)_/¯",
        noCoins: "Fucking dirty slut you don't have that many coins to bet."
    };
    var sender = msg.author.username;
    var server = getServerByNameWithMessage(msg, "thef00fRaidcallRIP");
    var channel = getChannelByUserMessageAuthorString(msg, msg.content.substr(6));

    if (msg.content.indexOf(".help") === 0) {
        bot.sendMessage(msg, message.info);
        bot.deleteMessage(msg);
    }

    if (msg.content.indexOf(".cowpies") === 0) {
        bot.sendMessage(msg, message.cowpies1);
    }
    if (msg.content.indexOf(".addme") === 0) {
        jsonfile.readFile(file, function(err, obj) {
            var userObj = obj;
            var allUsers = [];
            for (var i = 0; i < obj.length; i++) {
                allUsers.push(userObj[i].name);
            }

            if (allUsers.indexOf(sender) == -1) {
                userObj.push({
                    "name": sender,
                    "coins": 10,
                });
                jsonfile.writeFile(file, userObj, function(err) {
                    if (err) {
                        console.error(err);
                    }
                });
                bot.reply(msg, message.addedToDatabase);
                console.log("Added " + sender + " to the user.json file. " + timestamp);
            } else if (allUsers.indexOf(sender) != -1) {
                bot.reply(msg, message.activeUser);
            }
            bot.deleteMessage(msg);
        });
    }

    /* 
    * Kyles Bot hates mine...
    
    if(msg.content.indexOf(".harambe") === 0){
        bot.sendMessage(msg, "!youtube https://www.youtube.com/watch?v=OJw3MmL-Omk");
    }
    */

    if (msg.content.indexOf(".top") === 0) {
        jsonfile.readFile(file, function(err, obj) {
            var max1 = 0;
            var max2 = 0;
            var max3 = 0;
            var max1Name = "";
            var max2Name = "";
            var max3Name = "";

            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].coins > max1) {
                        max3 = max2;
                        max2 = max1;
                        max1 = obj[i].coins;
                        max3Name = max2Name;
                        max2Name = max1Name;
                        max1Name = obj[i].name;
                    } else if (obj[i].coins > max2) {
                        max3 = max2;
                        max2 = obj[i].coins;
                        max3Name = max2Name;
                        max2Name = obj[i].name;
                    } else if (obj[i].coins > max3) {
                        max3 = obj[i].coins;
                        max3Name = obj[i].name;
                    }
                }
                bot.deleteMessage(msg);
                bot.sendMessage(msg, "Top 3: 1st:" + max1Name + " - " + max1 + "  2nd: " + max2Name + " - " + max2 + "  3nd: " + max3Name + " - " + max3);
            }
        });
    }

    if (msg.content.indexOf(".coins") === 0) {
        jsonfile.readFile(file, function(err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].name === sender) {
                    if (obj[i].coins === 0) {
                        bot.reply(msg, "You have no coins!");
                    } else {
                        bot.reply(msg, "You have: " + obj[i].coins + " coins left.");
                    }
                }
            }
            bot.deleteMessage(msg);
        });
    }

    if (msg.content.indexOf(".spin") === 0) {
        var coins_won = 0;
        bot.deleteMessage(msg);
        var usrMsg = msg.toString();
        var msgsplit = usrMsg.split(" ");
        var userBet = parseInt(msgsplit[1]);
        var num1 = Math.floor((Math.random() * 7) + 1);
        var num2 = Math.floor((Math.random() * 7) + 1);
        var num3 = Math.floor((Math.random() * 7) + 1);
        var machine_stuck = Math.floor((Math.random() * 1000) + 1);

        jsonfile.readFile(file, function(err, obj) {
            if (err) {
                console.log(err);
            } else {
                var users = obj;
                var inDataBase = false;
                var valid = false;
                var arrayLength = users.length;
                var msgString = "";

                for (var i = 0; i < arrayLength; i++) {
                    if (users[i].name == sender) {
                        inDataBase = true;
                        valid = true;
                        inDataBase = true;
                        if (userBet > users[i].coins) {
                            bot.sendMessage(msg, message.noCoins);
                            break;
                        } else {
                            if (!isNaN(userBet) && (userBet > 0)) {
                                bot.sendMessage(msg, "| " + num1 + " | " + " | " + num2 + " | " + " | " + num3 + " |");
                                if (num1 == num2 && num1 == num3 && num2 == num3) {
                                    if (num1 == 6 && num2 == 6 && num3 == 6) {
                                        users[i].coins -= 50;
                                        if (users[i].coins <= 0) {
                                            users[i].coins === 0;
                                            msgString += "Lose 50 coins. ";
                                        } else {
                                            msgString += "You now have 0 coins";
                                        }
                                    } else if (num1 == 7 && num2 == 7 && num3 == 7) {
                                        coins_won = userBet * 3;
                                        users[i].coins += userBet * 3;
                                        msgString += "JACKPOT! You have gained " + coins_won + " coins! ";
                                    } else {
                                        coins_won = userBet * 2.5;
                                        users[i].coins += coins_won;
                                        msgString += "3 of a kind! You have gained " + coins_won + " coins! ";
                                    }
                                } else if (num1 == num2 || num1 == num3 || num2 == num3) {
                                    users[i].coins += userBet;
                                    msgString += "2 of a kind! You have gained " + userBet + " coins! ";
                                    break;
                                } else {
                                    if (machine_stuck == 1) {
                                        msgString += "Slot machine has malfunctioned in your favor..Gain 3x coins bet!!! ";
                                        users[i].coins += userBet * 3;
                                    } else {
                                        users[i].coins -= userBet;
                                        msgString += "You lose " + userBet + " coins. ";
                                    }
                                }
                            } else {
                                bot.sendMessage(msg, message.spinHelp);
                                break;
                            }
                        }

                        if (users[i].coins <= 0) {
                            bot.reply(msg, users[i].coins + " coins left. Reload!");
                            users[i].coins += 10;
                        }
                        msgString += "Coins left: " + users[i].coins + " ";
                    }
                }
            }
            if (msgString !== "" && inDataBase) {
                bot.reply(msg, msgString);
                console.log(".spin by " + sender + " Bet: " + userBet);
                //Log all messages to log file on server log.txt
                fileLog.appendFile(logfile, msgString + "\n", function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            //If Bot couldnt find that user in database
            if (!inDataBase) {
                bot.reply(msg, message.addMeDatabase);
            }

            //Write to JSON file with user info after spin user = obj
            var record = users;
            jsonfile.writeFile(file, record, function(err) {
                //console.error(err)
            });
        });
    } //End of .spin

    //** Rock, Paper, Scissors
    //Format = .rps <choice> <wager> ie: .rps paper 100
    if (msg.content.indexOf(".rps") === 0) {
        var msgString = msg.toString();
        var msgArray = msgString.split(" ");
        var userChoice = msgArray[1].toLowerCase();
        var wager = parseInt(msgArray[2]);

        //Get computers answer .0 - 1
        var computerChoice = "";
        var taco = getComputerRPSGuess();
        console.log("Testing Taco: " + taco);
        var compRandom = Math.random();
        if (compRandom <= .33) {
            computerChoice = "rock";
        } else if (compRandom >= .33 && compRandom <= .66) {
            computerChoice = "paper";
        } else if (compRandom >= .66 && compRandom <= 1) {
            computerChoice = "scissors";
        }

        
        //Check for user and validate coins
        //set var testing = jsonfile.readFile(file, function(err, obj) { return true});
        
        jsonfile.readFile(file, function(err, obj) {
            var users = obj;
            var inDataBase = false;
            var valid = false;
            for (var i = 0; i < arrayLength; i++) {
                if (users[i].name == sender) {
                    inDataBase = true;
                    valid = true;
                    inDataBase = true;
                    if (wager > users[i].coins) {
                        bot.sendMessage(msg, message.noCoins);
                        break;
                    } else if(userChoice != "scissors" || userChoice != "rock" || userChoice != "paper"){
                        
                    } else {
                        if (!isNaN(wager) && (wager > 0) ) {

                        }
                    }
                }
            }
        }); // End of readfile .rps

    } //End of .rps

    //=============================================================================
    //End of Bot Functions
    //=============================================================================
});

//****************************
// My functions
//****************************



// ******************************************************
// Kyle's bot logic for finding users in channels
// ******************************************************
var getChannelByUserMessageAuthorString = function(message, name) {
    var channel = null;
    channel = findUserByName(message, name);
    if (channel) {
        channel = channel.voiceChannel;
    } else {
        channel = getServerChannelByName(getServerByNameWithMessage(message, "thef00fRaidcallRIP"), name);
        if (!channel) {
            channel = message.author.voiceChannel;
        }
    }
    return channel;
};

var getServerByNameWithMessage = function(message, name) {
    var server = null;
    var servers = message.client.servers;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].name === name) {
            server = servers[i];
        }
    }
    return server;
};

var getServerByNameWithBot = function(bot, name) {
    var server = null;
    var servers = bot.servers;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i].name === name) {
            server = servers[i];
        }
    }
    return server;
};

var findUserByName = function(message, name) {
    var server = getServerByNameWithMessage(message, "thef00fRaidcallRIP");
    var members = server.members;
    var user = null;

    for (var i = 0; i < members.length; i++) {
        if (members[i].username.toUpperCase() === name.toUpperCase()) {
            user = members[i];
        }
    }
    return user;
};

var getServerChannelByName = function(server, name) {
    var channels = server.channels;
    var channel = null;

    for (var i = 0; i < channels.length; i++) {
        if (channels[i].name === name) {
            channel = channels[i];
        }
    }
    return channel;
};
//****************************
// End of kyle's channel logic
//****************************