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
        .setDescription(`Логи & Основное / Logs & Main`)
        .addField("**Логи & Основное**", "[Информация по логам](https://biolog-n.gitbook.io/bro-igrayut-pererozhdenie/logi)\nДля нахождения информации по логам, перейдите по ссылке выше.\nОбязательно к прочтению.")
        .addField("**Logs & Main**", "[Logs information](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/english/logs)\nTo find information on logs, follow the link above.\nMust-read.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Логи / Logs**" ,{embed: embed})
    }
}