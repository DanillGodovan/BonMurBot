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
        .setDescription(`Служебное / Service`)
        .addField("**Русская Версия**", "Для нахождение основной информации для модераторов и админом, перейдите по ссылке выше.\nОбязательное прочтение и запоминание, за не выполнение - снятие / понижение.")
        .addField("**English Version**", "To find basic information for moderators and admins, follow the link above.\nMandatory reading and memorizing, for non - executing - impeachment / decrease.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Служебное / Service**" ,{embed: embed})
    }
}