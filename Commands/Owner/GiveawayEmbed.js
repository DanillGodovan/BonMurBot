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
        .setDescription(`Раздачи, плюшки / Giveaways, Buns`)
        .addField("**Русская Версия**", "В этом чате публикуются конкурсы на плюшки / роли / робуксы / петы и многое другое.\nКонкурсы могут иметь особые условия по уровню, активу и т.п.\nВсем, кто это читает, удачи в победах!")
        .addField("**English Version**", "In this chat are published, the contests on the buns / role / roboczy / pet and more.\nGiveaways may have special conditions for level, actiive, etc.\nTTo all who read this, good luck with Your victories!")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Конкурсы / Giveaways**" ,{embed: embed})
    }
}