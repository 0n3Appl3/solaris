module.exports = {
    name: 'market',
    description: 'Market command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setAuthor({ name: 'Click here to watch tutorial.', url: 'https://youtu.be/OzpODWQHl1c', iconURL: 'https://i.imgur.com/qBB5OW9.png' })
        .setDescription('We will show you how to make good use of the server market system. It is now easier than ever to buy and sell items!')
        .setImage('https://appl3pvp.com/images/tut03.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};