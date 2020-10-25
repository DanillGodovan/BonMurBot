const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const Canvas = require('canvas');
const User = require('../../data/user.js')
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Информация о мутант ролях!",
            usage: "!mutant",
            category: "Dungeons",
            aliases: ["мутант"]
    });
}
async run(message) {
    let roles = ["Единорог", "Гопатыч"]
    if (message.content.includes(roles[0])) {
        message.channel.send(`Роль **${roles[0]}** можно получить пройдя 8 локацию`).then(msg => msg.delete({
            "timeout": 15000
           }));
    } else  if (message.content.includes(roles[1])) {
        message.channel.send(`Роль **${roles[1]}** можно получить пройдя 12 локацию`).then(msg => msg.delete({
            "timeout": 15000
           }));
    } else {
        User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,data) => {
            if(data.locations >= 8 && data.locations < 12) {
    message.channel.send(`Доступные роли для вас: **${roles[0]}**`).then(msg => msg.delete({
        "timeout": 15000
       }));
    } else if (data.locations >= 12) {
        message.channel.send(`Доступные роли для вас: **${roles[0]}** **${roles[1]}**`).then(msg => msg.delete({
            "timeout": 15000
           }));
    } else {
        message.channel.send(`Для вас нет доступных ролей!`).then(msg => msg.delete({
            "timeout": 15000
           }));
    }
    })
}
}
}
