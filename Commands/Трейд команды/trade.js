const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");
const moment = require("moment");
const usedCommand = new Set();
let trade;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["трейд"],
            description: "Скидывает трейд через определенный интервал",
            category: "Трейд команды",
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message, args) {
        let context = args.slice(0).join(` `);
        let tradechannel = message.guild.channels.cache.find((z) => z.id === "770822680059838515");
        let data = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
        let color;
        if(message.member.roles.cache.has('783327195330379786') || message.member.roles.cache.has('784059313576083456')) {
            color = "FFC001"
        } else {
            color = "1AC6FF"
        }
        let a = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`${context}\n\n\n**DM <@${message.author.id}>**`)
            .setColor(color)
            .setFooter(`${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }));
        if (context.includes("https:\/\/") || context.includes("discord.gg/")) return message.channel.send("Писать ссылки в трейдах строго запрещено, уберите ссылку и попробуйте снова / Writing links in trades is strictly forbidden, remove the link and try again.")
        if (data.tradeSent === true) {
            clearInterval(trade);
            if (!data) return bot.nodb();
            if (!context) {
                return message.channel.send("Напишите свою форму трейда / Please send your trade list.");
            } else {
                message.channel.send(`Ваш **Trade Offer** успешно изменён / Your **Trade Offer** has been successfully updated.`);
                data.tradeText = context;
                data.save();
                trade = setInterval(() => tradechannel.send(a), 900000);
            }
        } else {
            if (!data) return bot.nodb();

            if (!context) {
                return message.channel.send("Напишите свою форму трейда / Please send your trade list.");
            } else {
                tradechannel.send(a);
                message.channel.send(`Ваш **Trade Offer** успешно сохранен и отправлен в <#770822680059838515> / Your **Trade Offer** has been successfully saved and sent to <#770822680059838515>.`);
                data.tradeText = context;
                data.tradeSent = true;
                data.save();
                    trade = setInterval(() => tradechannel.send(a), 900000);
                }
            }
        }
};