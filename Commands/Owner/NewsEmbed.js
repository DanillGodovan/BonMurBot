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
        .addField("**Русская Версия**", "Новости / Обновления нашего сервера публикуются только в этом чате.\nСливы новостей / обновлений, находящиеся не в этом чате, могут оказаться фейком, осторожнее!\nЕсли вы хотите получать уведомления о новостях, перейдите в чат <#770823966612258879>, найдите последнее сообщение и нажмите на вторую реакцию.")
        .addField("**English Version**", "News / Updates from our server are published only in this chat.\nNews / updates that are not in this chat may be fake, be careful!\nIf you want to receive notifications about news, go to the chat <#770823966612258879>, find the last message and click on the second reaction.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed})
    }
}