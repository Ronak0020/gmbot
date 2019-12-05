const Discord = require('discord.js');
const Tenor = require("tenorjs").client({
	Key: process.env.tenorkey,
	Filter: "off",
	Locale: "en_US",
	MediaFilter: "minimal",
	DateFormat: "DD/MM/YYYY - H:mm:ss A"
	});

module.exports = {
	name: "hug",
	category: "fun",
	description: "Hug someone! :3",
        usage: "<user mention whom you wanna hug>",
	run: async (client, message, args) => {
const user = message.mentions.users.first();
if(!user) return message.reply('please mention someone! Whom you wanna hug?');
Tenor.Search.Random("anime-hug", "1").then(Results => {
	Results.forEach(Post => {
                const hugie = new Discord.Attachment(Post.url);
		const img = new Discord.RichEmbed()
		.setDescription(`**${user.tag}**  Was hugged by  **${message.author.tag}**! :3`)
		.setImage(hugie)
		.setColor(0xFFACFA)
		message.channel.send(img)
		});
		})
		.catch(console.error);
		}
	}
