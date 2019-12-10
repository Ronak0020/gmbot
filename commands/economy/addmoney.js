const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports = {
    name: "addmoney",
    category: "economy",
    description: "Add money to a user\'s account!",
    usage: "<user mention> <amount>",
    run: async (client, message, args) => {
        if(!args[1]) return message.reply("specify the amount of money to add!");
        if(!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply("You do not have permission to add money to a user\'s account!");
        var profile = eco.AddToBalance(message.mentions.users.first().id, args[1])
        message.channel.send(`successfully added ${args[1]} coins to the user\'s account! The user now has ${profile.newbalance} coins!`)
    }
}