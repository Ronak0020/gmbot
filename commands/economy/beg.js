const Discord = require("discord.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODBURL;
const cooldown = new Set();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});
const Money = require("../../models/money.js");

module.exports = {
    name: 'beg',
    description: 'Beg bot for coins.',
    category: "economy",
	run: async(client, message, args) => {
        const msg = await message.reply(`:thinking: Hmm...`);
if (cooldown.has(message.author.id)) {
            message.channel.send("Wait `1 minute` before using this command again. - " + message.author);
    } else {

           Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, async (err, money) => {
            let chance = Math.floor(Math.random() * 100) + 1;

            if (chance < 50) {
                msg.edit("Nah, i don't give you any coins.");
            }

            if (chance > 50) {
                let newCoins = Math.floor(Math.random() * 4) + 1;
                money.coins = money.coins + newCoins;
                await money.save().catch(e => console.log(e));
                msg.edit(`Ok sure, have ${newCoins} coins.`);
            }
        });

        // Adds the user to the set so that they can't talk for a minute
        cooldown.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          cooldown.delete(message.author.id);
        }, 60000);
    }
        
    },
};
