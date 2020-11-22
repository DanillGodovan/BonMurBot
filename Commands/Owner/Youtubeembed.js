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
        .setDescription(`Публикация контента / Publishing content`)
        .addField("**Интересное & Основное**", "Видео / Стримы ютубера BRO ИГРАЮТ публикуются сюда.\nДля получения уведомлений, перейдите в чат <#770823966612258879>, найдите последнее сообщение и нажмите на вторую реакцию.")
        .addField("**Interesting & General**", "Videos / Streams of youtuber BRO ИГРАЮТ are published here.\nTo receive notifications, go to chat <#770823966612258879>, , find the last message and click on the second reaction.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed})
    }
}