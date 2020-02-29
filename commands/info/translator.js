const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translator',
    aliases: ["translate", "trans", "language"],
    category: "info",
    description: "Translate text from one language to another!",
    usage: "<translate to> <text>",
    run: async(client, message, args) => {
        translate(args.slice(1).join(" "), {to: args[0]}).then(res => {
            const trl = new Discord.RichEmbed()
            .setTitle(client.user.username + `\'s Translator! (${res.from.language.iso} » ${args[0]})`)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setDescription(`**Input:** ${args.slice(1).join(" ")}\n\n**Translation:** ${res.text}`)
            message.channel.send(trl)
        }).catch(err => {
            message.reply("An error occured! \n" + err);
        });
    }
}
