const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "baka",
	category: "fun",
	description: "Call someone a BAKA!",
        usage: "<user mention whom you are saying BAKA>",
	run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      if(!user) return message.reply("Please mention a person whom you are saying BAKA! ¯\_(ツ)_/¯");
      const data = await (await fetch('https://nekos.life/api/v2/img/baka')).json();
      if (!(data || data.url)) return message.reply('NO_DATA');
      const bakap = new Discord.RichEmbed()
          .setTitle(`**${author}** is saying **${user}** a BAKA! ಠ_ಠ`, true)
          .setImage(data.url)
          .setColor(0xFACFCA)
           message.channel.send(bakap);
    } catch (error) {
      console.log(error);
      return message.reply('Please mention a person whom you are saying BAKA! ¯\_(ツ)_/¯');
    }
		}
	}
