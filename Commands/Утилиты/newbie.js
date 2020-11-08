const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const User = require('../../data/user.js');
const mongoose = require('mongoose');
const e = require('express');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['Неактив'],
            description: 'Дает роль "временно не может выполнять обязанности".',
            category: 'Утилиты',
            usage: '[user]',
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message) {
                const embed = new MessageEmbed()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setColor('34B7EB')
                .addField("**Русская Версия**", "Команды, которые разрешено использовать в чатах по общению: !newbie, !report, !suggest, w/l.\nКоманда, которая вам поможет побольше узнать о сервере: !help (разрешено писать только в <#703254582834364458>).\nЕсли на вас давят, оскорбляют и тому подобное, просьба написать администрации или подать жалобу командой \"!report <@ник> <жалоба>\".\nДля подачи идеи можно написать \"!suggest <идея>\".\nЮтуб канал BRO ИГРАЮТ находится ниже.")
                .addField("**English Version**", "Commands that can be used in chat rooms: !newbie, !report, !suggest, w/l.\nThe command that will help you learn more about the server: !help (allowed to write only in <#703254582834364458>).\nIf you are under pressure, insulted, and so on, please write to the administration or file a complaint with the team \"!report <@nick> <complaint>\".\nTo submit an idea, you can write \"!suggest <idea>\".\nThe BRO ИГРАЮТ YouTube channel is located below.")
                .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                message.member.send("**Новичок / Newbie**", {embed: embed});
                message.channel.send(`<@${message.author.id}>, Проверьте личные сообщения.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
    }
   };