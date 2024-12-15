const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILD_MESSAGE_REACTIONS"], 
    partials: ["MESSAGE", "CHANNEL", "REACTION"] 
});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { token, bot_info, colours, chats } = require('./config.json');

// Initialise the bot.
client.once('ready', async () => {
	console.log(bot_info.name + ' is ready!');
    client.user.setActivity('on Noxite', { type: 'PLAYING' });
});

// Bot will now be online.
client.login(token);

// Load all commands.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event triggers when a new member joins the server.
client.on('guildMemberAdd', guildMember => {
    // Send an embed message to a welcome messages chat.
    const channel = guildMember.guild.channels.cache.find(c => c.name === chats.whitelist_channel);
    const embed = new Discord.MessageEmbed()
    .setColor(colours.default)
    .setAuthor(`Welcome to the server, ${guildMember.user.username}!`, guildMember.user.avatarURL())
    .setDescription(`Please enter your Minecraft username in this chat to be whitelisted. The server does not allow cracked accounts as it is set to Online mode.`)
    .setTimestamp();
    guildMember.guild.channels.cache.get(channel.id).send({ 
        content: `<@${guildMember.user.id}>`,
        embeds: [embed], 
    });
});
