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
        .addField("**Русская Версия**", "Для получения ролей по упоминанию, нажмите на реакцию ниже соответствующею тому, что вам нужно.\n📰 Все Основное\n🎬 Новые Видео")
        .addField("**English Version**", "To get roles by mention, click on the reaction below corresponding to what you need.\n📰 All The Main\n🎬 New Videos")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react('📰')
            await msg.react('🎬')
        })
    }
}