module.exports = {
    name: 'ip',
    description: 'IP command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setTitle('IP: appl3pvp.com')
        .setDescription('We are currently running Minecraft 1.16.5 with the Paper API.\n\nIf you encounter problems connecting to the server, please contact us as soon as possible.')
        .setImage('https://appl3pvp.com/images/enterip.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};