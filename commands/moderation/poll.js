const Discord = require('discord.js');

module.exports = {
    name: "poll",
    category: "moderation",
    description: "Start a poll to get your server member's views!",
    usage: "<#channel for poll> <Poll info>",
    run: async(client, message, args) => {
      if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.reply("You do not have permission to start a poll!");
        if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) return message.reply('Sorry, i dont have the perms to do this cmd i need ADD_REACTIONS. :x:')
      const sayMessage = args.slice(1).join(" ");
      const channel = message.guild.mentions.channels.first();
     if (sayMessage.length < 1) return message.channel.send("Didnt provide anything for the poll.")
     if (message.member.hasPermission("KICK_MEMBERS")) {
       const embed = new Discord.RichEmbed()
       .setColor(0x00A2E8)
       .setTitle(" Poll ")
       .setDescription(`A poll has begun: \n"***${sayMessage}***"\n **VOTE NOW!**`)
        channel.send(embed).then(m => {
            m.react('✅');
            m.react('❌');
           })
      }
    }
}
