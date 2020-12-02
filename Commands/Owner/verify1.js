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
    if (message.channel.id !== "703267200290652250") return;
    message.delete()
    // Data
    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    
    // Roles
    let role = message.guild.roles.cache.find(role => role.id === "748584003002695751");
    let RUrole = message.guild.roles.cache.find(role => role.id === "770436611539468298");
    let USrole = message.guild.roles.cache.find(role => role.id === "770436608754581515");
    if (!role || !RUrole || !USrole) return message.channel.send('Произошла ошибка **"Данной роли нету"**, пожалуйста обратитесь к разработчику бота!').then(msg => msg.delete( {timeout: 15000} )) // Role Check

    if (data.verified === true && data.lang === "RU") { // If you RUS and 
        message.channel.send(`:white_check_mark: Вы успешно прошли верификацию! Приятного время-провождения!`).then(msg => msg.delete( {timeout: 15000} ))
        message.guild.members.cache.get(message.author.id).roles.add(role)
        message.guild.members.cache.get(message.author.id).roles.add(RUrole)
    } else if (data.verified === true && data.lang === "US") {
        message.channel.send(`:white_check_mark: You have successfully passed verification! Enjoy your time!`).then(msg => msg.delete( {timeout: 15000} ))
        message.guild.members.cache.get(message.author.id).roles.add(role)
        message.guild.members.cache.get(message.author.id).roles.add(USrole)
    } else {
        message.channel.send(":warning: Ошибка! Скорее всего Вы не выполнили то, что нужно для прохождения верификации.\nСоветуем Вам прочитать https://discordapp.com/channels/703044539287601153/703267200290652250/781802612746879037 данное сообщение!\nЕсли же Вы все выполнили правильно, но все равно не смогли пройти верификацию, то советуем Вам обратиться в поддержку <#783217199878766612>!\n:warning: Error! Most likely, You did not complete what you need to pass verification.\nWe advise you to read https://discordapp.com/channels/703044539287601153/703267200290652250/781802612746879037 this message!\nIf you did everything correctly, but still couldn't pass verification, we advise you to contact support <#783217199878766612>!").then(msg => msg.delete( {timeout: 15000} ))
    }
      }
    }
