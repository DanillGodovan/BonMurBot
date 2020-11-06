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
        .setDescription(`Официальные правила сервера.`)
        .addField("**Русская Версия**", "[Правила](https://clck.ru/RdBSC)\nЧтобы открыть чат-комнаты, перейдите по ссылке выше, ознакомьтесь с правилами, подтвердите прочтение, нажмите на соответствующею вашему языку реакцию и напишите в этом чате команду !verify.")
        .addField("**English Version**", "[Rules](https://clck.ru/RdBRK)\nTo open chat rooms, follow the link above, read the rules, confirm reading, click on the appropriate response to your language and write the command in this chat !verify.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Важное / The Important**" ,{embed: embed}).then(async msg => {
            await msg.react("🇷🇺")
            await msg.react("🇺🇸")
            await msg.react("🇬🇧")
    })
}
}