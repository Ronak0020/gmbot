const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const talkedRecently = new Discord.Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../../models/money.js");

module.exports = {
    name: 'daily',
  	description: 'Get your daily bonus.',
    category: "economy",
	run: async(client, message, args) => {

        let dailyCoins = 250;
if (talkedRecently.has(msg.author.id)) {
            msg.channel.send("Wait 1 day to get your daily bonus again. - " + msg.author);
    } else {

           Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            if(err) console.log(err);
            if(!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: dailyCoins
                });

                await newMoney.save().catch(e => console.log(e));
            } else if(money) {
                money.coins = money.coins + dailyCoins;
                await money.save().catch(e => console.log(e));
            }
        });

        message.channel.send(`${message.author.username} You got a daily bonus of ${dailyCoins} coins.`);

        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a day
          talkedRecently.delete(msg.author.id);
        }, 86400000);
    }

         },
};
