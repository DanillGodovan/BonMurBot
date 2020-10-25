const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const moment = require('moment');
const mongoose = require('mongoose')
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            name: "suggest",
            description: "Подает идею!",
            category: "Информация",
            aliases: [],
            guildOnly: true,
			nsfw: false,
			args: true
    });
}
async run(message, args) {
    if(message.channel.id !== '729781200159506512') return;
    else {
    message.delete()

    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Пожалуйста, укажите идею`).then(msg => msg.delete({
        "timeout": 15000
    }));


    const filter = (reaction, user) => ['✅', '❌', '❓'].includes(reaction.emoji.name) && message.guild.members.cache.filter(x => x.roles.cache.has("720873545537814529")).map(x => x.id).includes(user.id) 
    let sChannel = message.guild.channels.cache.find(x => x.name === "логи-жалоб-идей")
    message.channel.send("Ваша идея отправлена на рассмотрение модерацией, спасибо!").then(msg => msg.delete({
        "timeout": 15000
    }))
    sChannel.send(`**${message.author.tag}** Подал идею **${reason}**.`).then(async msg => {
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
                .setTitle(`Идея ${message.user.tag}`)
                .setDescription(reason)
                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))
                let messag = await message.channel.send(RepTickEmbed)
                let mChannel = message.guild.channels.cache.find(z => z.name === "логи-админа")
                mChannel.send(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Ответил положительно на идею **${message.author.tag}** с идеей **${reason}**.`).then(async msg => {
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
                        .setTitle(`Идея ${message.user.tag}`)
                        .setDescription(reason)
                        .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))            
                        messag.edit(RepTickAdminEmbed)
                        reaction.message.delete()
                        break;
                    case '❌':
                        let RepTickCrossAdminEmbed = new Discord.MessageEmbed()
                        .setTitle(`Идея ${message.user.tag}`)
                        .setDescription(reason)
                        .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))            
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
                .setTitle(`Идея ${message.user.tag}`)
                .setDescription(reason)
                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил`)
                let mesag = await message.channel.send(RepCrossEmbed)
                let aChannel = message.guild.channels.cache.find(z => z.name === "логи-админа")
                aChannel.send(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Ответил отрицательно на идею **${message.author.tag}** с идеей **${reason}**.`).then(async msg => {
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
                        .setTitle(`Жалоба на ${target.user.tag}`)
                        .setDescription(reason)
                        .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Отклонил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))            
                        mesag.edit(RepCrossAdminEmbed)
                        reaction.message.delete()
                        break;
                    case '❌':
                        let RepCrossTickAdminEmbed = new Discord.MessageEmbed()
                        .setTitle(`Жалоба на ${target.user.tag}`)
                        .setDescription(reason)
                        .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Одобрил идею.`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))            
                        mesag.edit(RepCrossTickAdminEmbed)
                        reaction.message.delete()
                        break;
                    }
                });
                })
                break;
        case '❓':
                let RepEmbed = new Discord.MessageEmbed()
                .setTitle(`Жалоба на ${target.user.tag}`)
                .setDescription(reason)
                .setFooter(`${collected.first().users.cache.find(u => u.tag !== this.client.user.tag).tag} Попросил доказательства`, collected.first().users.cache.find(u => u.id !== this.client.user.id).displayAvatarURL({ dynamic: true }))
                message.channel.send(RepEmbed)
            }
        }).catch(collected => {

        });
    });
   }
  }
 }
