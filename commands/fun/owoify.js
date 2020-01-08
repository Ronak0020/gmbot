const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
	name: "owoify",
	category: "actions",
	description: "\"Convert texts into "OwOify\"",
        usage: "<text>",
	run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
      try {
      const data = await (await fetch('https://nekos.life/api/v2/owoify?text=${args.join("+")})).json();
      if (!(data || data.url)) return message.reply('NO_DATA').then(m => m.delete(5000));
           message.channel.send(data);
    } catch (error) {
      console.log(error);
      return message.reply('Something Went wrong! Try again later!').then(m => m.delete(5000));
    }
		}
	}
