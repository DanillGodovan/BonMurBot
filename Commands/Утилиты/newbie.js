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
        if (message.channel.id !== '759168313342296154' && message.channel.id !== '770439146169958400' && message.channel.id !== '729781200159506512' && message.channel.id !== '777132691316932619' && message.channel.id !== '703254582834364458') return;
        else {
            let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
            if (data.lang === "RU") {
            const embed = new MessageEmbed()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setDescription('Для новичка')
                .setColor('34B7EB')
                .addField("**Информация & Новичок**", ":mouse_three_button: Для получения некоторых полезных ссылок, напишите в <#703254582834364458> команду \"!help\" (без \"\").\nКоманды, разрешенные в чатах общения: w/l, !report, !suggest (подробнее о данных командах здесь: https://clck.ru/SGJ9d).\nДля нахождения описания ролей, плюшек бустеров сервера, чатах и ролей по упоминанию, перейдите в <#770823966612258879> и прочитайте всё.")
                .addField("**Социальные сети**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                message.member.send("**Новичок / Newbie**", {embed: embed});
                message.channel.send(`<@${message.author.id}>, Проверьте личные сообщения.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
            } else if (data.lang === "US") {
            const embed = new MessageEmbed()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setDescription('For the beginner')
                .setColor('34B7EB')
                .addField("**Information & Newbie**", ":mouse_three_button: for some useful links, write in <#703254582834364458> the command \"!help\" (without \"\").\nCommands allowed in chat rooms: w/l, !report, !suggest (read more about these commands here: https://clck.ru/SGJia).\nTo find descriptions of roles, server booster buns, chats, and roles by mention, go to <#783636084734558208> and read everything.")
                .addField("**Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                message.member.send("**Новичок / Newbie**", {embed: embed});
                message.channel.send(`<@${message.author.id}>, Check DM.`).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
            }
            message.delete()
        }       
    }
   };