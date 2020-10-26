const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const mongoose = require('mongoose')
const User = require('../../data/user')
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Верификация для новых участников!",
            usage: "!verification",
            category: "Verification",
            aliases: ["v"],
            guildOnly: true,
			nsfw: false,
			args: false
    });
}
async run(message) {
    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    let role = message.guild.roles.cache.find(role => role.id === "748584003002695751");
    if (!role) return message.channel.send('Произошла ошибка **"Данной роли нету"**, пожалуйста обратитесь к разработчику бота!');
    if (data.verified === true) {
        message.channel.send(`Вы успешно верифицированы на сервере ${message.guild.name}, удачного общения! / You have been successfully verified on the ${message.guild.name}, have a good time!`)
        message.guild.members.cache.get(message.author.id).roles.add(role)
    } else {
        message.channel.send("Пожалуйста, пройдите верификацию, пройдя по ссылке в правилах сервера! / Please, pass the verification by following the link in the server rules!")
    }
      }
    }
