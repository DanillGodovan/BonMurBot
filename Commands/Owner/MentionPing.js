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
        .setDescription(`Упоминания / Mentions`)
        .addField("**Русская Версия**", "Для получения ролей по упоминанию, нажмите на реакцию ниже соответствующею тому, что вам нужно.\n📰 Все Основное\n🎬 Новые Видео\n🎉 Раздачи")
        .addField("**English Version**", "To get roles by mention, click on the reaction below corresponding to what you need.\n📰 All The Main\n🎬 New Videos\n🎉 Giveaways")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react('📰')
            await msg.react('🎬')
            await msg.react('🎉')
        })
    }
}