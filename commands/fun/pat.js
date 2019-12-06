const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "pat",
	category: "fun",
	description: "Pat someone! :3",
        usage: "<user mention whom you wanna pat>",
	run: async (client, message, args) => {
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      if(!user) return message.reply("Please mention a person whom you wanna pat! :3");
      const data = await (await fetch('https://nekos.life/api/v2/img/pat')).json();
      if (!(data || data.url)) return message.reply('NO_DATA');
      const patie = new Discord.RichEmbed()
          .setTitle(`**${user}** has been patted by **${author}** (^ω^）`, true)
          .setImage(data.url)
          .setColor(0xFCCFAC)
           message.channel.send(patie);
    } catch (error) {
      console.log(error);
      return message.reply('Please mention a person whom you wanna pat! :3');
    }
		}
	}
