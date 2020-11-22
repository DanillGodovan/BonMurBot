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
        .setDescription(`Трейды & Новое / Trades & New`)
        .addField("**Трейды & Новое**", "[Трейды](https://clck.ru/RdPP3)\nДля нахождение детальной информации по трейдам, перейдите по ссылке выше. На этом сервере практикуется автоматическая система трейдов. Написав лишь один раз команду \"!trade <ваш оффер>\" в Бот Команды, Вы сможете не беспокоится о отправлении офферов.")
        .addField("**Trades & New**", "[Trades](https://clck.ru/RdPWQ)\nTo find detailed information on trades, follow the link above. An automatic trading system is used on this server. Once You write the \"!trade <your offer>\" command to the bot commands, You won't have to worry about sending offers.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Основное / Main**" ,{embed: embed})
    }
}