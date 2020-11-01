const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");
const moment = require("moment");
const usedCommand = new Set();
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

        let data = await User.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
        });
        let tradechannel = message.guild.channels.cache.find((z) => z.id === "767040008740667412");
        let a = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`${context}\n\n**DM <@${message.author.id}>**`)
            .setColor("1AC6FF")
            .setFooter(`${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }));
        let { trade } = require('../../intervalinfo')
        if (context.includes("https:\/\/") || context.includes("discord.gg/")) {
            return message.channel.send("Писать ссылки в трейдах строго запрещено, уберите ссылку и попробуйте снова / PWriting links in trades is strictly forbidden, remove the link and try again..");
        } else if (!context) {
            return message.channel.send("Напишите свою форму трейда / Please send your trade list.");
        } else {
            if (data.tradeSent === true) {
                console.log('Testing!');
                clearInterval(trade);
                if (!data) return bot.nodb();

                message.channel.send(`Ваш **Trade Offer** успешно изменён /  Your **Trade Offer** has been successfully updated.`);
                data.tradeText = context;
                data.save();
                trade = setInterval(() => tradechannel.send(a), 10000);
            } else {
                if (!data) return bot.nodb();

                tradechannel.send(a);
                message.channel.send(`Ваш **Trade Offer** успешно сохранен и отправлен в <#767040008740667412> /  Your **Trade Offer** has been successfully saved and sent to <#767040008740667412>.`);
                data.tradeText = context;
                data.tradeSent = true;
                data.save();
            }
        }
    }
};