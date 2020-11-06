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
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Конкурсы / Giveaways**" ,{embed: embed})
    }
}