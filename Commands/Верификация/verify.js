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
    // Data
    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    
    // Roles
    let role = message.guild.roles.cache.find(role => role.id === "748584003002695751");
    let RUrole = message.guild.roles.cache.find(role => role.id === "770436611539468298");
    let USrole = message.guild.roles.cache.find(role => role.id === "770436608754581515");
    if (!role || !RUrole || !USrole) return message.channel.send('Произошла ошибка **"Данной роли нету"**, пожалуйста обратитесь к разработчику бота!'); // Role Check

    if (data.verified === true && data.lang === "RU") { // If you RUS and 
        message.channel.send(`Вы успешно верифицированы на сервере ${message.guild.name}, удачного общения!`)
        message.guild.members.cache.get(message.author.id).roles.add(role)
        message.guild.members.cache.get(message.author.id).roles.add(RUrole)
    } else if (data.verified === true && data.lang === "US") {
        message.channel.send(`You have been successfully verified on the ${message.guild.name}, have a good time!!`)
        message.guild.members.cache.get(message.author.id).roles.add(role)
        message.guild.members.cache.get(message.author.id).roles.add(USrole)
    } else {
        message.channel.send("Пожалуйста, пройдите верификацию, нажмя реакцию в правилах, которая показывает ваш язык общения, а так же пройдя по ссылке в правилах сервера! / Please, pass the verification by clicking the reaction in the rules, which shows your communication language, as well as by following the link in the server rules!")
    }
      }
    }
