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
            aliases: ["мутант"],
            guildOnly: true,
			      nsfw: false,
			      args: true
    });
}
async run(message) {
    let attacks = ["Удар Кулаком", "Двойной удар"]
    User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
        if(data.isFighting === true) {
            User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
              if(message.content.includes(attacks[1].toLowerCase) || data.doubleHit === true) {
                message.channel.send(`Вы нанесли урон монстру **${data.damage}**`)
        }
    })
  }
})
}
}
