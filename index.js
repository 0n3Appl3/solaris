const Discord = require('discord.js');
const fs = require('fs');
const mc = require('minecraft_head');
const Twit = require('twit');
const yaml = require('js-yaml');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { prefix, token, chatKey, bot_info, colours, twitter, chats, market_channel } = require('./config.json');
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

// Create a new instance of Twit to connect to Twitter application.
const twit = new Twit({
    consumer_key: twitter.api_key,
    consumer_secret: twitter.api_key_secret,
    access_token: twitter.access_token,
    access_token_secret: twitter.access_token_secret,
});

// Initialise the bot.
client.once('ready', () => {
	console.log(bot_info.name + ' is ready!');
    const stream = twit.stream('statuses/filter', { follow: [twitter.user] });
    client.user.setActivity('-help', { type: 'LISTENING' });

    // Post tweet on the Discord server chat.
    stream.on('tweet', function(tweet) {
        const channelExists = client.channels.cache.some(c => c.name === chats.twitter_channel);

        // Specified channel needs to exist and is not a retweet or reply to post.
        if (channelExists && !isReply(tweet)) {
            const channel = client.channels.cache.find(c => c.name === chats.socials_chat_name);
            // Form the link to the tweet.
            const link = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
            const followLink = 'https://twitter.com/intent/follow?screen_name=' + tweet.user.screen_name;
            
            // Create the button to able to view tweet.
            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setLabel('View Tweet')
                .setStyle('LINK')
                .setURL(link),
                new Discord.MessageButton()
                .setLabel('Follow')
                .setStyle('LINK')
                .setURL(followLink),
            );
            // Create the embed for previewing the tweet.
            const embed = new Discord.MessageEmbed()
            .setColor(colours.default)
            .setAuthor(tweet.user.name + ' (@' + tweet.user.screen_name + ')', tweet.user.profile_image_url_https, 'https://twitter.com/' + tweet.user.screen_name)
            .setDescription(tweet.text)
            .setFooter('Twitter via Solaris', 'https://images-ext-1.discordapp.net/external/bXJWV2Y_F3XSra_kEqIYXAAsI3m1meckfLhYuWzxIfI/https/abs.twimg.com/icons/apple-touch-icon-192x192.png')
            .setTimestamp();
            // If tweet contains an image, attach to the embed.
            if (tweet.entities.media != undefined) {
                embed.setImage(tweet.entities.media[0].media_url_https);
            }
            channel.send({ embeds: [embed], components: [row] });
        }
    });

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
                        .setColor(colours.default)
                        .setTitle(username[i] + " is selling a new item to the player market!")
                        .setAuthor({ name: username[i], iconURL: 'https://crafatar.com/avatars/' + d.uuid + '.png?overlay' })
                        .addFields(
                            { name: 'Item', value: itemName[i], inline: true },
                            { name: 'Quantity', value: amount[i], inline: true },
                            { name: 'Cost', value: cost[i] + ' Credits', inline: true },
                        )
                        .setTimestamp()
                        .setFooter('Appl3 PvP', 'https://i.imgur.com/qBB5OW9.png');
                        client.channels.cache.get(market_channel).send({ embeds: [embed] });
                    });
                }
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
client.on('messageCreate', async message => {
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
        return;
    }

    // Bot will converse with the member who pinged them.
    if (message.mentions.has(client.user) && !message.author.bot) {
        message.channel.sendTyping();
        fetch(`https://api.monkedev.com/fun/chat?msg=${message.content.replace(bot_info.mention, '')}&uid=${message.author.id}&key=${chatKey}`)
        .then(response => response.json())
        .then(data => {
            // Send message to the chat.
            return message.channel.send({ content: data.response });
        }).catch(() => {
            return message.channel.send({ content: 'Could not fetch response!' });
        });
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
        message.reply({ content: 'There was an issue executing that command!' });
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
    message.reply({ content: reply });
    message.channel.sendTyping();
    client.commands.get(cmd).execute(message);
 }

 function isReply(tweet) {
    if (tweet.retweeted_status ||
        tweet.in_reply_to_status_id ||
        tweet.in_reply_to_status_id_str ||
        tweet.in_reply_to_user_id ||
        tweet.in_reply_to_user_id_str ||
        tweet.in_reply_to_screen_name) return true;
    return false;
}