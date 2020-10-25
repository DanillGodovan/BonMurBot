const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const usedCommand = new Set();

module.exports = class extends Command {

    constructor(...args) {
		super(...args, {
            description: "Отсылает информацию для админов!",
            usage: "!infa-admin",
            category: "Информация",
            aliases: ["Инфа-админ", "info-adm"],
            guildOnly: true,
			nsfw: false,
			args: false
    });
}
async run(message) {
    if(usedCommand.has(message.author.id)){
        message.reply('Ты не можешь использовать данную комманду, пока не пройдет 15 минут!').then(msg => msg.delete({ timeout: 10000 }))
        message.delete({ timeout: 5000 })
    } else {
    let sEmbed = new MessageEmbed()
    .setColor('2F3136')
    .setTitle("Информация для администраторов")
    .setDescription("Если Вы здесь находитесь, то Вы Администратор / Помощник Администратора сервера\n Ваши обязанности в этом чате - отвечать реакцией на баны и ответы **Модераторов**.\nПросьба отсеивать обманчивые баны и ответы **Модераторов** от правильных.,\nЭто сообщение удалится через **15** минут", true)
    message.channel.send("**Russian / Русский**", {embed: sEmbed}).then(msg => msg.delete(900000))
    let mEmbed = new MessageEmbed()
    .setColor('2F3136')
    .setTitle("Информация для администраторов")
    .setDescription("If you are here, then you are the Administrator / Administrator helper of the server\n Your responsibilities in this chat are to respond with reactions to bans and responses from **Moderators**.\nPlease filter out deceptive bans and **Moderators** answers from the correct ones.\nThis message will be deleted after **15** minutes", true)
    message.channel.send("**English / Английский**", {embed: mEmbed}).then(msg => msg.delete(900000))
    message.delete()

    usedCommand.add(message.author.id);
    setTimeout(() => {
        usedCommand.delete(message.author.id);
    }, 900000); 
}
}
}
