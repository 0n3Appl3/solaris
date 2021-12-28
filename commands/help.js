module.exports = {
    name: 'help',
    description: 'Help command.',
    execute(message) {
        const Discord = require('discord.js');
        const { bot_info, colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setTitle('Help Page')
        .setDescription(`Hi there! I am ${bot_info.name}, your virtual assistant on Appl3 PvP. I have very limited functionality right now, but I can provide useful links and info about the server simply by executing commands.`)
        .addFields(
            { name: 'General', value: '`-help` Shows this page\n`-info` Displays basic information about the server\n`-ip` Displays the server IP and version\n`-tutorials` Shows the playlist of all tutorial videos\n`-socials` Visit our socials', inline: false },
            { name: 'Server', value: '`-credits <username>` Displays number of credits for a given player\n`-top` Displays the top 10 richest players', inline: false },
        )
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};