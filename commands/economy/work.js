const Discord = require("discord.js");
const eco = require("discord-economy");
const talkedRecently = new Set();

module.exports = {
    name: "work",
    aliases: ["work", "job"],
    description: "Do some job to earn money!",
    category: "economy",
    run: async (client, message, args) => {
        var output = await eco.Work(message.author.id, {
            failurerate: 50,
            money: Math.floor(Math.random() * 150),
            jobs: ['cashier', 'shopkeeper', 'accountant', 'rag picker']
          })
          if (talkedRecently.has(message.author.id)) {
            message.channel.send("You need to wait for 12 hour before you can work again, " + message.author);
    } else {

        if (output.earned == 0) return message.reply('Awh, you did not do your job well so you earned nothing!')
        const JOB = new Discord.RichEmbed()
        .setColor(0xCFFACF)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Worked As:", output.job)
        .addField("Money Earned by Job:", output.earned + " coins")
        .addField("Total Available Balance:", output.balance + " coins")
        .setFooter(client.user.username, client.user.iconURL)
          message.channel.send(JOB)

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 72000000);
    }
       
        }
    }
