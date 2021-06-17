module.exports = {
    name: 'help',
    description: 'Help command.',
    execute(message) {
        const Discord = require('discord.js');
        const { bot_info } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setTitle('Help Page')
        .setDescription(`Hi there! I am ${bot_info.name}, your virtual assistant on Appl3 PvP. I have very limited functionality right now, but I can provide useful links and info about the server simply by executing commands.`)
        .addFields(
            { name: 'General', value: '`/help` Shows this page\n`/info` Displays basic information about the server\n`/ip` Displays the server IP and version\n`/socials` Visit our socials', inline: false },
            { name: 'Tutorials', value: '`/tutorials` Shows the playlist of all tutorial videos\n`/claims` How to create and manage claims\n`/market` How to use the market system\n`/homes` How to create and manage homes\n`/remtp` How to remove teleportation cooldowns\n`/morehomes` How to add more homes', inline: false },
        )
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};