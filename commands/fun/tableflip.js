const Discord = require('discord.js');
const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬'
];

module.exports = {
    name: "tf",
    category: "fun",
    aliases: ["table", "fliptable"],
    description: "Flip the table!!",
    run: async(client, message, args) => {
        const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
        for (const frame of frames) {
            setTimeout(() => {}, 2000);
            await msg.edit(frame);
        }
        return message;
    }
}
