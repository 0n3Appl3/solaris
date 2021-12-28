module.exports = {
    name: 'top',
    description: 'Find out the richest players on the server.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const fs = require('fs');
        const yaml = require('js-yaml');
        
        try {
            // Get the money.yml file from the server.
            const fileContents = fs.readFileSync('./money.yml', 'utf8');
            const data = yaml.safeLoad(fileContents);

            // Save username and amount of credits into their own arrays.
            const username = Object.values(data.money).map(item => item.username);
            const credits = Object.values(data.money).map(item => item.amount);

            // Initialise the leaderboard.
            const leaderboard = [];
            const names = [];

            // Current top value of the leaderboard.
            let topValue = 0;
            let topName = '';

            // Final leaderboard display.
            let print = '';

            // Number of players to be shown in the leaderboard.
            let itemsNeeded = 10;

            // Adjust leaderboard size if less than required number of players.
            if (username.length < itemsNeeded) {
                itemsNeeded = username.length;
            }

            // Keep checking for top values until we reach the number required.
            while (leaderboard.length < itemsNeeded) {
                for (let i = 0; i < username.length; i++) {
                    // Set new top value if currently selected credit value is greater.
                    if (credits[i] >= topValue) {
                        topValue = credits[i];
                        topName = username[i];
                    }
                }
                // Remove this top value from the array so it is no longer counted.
                username.splice(username.indexOf(topName), 1);
                credits.splice(credits.indexOf(topValue), 1);
                
                // Add this top value to the final leaderboard.
                leaderboard.push(topValue);
                names.push(topName);

                // Reset.
                topValue = 0;
            }

            // Create the formatting of the leaderboard.
            for (let j = 0; j < leaderboard.length; j++) {
                // Show emotes for the first three placements.
                switch(j) {
                    case 0:
                        print = print.concat(':first_place:');
                        break;
                    case 1:
                        print = print.concat(':second_place:');
                        break;
                    case 2:
                        print = print.concat(':third_place:');
                        break;
                    default:
                        print = print.concat("`" + (j + 1) + ".`");
                }

                // This is the j'th position of the leaderboard.
                print = print.concat(' **' + names[j] + '** – ' + leaderboard[j] + '\n');
            }

            // Show the leaderboard as an embed.
            const embed = new Discord.MessageEmbed()
            .setColor(colours.default)
            .setTitle('Credits Leaderboard')
            .setDescription(print)
            .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
            return message.channel.send({ embeds: [embed] });
        } catch (e) {
            console.log(e);
        }
    },
};