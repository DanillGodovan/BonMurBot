const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const moment = require('moment');
const usedCommand = new Set();

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            name: "clear",
            description: "Удаляет указанное кол-во сообщений",
            category: "Утилиты",
            aliases: ["очистить", "deletemessage"],
            guildOnly: true,
			nsfw: false,
    });
}
async run(message, args) {
    if (!message.member.roles.cache.has('741074343723008040') && !message.member.hasPermission(["ADMINISTRATOR"])) return message.reply("Вы не имеете права использовать данную команду. При возникновении ошибки, просьба написать Главному Программисту.");
 
    if (!args[0]) return message.reply("Введите количество, которое вы хотите удалить");
 
    if (Number.isInteger(parseInt(args[0]))) {
 
        var num = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(num).then(() => {
            if (args[0] == 0) {
                message.reply(`Укажите количество сообщений больше нуля.`).then(msg => msg.delete({timeout: 3000}));          
            } else if (args[0] == 1) {        
                message.reply(`Я удалил 1 сообщение.`).then(msg => msg.delete({timeout: 3000}));
            } else {
                message.reply(`Я удалил ${args} сообщений`).then(msg => msg.delete({timeout: 3000}));  
            }
        });
    } else {
        return message.reply("Пожалуйста, введите кол-во сообщений.");
    }
  }
}
