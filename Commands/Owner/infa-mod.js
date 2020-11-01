const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const usedCommand = new Set();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Отсылает информацию для админов!",
            usage: "!infa-admin",
            category: "Owner",
            aliases: ["Инфа-админ", "info-adm"],
            ownerOnly: true,
            guildOnly: true,
            nsfw: false,
            args: false,
        });
    }
    async run(message) {
        if (message.channel.id !== "738803552817905737") {
            return message.channel.send("Вы не можете использовать данную команду в этом канале!");
        } else {
            if (usedCommand.has(message.author.id)) {
                message.reply("Ты не можешь использовать данную комманду, пока не пройдет 15 минут!")
                    .then((msg) => msg.delete({
                        timeout: 10000
                    }));
                message.delete({
                    timeout: 5000
                });
            } else {
                let sEmbed = new MessageEmbed()
                    .setColor("2F3136")
                    .setTitle("Информация для модераторов")
                    .setDescription('Если Вы здесь находитесь, то Вы Модератор сервера.\nВаши обязанности в этом чате - отвечать реакцией на **идеи / жалобы**.\nПросьба отсеивать плохие и бессмысленные **идеи / жалобы** от нормальных. \nНо знайте, что если Вы попытаетесь **обмануть**, Вам выдадут **предупреждение**.\nВаши ответы отправляются всегда в "**логи-админа**".\nЭто сообщение удалится через **15** минут.', true);
                message.channel.send("**Russian / Русский**", {
                        embed: sEmbed
                    }).then((msg) => msg.delete({
                        timeout: 900000
                    }));
                let mEmbed = new MessageEmbed()
                    .setColor("2F3136")
                    .setTitle("Information for moderators")
                    .setDescription('If you are here, you are a Server Moderator.\nYour responsibilities in this chat are to respond to **ideas / reports**.\nPlease screen out bad and meaningless **ideas / reports** from normal. \nBut know that if you try to **cheat**, you will get a **warning**.\nYour responses are always sent to "**admin-log**".\nMessage will be deleted after **15** minutes', true);
                message.channel.send("**English / Английский**", {
                        embed: mEmbed
                    }).then((msg) => msg.delete({
                        timeout: 900000
                    }));
                message.delete();

                usedCommand.add(message.author.id);
                setTimeout(() => {
                    usedCommand.delete(message.author.id);
                }, 900000);
            }
        }
    }
};