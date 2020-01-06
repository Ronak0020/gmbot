const Discord = require('discord.js');
const osu = require('node-osu');
const osuapikey = process.env.osuapi;
const osuApi = new osu.Api(osuapikey, {
    notFoundAsError: true,
    completeScores: false
})

module.exports = {
    name: 'osu',
    category: "game stats",
    aliases: ["osustats"],
    usage: "<osu username>",
    description: "Check out your osu Stats!",
    run: async(client, message, args) => {
        osuApi.getUser({u: args[0]}).then(user => {
            const osuembed = new Discord.RichEmbed()
            .setTitle("osu! Stats")
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/800px-Osu%21Logo_%282015%29.png")
            .setColor('#FF1493')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .addField("Name:", user.name, true)
            .addField("Country:", user.country, true)
            .addField("Level:", user.level, true)
            .addField("Accuricy:", user.accuracyFormatted, true)
            .addField("SSH:", user.counts.SSH, true)
            .addField("SS:", user.counts.SS, true)
            .addField("S:", user.counts.S, true)
            .addField("A:", user.counts.A, true)
            .addField("Plays:", user.counts.plays, true)
            .addField("Total Played in hours:", user.secondsPlayed / 60, true)
            .addField("PP:", user.pp.raw, true)
            .addField("Rank:", user.pp.rank, true)
            .addField("Country Rank:", user.pp.countryRank, true)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTimestamp()
            message.channel.send(osuembed);
          }).catch(error =>{
              message.channel.send("User was not found!");
            });
          }
}