module.exports = {
    name: 'socials',
    description: 'Socials command.',
    execute(message) {
        const Discord = require('discord.js');
        const { colours } = require('../config.json');
        const embed = new Discord.MessageEmbed()
        .setColor(colours.default)
        .setTitle('Social Links')
        .setDescription('Be sure to follow us on Twitter and YouTube to stay up-to-date on server posts, updates and more. The Discord server invite is also provided.')
        .addFields(
            { name: 'Twitter', value: 'twitter.com/appl3pvp', inline: true },
            { name: 'YouTube', value: 'youtube.com/channel/UCfmLZ-ld8Qy4oNwXGdD_Nrg', inline: true },
            { name: 'Discord', value: 'discord.gg/xnyMD2r', inline: true },
        )
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send({ embeds: [embed] });
    },
};