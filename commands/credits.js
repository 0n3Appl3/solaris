module.exports = {
    name: 'credits',
    description: 'Find out number of credits for a given player.',
    args: true,
    execute(message, args) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const mc = require('minecraft_head');
        const fs = require('fs');
        const yaml = require('js-yaml');

        // User did not enter a player name.
        if (!args.length) return message.channel.send('You need to enter a player name.');
        
        try {
            // Get the money.yml file from the server.
            const fileContents = fs.readFileSync('./money.yml', 'utf8');
            const data = yaml.safeLoad(fileContents);

            // Save username and amount of credits into their own arrays.
            const username = Object.values(data.money).map(item => item.username);
            const credits = Object.values(data.money).map(item => item.amount);

            // Determines whether we have found the player.
            let found = false;

            // Go through all the usernames to find the queried player name.
            for (let i = 0; i < username.length; i++) {
                const input = args[0].toLowerCase();

                // Do these two usernames match.
                if (input === username[i].toLowerCase()) {
                    // If so, display the player's credit balance.
                    found = true;
                    mc.nameToUuid(username[i]).then((d) => {
                        const embed = new Discord.MessageEmbed()
                        .setColor(colours.default)
                        .setTitle(username[i] + "'s Bank Account")
                        .setDescription('You have ' + credits[i] + ' credits.')
                        .setThumbnail('https://crafatar.com/avatars/' + d.uuid + '.png?overlay')
                        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
                        return message.channel.send({ embeds: [embed] });
                    });
                }
            }

            // Otherwise, we could not find the player.
            if (!found) {
                message.channel.send('Sorry! I could not find the player ' + args[0] + '.');
            }
        } catch (e) {
            console.log(e);
        }
    },
};