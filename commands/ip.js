module.exports = {
    name: 'ip',
    description: 'IP command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setTitle('IP: appl3pvp.com')
        .setDescription('We are currently running Minecraft 1.18.1 with the Paper API.\n\nIf you encounter problems connecting to the server, please contact us as soon as possible.')
        .setImage('https://appl3pvp.com/images/enterip.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};