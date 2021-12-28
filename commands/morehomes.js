module.exports = {
    name: 'morehomes',
    description: 'Morehomes command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setAuthor({ name: 'Click here to watch tutorial.', url: 'https://youtu.be/oNgaEm4QwGM', iconURL: 'https://i.imgur.com/qBB5OW9.png' })
        .setDescription('We will show you how to add more homes without the need to pay with real money! (cough cough, totally not throwing shade)')
        .setImage('https://appl3pvp.com/images/tut06.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};