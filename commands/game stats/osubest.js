const Discord = require('discord.js');
const osu = require('node-osu');
const osuapikey = process.env.osuapi;
const osuApi = new osu.Api(osuapikey, {
    notFoundAsError: true,
    completeScores: true
})

module.exports = {
    name: 'osubest',
    aliases: ["osub", "osuscore"],
    category: "game stats",
    description: "Check out your best 3 scores in osu!",
    usage: "<osu username>",
    run: async(client, message, args) => {
        osuApi.getUserBest({ u: args[0] }).then(scores => {
            const best = new Discord.RichEmbed()
            .setTitle("3 Best Scores")
            .setColor('#FF1493')
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Osu%21Logo_%282015%29.png/800px-Osu%21Logo_%282015%29.png")
            .addField("Best Score:", scores[0].score, true)
            .addField("BeatMap:", scores[0].beatmap.title, true)
            .addField("Accuricy during this score:", scores[0].accuracy, true)
            .addField("Best Score:", scores[1].score, true)
            .addField("BeatMap:", scores[1].beatmap.title, true)
            .addField("Accuricy during this score:", scores[1].accuracy, true)
            .addField("Best Score:", scores[2].score, true)
            .addField("BeatMap:", scores[2].beatmap.title, true)
            .addField("Accuricy during this score:", scores[2].accuracy, true)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .setTimestamp()
            message.channel.send(best);
        });
    }
}