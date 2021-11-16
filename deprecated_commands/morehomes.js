module.exports = {
    name: 'morehomes',
    description: 'Morehomes command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to watch tutorial.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtu.be/oNgaEm4QwGM')
        .setDescription('We will show you how to add more homes without the need to pay with real money! (cough cough, totally not throwing shade)')
        .setImage('https://appl3pvp.com/images/tut06.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};