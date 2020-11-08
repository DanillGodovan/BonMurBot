const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["пред"],
            description: "Дает 1 предупреждение модератору",
            category: "Информация",
            guildOnly: true,
            nsfw: false,
        });
    }

    async run(message, [target], args) {
        let reason = args.slice(1).join(" ")
        if (!reason) return reason = " ";
        const member = message.mentions.members.last() || message.guild.members.cache.get(target)
        let data = await User.findOne({
            guildID: message.guild.id,
            userID: member.id,
        });
        message.member.send(`**Вам было выдано 1 предупреждение по причине\n\n${reason}**`)
        data.warn += 1;
        data.save()
    }
};