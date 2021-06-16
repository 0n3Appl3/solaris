module.exports = {
    name: 'info',
    description: 'Info command.',
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setColor('#db2b39')
        .setTitle('Server Info')
        .setDescription('We strive to provide a survival PvP experience that is as hassle-free as possible with our custom-made server plugins made with purpose and simplicity in mind.')
        .addFields(
            { name: 'Well-rounded and laid-back player experience.', value: 'Our goal with Appl3 PvP is to provide the best player experience and make sure everyone has a great time.', inline: false },
            { name: 'Extremely robust and convenient custom claiming system.', value: 'We have a custom-made land protection and management system, created with intuition and convenience in mind which keeps griefers from looting.', inline: false },
            { name: 'Buy and sell with confidence using the server player market.', value: 'Money comes in the form of virtual credits, which is obtained from killing mobs. A completely player-operated market opens many opportunities for everyone looking to buy and sell items.', inline: false },
            { name: 'We will always be a free-to-play Minecraft server.', value: 'While Appl3 PvP will always remain a free-to-play server, we have some extra-special bonuses for those that donate through Tebex.', inline: false },
        )
        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
        return message.channel.send(embed);
    },
};