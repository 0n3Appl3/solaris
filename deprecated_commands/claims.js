module.exports = {
    name: 'claims',
    description: 'Claims command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to watch tutorial.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtu.be/SMpcfC6sX_4')
        .setDescription('We will show you how to create and manage your own claims. Our custom-made land protection plugin ensures your possessions are kept safe from criminals!')
        .setImage('https://appl3pvp.com/images/tut02.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};