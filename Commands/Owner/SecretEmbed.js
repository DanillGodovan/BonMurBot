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
        .setDescription(`Выбитые Секретки / Hatched Secrets`)
        .addField("**Русская Версия**", "Здесь публикуются секретки, выбитые игроками всего Bubble Gum Simulator в Roblox.\nЕсли Вы выбили секретку и увидели ее здесь — Вы молодец.")
        .addField("**English Version**", "Here are published secrets, hatched by players of all Bubble Gum Simulator in Roblox.\nIf You hatched a secret and saw it here — You're good.")
        .addField("**<:YouTube:770834157244776458> YouTube Channel / Ютуб Канал**", "[YouTube](https://www.youtube.com/channel/UCH3I08n1RAz0AcOLZUJ5ujQ)")
        .setFooter(`ID: ${message.guild.id} | BonMurBot ©️ 2020-2020 Все Права Съедены.`)
        message.channel.send("**Секретки / Secrets**" ,{embed: embed})
    }
}