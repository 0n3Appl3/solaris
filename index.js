const Discord = require('discord.js');
const fs = require('fs');
const mc = require('minecraft_head');
const yaml = require('js-yaml');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { prefix, token, chatKey, bot_info, market_channel } = require('./config.json');
const fetch = require('node-fetch').default;

// General keywords for queries.
const help = ['help'];
const how = ['how'];
// Keywords to detect claim queries.
const claimHelp = ['claim'];
// Keywords to detect market queries.
const marketHelp = ['market'];
const shopHelp = ['shop'];
const sell = ['sell', 'item'];
const buy = ['buy', 'item'];
// Keywords to detect home queries.
const homeHelp = ['home'];
const more = ['more'];
// Keywords to detect remtp queries.
const cooldownHelp = ['cooldown'];
const teleport = ['teleport'];
const tp = ['tp'];

// Number of seconds between checking new market items.
const shopInterval = 4;

// Initialise the bot.
client.once('ready', () => {
	console.log(bot_info.name + ' is ready!');
    client.user.setActivity('-help', { type: 'LISTENING' });

    setInterval(() => {
        // Get the latestitem.yml file from the server.
        const fileContents = fs.readFileSync('/Users/Jedd/Desktop/test-server-v4.0/plugins/ShopControl/latestitem.yml', 'utf8');
        const data = yaml.safeLoad(fileContents);

        try {
            // Save item information into their own arrays.
            const username = Object.values(data.shop).map(item => item.username);
            const itemName = Object.values(data.shop).map(item => item.itemName);
            const amount = Object.values(data.shop).map(item => item.amount);
            const cost = Object.values(data.shop).map(item => item.cost);

            if (username.length >= 0) {
                // Announce every new market item listing.
                for (let i = 0; i < username.length; i++) {
                    mc.nameToUuid(username[i]).then((d) => {
                        const embed = new Discord.MessageEmbed()
                        .setColor('#db2b39')
                        .setTitle(username[i] + " is selling a new item to the player market!")
                        .setAuthor(username[i], 'https://crafatar.com/avatars/' + d.uuid + '.png?overlay')
                        .addFields(
                            { name: 'Item', value: itemName[i], inline: true },
                            { name: 'Quantity', value: amount[i], inline: true },
                            { name: 'Cost', value: cost[i] + ' Credits', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
                        client.channels.cache.get(market_channel).send(embed);
                    });
                }
                // Overwrite file to reset latest market listings.
                // fs.writeFile('../test-server-v4.0/plugins/ShopControl/latestitem.yml', 'shop:', 'utf8');
            }
        } catch (err) {
            // Do nothing.
        }
    }, shopInterval * 1000);
});

// Bot will now be online.
client.login(token);

// Load all commands.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Even triggers when a message is sent to the chat.
client.on('message', async message => {
    if ((contextMatch(message.content, help) && !message.content.startsWith(prefix)) || contextMatch(message.content, how)) {
        // Someone is asking about claiming.
        if (contextMatch(message.content, claimHelp)) {
            showEmbed(message, 'I know a tutorial that could help you out. Gimme a sec!', 'claims');
        }
        // Someone is asking about the market.
        if (contextMatch(message.content, marketHelp)
            || contextMatch(message.content, shopHelp)
            || contextMatch(message.content, sell)
            || contextMatch(message.content, buy)) {
            showEmbed(message, 'I can help you buy and sell with confidence! Hold on...', 'market');
        }
        // Someone is asking about homes.
        if (contextMatch(message.content, homeHelp)) {
            // Are they asking about adding more homes?
            if (contextMatch(message.content, more)) {
                showEmbed(message, 'I can help you with that. Here you go!', 'morehomes');
            } else {
                showEmbed(message, 'I hope this tutorial will help you out, should be pretty simple.', 'homes');
            }
        }
        // Someone is asking about cooldowns.
        if (contextMatch(message.content, cooldownHelp)
            && (contextMatch(message.content, teleport) || contextMatch(message.content, tp))) {
            showEmbed(message, 'I know this one! This tutorial will show you how to remove it.', 'remtp');
        }
        return message.channel.stopTyping(true);
    }

    // Bot will converse with the member who pinged them.
    if (message.mentions.has(client.user) && !message.author.bot) {
        message.channel.startTyping();
        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content.replace(bot_info.mention, '')}&uid=${message.author.id}&key=${chatKey}`)
        .then(response => response.json())
        .then(data => {
            // Send message to the chat.
            message.channel.send(data.response);
        }).catch(() => {
            message.channel.send('Could not fetch response!');
        });
        return message.channel.stopTyping(true);
    }
    
    // Chat as normal if member is not entering a command.
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Set up command execution.
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an issue executing that command!');
    }
 });

 // Checks if a message contains all the assigned keywords.
 function contextMatch(msg, array) {
    const keywords = array;
    let i = 0;

    for (i = 0; i < keywords.length; i++) {
        if (!msg.includes(keywords[i])) {
            // A keyword was not found in the message.
            return false;
        }
    }
    // All keywords were found in the message.
    return true;
 }

 // Executes a command and pings the member who asked for it.
 function showEmbed(message, reply, cmd) {
    message.channel.startTyping();
    message.reply(reply);
    message.channel.stopTyping(true);
    message.channel.startTyping();
    client.commands.get(cmd).execute(message);
 }