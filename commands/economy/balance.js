const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports = {
    name: "balance",
    aliases: ["balance", "bal"],
    description: "Check your total money!",
    category: "economy",
    run: async (client, message, args) => {
        var output = await eco.FetchBalance(message.author.id)
        const BAL = new Discord.RichEmbed()
        .setColor(0xFACCFA)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .addField("Available Balance", output.balance + "coins")
        .setFooter(client.user.username, client.user.iconURL)
        message.channel.send(BAL);
    }
}