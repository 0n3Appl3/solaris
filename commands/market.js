module.exports = {
    name: 'market',
    description: 'Market command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to watch tutorial.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtu.be/OzpODWQHl1c')
        .setDescription('We will show you how to make good use of the server market system. It is now easier than ever to buy and sell items!')
        .setImage('https://appl3pvp.com/images/tut03.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};