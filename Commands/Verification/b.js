const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment} = require('discord.js');
const Canvas = require('canvas');
module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Отсылает информацию для модераторов!",
            usage: "!b",
            category: "Verification",
            aliases: ["b"]
    });
}
async run(message) {
	const attachment = new MessageAttachment('yTs6mYbi3.png');

    message.channel.send("**Приветствуем** всех новеньких на сервере BRO ИГРАЮТ: Перерождение.\nДля того, чтобы пройти до следующего этапа верификации, посмотрите пожалуйста Личные Сообщения и прочитайте сообщение от <@729675547302559838>.", {files: ["Commands/Verification/yTs6mYbi3.png"]}).then(msg => msg.delete({
        "timeout": 900000
       }));
    }
}
