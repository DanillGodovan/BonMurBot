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
        .setDescription(`Модерация & Администрация / Moderation & Administration`)
        .addField("**Модерация & Администрация**", "[Все для Модерации и Администрации](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/vse-dlya-moderacii-i-administracii)\nДля нахождение информации по Модерации и Администрации, перейдите по ссылке выше.\nОбязательное для прочтения и запоминания.")
        .addField("**English Version**", "[Everything for Moderation and Administration](https://app.gitbook.com/@biolog-n/s/bro-igrayut-pererozhdenie/english/everything-for-moderation-and-administration)\nTo find information on Moderation and Administration, follow the link above.\nRequired reading and memorizing.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Служебное / Service**" ,{embed: embed})
    }
}