const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const { prefix } = require('../../BotConfig.json')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["test"],
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
        .setDescription(`Команды / Commands`)
        .addField("**Русская Версия**", "[Команды](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nДля нахождение информации по командам всех ботов, перейдите по ссылке выше.\nP.S. Все это будет в скором времени пополняться.")
        .addField("**English Version**", "[Commands](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/komandy)\nTo find information on the commands of all bots, follow the link above.\nP.S. All this will be updated soon.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Основное / Main**" ,{embed: embed})
}
}