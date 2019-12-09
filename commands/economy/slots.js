const Discord = require("discord.js");
const eco = require("discord-economy");
const talkedRecently = new Set();

module.exports = {
    name: "slot",
    aliases: ["slot"],
    description: "Try your luck in Slot machine!",
    category: "economy",
    usage: "<amount to gamble>",
    run: async (client, message, args) => {
        var amount = args[0]
        if (!amount) return message.reply('Specify the amount you want to gamble!')
 
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
          if (talkedRecently.has(message.author.id)) {
            message.channel.send("You need to wait for 10 minutes before you can use slot machine again, " + message.author);
    } else {

        var gamble = await eco.Slots(message.author.id, amount, {
            width: 3,
            height: 1
          }).catch(console.error)
          const SLOT = new Discord.RichEmbed()
        .setColor(0xAACFFF)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Slot result:", gamble.grid)
        .addField("You:", gamble.output)
        .addField("New Available Balance:", gamble.newbalance + " coins")
        .setFooter(client.user.username, client.user.iconURL)
        message.channel.send(SLOT)

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 20000);
    }
       
        }
    }
