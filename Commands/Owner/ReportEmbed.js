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
        .setDescription(`Логи / Logs`)
        .addField("**Русская Версия**", "[Информация по логам](https://clck.ru/RdQyz)\nДля нахождение информации по логам, перейдите по ссылке выше.\nОбязательное слежение и отзывчивость на эти логи, за не выполнение - снятие / понижение.")
        .addField("**English Version**", "[Information about logs](https://clck.ru/RdQyz)\nTo find information about logs, follow the link above.\nMandatory tracking and responsiveness to these logs, for non - execution - impeachment / reduction.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Служебное / Service**" ,{embed: embed})
    }
}