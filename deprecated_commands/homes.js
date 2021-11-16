module.exports = {
    name: 'homes',
    description: 'Homes command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to watch tutorial.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtu.be/OdjnHg0oyn0')
        .setDescription('We will show you how to create and manage your own homes. This is a must-have feature on all survival multiplayer servers!')
        .setImage('https://appl3pvp.com/images/tut04.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};