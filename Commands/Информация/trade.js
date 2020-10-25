const Command = require('../../Structures/Command');
const mongoose = require('mongoose')
const User = require('../../data/user')
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['трейд'],
			description: 'Скидывает трейд через определенный интервал',
			category: 'Утилиты',
            guildOnly: true,
			nsfw: false,
		});
	}

	async run(message, args) {

    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    if(!data) return bot.nodb();

    let context = args.slice(0).join(` `)

    if(!context){ return message.channel.send("Напишите свою форму трейда")} else {
    let tradechannel = message.guild.channels.cache.find(z => z.id === "758759866633289728")
    let a = new Discord.MessageEmbed()
        .setTitle(`Trade`)
        .setDescription(`${context}\n\nОбращаться к <@${message.author.id}>`)
        .setColor("FF0000")
        tradechannel.send(a),
        setInterval(() => tradechannel.send(a), 10000)
    data.bio = context; data.save();
    }
	}
};