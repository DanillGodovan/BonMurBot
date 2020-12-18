const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");
const config = require('../../BotConfig.json')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["пред"],
            description: "Выполняют функцию выдачи очков модератора",
            category: "Команды Администратора",
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message, args) {
        let reason = args.slice(1).join(` `); if(!reason) reason = 'Отсуствует.'
        let member = message.guild.member(message.mentions.users.first())
        let data = await User.findOne({ guildID: message.guild.id, userID: member.id });

        if (!message.mentions.members.first().roles.cache.has('741074343723008040') && !message.mentions.members.first().roles.cache.has('741074618177159189')) return message.channel.send ('Данный пользователь не является Модератором.\nThis user is not a Moderator.').then(msg => msg.delete({
            "timeout": 30000
        }));
        if (member.user.bot) return message.channel.send("Вы не можете выдать очко боту!").then(msg => msg.delete({
            "timeout": 30000
        }));
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return ('Вы не имеете права писать эту команду.\nYou are not allowed to write this command.')
        message.channel.send(`Очко успешно выдано данному модератору / The point was successfully issued to this moderator.`).then(msg => msg.delete( {timeout: 30000} ))
        data.points += 1;
        data.save()
        member.send(`Вы получили **${data.points} / 100** очко по причине **${reason}**. Удачи в новых свершениях в будующем.\nYou received **${data.points} / 100 **point for the reason **${reason}**. Good luck with new achievments in future.`)
        if(data.points >= config.points) {
            if (message.mentions.members.first().roles.cache.has('741074618177159189')) {
                member.send(`Вы получили **100/100** очко по причине **${reason}**. Вы были **Повышены** / You received **100/100** point for the reason **${reason}**. You were Raised.`)
                member.roles.add('741074343723008040')
                data.points = 0
                data.save()
            }
        }
    }
};