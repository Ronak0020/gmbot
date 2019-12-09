const Discord = require("discord.js");
const eco = require("discord-economy");
const talkedRecently = new Set();

module.exports = {
    name: "transfer",
    aliases: ["transfer", "give"],
    description: "Give some money to your friends!",
    category: "economy",
    usage: "<mention receiver> <amount>",
    run: async (client, message, args) => {
        var user = message.mentions.users.first()
        var amount = args[1]
          if (talkedRecently.has(message.author.id)) {
            message.channel.send("You need to wait for 10 sec before you can transfer money again, " + message.author);
    } else {
        if (!user) return message.reply('Mention the user you want to send money to!')
    if (!amount) return message.reply('Specify the amount you want to pay!')
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to transfer!')

        var transfer = await eco.Transfer(message.author.id, user.id, amount)
        const GIVE = new Discord.RichEmbed()
        .setColor(0xCFFACF)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Transfered From:", message.author.tag)
        .addField("Transfered to:", user.tag)
        .addField("Transfered Amount", amount + " coins")
        .addField("Your friend has:", transfer.ToUser + " coins")
        .setFooter(client.user.username, client.user.iconURL)
          message.channel.send(GIVE)

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 10000);
    }
       
        }
    }