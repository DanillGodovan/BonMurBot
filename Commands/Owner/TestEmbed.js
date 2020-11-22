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
        .setTitle(`**Server: ${message.guild.name}**`)
        .setColor('34B7EB')
        .setDescription(`Официальные правила сервера / Official server rules.`)
        .addField("**Важное / Обязательное**", "[Правила](https://clck.ru/RdBSC)\nЧтобы открыть чат-комнаты, перейдите по ссылке выше, ознакомьтесь с правилами, подтвердите прочтение, нажмите на соответствующую вашему языку реакцию и напишите в этом чате команду !verify.")
        .addField("**Important & Required**", "[Rules](https://clck.ru/RdBRK)\nTo open chat rooms, follow the link above, read the rules, confirm reading, click on the appropriate response to your language emoji and write the command in this chat !verify.")
        .addField("**Социальные сети / Social network**", "<:01:774670675947421747> [YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)\n<:03:774670676165918730> [VK](https://www.instagram.com/bro_rbx)\n<:02:774670676581548112> [Instagram](https://vk.com/bro_ytb)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react("🇷🇺")
            await msg.react("🇺🇸")
    })
}
}