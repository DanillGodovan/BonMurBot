const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../BotConfig.json')
const User = require('../../data/user.js');
const mongoose = require('mongoose')
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "suggest",
            description: "Отправляет вашу идею!",
            category: "Утилиты",
            aliases: [],
            guildOnly: true,
            nsfw: false,
        });
    }
    async run(message, args) {
        if (message.channel.id !== '729781200159506512') return;
        else {
            message.delete()

            let reason = args.slice(0).join(" ")
            if (!reason) return message.channel.send(`Пожалуйста, укажите идею`).then(msg => msg.delete({
                "timeout": 15000
            }));

            const filter = (reaction, user) => ['✅', '❌', '❓'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("741074618177159189")).map(x => x.id).includes(user.id)
            let sChannel = message.guild.channels.cache.find(x => x.name === "logs-complaints-ideas")
            message.channel.send("Ваша идея отправлена на рассмотрение модерацией, спасибо!").then(msg => msg.delete({
                "timeout": 15000
            }))
            sChannel.send(`**${message.author.tag}** Отправил идею. Вот идея: **${reason}**.`).then(async msg => {
                await msg.react('✅');
                await msg.react('❌');
                await msg.react("❓")
                msg.awaitReactions(filter, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                }).then(async collected => {
                    const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '✅':
                            let RepTickEmbed = new Discord.MessageEmbed()
                                .setTitle(`Идея ${target.user.tag}`)
                                .setDescription(reason)
                                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                    dynamic: true
                                }))
                            let messag = await message.channel.send(RepTickEmbed)
                            let RoleMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let mChannel = message.guild.channels.cache.find(z => z.name === "logs-admin")
                            mChannel.send(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Ответил положительно на идею **${message.author.tag}**. Вот идея: **${idea}**.`).then(async msg => {
                                await msg.react("✅")
                                await msg.react("❌")
                                msg.awaitReactions(filter, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                }).then(collected => {
                                    const reaction = collected.first();

                                    switch (reaction.emoji.name) {
                                        case '✅':
                                            let RepTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`Идеи ${target.user.tag}`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            messag.edit(RepTickAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleMember).send("Вам выдано 1 очко за правильный выбор в идеях.")
                                                if (data.points >= config.points) {
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleMember).roles.add("741074343723008040")
                                                    message.guild.members.cache.get(RoleMember).roles.remove("741074618177159189")
                                                    data.points = 0
                                                    // }
                                                }
                                            })
                                            reaction.message.delete()
                                            break;
                                        case '❌':
                                            let RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`Идея ${target.user.tag}`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            messag.edit(RepTickCrossAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleMember
                                            }, (err, data) => {
                                                data.warn += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleMember).send("Вам выдан 1 пред за неправильный выбор в идеях.")
                                                if (data.warn >= config.warn) {
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleMember).roles.remove("741074343723008040")
                                                    message.guild.members.cache.get(RoleMember).roles.remove("741074618177159189")
                                                    data.warn = 0
                                                    // }
                                                }
                                            })
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
                                .setTitle(`Идея ${target.user.tag}`)
                                .setDescription(reason)
                                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил`)
                            let mesag = await message.channel.send(RepCrossEmbed)
                            let RoleCrossMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let aChannel = message.guild.channels.cache.find(z => z.name === "logs-admin")
                            aChannel.send(`Модератор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Ответил отрицательно на идею **${message.author.tag}** с жалобой на игрока **${target.user.tag}** с причиной **${reason}**.`).then(async msg => {
                                await msg.react("✅")
                                await msg.react("❌")
                                msg.awaitReactions(filter, {
                                    max: 1,
                                    time: 30000,
                                    errors: ['time']
                                }).then(collected => {
                                    const reaction = collected.first();

                                    switch (reaction.emoji.name) {
                                        case '✅':
                                            let RepCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setTitle(`Идея ${target.user.tag}`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleCrossMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleCrossMember).send("Вам выдано 1 очко за правильный выбор в идеях.")
                                                if (data.points >= config.points) {
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleCrossMember).roles.add("741074343723008040")
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074618177159189")
                                                    data.points = 0
                                                    // }
                                                }
                                            })
                                            mesag.edit(RepCrossAdminEmbed)
                                            reaction.message.delete()
                                            break;
                                        case '❌':
                                            let RepCrossTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`Идею ${target.user.tag}`)
                                                .setDescription(reason)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleCrossMember
                                            }, (err, data) => {
                                                data.warn += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleCrossMember).send("Вам выдан 1 варн за неправильный выбор в идеях.")
                                                if (data.warn >= config.warn) {
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074343723008040")
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074618177159189")
                                                    data.warn = 0
                                                    // }
                                                }
                                            })
                                            mesag.edit(RepCrossTickAdminEmbed)
                                            reaction.message.delete()
                                            break;
                                    }
                                });
                            })
                            break;
                        case '❓':
                            let RepEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`Идея ${target.user.tag}`)
                                .setDescription(reason)
                                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Попросил объяснений`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                    dynamic: true
                                }))
                            message.channel.send(RepEmbed)
                    }
                }).catch(collected => {

                });
            });
        }
    }
}