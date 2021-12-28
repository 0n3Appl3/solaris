module.exports = {
    name: 'homes',
    description: 'Homes command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setAuthor({ name: 'Click here to watch tutorial.', url: 'https://youtu.be/OdjnHg0oyn0', iconURL: 'https://i.imgur.com/qBB5OW9.png' })
        .setDescription('We will show you how to create and manage your own homes. This is a must-have feature on all survival multiplayer servers!')
        .setImage('https://appl3pvp.com/images/tut04.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};