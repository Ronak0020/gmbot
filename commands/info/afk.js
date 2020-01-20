const Discord = require('discord.js');

module.exports = {
    name: 'afk',
    category: 'info',
    description: 'Set your afk.',
    usage: '[reason]',
    run: async(client, message, args) => {
        let reason = args.join(" ") ? args.join(" ") : "I am currently busy. Talk to you later.";
        let afklist = client.afk.get(message.author.id);

        if(!afklist) {
            let construct = {
                id: message.author.id,
                tag: message.author.tag,
                reason: reason
            };
            client.afk.set(message.author.id, construct);
            return message.reply(`You have been set to afk for reason: ${reason}`).then(m => m.delete(10000));
        }
    }
}
