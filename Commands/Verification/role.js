const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Верификация для новых участников!",
            usage: "!role",
            category: "Verification",
            aliases: ["v"],
            guildOnly: true,
			nsfw: false,
			args: false
    });
}
async run(message) {
    const filter = (reaction, user) => ['742770578339135517'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("742779660689211434")).map(x => x.id).includes(user.id) 
    message.channel.send("Верификация").then(msg => {
        msg.react('742770578339135517')
    const collector = message.createReactionCollector(filter, { time: 15000 });

    collector.on('collect', (reaction, user) => {
        let VerificationChannel = message.guild.channels.cache.find(x => x.name === "тест-верификации")
        switch (reaction.emoji.name) {
            case '742770578339135517':
                VerificationChannel.overwritePermissions([
                    {
                       id: user.id,
                       deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }
                  ], 'Needed to change permissions');
                    }
    });

    collector.on('end', collected => {
	    console.log(`Collected ${collected.size} items`);
    });
            })
      }
    }