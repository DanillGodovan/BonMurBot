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
        .setDescription(`Идеи & Улучшения.`)
        .addField("**Русская Версия**", "Для подачи идеи / улучшения в этот чат, напишите \"!suggest <идея / улучшение>\" в Генеральном Чате / Чате Новичков / Команды Ботов.\nПросьба не подавать глупые, бессмысленные, бесполезные и тому подобные идеи.")
        .addField("**<:YouTube:770834157244776458> Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Идеи**" ,{embed: embed})
}
}