const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const User = require('../../data/user.js');
const mongoose = require('mongoose')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['modinfo'],
            description: 'Показывает всю информацию о модераторе или о указанном модераторе.',
            category: 'Информация',
            usage: '[user]',
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message, [target]) {
        const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, (err, data) => {
            if (data.lang === "RU") {
                const embed = new MessageEmbed()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setDescription("Информация о Юзере")
                .setColor('34B7EB')
                .addField('**Информация & Основное**', [
                        `Никнейм: ${member.user.tag}`,
                        `ID: ${member.id}`,
                        `Аватар: [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                        `Создан: ${moment(member.user.createdTimestamp).format('RU')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                    ])
                .addField('**Модерация & Логи**', [
                        `Logs Очки: **${data.points} / 100** Повышение`,
                        `Предупреждения: **${data.warn} / 7** Снятие & Понижение`,
                    ])
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                return message.channel.send("**Информация о Юзере**", {embed: embed});
            } else if (data.verified === true && data.lang === "US") {
                const embed = new MessageEmbed()
            .setTitle(`**Server: ${message.guild.name}**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription("User Information")
            .setColor('34B7EB')
            .addField('**Information & Main**', [
                    `Nickname: ${member.user.tag}`,
                    `ID: ${member.id}`,
                    `Avatar: [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                    `Created: ${moment(member.user.createdTimestamp).format('RU')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                ])
            .addField('**Модерация & Логи / Moderation & Logs**', [
                    `Logs Points: **${data.points} / 100** Increase`,
                    `Warnings: **${data.warn} / 7** Remove & Decrease`,
                ])
            .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
            return message.channel.send("**User Information**", {embed: embed});
            }
            
        })
    }

};