module.exports = {
    name: 'remtp',
    description: 'Remtp command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setAuthor({ name: 'Click here to watch tutorial.', url: 'https://youtu.be/2LU2UyqaTGM', iconURL: 'https://i.imgur.com/qBB5OW9.png' })
        .setDescription('We will show you how to remove those annoying teleportation cooldowns. Convenience comes at a cost (with in-game money of course)!')
        .setImage('https://appl3pvp.com/images/tut05.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};