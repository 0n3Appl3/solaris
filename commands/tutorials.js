module.exports = {
    name: 'tutorials',
    description: 'Tutorials command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setAuthor({ name: 'Click here to view playlist!', url: 'https://youtube.com/playlist?list=PLUftUvfExaLhBTkDEF_OGF05dFtxO-6_X', iconURL: 'https://i.imgur.com/qBB5OW9.png' })
        .setDescription('Appl3 PvP comes bundled with video tutorials which you can find in the YouTube playlist linked above, and there are more to come! If you have any further questions, feel free to write a comment or send a message on Discord.')
        .setThumbnail('https://i.imgur.com/qBB5OW9.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};