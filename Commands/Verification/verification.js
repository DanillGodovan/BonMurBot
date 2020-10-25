const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Верификация для новых участников!",
            usage: "!verification",
            category: "Verification",
            aliases: ["v"],
            guildOnly: true,
			      nsfw: false,
			      args: false
    });
}
async run(message) {
    let VerificationChannel = message.guild.channels.cache.find(x => x.name === "тест-верификации")
    VerificationChannel.overwritePermissions([
        {
           id: message.author.id,
           allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        }
      ], 'Needed to change permissions');
      message.delete({"timeout": 5000})
      }
    }
