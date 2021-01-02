const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../BotConfig.json')
const User = require('../../data/user.js');
const mongoose = require('mongoose');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Отсылает жалобу на игрока!",
            category: "Утилиты",
            aliases: ["жалоба"],
            guildOnly: true,
            nsfw: false,
        });
    }
    async run(message, args) {
        if (message.channel.id !== '729781200159506512' && message.channel.id !== '759168313342296154' && message.channel.id !== '770439146169958400' && message.channel.id !== '723945263072411668' && message.channel.id !== '770812055678746643' && message.channel.id !== '703254582834364458' && message.channel.id !== '703252739953786940' && message.channel.id !== '770439231331893258') return;
        else {
            message.delete({ timeout: 2000 })

            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!target) return message.channel.send("Пожалуйста, укажите пользователя.").then(msg => msg.delete({
                "timeout": 15000
            }));
            if (target === message.member) return message.channel.send("Вы не можете подать жалобу на себя / You can't report yourself!").then(msg => msg.delete({
                "timeout": 15000
            }));
            if (target.user.bot) return message.channel.send("Вы не можете подать жалобу на бота / You can't report the bot!").then(msg => msg.delete({
                "timeout": 15000
            }));
            let reason = args.slice(1).join(" ")
            if (!reason) return message.channel.send(`Пожалуйста, укажите причину для жалобы на **${target.user.tag}**`).then(msg => msg.delete({
                "timeout": 15000
            }));
            if (message.attachments.size == 0) {
                if (message.member.roles.cache.has('770436611539468298')) {
                    return message.channel.send('Просьба прикрепить скриншот доказательств к жалобе.').then(msg => msg.delete({
                        "timeout": 15000
                    }));
                } else {
                    return message.channel.send('Please attach a screenshot of the evidence to the complaint.').then(msg => msg.delete({
                        "timeout": 15000
                    }));
                }
                
            }
            let attachedURL = message.attachments.first().url
            console.log(attachedURL)
            let reportEmbed = new Discord.MessageEmbed()
                .setColor('34B7EB')
                .setTitle(`**Жалоба ${message.author.tag}**`)
                .setDescription(`Has reported **${target.user.tag}** for **${reason}**`)
                .setImage(attachedURL);
            const filter = (reaction, user) => ['✅', '❌', '❓'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("741074618177159189")).map(x => x.id).includes(user.id)
            const adminFilter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("720873545537814529")).map(x => x.id).includes(user.id)
            let sChannel = message.guild.channels.cache.find(x => x.name === "📂┋logs-complaints-ideas")
            let ruChannel = message.guild.channels.cache.find(x => x.id === "723945263072411668")
            let enChannel = message.guild.channels.cache.find(x => x.id === "770812055678746643")
            message.channel.send("Жалоба успешно отправлена на проверку Модерации. \nThe report was successfully submitted for Moderation review.").then(msg => msg.delete({
                "timeout": 15000
            }))
            sChannel.send(reportEmbed).then(async msg => {
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
                            let RepTickEmbed;
                            if (message.member.roles.cache.has('770436611539468298')) {
                                RepTickEmbed = new Discord.MessageEmbed()
                                    .setColor('34B7EB')
                                    .setTitle(`**Жалоба на ${target.user.tag}**`)
                                    .setDescription(reason)
                                    .setImage(attachedURL)
                                    .setFooter(`Модератор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Подтвердил.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                            dynamic: true
                                        }))
                            } else {
                                RepTickEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`**Report about ${target.user.tag}**`)
                                .setDescription(reason)
                                .setImage(attachedURL)
                                .setFooter(`Moderator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Accepted.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                             dynamic: true
                                        }))
                            }
                            let messag;
                            if (message.member.roles.cache.has('770436611539468298')) {
                                messag = await ruChannel.send(RepTickEmbed)
                            } else {
                                messag = await enChannel.send(RepTickEmbed)
                            }
                            let RoleMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let mChannel = message.guild.channels.cache.find(z => z.name === "📁┋logs-moderators")
                            let reportAdminEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`**Жалоба ${target.user.tag}**`)
                                .setDescription(`**${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag}** responded positively to the report **${message.author.tag}** with reason **${reason}**.`)
                                .setImage(attachedURL);
                            mChannel.send(reportAdminEmbed).then(async msg => {
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
                                            let RepTickAdminEmbed;
                                            if (message.member.roles.cache.has('770436611539468298')) {
                                                RepTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Жалоба на ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Принял.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            } else {
                                                RepTickAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Report about ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Administrator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Accepted.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            }
                                            messag.edit(RepTickAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleMember).send(`Вы получили **${data.points} / 100** очко за правильный выбор в жалобах / You got **${data.points} / 100** point for correct choice in reports.`)
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
                                            let RepTickCrossAdminEmbed;
                                            if (message.member.roles.cache.has('770436611539468298')) {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Жалоба на ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            } else {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Report about ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Administrator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Declined.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            }

                                            messag.edit(RepTickCrossAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleMember
                                            }, (err, data) => {
                                                data.warn += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleMember).send(`Вы получили **${data.warn} / 7** предупреждение за неправильный выбор в жалобах / You are got **${data.warn} / 7** warning for wrong choice in жалобах.`)
                                                if (data.warn >= config.warn) {
                                                    message.guild.members.cache.get(RoleMember).send(`Вы получили **7/7** предупреждение. Вы были **Сняты** / You received **7/7** warning. You were Lowered.`)
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
                            let RepCrossEmbed;
                                if (message.member.roles.cache.has('770436611539468298')) {
                                    RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                        .setColor('34B7EB')
                                        .setTitle(`**Жалоба на ${target.user.tag}**`)
                                        .setDescription(reason)
                                        .setImage(attachedURL)
                                        .setFooter(`Модератор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                dynamic: true
                                            }))
                                } else {
                                    RepCrossEmbed = new Discord.MessageEmbed()
                                    .setColor('34B7EB')
                                    .setTitle(`**Report about ${target.user.tag}**`)
                                    .setDescription(reason)
                                    .setImage(attachedURL)
                                    .setFooter(`Moderator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Declined.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                 dynamic: true
                                            }))
                                }

                            let mesag;
                            if (message.member.roles.cache.has('770436611539468298')) {
                                mesag = await ruChannel.send(RepCrossEmbed)
                            } else {
                                mesag = await enChannel.send(RepCrossEmbed)
                            }
                            let RoleCrossMember = collected.first().users.cache.find(u => u.id !== this.client.user.id).id
                            let aChannel = message.guild.channels.cache.find(z => z.name === "📁┋logs-moderators")
                            let reportCrossAdminEmbed = new Discord.MessageEmbed()
                                .setColor('34B7EB')
                                .setTitle(`**Жалоба на ${target.user.tag}**`)
                                .setDescription(`**${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag}** responded negatively to the report **${message.author.tag}** with reason **${reason}**.`)
                                .setImage(attachedURL);
                            aChannel.send(reportCrossAdminEmbed).then(async msg => {
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
                                            let RepTickAdminEmbed;
                                            if (message.member.roles.cache.has('770436611539468298')) {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Жалоба на ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            } else {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Report about ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Administrator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Declined.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            }
                                            mesag.edit(RepTickAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleCrossMember
                                            }, (err, data) => {
                                                data.points += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleCrossMember).send(`Вы получили **${data.points} / 100** очко за правильный выбор в идеях / You got **${data.points} / 100** point for correct choice in suggests.`)
                                                if (data.points >= config.points) {
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleCrossMember).roles.add("741074343723008040")
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074618177159189")
                                                    data.points = 0
                                                    // }
                                                }
                                            })
                                            reaction.message.delete()
                                            break;
                                        case '❌':
                                            let RepTickCrossAdminEmbed;
                                            if (message.member.roles.cache.has('770436611539468298')) {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Жалоба на ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Администратор ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Принял.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            } else {
                                                RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                                                .setColor('34B7EB')
                                                .setTitle(`**Report about ${target.user.tag}**`)
                                                .setDescription(reason)
                                                .setImage(attachedURL)
                                                .setFooter(`Administrator ${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Accepted.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({
                                                    dynamic: true
                                                }))
                                            }
                                            mesag.edit(RepTickCrossAdminEmbed)
                                            User.findOne({
                                                guildID: message.guild.id,
                                                userID: RoleCrossMember
                                            }, (err, data) => {
                                                data.warn += 1
                                                data.save()
                                                message.guild.members.cache.get(RoleCrossMember).send(`Вы получили **${data.warn} / 7** предупреждение за неправильный выбор в жалобах / You are got **${data.warn} / 7** warning for wrong choice in reports.`)
                                                if (data.warn >= config.warn) {
                                                    message.guild.members.cache.get(RoleMember).send(`Вы получили **7/7** предупреждение. Вы были **Сняты** / You received **7/7** warning. You were Lowered.`)
                                                    //   if(collected.first().users.cache.find(u => u.tag !== this.client.user.tag).roles.cache.has("741074618177159189")) {
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074343723008040")
                                                    message.guild.members.cache.get(RoleCrossMember).roles.remove("741074618177159189")
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
                    }
                }).catch(collected => {

                });
            });
        }
    }
}