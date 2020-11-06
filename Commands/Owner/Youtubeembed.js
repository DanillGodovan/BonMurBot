const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const { prefix } = require('../../BotConfig.json')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "test.",
            category: "Owner",
            ownerOnly: true,
		});
	}

	async run(message) {
        message.delete()
		const embed = new MessageEmbed()
        .setTitle(`**Server: ${message.guild.name}**`)
        .setColor('34B7EB')
        .setDescription(`Видео, Стримы / Videos, Streams`)
        .addField("**Русская Версия**", "Видео / Стримы ютубера BRO ИГРАЮТ и его других ютуб каналов публикуются сюда.\nСсылка на ютуб канал BRO ИГРАЮТ находится чуть ниже.\nНе забудьте подписаться!\nЕсли вы хотите получать уведомления о новых видео, перейдите в чат <#770823966612258879>, найдите последнее сообщение и нажмите на первую реакцию.")
        .addField("**English Version**", "Videos / Streams youtuber BRO ИГРАЮТ and its other YouTube channels are published here.\nThe link to the YouTube channel BRO ИГРАЮТ is just below.\nDon't forget to subscribe!\nIf you want to receive notifications about new videos, go to the chat <#770823966612258879>, find the last message and click on the first reaction.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed})
    }
}