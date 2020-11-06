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
        .setDescription(`Заключительный этап верификации.`)
        .addField("**Русская Версия**", "Заключительный этап верификации. Для прохождения этого этапа, просто общайтесь.\nДля более детального описания ваших возможностей, напишите \"!newbie\".\nНабрав 10 уровень, вы сможете пройти в генеральный чат.")
        .addField("**<:YouTube:770834157244776458> Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Основное / Main**" ,{embed: embed})
}
}