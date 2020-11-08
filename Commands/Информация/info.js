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
            const embed = new MessageEmbed()
            .setTitle(`**Server: ${message.guild.name}**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription("User Information / Информация о Юзере")
            .setColor('34B7EB')
            .addField('**Информация & Основное**', [
                    `**Никнейм / Nickname:** ${member.user.tag}`,
                    `**ID:** ${member.id}`,
                    `**Аватар / Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                    `**Создан / Created:** ${moment(member.user.createdTimestamp).format('RU')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                ])
            .addField('**Информация & Основное**', [
                    `**Logs Очки / Points: ** ${data.points}** / 100 Гл. Модератор / Сhief Moderator**`,
                    `**Logs Предупреждения / Warnings: ** ${data.warn}** / 5 Снятие & Понижение / Remove & Decrease**`,
                ])
            .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
            return message.channel.send("**User Information / Информация о Юзере**", {embed: embed});
        })
    }

};