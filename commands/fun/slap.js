const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "slap",
	category: "fun",
	description: "Slap someone! (>▽<)",
        usage: "<user mention whom you wanna slap>",
	run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      if(!user) return message.reply("Please mention a person whom you wanna slap! :<");
      const data = await (await fetch('https://nekos.life/api/v2/img/slap')).json();
      if (!(data || data.url)) return message.reply('NO_DATA');
      const slapie = new Discord.RichEmbed()
          .setTitle(`**${user}** has been slapped by **${author}** (｡•́︿•̀｡)`, true)
          .setImage(data.url)
          .setColor(0xACFFCA)
           message.channel.send(slapie);
    } catch (error) {
      console.log(error);
      return message.reply('Please mention a person whom you wanna slap! :<');
    }
		}
	}
