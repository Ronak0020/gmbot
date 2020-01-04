const google = require('google');
const Discord = require(`discord.js`);

module.exports = {
    name: 'google',
    run: async(client, message, args) => {
        if (!args[0]) {
            message.channel.send({
                embed: {
                    color: 0xff2727,
                    description: `:warning: **${message.author.username}**, You didn't give me anything to search. {^google \`input\`}`,
                    footer: {
                        text: 'API Latancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                    }
                }
            });
        }
        google.resultsPerPage = 5;
        google(args, function (err, res) {
            if (err) message.channel.send({
                embed: {
                    color: 0xff2727,
                    description: `:warning: **${message.author.username}**, ${err}`,
                    footer: {
                        text: 'API Latancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                    }
                }
            });
            for (var i = 0; i < res.links.length; ++i) {
                if(i == 3){
                    return
                }
                var link = res.links[i];
                if (!link.href) {
                    res.next;
                } else {
                    let embed = new Discord.RichEmbed()
                        .setColor(`#ffffff`)
                        .setAuthor(`Result for "${args}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
                        .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                        .setTimestamp()
                        .setFooter('API Latancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
                    message.author.send({
                        embed: embed
                    });
                } message.react("👌");
            }
        });
    }
}