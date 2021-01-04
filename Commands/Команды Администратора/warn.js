const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");
const config = require('../../BotConfig.json')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["пред", "пред-модератору"],
            description: "Выполняют функцию предупреждения модератора",
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
        if (member.user.bot) return message.channel.send("Вы не можете выдать предупреждение боту!").then(msg => msg.delete({
            "timeout": 30000
        }));
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return ('Вы не имеете права писать эту команду.\nYou are not allowed to write this command.')
        message.channel.send(`Предупреждение успешно выдано данному модератору / The warning was successfully issued to this moderator.`).then(msg => msg.delete( {timeout: 30000} ))
        data.warn += 1;
        data.save()
        member.send(`Вы получили **${data.warn} / 7** предупреждение по причине **${reason}**. Просьба быть впредь осторожнее.\nYou received **${data.warn} / 7 **warning for the reason **${reason}**. Please be more careful in the future.`)
        if(data.warn >= config.warn) {
            if(message.mentions.members.first().roles.cache.has('741074343723008040')) {
                mmember.send(`Вы получили **7/7** предупреждение по причине **${reason}**. Вы были **Понижены** / You received **7/7** warning for the reason **${reason}**. You were Lowered.`)
                member.roles.remove('741074343723008040')
                member.roles.add('741074618177159189')
                data.warn = 0
                data.save()
            } else if (message.mentions.members.first().roles.cache.has('741074618177159189')) {
                member.send(`Вы получили **7/7** предупреждение по причине **${reason}**. Вы были **Сняты** / You received **7/7** warning for the reason **${reason}**. You were Lowered.`)
                member.roles.remove('741074618177159189')
                data.warn = 0
                data.save()
            }
        }
    }
};