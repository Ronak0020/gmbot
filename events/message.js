const Discord = require("discord.js");
const cooldowns = new Discord.Collection();

const mongoose = require("mongoose");
let coinCooldown = new Set();

const Money = require("../models/money.js");
const Module = require("../models/module.js");
const dbUrl = process.env.MONGODBURL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
});

module.exports = {
    run: async (client, message, args) => {
    if (message.author.bot) return;

    if(message.channel.type === "text") {
        Module.findOne({
            guildID: message.guild.id
        }), async (err, s) => {
            if(!s) {
                const newServer = new Module({
                    guildID: message.guild.id,
                    coinModule: "on"
                });
                await newServer.save().catch(e => console.log(e));
                return;
            }

            if(s.coinModule === "on") {
                if(!coinCooldown.has(message.author.id)) {
                    let coinstoadd = Math.floor(Math.random() * 4) + 1;
                    Money.findOne({
                        userID: message.author.id,
                        serverID: message.guild.id
                        }, async (err, money) => {
                            if(err) console.log(err);
                            if(!money) {
                                const newMoney = new Money({
                                    userID: message.author.id,
                                    serverID: message.guild.id,
                                    coins: coinstoadd
                                });
                                await newMoney.save().catch(e => console.log(e));
                            } else if(money) {
                                money.coins = money.coins + coinstoadd;
                                await money.save().catch(e => console.log(e));
                             }
                    });

                    await coinCooldown.add(message.author.id);
                    setTimeout(() => {
                        coinCooldown.delete(message.author.id)
                    }, 30000)
                }
            }
        }
    }
    
}
}
