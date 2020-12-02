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
        .setDescription(`Основное`)
        .addField("**Интересное & Основное**", "[Основная информация](https://biolog-n.gitbook.io/bro-igrayut-pererozhdenie/osnovnaya-informaciya)\nДля нахождение информации по разработке сервера, валуе-листа и артам, перейдите по ссылке выше.")
        .addField("**Социальные сети**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed})
    }
}