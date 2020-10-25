const User = require('../../data/user.js')
const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment} = require('discord.js');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Тест",
            usage: "!command",
            category: "Dungeons",
            aliases: ["command"]
    });
}
async run(message) {
   User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
    data.locations += 1
    data.save()
  })
}
}