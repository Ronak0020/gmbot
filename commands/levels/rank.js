const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'rank',
    category: 'levels',
    description: "What is your level?",
    aliases: ["level"],
    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.
 
const user = await Levels.fetch(target.id, message.guild.id, 1000); // Selects the target from the database.
 
if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.
const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id);
const leader = Levels.computeLeaderboard(client, rawLeaderboard);
const position = leader(user => `${user.position}`);
 
const embed = new Discord.RichEmbed()
.setTitle("Rank", target.displayAvatarURL)
.setDescription(`${target.username}\'s Rank :\n**Level -** ${user.level}\n**XP -** ${user.xp}\n**Position in Leaderboard -** ${position}`)
.setColor('RANDOM')
.setThumbnail(target.displayAvatarURL)
.setFooter(client.user.username, client.user.displayAvatarURL)
.setTimestamp()
message.channel.send(embed);
    }
}
