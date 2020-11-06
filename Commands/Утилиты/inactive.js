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
        let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
            if (data.inactive === true) {
            if (message.member.roles.cache.has('773536824530305034')) {
            const returnembed = new MessageEmbed()
            .setTitle(`**Server: ${message.guild.name}**`)
            .setColor('34B7EB')
            .addField("**Русская Версия**", "[Все для модерации и администрации](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/vse-dlya-moderacii-i-administracii)\nВы успешно получили роль неактивного модератора. Для более подробной информации о команде, перейдите по ссылке выше.\nПросьба не злоупотреблять этой командой, иначе вы рискуете получить предупреждение.")
            .addField("**English Version**", "[Everything for moderation and administration](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/vse-dlya-moderacii-i-administracii)\nYou have successfully obtained the role of inactive moderator. For more information about the team, follow the link above.\nPlease do not abuse this command, otherwise you risk getting a warning.")
            .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
            .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
            message.channel.send("**Неактивность / Inactive**", {embed: returnembed});
            message.member.roles.remove('773536824530305034')
            message.member.roles.add('741074618177159189')
            data.inactive = false
            data.save()
            } else {
                return;
            }
            } else {
            if (message.member.roles.cache.has('741074618177159189')) {
                const embed = new MessageEmbed()
                .setTitle(`**Server: ${message.guild.name}**`)
                .setColor('34B7EB')
                .addField("**Русская Версия**", "[Все для модерации и администрации](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/vse-dlya-moderacii-i-administracii)\nВы успешно вышли с неактивного модератора.. Для более подробной информации о команде, перейдите по ссылке выше.\nПросьба не злоупотреблять этой командой, иначе вы рискуете получить предупреждение.")
                .addField("**English Version**", "[Everything for moderation and administration](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/vse-dlya-moderacii-i-administracii)\nYou have successfully left the inactive moderator. For more information about the command, follow the link above.\nPlease do not abuse this command, otherwise you risk getting a warning.")
                .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
                .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
                message.channel.send("**Неактивность / Inactive**", {embed: embed});
            message.member.roles.add('773536824530305034')
            message.member.roles.remove('741074618177159189')
            data.inactive = true
            data.save()
            } else {
                return;
            }
            }
        }

};