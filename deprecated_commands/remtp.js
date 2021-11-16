module.exports = {
    name: 'remtp',
    description: 'Remtp command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to watch tutorial.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtu.be/2LU2UyqaTGM')
        .setDescription('We will show you how to remove those annoying teleportation cooldowns. Convenience comes at a cost (with in-game money of course)!')
        .setImage('https://appl3pvp.com/images/tut05.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};