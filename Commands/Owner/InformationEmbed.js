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
        .setTitle(`**Верификация & Verification**`)
        .setColor('34B7EB')
        .addField("**Важное / Обязательное**", ":warning: Нужна помощь? Откройте билет в <#783622038291873813>!\nВалуе-лист BGS, который Мы используем - https://clck.ru/SEFQi!\nНужна более детальная информация? После верификации напишите в чате \"<#703254582834364458>\" команды \"!newbie\" и \"!help\". Они Вам могут помочь!")
        .addField("**Important & Required**", "Need help? Open a ticket at <#783622038291873813>!\nBGS Value-list that We use - https://clck.ru/SEFQi!\nNeed more detailed information? After verification, write in the chat \"<#703254582834364458>\" commands \"!newbie\"and \"!help\". They can help You!")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react("🇷🇺")
            await msg.react("🇺🇸")
    })
}
}