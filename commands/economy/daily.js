const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports = {
    name: "daily",
    category: "economy",
    description: "Collect your daily coins!",
    run: async (client, message, args) => {
        var output = await eco.Daily(message.author.id)
    if (output.updated) {
      var profile = await eco.AddToBalance(message.author.id, 500)
      const DAILY = new Discord.RichEmbed()
      .setColor(0xCAFFFC)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .setTitle("You successfully claimed your daily coins!")
        .addField("Gained Amount:", "500 coins")
        .addField("Total Available amount:", profile.newbalance + " coins")
        .setFooter(client.user.username, client.user.iconURL)
      message.reply(DAILY);
 
    } else {
      message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!`)
    }
    }
}