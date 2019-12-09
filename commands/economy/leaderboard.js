const Discord = require("discord.js");
const eco = require("discord-economy");

module.exports = {
    name: "leaderboard",
    category: "economy",
    aliases: ["leaderboard", "lb"],
    usage: "[mention user]",
    description: "Check out leaderboard! Who is at top? (it shows users with more than 50 coins only!)",
    run: async (client, message, args) => {
        if (message.mentions.users.first()) {
 
            var output = await eco.Leaderboard({
              filter: x => x.balance > 50,
              search: message.mentions.users.first().id
            })
            message.channel.send(`The user ${message.mentions.users.first().tag} is ${output} on my leaderboard!`);
       
          } else {
       
            eco.Leaderboard({
              limit: 3, 
              filter: x => x.balance > 50
            }).then(async users => {
       
              if (users[0]) var firstplace = await client.fetchUser(users[0].userid)
              if (users[1]) var secondplace = await client.fetchUser(users[1].userid)
              if (users[2]) var thirdplace = await client.fetchUser(users[2].userid)
       
              message.channel.send(`My leaderboard:
       
      1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
      2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
      3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)
       
            })
       
          }

    }
}