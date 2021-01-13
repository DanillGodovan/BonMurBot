const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../BotConfig.json')
const User = require('../../data/user.js');
const mongoose = require('mongoose');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Отсылает идею пользователя!",
            category: "Утилиты",
            aliases: ['предложить'],
            guildOnly: true,
            nsfw: false,
        });
    }
    async run(message, args) {        
        if (message.channel.id !== '729781200159506512' && message.channel.id !== '759168313342296154' && message.channel.id !== '770439146169958400' && message.channel.id !== '728950464204505158' && message.channel.id !== '770811977031090218' && message.channel.id !== '703254582834364458' && message.channel.id !== '703252739953786940' && message.channel.id !== '770439231331893258') return;
        else {
            message.delete()
            let reason = args.slice(0).join(" ")
            if (!reason) return message.channel.send(`Пожалуйста, укажите идею / Please, provide an idea`).then(msg => msg.delete({
                "timeout": 15000
            }));


            const filter = (reaction, user) => ['✅', '❌', '❓'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("741074618177159189")).map(x => x.id).includes(user.id)
            const adminFilter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("720873545537814529")).map(x => x.id).includes(user.id)
            let sChannel = message.guild.channels.cache.find(x => x.name === "📂┋logs-complaints-ideas")
            let ruChannel = message.guild.channels.cache.find(x => x.id === "728950464204505158")
            let enChannel = message.guild.channels.cache.find(x => x.id === "770811977031090218")
            message.channel.send("Идея успешно отправлена на проверку Модерации.\nSuggest was successfully submitted for Moderation review.").then(msg => msg.delete({
                "timeout": 15000
            }))
            sChannel.send(`**${message.author.tag}** has suggested idea **${reason}**.`).then(async msg => {
                await msg.react('✅');
                await msg.react('❌');
                msg.awaitReactions(filter, {
                    max: 1,
                    time: 86400000,
                    errors: ['time']
                }).then(async collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '✅':
                            let RepTickEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`**Идея ${message.author.tag}**`)
                                .setDescription(reason)
                                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Подтвердил / Accepted`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                    dynamic: true
                                }))
                            let messag;
                            if (message.member.roles.cache.has('770436611539468298')) {
                                messag = await ruChannel.send(RepTickEmbed)
                            } else {
                                messag = await enChannel.send(RepTickEmbed)
                            }
                            let RoleMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let mChannel = message.guild.channels.cache.find(z => z.name === "📁┋logs-administrator")
                            mChannel.send(`**${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag}** He reacted positively to the idea **${message.author.tag}** with suggest **${reason}**.`).then(async msg => {
                                await msg.react("✅")
                                await msg.react("❌")
                                msg.awaitReactions(adminFilter, {
                                    max: 1,
                                    time: 86400000,
                                    errors: ['time']
                                }).then(collected => {
                                    const reaction = collected.first();

                                    switch (reaction.emoji.name) {
                                        case '✅':
                                            let RepTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Идея ${message.author.tag}**`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил / Accepted`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            messag.edit(RepTickAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleMember).send(`Вы получили **${data.points} / 100** очко за правильный выбор в идеях / You got **${data.points} / 100** point for correct choice in suggests.`)
                                                if (data.points >= config.points) {
                                                    message.guild.members.cache.get(RoleMember).send(`Вы получили **100/100** очко. Вы были **Повышены** / You received **100/100** point. You were Raised.`)
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleMember).roles.add("741074618177159189")
                                                    data.points = 0
                                                    data.save()
                                                    // }
                                                }
                                            })
                                            reaction.message.delete()
                                            break;
                                        case '❌':
                                            let RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Идея ${message.author.tag}**`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил / Declined.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            messag.edit(RepTickCrossAdminEmbed)
                                            reaction.message.delete()
                                            break;
                                    }
                                });
                            });
                            reaction.message.delete()
                            break;
                        case '❌':
                            let RepCrossEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`**Идея ${message.author.tag}**`)
                                .setDescription(reason)
                                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил / Declined`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                    dynamic: true
                                }))
                            let mesag;
                            if (message.member.roles.cache.has('770436611539468298')) {
                                mesag = await ruChannel.send(RepCrossEmbed)
                            } else {
                                mesag = await enChannel.send(RepCrossEmbed)
                            }
                            let RoleCrossMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let aChannel = message.guild.channels.cache.find(z => z.name === "📁┋logs-administrator")
                            aChannel.send(`**${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag}** has reacted negatively to the idea **${message.author.tag}** with idea **${reason}**.`).then(async msg => {
                                await msg.react("✅")
                                await msg.react("❌")
                                msg.awaitReactions(adminFilter, {
                                    max: 2,
                                    time: 86400000,
                                    errors: ['time']
                                }).then(collected => {
                                    const reaction = collected.first();

                                    switch (reaction.emoji.name) {
                                        case '✅':
                                            let RepTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Идея ${message.author.tag}**`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил / Declined`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            mesag.edit(RepTickAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleCrossMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleCrossMember).send(`Вы получили **${data.points} / 100** очко за правильный выбор в идеях / You got **${data.points} / 100** point for correct choice in suggests.`)
                                                if (data.points >= config.points) {
                                                    message.guild.members.cache.get(RoleMember).send(`Вы получили **100/100** очко. Вы были **Повышены** / You received **100/100** point. You were Raised.`)
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleMember).roles.add("741074618177159189")
                                                    data.points = 0
                                                    data.save()
                                                    // }
                                                }
                                            })
                                            reaction.message.delete()
                                            break;
                                        case '❌':
                                            let RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Идея ${message.author.tag}**`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Принял / Accepted`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            mesag.edit(RepTickCrossAdminEmbed)
                                            reaction.message.delete()
                                            break;
                                    }
                                });
                            });
                            reaction.message.delete()
                            break;
                    }
                }).catch(collected => {

                });
            });
        }
    }
}