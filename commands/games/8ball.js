const Disord = require('discord.js');

module.exports = {
	name: "8ball",
	aliases: ["8ball", "8b"],
	category: "games",
	description: "Want an answer for your question in yes/no? try this command!",
	usage: "<question>",
	run: async (client, message, args) => {
		var fortunes = [
		"`Yes`",
		"`No`",
		"`Maybe`",
		"`Ask again`",
		"`Sometimes`",
		"`Okay`",
		"`HELL NO`",
		"`OH YEAH!`",
		"`no no no`"
		];
		let question = message.content.split(' ').slice(1).join(' ');
if (!question) { return message.reply('What question should I answer on?\n\Use `_help 8ball` for more information');
}
message.channel.send({embed: {
	color: 3447003,
	author: {
		name: `8ball`,
		icon_url: 'http://8ballsportsbar.com/wp-content/uploads/2016/02/2000px-8_ball_icon.svg_.png'
},
fields: [{
	name: 'Info:',
	value: `**My answer:** ${fortunes[~~(Math.random() * fortunes.length)]}`
	} 
	],
	timestamp: new Date(),
	footer: {
		icon_url: client.user.avatarURL,
		text: "Made by Ron"
		}
		}
		});
	}
}
