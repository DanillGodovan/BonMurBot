const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const Canvas = require('canvas');
const User = require('../../data/user.js')
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Информация о мутант ролях!",
            usage: "!attacks",
            category: "Dungeons",
            aliases: ["мутант"]
    });
}
async run(message) {
    User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
        
    })
  }
}
