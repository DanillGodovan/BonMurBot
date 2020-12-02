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
        .addField("**Важное / Обязательное**", ":punch: Если Вы прочитали правила, информацию выше и не будете задавать глупых вопросов,\nТо Вы - Молодец!\nДля прохождения нажмите на :flag_ru: и напишите \"!verify\" (без \"\").")
        .addField("**Important & Required**", "If you have read the rules, the information above and will not ask stupid questions,\nThen You - Well Done!\nTo pass, click on :flag_us: and write \"!verify\" (without \"\").")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://vk.com/bro_ytb)\n<:02:774670676581548112> [Instagram](https://www.instagram.com/bro_rbx)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react("🇷🇺")
            await msg.react("🇺🇸")
    })
}
}