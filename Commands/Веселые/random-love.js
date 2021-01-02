const Command = require("../../Structures/Command");
const mongoose = require("mongoose");
const User = require("../../data/user");
const Discord = require("discord.js");
const config = require('../../BotConfig.json')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["случайная-любовь"],
            description: "Случайная любовь",
            category: "Веселые",
            guildOnly: true,
			nsfw: false,
        });
    }

    async run(message, args) {
       let randomMember = message.guild.members.cache.random().user

       let embed = new Discord.MessageEmbed()
       .setTitle("**Случайная Любовь**")
       .setColor('34B7EB')
       .setDescription(`:heart: Мне кажется... В вас влюблен ${randomMember}`)
       .setThumbnail(`${randomMember.avatarURL()}`)
       message.reply(embed)
    }
};