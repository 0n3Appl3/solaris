module.exports = {
    name: 'tutorials',
    description: 'Tutorials command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setAuthor('Click here to view playlist.', 'https://i.imgur.com/qBB5OW9.png', 'https://youtube.com/playlist?list=PLUftUvfExaLhBTkDEF_OGF05dFtxO-6_X')
        .setDescription('Appl3 PvP comes bundled with video tutorials which you can find in the YouTube playlist linked above, and there are more to come! If you have any further questions, feel free to write a comment or send a message on Discord.')
        .setThumbnail('https://i.imgur.com/qBB5OW9.png')
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};