const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const User = require('../../data/user.js');
const mongoose = require('mongoose');
const e = require('express');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['Новичок'],
            description: 'Показывает информацию для новичков',
            category: 'Утилиты',
            usage: '[user]',
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message) {
        if (message.channel.id !== '759168313342296154' && message.channel.id !== '770439146169958400' && message.channel.id !== '729781200159506512' && message.channel.id !== '777132691316932619') return;
        else {
            const embed = new MessageEmbed()
            message.delete()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setDescription('Для новичка / For the beginner')
                .setColor('34B7EB')
                .addField("**Информация & Новичок**", "Основные команды, использующиеся в чатах по общению: w/l, !report, !suggest.\nПросьба при нарушения подать жалобу командой !report <@пользователь> <жалоба>.\nПоявилась идея, подайте ее командой !suggest <идея>.\nДля создания Собственного Голосового Чата, зайдите в ГЧ Приват / Private.")
                .addField("**Information & Beginner**", "The main commands used in chat rooms are: w/l, !report, !suggest.\nPlease submit a complaint with the !report <@user> <complaint>command.\nYou have an idea, submit it with the command !suggest <idea>.\nTo create Your own Voice Chat, go to VC Приват / Private.")
                .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                message.member.send("**Новичок / Newbie**", {embed: embed});
                message.channel.send(`<@${message.author.id}>, Проверьте личные сообщения.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
        }       
    }
   };