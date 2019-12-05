const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "hug",
	category: "fun",
	description: "Hug someone! :3",
        usage: "<user mention whom you wanna hug>",
	run: async (client, message, args) => {
      try {
      const author = message.author.username;
      const user = message.mentions.users.first().username;
      const data = await (await fetch('https://nekos.life/api/v2/img/hug')).json();
      if (!(data || data.url)) return message.reply('NO_DATA');
      const hugie = new Discord.RichEmbed()
          .setTitle(user + "has been hugged by" + author, true)
          .setProvidedBy('nekos.life')
          .setImage(data.url)
           message.channel.send(hugie);
    } catch (error) {
      console.log(error);
      return message.reply('REQUEST_FAILED');
    }
		}
	}
